import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { U, IMG } from '../data/images';
import { EASE, EASE_CINE } from '../lib/anim';
import Slats from '../lib/Slats';
import Chars from '../components/Chars';

/* Read left to right: the grid from above, then the architecture that fills it,
   then the light inside it. Ordered so the tonal weight sits at the edges and
   the quietest frames fall behind the title. */
const HERO_BANDS = [
  IMG.lines, IMG.bcnAerial, IMG.facadeWhite, IMG.minimal,
  IMG.glass1, IMG.bcnGaudi, IMG.stair,
];

export default function Hero() {
  const ref = useRef(null);
  /* Once the section is pinned its own rect stops moving, so an element-based
     measurement would freeze at zero and the three planes would never travel.
     The hero sits at the top of the document, so window scroll over one
     viewport height is the same range, and it keeps working while pinned. */
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(0);
  useEffect(() => {
    const sync = () => setVh(window.innerHeight);
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);
  const span = vh || 1;
  const scrollYProgress = useTransform(scrollY, [0, span], [0, 1], { clamp: true });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.5]);
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  /* three planes at three speeds: the photograph lags behind the scroll, the
     title runs ahead of it, the footing runs ahead a little less. Depth comes
     from the difference between them, not from the movement itself. */
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const footY = useTransform(scrollYProgress, [0, 1], [0, -54]);

  return (
    <section ref={ref} className="hero" style={{ height: '100svh', overflow: 'hidden', background: 'var(--deep)' }}>
      <motion.div style={{ position: 'absolute', inset: 0, scale, y }}>
        {/* Seven views of the upper city standing side by side, held together by
            a single wash — one composition, not a strip of stock. */}
        <Slats
          srcs={HERO_BANDS.map((id) => U(id, 1400, 76))}
          alt="Barcelona — the upper city"
          delay={0.15}
          stagger={0.085}
          duration={1.6}
          drift={26}
          wash
        />
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, background: 'linear-gradient(94deg, rgba(8,14,11,.8) 0%, rgba(8,14,11,.5) 38%, rgba(8,14,11,.1) 72%, rgba(8,14,11,.36) 100%)' }} />
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,14,11,.44) 0%, rgba(8,14,11,0) 26%, rgba(8,14,11,0) 60%, rgba(8,14,11,.56) 100%)' }} />
        <motion.div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, background: 'var(--deep)', opacity: dim }} />
      </motion.div>

      <motion.div
        style={{ position: 'relative', height: '100%', display: 'grid', alignContent: 'center', color: 'var(--paper)', opacity: fade, y: titleY, pointerEvents: 'none' }}
        className="shell"
      >
        <motion.p
          className="eyebrow eyebrow--tick"
          style={{ color: 'rgba(246,244,239,.7)', marginBottom: 26 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.9 }}
        >
          Remarkable realty · Est. 2016
        </motion.p>

        <Chars
          text="VALORDS"
          className="display d-xl"
          style={{ letterSpacing: '.02em' }}
          foil
          delay={0.35}
          stagger={0.045}
          duration={1.4}
        />
        <Chars
          text="Barcelona"
          className="display d-md italic"
          style={{ marginTop: 4, color: 'rgba(246,244,239,.88)' }}
          delay={0.62}
          stagger={0.035}
          duration={1.3}
        />
        <motion.p
          className="lead"
          style={{ color: 'rgba(246,244,239,.88)', marginTop: 30, maxWidth: '30ch' }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 1.1 }}
        >
          Exceptional homes.<br />Exceptional places.
        </motion.p>
      </motion.div>

      <motion.div
        className="shell"
        style={{ position: 'absolute', left: 0, right: 0, bottom: 34, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', color: 'rgba(246,244,239,.72)', opacity: fade, y: footY, pointerEvents: 'none' }}
      >
        <p className="meta" style={{ color: 'inherit', margin: 0 }}>Office · 41.3940° N · 2.1400° E — Turó Park</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="meta" style={{ color: 'inherit' }}>Scroll</span>
          <motion.span
            style={{ width: 1, height: 46, background: 'var(--brass)', transformOrigin: 'top' }}
            animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
