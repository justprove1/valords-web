import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { U, IMG } from '../data/images';
import { Lines } from '../components/Reveal';

/**
 * The cinematic passage: the city closes in, becomes a framed image,
 * and the writing steps forward. Scroll-driven, nothing auto-plays.
 */
export default function Passage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const [maxInset, setMaxInset] = useState('13%');
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)');
    const sync = () => setMaxInset(mq.matches ? '4%' : '13%');
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const inset = useTransform(scrollYProgress, [0, 0.5], ['0%', maxInset]);
  const clip = useTransform(inset, (v) => `inset(${v} ${v} ${v} ${v})`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.28, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.8], [70, -70]);
  const veil = useTransform(scrollYProgress, [0.15, 0.6], [0.55, 0.2]);

  return (
    <section id="passage" ref={ref} style={{ position: 'relative', background: 'var(--paper)' }}>
      <div style={{ height: '190vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden' }}>
          <motion.div style={{ position: 'absolute', inset: 0, clipPath: clip }}>
            <motion.img src={U(IMG.bcnHill, 2400, 74)} alt="Above Sarrià" className="img-cover" style={{ scale }} />
            <motion.div style={{ position: 'absolute', inset: 0, background: 'var(--deep)', opacity: veil }} />
          </motion.div>

          <motion.div
            className="shell"
            style={{ position: 'relative', height: '100%', display: 'grid', alignContent: 'center', justifyItems: 'center', textAlign: 'center', color: 'var(--paper)', y: textY }}
          >
            <p className="eyebrow" style={{ color: 'rgba(246,244,239,.7)' }}>Barcelona</p>
            <h2 className="display d-lg" style={{ marginTop: 22, maxWidth: '15ch' }}>
              <Lines lines={['Six neighbourhoods.', 'One city that keeps', 'its best addresses quiet.']} />
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
