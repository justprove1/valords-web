import { useEffect, useRef } from 'react';
import {
  AmbientLight, BufferAttribute, Color, DirectionalLight, Group, Mesh,
  MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, Scene, SphereGeometry,
  MeshBasicMaterial, WebGLRenderer, Raycaster, Vector2, LineBasicMaterial,
  LineSegments, BufferGeometry, FogExp2,
} from 'three';

/**
 * Barcelona as a relief, from the coordinates the map section already held.
 *
 * The height is not invented. The coastline runs from Castelldefels up to the
 * Besòs, and the plain climbs away from it to the Collserola ridge; elevation
 * here is the perpendicular distance from that coast line, curved so the rise
 * steepens inland. Run against the six real centroids it puts Sarrià highest
 * (0.50), Pedralbes next (0.41), and Ciutat Vella on the water (0.05) — which
 * is the actual geography, and also the actual price order. That is the whole
 * argument of the section: the good addresses are up the hill.
 *
 * Kept deliberately spare — a survey model, not a video game. No textures, one
 * key light, and a brass wireframe over a dark solid so it reads as something
 * an architect would put on a table.
 */

const SEG = 120;

/* the coastline in the same normalised space the SVG map uses */
const P0 = [0.160, 1.000];
const N = [-0.523, -0.852];   // unit normal, pointing inland
const MAX_D = 0.937;          // distance at the far inland corner

export function elevation(u, v) {
  const d = (u - P0[0]) * N[0] + (v - P0[1]) * N[1];
  const k = Math.max(0, Math.min(1, d / MAX_D));
  /* the plain is flat near the water and rises hard at the ridge */
  const base = Math.pow(k, 1.7);
  /* two long folds so the ridge is not a smooth ramp — Collserola has valleys */
  const fold = Math.sin(u * 7.3 + v * 2.1) * 0.014 + Math.sin(v * 9.1 - u * 3.4) * 0.010;
  return base + fold * k;
}

export default function CityRelief({ points = [], active, onPick, onFail }) {
  const host = useRef(null);
  /* the render loop reads these through the ref so re-renders never rebuild the scene */
  const live = useRef({ points, active, onPick });
  live.current = { points, active, onPick };

  useEffect(() => {
    const el = host.current;
    if (!el) return undefined;

    let renderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      if (!renderer.getContext()) throw new Error('no context');
    } catch {
      onFail?.();
      return undefined;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';

    const scene = new Scene();
    scene.fog = new FogExp2(new Color('#0b1310'), 0.55);

    const camera = new PerspectiveCamera(34, 1, 0.1, 20);
    camera.position.set(0, 1.06, 1.42);
    camera.lookAt(0, 0.06, 0);

    const world = new Group();
    world.rotation.x = -0.06;
    scene.add(world);

    /* ── terrain ─────────────────────────────────────────────────── */
    const geo = new PlaneGeometry(1.6, 1.15, SEG, SEG);
    const pos = geo.attributes.position;
    const HEIGHT = 0.42;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i) / 1.6 + 0.5;
      const v = 0.5 - pos.getY(i) / 1.15;
      pos.setZ(i, elevation(u, v) * HEIGHT);
    }
    geo.computeVertexNormals();
    geo.rotateX(-Math.PI / 2);

    const land = new Mesh(
      geo,
      new MeshStandardMaterial({ color: new Color('#16241d'), roughness: 0.92, metalness: 0.04, flatShading: false })
    );
    world.add(land);

    /* the survey lines: brass, thin, and only every fourth edge so the mesh
       reads as contours rather than as a net */
    const wire = contours(geo, 4);
    const lines = new LineSegments(
      wire,
      new LineBasicMaterial({ color: new Color('#b08d57'), transparent: true, opacity: 0.16 })
    );
    lines.position.y = 0.002;
    world.add(lines);

    /* ── the six addresses ───────────────────────────────────────── */
    const dot = new SphereGeometry(0.012, 18, 18);
    const markers = points.map((p) => {
      const m = new Mesh(dot, new MeshBasicMaterial({ color: new Color('#e8cf9a') }));
      m.position.set(
        (p.u - 0.5) * 1.6,
        elevation(p.u, p.v) * HEIGHT + 0.016,
        (p.v - 0.5) * 1.15
      );
      m.userData.slug = p.slug;
      world.add(m);
      return m;
    });

    scene.add(new AmbientLight(0xffffff, 0.5));
    const key = new DirectionalLight(0xfff2d8, 2.1);
    key.position.set(-1.1, 1.5, 0.7);
    scene.add(key);
    const rim = new DirectionalLight(0x8fb3a4, 0.7);
    rim.position.set(1.2, 0.4, -0.9);
    scene.add(rim);

    /* ── interaction ─────────────────────────────────────────────── */
    const ray = new Raycaster();
    const ndc = new Vector2(2, 2);
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      tilt.tx = ndc.y * 0.05;
      tilt.ty = ndc.x * 0.22;
    };
    const onLeave = () => { ndc.set(2, 2); tilt.tx = 0; tilt.ty = 0; };
    const onClick = () => {
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(markers, false)[0];
      if (hit) live.current.onPick?.(hit.object.userData.slug);
    };
    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave, { passive: true });
    el.addEventListener('click', onClick);

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    let raf = 0;
    let onScreen = true;
    const t0 = performance.now();

    /* A relief of 32k triangles has no business running while it is scrolled
       past. The observer also means a tab restored from the background paints
       immediately rather than waiting to be scrolled. */
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen && !raf) raf = requestAnimationFrame(frame);
        if (!onScreen && raf) { cancelAnimationFrame(raf); raf = 0; }
      },
      { rootMargin: '120px' }
    );
    io.observe(el);

    function frame(now) {
      raf = onScreen ? requestAnimationFrame(frame) : 0;
      const t = (now - t0) / 1000;

      if (!reduced) {
        tilt.x += (tilt.tx - tilt.x) * 0.05;
        tilt.y += (tilt.ty - tilt.y) * 0.05;
        /* a slow sweep so the model is alive even with the pointer elsewhere */
        world.rotation.y = tilt.y + Math.sin(t * 0.12) * 0.10;
        world.rotation.x = -0.06 + tilt.x;
      }

      /* the selected address breathes; the rest sit still */
      const slug = live.current.active;
      for (const m of markers) {
        const on = m.userData.slug === slug;
        const s = on ? 1.5 + Math.sin(t * 2.4) * 0.22 : 1;
        m.scale.setScalar(s);
        m.material.opacity = on ? 1 : 0.55;
        m.material.transparent = true;
      }

      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(markers, false)[0];
      el.dataset.over = hit ? 'pin' : '';

      renderer.render(scene, camera);
    }

    /* one frame straight away: requestAnimationFrame does not fire while the
       document is hidden, and without this the section is blank on arrival for
       anyone who opened the page in a background tab */
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);

    /* a handle for measuring the scene from the console while developing —
       reading pixels back off a WebGL canvas proves nothing without
       preserveDrawingBuffer, and that costs performance in production */
    if (import.meta.env.DEV) window.__relief = { renderer, scene, camera, world, markers, land };

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('click', onClick);
      markers.forEach((m) => m.material.dispose());
      dot.dispose();
      geo.dispose();
      wire.dispose();
      land.material.dispose();
      lines.material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
    /* points are fixed for the life of the section; active flows through the ref */
  }, [points, onFail]);

  return <div ref={host} className="relief" aria-hidden />;
}

/* Survey contours rather than a wireframe. WireframeGeometry would draw every
   triangle edge — at 120x120 that is a solid net that hides the landform. This
   keeps every nth grid line, in both directions, and nothing else. */
function contours(geo, step) {
  const arr = geo.attributes.position.array;
  const at = (ix, iy) => (iy * (SEG + 1) + ix) * 3;
  const seg = [];
  const push = (a, b) => seg.push(arr[a], arr[a + 1], arr[a + 2], arr[b], arr[b + 1], arr[b + 2]);

  for (let iy = 0; iy <= SEG; iy += step)
    for (let ix = 0; ix < SEG; ix++) push(at(ix, iy), at(ix + 1, iy));
  for (let ix = 0; ix <= SEG; ix += step)
    for (let iy = 0; iy < SEG; iy++) push(at(ix, iy), at(ix, iy + 1));

  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(new Float32Array(seg), 3));
  return g;
}
