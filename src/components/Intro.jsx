import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE, EASE_CINE } from '../lib/anim';

const WORD = 'VALORDS'.split('');
const KEY = 'valords:introduced';

/**
 * The curtain. Shown once per browser session — a returning visitor clicking
 * through the site should never sit through it twice.
 */
export default function Intro() {
  const [on, setOn] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return sessionStorage.getItem(KEY) !== '1';
  });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!on) return;
    document.documentElement.style.overflow = 'hidden';
    const start = performance.now();
    const dur = 1900;
    let raf = requestAnimationFrame(function tick(now) {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    });
    const done = setTimeout(() => {
      sessionStorage.setItem(KEY, '1');
      setOn(false);
    }, dur + 260);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
      document.documentElement.style.overflow = '';
    };
  }, [on]);

  return (
    <AnimatePresence>
      {on && (
        <motion.div
          className="intro"
          exit={{ y: '-100%', transition: { duration: 1.1, ease: EASE_CINE } }}
        >
          <p className="intro-word">
            {WORD.map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: '108%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.05 * i }}
              >
                {c}
              </motion.span>
            ))}
          </p>

          <div className="intro-bar">
            <motion.i
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.9, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          <p className="intro-count">
            {String(n).padStart(3, '0')} — BARCELONA
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
