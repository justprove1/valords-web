import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Pulls its child a little towards the pointer. Wraps rather than clones, so it
 * works with links, buttons and anything else without touching their markup.
 */
export default function Magnetic({ children, strength = 0.34, className = '', style }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const move = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.span
      ref={ref}
      className={`mag ${className}`}
      style={{ x: sx, y: sy, ...style }}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
