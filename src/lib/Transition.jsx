import { createContext, useCallback, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { scrollTop } from './smooth';

const Ctx = createContext({ expand: () => {} });
export const useExpand = () => useContext(Ctx);

/**
 * Cinematic "the picture becomes the page" transition.
 * The clicked image is cloned into a fixed overlay, flown from its rect to
 * fullscreen, and only then does the route change underneath it.
 */
export function TransitionProvider({ children }) {
  const [fly, setFly] = useState(null);
  const navigate = useNavigate();

  const expand = useCallback(
    (el, src, to) => {
      if (!el) return navigate(to);
      const r = el.getBoundingClientRect();
      setFly({ src, to, r, phase: 'grow' });
    },
    [navigate]
  );

  const onGrown = () => {
    if (!fly) return;
    scrollTop(true);
    navigate(fly.to);
    // hold one beat on the full-bleed image, then dissolve into the page
    setTimeout(() => setFly((f) => (f ? { ...f, phase: 'out' } : null)), 90);
  };

  return (
    <Ctx.Provider value={{ expand }}>
      {children}
      <AnimatePresence>
        {fly && (
          <motion.div
            key="fly"
            style={{ position: 'fixed', zIndex: 8000, overflow: 'hidden', background: 'var(--paper-3)' }}
            initial={{ top: fly.r.top, left: fly.r.left, width: fly.r.width, height: fly.r.height }}
            animate={{ top: 0, left: 0, width: '100vw', height: '100vh' }}
            exit={{ opacity: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }}
            transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={(def) => {
              if (def && def.width === '100vw' && fly.phase === 'grow') onGrown();
            }}
          >
            <motion.img
              src={fly.src}
              alt=""
              className="img-cover"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {fly && fly.phase === 'out' && <Cleanup onDone={() => setFly(null)} />}
    </Ctx.Provider>
  );
}

function Cleanup({ onDone }) {
  setTimeout(onDone, 0);
  return null;
}
