import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { U, IMG } from '../data/images';
import { EASE } from '../lib/anim';

/**
 * The city seen through its own name: the photograph is clipped to the letters,
 * and drifts inside them as the section passes. Nothing but background-clip.
 */
export default function PhotoType() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const posY = useTransform(scrollYProgress, [0, 1], ['18%', '82%']);
  const letter = useTransform(scrollYProgress, [0, 1], ['-.02em', '.03em']);

  return (
    <section ref={ref} className="phototype">
      <motion.h2
        className="phototype-word"
        style={{
          backgroundImage: `url(${U(IMG.bcnGaudi, 2200, 74)})`,
          backgroundPositionY: posY,
          letterSpacing: letter,
        }}
      >
        BARCELONA
      </motion.h2>

      <motion.p
        className="lead phototype-foot"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        Twelve streets hold almost everything worth owning here. We work those twelve.
      </motion.p>
    </section>
  );
}
