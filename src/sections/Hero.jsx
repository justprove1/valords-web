import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { U, IMG } from '../data/images';
import { EASE, EASE_CINE } from '../lib/anim';
import ShaderImage from '../lib/ShaderImage';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.5]);
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} style={{ height: '100svh', position: 'relative', overflow: 'hidden', background: 'var(--deep)' }}>
      <motion.div style={{ position: 'absolute', inset: 0, scale, y }}>
        {/* the photograph is live: light gathers under the pointer and it drifts on its own */}
        <ShaderImage
          src={U(IMG.bcnAerial, 2600, 76)}
          alt="The Eixample from above"
          amp={1}
          style={{ position: 'absolute', inset: 0 }}
        />
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, background: 'linear-gradient(94deg, rgba(8,14,11,.8) 0%, rgba(8,14,11,.5) 38%, rgba(8,14,11,.1) 72%, rgba(8,14,11,.36) 100%)' }} />
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,14,11,.44) 0%, rgba(8,14,11,0) 26%, rgba(8,14,11,0) 60%, rgba(8,14,11,.56) 100%)' }} />
        <motion.div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, background: 'var(--deep)', opacity: dim }} />
      </motion.div>

      <motion.div
        style={{ position: 'relative', height: '100%', display: 'grid', alignContent: 'center', color: 'var(--paper)', opacity: fade, pointerEvents: 'none' }}
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

        <span className="mask">
          <motion.span
            className="display d-xl foil"
            style={{ display: 'block', letterSpacing: '.02em' }}
            initial={{ y: '112%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.6, ease: EASE_CINE, delay: 0.35 }}
          >
            VALORDS
          </motion.span>
        </span>
        <span className="mask" style={{ marginTop: 4 }}>
          <motion.span
            className="display d-md italic"
            style={{ display: 'block', color: 'rgba(246,244,239,.88)' }}
            initial={{ y: '112%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.6, ease: EASE_CINE, delay: 0.52 }}
          >
            Barcelona
          </motion.span>
        </span>
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
        style={{ position: 'absolute', left: 0, right: 0, bottom: 34, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', color: 'rgba(246,244,239,.72)', opacity: fade, pointerEvents: 'none' }}
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
