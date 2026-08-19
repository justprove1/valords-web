import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE_CINE } from './anim';

/**
 * A photograph that arrives in vertical bands.
 *
 * Each band carries the whole picture, shifted left by its own index and
 * clipped, so together they reassemble one seamless frame — no seams, no
 * distortion, and it works at any aspect ratio because every band relies on
 * object-fit rather than a computed background size.
 *
 * The bands rise in sequence. Once they have landed the image is ordinary
 * again, which is the point: the movement is an entrance, not a permanent
 * effect sitting on top of the photograph.
 *
 * The rhythm is deliberate — the Eixample is a grid, Barcelona shutters are
 * slatted, and the reveal borrows from both rather than from a WebGL demo.
 *
 * `inView` watches the container, never the bands. A band starts translated
 * clear of its own clipping parent, so observing the bands themselves would
 * mean waiting for something that has hidden itself out of view — it never
 * arrives, and the picture stays blank.
 */
export default function Slats({
  src,
  alt = '',
  count = 7,
  delay = 0.2,
  stagger = 0.075,
  duration = 1.5,
  fromRight = false,
  inView = false,
  className = '',
  style,
}) {
  const host = useRef(null);
  const seen = useInView(host, { once: true, margin: '-12% 0px' });
  const show = inView ? seen : true;

  const bands = Array.from({ length: count }, (_, i) => i);
  const order = fromRight ? [...bands].reverse() : bands;

  return (
    <div ref={host} className={`slats ${className}`} style={style} aria-hidden={alt ? undefined : true}>
      {bands.map((i) => (
        <motion.div
          key={i}
          className="slat"
          style={{ '--i': i, '--n': count }}
          initial={{ y: '104%' }}
          animate={{ y: show ? 0 : '104%' }}
          transition={{ duration, ease: EASE_CINE, delay: delay + order.indexOf(i) * stagger }}
        >
          <img src={src} alt={i === 0 ? alt : ''} draggable="false" />
        </motion.div>
      ))}
    </div>
  );
}
