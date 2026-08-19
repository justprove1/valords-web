import { useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useExpand } from '../lib/Transition';
import { U } from '../data/images';
import { fmtPrice } from '../data/properties';
import { EASE } from '../lib/anim';
import { useI18n } from '../i18n';

/**
 * The card leans towards the pointer, catches a soft highlight, and swaps to a
 * second photograph on hover — so a grid of them never reads as flat stock.
 */
export default function PropertyCard({ p, index, ratio = '4 / 5', parallax = 40 }) {
  const { t, lang } = useI18n();
  const box = useRef(null);
  const img = useRef(null);
  const { expand } = useExpand();
  const [over, setOver] = useState(false);

  const { scrollYProgress } = useScroll({ target: box, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });

  const tilt = (e) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    ry.set(nx * 9);
    rx.set(-ny * 7);
    box.current.style.setProperty('--mx', `${(nx + 0.5) * 100}%`);
    box.current.style.setProperty('--my', `${(ny + 0.5) * 100}%`);
  };
  const rest = () => { rx.set(0); ry.set(0); setOver(false); };

  const second = p.images?.[1] ?? p.cover;

  return (
    <motion.article
      ref={box}
      className="tilt"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 1, ease: EASE, delay: (index % 3) * 0.07 }}
      onPointerMove={tilt}
      onPointerEnter={() => setOver(true)}
      onPointerLeave={rest}
      style={{ perspective: 1000 }}
    >
      <button
        data-cursor="View"
        onClick={() => expand(img.current, U(p.cover, 2200), `/property/${p.slug}`)}
        style={{ display: 'block', width: '100%', textAlign: 'left' }}
      >
        <motion.div
          className="tilt-inner"
          style={{ rotateX: srx, rotateY: sry, position: 'relative', overflow: 'hidden', aspectRatio: ratio, background: 'var(--paper-3)' }}
        >
          <div ref={img} style={{ position: 'absolute', inset: 0 }}>
            <motion.img
              src={U(p.cover, 1400)}
              alt={p.title}
              loading="lazy"
              className="img-cover"
              style={{ y, scale: 1.14 }}
              animate={{ scale: over ? 1.2 : 1.14 }}
              transition={{ duration: 1.4, ease: EASE }}
            />
            <motion.img
              src={U(second, 1400)}
              alt=""
              aria-hidden
              loading="lazy"
              className="img-cover"
              style={{ position: 'absolute', inset: 0, y }}
              initial={false}
              animate={{ opacity: over ? 1 : 0, scale: over ? 1.06 : 1.16 }}
              transition={{ opacity: { duration: 0.7, ease: EASE }, scale: { duration: 1.6, ease: EASE } }}
            />
          </div>
          <span className="tilt-sheen" />
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, marginTop: 20, alignItems: 'baseline' }}>
          <div>
            <p className="meta" style={{ margin: 0 }}>{p.hood}</p>
            <h3 className="display d-sm" style={{ marginTop: 6 }}>{p.title}</h3>
          </div>
          <p className="num" style={{ margin: 0, fontSize: 15, whiteSpace: 'nowrap' }}>{fmtPrice(p.price, lang)}</p>
        </div>
        <p className="meta num" style={{ marginTop: 10, fontSize: 11 }}>
          {p.size} m² · {p.beds} {t('feature.beds')} · {p.baths} {t('feature.baths')}
        </p>
      </button>
    </motion.article>
  );
}
