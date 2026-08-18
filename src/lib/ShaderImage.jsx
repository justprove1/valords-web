import { useEffect, useRef } from 'react';

/**
 * A photograph rendered through WebGL2 so it can breathe.
 *
 * The image is always present as a plain <img> underneath; the canvas fades in
 * on top only once the texture has actually decoded. If WebGL is missing, the
 * texture is blocked by CORS, or the visitor asked for reduced motion, the page
 * simply keeps the <img> and nothing is lost.
 */

const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uTex;
uniform vec2  uRes;
uniform vec2  uTexRes;
uniform vec2  uMouse;
uniform float uHover;
uniform float uTime;
uniform float uReveal;
uniform float uAmp;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main(){
  float rC = uRes.x / max(uRes.y, 1.0);
  float rI = uTexRes.x / max(uTexRes.y, 1.0);

  /* ripples must be round, so distances are measured in aspect-corrected space */
  vec2 auv = vec2(vUv.x * rC, vUv.y);
  vec2 am  = vec2(uMouse.x * rC, uMouse.y);
  float d  = distance(auv, am);
  vec2  dir = d > 0.0001 ? (auv - am) / d : vec2(0.0);

  /* the pointer is a pool of light, not a water ripple: the picture leans
     very slightly into it, the way glass bends what sits behind it */
  float halo = exp(-d * d * 7.0) * uHover;
  vec2 disp = -dir * halo * 0.013 * uAmp;

  /* a slow swell so the picture is never completely still */
  float n1 = fbm(vUv * 2.4 + vec2(uTime * 0.042, -uTime * 0.031));
  float n2 = fbm(vUv * 2.1 - vec2(uTime * 0.034, uTime * 0.027));
  disp += vec2(n1 - 0.5, n2 - 0.5) * 0.014 * uAmp;

  float rv = clamp(uReveal, 0.0, 1.0);
  disp *= 1.0 + (1.0 - rv) * 3.4;

  vec2 cuv = vUv + disp;
  if (rC > rI) cuv.y = (cuv.y - 0.5) * (rI / rC) + 0.5;
  else         cuv.x = (cuv.x - 0.5) * (rC / rI) + 0.5;
  cuv = clamp(cuv, 0.0005, 0.9995);

  /* colour separates only at the rim of the halo, where the bend is steepest */
  float rim = clamp(halo * (1.0 - halo) * 4.0, 0.0, 1.0);
  float split = (rim * 0.55 + 0.10) * 0.005 * uAmp;
  vec3 col;
  col.r = texture(uTex, clamp(cuv + dir * split, 0.0005, 0.9995)).r;
  col.g = texture(uTex, cuv).g;
  col.b = texture(uTex, clamp(cuv - dir * split, 0.0005, 0.9995)).b;

  /* entrance: the photograph surfaces from the dark, edge broken by noise */
  float edge = smoothstep(0.0, 1.0, rv * 1.5 - (1.0 - vUv.y) * 0.42 - fbm(vUv * 3.0) * 0.2);
  col = mix(vec3(0.043, 0.047, 0.041), col, clamp(edge, 0.0, 1.0));

  /* light gathers where the pointer rests: a little brighter, a little warmer,
     a little more colour — the way a room looks when the sun reaches it */
  col *= 1.0 + halo * 0.20;
  col += vec3(0.028, 0.019, 0.004) * halo;
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(lum), col, 1.0 + halo * 0.30);

  float g = hash(vUv * uRes + fract(uTime));
  col += (g - 0.5) * 0.026;

  float v = distance(vUv, vec2(0.5));
  col *= 1.0 - v * v * 0.34;

  fragColor = vec4(col, 1.0);
}`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('[ShaderImage]', gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function ShaderImage({
  src,
  alt = '',
  amp = 1,
  className = '',
  style,
  imgStyle,
  children,
}) {
  const wrap = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const host = wrap.current;
    const cv = canvas.current;
    if (!host || !cv) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const gl = cv.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'high-performance' });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('[ShaderImage]', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (n) => gl.getUniformLocation(prog, n);
    const uRes = U('uRes'), uTexRes = U('uTexRes'), uMouse = U('uMouse');
    const uHover = U('uHover'), uTime = U('uTime'), uReveal = U('uReveal'), uAmp = U('uAmp');
    gl.uniform1f(uAmp, amp);
    gl.uniform2f(uMouse, 0.5, 0.5);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    let raf = 0, alive = true, ready = false, t0 = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, h: 0, th: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(host.clientWidth * dpr));
      const h = Math.max(1, Math.round(host.clientHeight * dpr));
      if (cv.width === w && cv.height === h) return;
      cv.width = w; cv.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
      mouse.th = 1;
    };
    const onLeave = () => { mouse.th = 0; };
    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave, { passive: true });

    /* the canvas only ever appears if the pixels really arrived */
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => {
      if (!alive) return;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.uniform2f(uTexRes, img.naturalWidth, img.naturalHeight);
      ready = true;
      t0 = performance.now();
      cv.style.opacity = '1';
    };
    img.src = src;

    const frame = (now) => {
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      if (!ready) return;
      const t = (now - t0) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.07;
      mouse.y += (mouse.ty - mouse.y) * 0.07;
      mouse.h += (mouse.th - mouse.h) * 0.05;
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uHover, mouse.h);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uReveal, Math.min(1, t / 1.7));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      img.onload = null;
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      /* deliberately no loseContext(): getContext() hands back the same context
         for the same canvas, so killing it here would leave a remount — which is
         exactly what StrictMode does — compiling against a dead context. */
    };
  }, [src, amp]);

  return (
    <div ref={wrap} className={className} style={{ position: 'relative', overflow: 'hidden', background: 'var(--deep)', ...style }}>
      <img src={src} alt={alt} className="img-cover" style={{ position: 'absolute', inset: 0, ...imgStyle }} />
      <canvas
        ref={canvas}
        aria-hidden
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', opacity: 0, transition: 'opacity .9s var(--ease)' }}
      />
      {children}
    </div>
  );
}
