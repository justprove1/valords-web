import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { useExpand } from '../lib/Transition';
import { PROPERTIES, fmtPrice } from '../data/properties';
import { U } from '../data/images';
import { EASE } from '../lib/anim';
import { Lines } from '../components/Reveal';
import { useI18n } from '../i18n';

/**
 * The reel: vertical scroll drives the row sideways, and the row leans into the
 * movement. The travel distance is measured from the real track width, so it
 * lands flush at both ends whatever the viewport.
 */
export default function Reel() {
  const { t, lang } = useI18n();
  const section = useRef(null);
  const track = useRef(null);
  const [travel, setTravel] = useState(0);
  const [vh, setVh] = useState(0);
  const { expand } = useExpand();

  useEffect(() => {
    const measure = () => {
      const t = track.current;
      if (!t) return;
      setTravel(Math.max(0, t.scrollWidth - window.innerWidth));
      setVh(window.innerHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    const id = setTimeout(measure, 800); // once the photographs have laid out
    return () => { window.removeEventListener('resize', measure); clearTimeout(id); };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const smoothX = useSpring(x, { stiffness: 120, damping: 26, mass: 0.4 });
  const velocity = useVelocity(smoothX);
  const skew = useTransform(velocity, [-2200, 0, 2200], [-4.5, 0, 4.5], { clamp: true });
  const smoothSkew = useSpring(skew, { stiffness: 180, damping: 24 });

  return (
    <section
      ref={section}
      className="reel"
      /* sideways travel runs at ~1.6x the vertical scroll that drives it */
      style={{ height: vh ? `${Math.round(travel / 1.6 + vh)}px` : '160vh', position: 'relative' }}
      id="reel"
    >
      <div style={{ position: 'sticky', top: 0, height: '100svh', display: 'grid', alignContent: 'center', overflow: 'hidden' }}>
        <div className="shell" style={{ marginBottom: 'clamp(26px,4vh,54px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <h2 className="display d-md" style={{ maxWidth: '14ch' }}>
            <Lines lines={[t('reel.l1'), t('reel.l2')]} />
          </h2>
          <p className="meta eyebrow--tick">Keep scrolling</p>
        </div>

        <motion.div ref={track} className="reel-track" style={{ x: smoothX, skewX: smoothSkew }}>
          {PROPERTIES.map((p, i) => (
            <ReelItem key={p.slug} p={p} i={i} expand={expand} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ReelItem({ p, i, expand }) {
  const { lang } = useI18n();
  const img = useRef(null);
  return (
    <article className="reel-item" style={{ marginTop: i % 2 ? 'clamp(20px,5vh,64px)' : 0 }}>
      <button
        data-cursor="Open"
        onClick={() => expand(img.current, U(p.cover, 2200), `/property/${p.slug}`)}
        style={{ display: 'block', width: '100%', textAlign: 'left' }}
      >
        <div ref={img} className="reel-img">
          <motion.img
            src={U(p.cover, 1200, 70)}
            alt={p.title}
            loading="lazy"
            className="img-cover"
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 1.2, ease: EASE }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginTop: 16, alignItems: 'baseline' }}>
          <p className="meta" style={{ margin: 0 }}>{p.hood}</p>
          <p className="meta num" style={{ margin: 0, color: 'var(--brass-lo)' }}>Nº {p.ref}</p>
        </div>
        <p className="num" style={{ marginTop: 6, fontSize: 15 }}>{fmtPrice(p.price, lang)}</p>
      </button>
    </article>
  );
}
