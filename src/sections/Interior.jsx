import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROPERTIES, fmtPrice } from '../data/properties';
import { U } from '../data/images';
import { EASE } from '../lib/anim';
import Magnetic from '../components/Magnetic';
import Slats from '../lib/Slats';

const P = PROPERTIES[0];

/**
 * The featured house.
 *
 * This section carried a viewfinder for three iterations: the photograph was
 * blurred, cooled and darkened everywhere except inside a small circle that
 * followed the pointer. Every version was rejected, and the reason was always
 * the same — on a property page the photograph is the argument, and the lens
 * was covering it. A gunsight reticle over a Pedralbes villa sells nothing.
 *
 * So the glass is gone. The house is shown sharp and full-bleed, drifting
 * slowly against the scroll, and the only interaction left is the one the
 * hero already established: light gathers under the pointer. One idea used
 * twice reads as a language; two different ideas read as decoration.
 */
export default function Interior() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  /* a long, slow push in — the frame is never quite still, but never busy */
  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1.02]);
  const y = useTransform(scrollYProgress, [0, 1], ['-3.5%', '3.5%']);
  /* the writing rides ahead of the photograph, as it does in the hero */
  const copyY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const spec = [
    [`${P.size}`, 'm² built'],
    [P.plot ? `${P.plot}` : P.floor, P.plot ? 'm² plot' : 'floor'],
    [`${P.year}`, 'built'],
    [`${P.beds}`, 'bedrooms'],
  ];

  return (
    <section ref={ref} className="feature">
      <motion.div className="feature-frame" style={{ scale, y }}>
        <Slats
          src={U(P.cover, 2600, 82)}
          alt={`${P.title}, ${P.hood}`}
          count={6}
          delay={0}
          stagger={0.07}
          duration={1.35}
          inView
        />
      </motion.div>

      <div className="feature-veil" aria-hidden />

      <motion.div className="shell feature-copy" style={{ y: copyY }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <p className="eyebrow eyebrow--tick" style={{ color: 'rgba(246,244,239,.72)' }}>
            {P.hood} · Nº {P.ref}
          </p>
          <h2 className="display d-lg" style={{ marginTop: 20, maxWidth: '13ch' }}>{P.title}</h2>
          <p className="lead" style={{ marginTop: 18, maxWidth: '32ch', color: 'rgba(246,244,239,.8)' }}>
            {P.lede}
          </p>

          <ul className="feature-spec">
            {spec.map(([n, l]) => (
              <li key={l}>
                <span className="num">{n}</span>
                <em>{l}</em>
              </li>
            ))}
          </ul>

          <p className="num" style={{ marginTop: 24, fontSize: 15, letterSpacing: '.04em' }}>
            {fmtPrice(P.price)}
          </p>
          <Magnetic style={{ marginTop: 32 }}>
            <Link to={`/property/${P.slug}`} className="btn btn--light">Open the file</Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      <p className="feature-note meta">Photography placeholder</p>
    </section>
  );
}
