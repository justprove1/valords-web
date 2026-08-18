import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 340, damping: 34, mass: 0.35 });
  const ry = useSpring(y, { stiffness: 340, damping: 34, mass: 0.35 });
  const [label, setLabel] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target.closest('[data-cursor]');
      const link = e.target.closest('a,button,[role="button"],input,select');
      setLabel(t ? t.dataset.cursor : null);
      setOpen(Boolean(t || link));
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <>
      <motion.div className="cursor" style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }} />
      <motion.div
        className="cursor-ring"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: label ? 1.55 : open ? 0.92 : 0.55,
          opacity: open ? 1 : 0.35,
          backgroundColor: label ? 'rgba(176,141,87,1)' : 'rgba(176,141,87,0)',
          color: label ? '#0B1310' : 'rgba(176,141,87,0)',
          borderColor: label ? 'rgba(176,141,87,1)' : 'rgba(176,141,87,.5)',
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span style={{ transform: 'scale(.7)' }}>{label}</span>
      </motion.div>
    </>
  );
}
