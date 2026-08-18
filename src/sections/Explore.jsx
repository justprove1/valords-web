import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NEIGHBOURHOODS, PROPERTIES } from '../data/properties';
import { U } from '../data/images';
import { EASE } from '../lib/anim';

const N = NEIGHBOURHOODS.length;
/* one screen to settle, then a little over half a screen per neighbourhood */
const SPAN = 62;

/**
 * The six neighbourhoods, read by scrolling rather than by pointing.
 *
 * The section pins for its whole height and the scroll progress picks the
 * active one, so the visitor moves through the city at the pace of the page —
 * no hover, no clicking to look. The links still work; they just no longer
 * decide what is on screen.
 */
export default function Explore() {
  const outer = useRef(null);
  const [i, setI] = useState(0);

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] });

  /* the rail glides on a spring; the index does NOT. Driving the index off the
     spring meant a jumped scroll — an anchor, a restored position — would walk
     the spring through every intermediate value and crossfade all six
     photographs in sequence on the way. Read straight from the progress and a
     jump lands on the right neighbourhood at once. */
  const eased = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 });
  const barScale = useTransform(eased, [0, 1], [1 / N, 1]);

  useEffect(() => {
    const pick = (p) => {
      const next = Math.min(N - 1, Math.max(0, Math.floor(p * N * 0.999)));
      setI((prev) => (prev === next ? prev : next));
    };
    pick(scrollYProgress.get());
    return scrollYProgress.on('change', pick);
  }, [scrollYProgress]);

  const active = NEIGHBOURHOODS[i];
  const count = (slug) => PROPERTIES.filter((p) => p.hoodSlug === slug).length;

  return (
    <section
      id="explore"
      ref={outer}
      style={{ position: 'relative', height: `calc(100svh + ${(N - 1) * SPAN}svh)`, background: 'var(--deep)' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center', color: 'var(--paper)' }}>
        <AnimatePresence>
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, scale: 1.09 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.15, ease: EASE }, scale: { duration: 2.8, ease: EASE } }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img src={U(active.image, 2200, 72)} alt={active.name} className="img-cover" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(8,14,11,.92) 0%, rgba(8,14,11,.74) 42%, rgba(8,14,11,.56) 72%, rgba(8,14,11,.72) 100%)' }} />
          </motion.div>
        </AnimatePresence>

        {/* how far through the six we are */}
        <div className="explore-rail" aria-hidden>
          <motion.i style={{ scaleY: barScale }} />
        </div>

        <div className="shell explore-grid" style={{ position: 'relative', width: '100%' }}>
          <div>
            <p className="eyebrow eyebrow--tick" style={{ color: 'rgba(246,244,239,.6)' }}>
              Explore Barcelona
              <span className="num" style={{ marginLeft: 16, color: 'var(--brass-hi)' }}>
                {String(i + 1).padStart(2, '0')}/{String(N).padStart(2, '0')}
              </span>
            </p>

            <ul style={{ listStyle: 'none', margin: '34px 0 0', padding: 0 }}>
              {NEIGHBOURHOODS.map((n, k) => {
                const on = i === k;
                return (
                  <li key={n.slug} style={{ borderTop: '1px solid rgba(246,244,239,.16)', borderBottom: k === N - 1 ? '1px solid rgba(246,244,239,.16)' : 'none' }}>
                    <Link
                      to={`/collection?hood=${n.slug}`}
                      data-cursor="Enter"
                      style={{ display: 'flex', alignItems: 'baseline', gap: 18, paddingBlock: 'clamp(14px,2.1vh,26px)' }}
                    >
                      <motion.span
                        className="meta num"
                        animate={{ color: on ? 'rgb(235,210,160)' : 'rgba(246,244,239,.4)' }}
                        transition={{ duration: 0.7, ease: EASE }}
                        style={{ minWidth: 34 }}
                      >
                        0{k + 1}
                      </motion.span>
                      <motion.span
                        className="display d-md"
                        animate={{ x: on ? 18 : 0, opacity: on ? 1 : 0.38 }}
                        transition={{ duration: 0.9, ease: EASE }}
                        style={{ display: 'block' }}
                      >
                        {n.name}
                      </motion.span>
                      <motion.span
                        className="meta num hood-count"
                        animate={{ opacity: on ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        style={{ color: 'rgba(246,244,239,.6)', marginLeft: 'auto' }}
                      >
                        {count(n.slug)} homes
                      </motion.span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="explore-note">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.75, ease: EASE }}
              >
                <p className="display d-sm italic" style={{ marginBottom: 16 }}>{active.sub}</p>
                <p className="lead" style={{ color: 'rgba(246,244,239,.76)', maxWidth: '34ch' }}>{active.note}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
