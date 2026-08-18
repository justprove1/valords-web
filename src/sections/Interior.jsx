import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROPERTIES, fmtPrice } from '../data/properties';
import { U } from '../data/images';
import { EASE } from '../lib/anim';
import Magnetic from '../components/Magnetic';

const P = PROPERTIES[0];
const SOFT = U(P.cover, 1600, 70);   // only ever seen blurred — no need for detail
const SHARP = U(P.cover, 3000, 82);  // the glass: full resolution, magnified

/**
 * The viewfinder.
 *
 * One photograph, two states. Outside the circle it sits soft and slightly
 * cooled; inside, the same frame is sharp, at full resolution, and magnified
 * around the exact point under the pointer — so the lens behaves like real
 * glass rather than a hole cut through the wall.
 *
 * This replaced two earlier attempts. The first revealed a different house's
 * interior, which the eye caught at once: stock photography of a facade and
 * stock photography of a living room are never the same building. The second
 * turned the frame into a survey document, which was honest but read as damage.
 * Magnifying the same pixels cannot disagree with itself, and it earns its
 * place — at 3000px the joinery, the stone and the pool coping are all legible.
 *
 * `inside` is still there: the day a real interior of this house exists, pass it
 * and the lens goes back to being a window.
 */
export default function Interior({ inside = null }) {
  const wrap = useRef(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const target = { x: 0.56, y: 0.46 };
    const cur = { x: 0.56, y: 0.46 };
    let idle = true;
    let t = Math.PI / 3;
    let raf = 0;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = (e.clientY - r.top) / r.height;
      idle = false;
    };
    const onLeave = () => { idle = true; };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave, { passive: true });

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (idle) {
        /* a slow sweep across the facade, so the lens is never parked */
        t += 0.004;
        /* biased right so the drifting lens never parks over the headline */
        target.x = 0.64 + Math.cos(t) * 0.17;
        target.y = 0.48 + Math.sin(t * 1.7) * 0.15;
      }
      cur.x += (target.x - cur.x) * 0.07;
      cur.y += (target.y - cur.y) * 0.07;
      el.style.setProperty('--x', `${(cur.x * 100).toFixed(2)}%`);
      el.style.setProperty('--y', `${(cur.y * 100).toFixed(2)}%`);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const spec = [
    [`${P.size}`, 'm² built'],
    [P.plot ? `${P.plot}` : P.floor, P.plot ? 'm² plot' : 'floor'],
    [`${P.year}`, 'built'],
    [`${P.beds}`, 'bedrooms'],
  ];

  return (
    <section ref={wrap} className="xray" data-cursor="Look closer">
      <img className="img-cover xray-soft" src={SOFT} alt={`${P.title}, ${P.hood}`} />

      <div className="xray-reveal" aria-hidden>
        <img className="img-cover xray-sharp" src={inside ? U(inside, 3000, 82) : SHARP} alt="" />
      </div>

      <span className="xray-lens" aria-hidden>
        <i className="xray-cross" />
      </span>
      <div className="xray-veil" aria-hidden />

      <div className="shell xray-copy">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <p className="eyebrow eyebrow--tick" style={{ color: 'rgba(246,244,239,.72)' }}>
            Move the cursor — look closer
          </p>
          <h2 className="display d-lg" style={{ marginTop: 20, maxWidth: '13ch' }}>{P.title}</h2>
          <p className="lead" style={{ marginTop: 18, maxWidth: '32ch', color: 'rgba(246,244,239,.8)' }}>
            {P.lede}
          </p>

          <ul className="xray-spec">
            {spec.map(([n, l]) => (
              <li key={l}>
                <span className="num">{n}</span>
                <em>{l}</em>
              </li>
            ))}
          </ul>

          <p className="num" style={{ marginTop: 24, fontSize: 15, letterSpacing: '.04em' }}>
            {P.hood} · {fmtPrice(P.price)}
          </p>
          <Magnetic style={{ marginTop: 32 }}>
            <Link to={`/property/${P.slug}`} className="btn btn--light">Open the file</Link>
          </Magnetic>
        </motion.div>
      </div>

      <p className="xray-note meta">Nº {P.ref} — photography placeholder</p>
    </section>
  );
}
