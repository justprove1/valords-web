import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { EASE_CINE } from './anim';

/**
 * A photograph — or a row of them — that arrives in vertical bands.
 *
 * Two modes:
 *
 *   src   one picture cut into bands that reassemble into a single frame.
 *         Registration is exact: each band holds an image n times its own
 *         width, shifted left by its index, and the bands carry no horizontal
 *         margin, because any margin would shift every band's picture.
 *
 *   srcs  a different picture per band — a row of addresses standing side by
 *         side. Here the bands are free to drift against each other on scroll,
 *         since there is no single frame left to keep registered.
 *
 * `wash` is what holds the second mode together. Photographs from different
 * shoots never share a palette, and a strip of them reads as a contact sheet.
 * A layer blended on `color` keeps each picture's luminance but imposes one
 * hue over all of them, so the row reads as a single art-directed composition
 * instead of a pile of stock. It is the one idea borrowed from the reference,
 * and it is doing the real work.
 *
 * `inView` watches the container, never the bands: a band starts translated
 * clear of its own clipping parent, so observing the bands themselves would
 * mean waiting for something that has hidden itself out of view.
 */
export default function Slats({
  src,
  srcs,
  alt = '',
  count = 7,
  delay = 0.2,
  stagger = 0.075,
  duration = 1.5,
  fromRight = false,
  inView = false,
  wash = false,
  drift = 0,
  className = '',
  style,
}) {
  const host = useRef(null);
  const seen = useInView(host, { once: true, margin: '-12% 0px' });
  const show = inView ? seen : true;

  const pictures = srcs && srcs.length ? srcs : null;
  const n = pictures ? pictures.length : count;
  const bands = Array.from({ length: n }, (_, i) => i);
  const order = fromRight ? [...bands].reverse() : bands;

  /* alternating rates, strongest at the edges and quiet in the middle, so the
     row breathes without the centre — where the title sits — ever moving much */
  const { scrollYProgress } = useScroll({ target: host, offset: ['start end', 'end start'] });
  const rate = (i) => {
    if (!drift || !pictures) return 0;
    const mid = (n - 1) / 2;
    return ((i - mid) / mid) * drift * (i % 2 ? -1 : 1);
  };

  return (
    <div ref={host} className={`slats ${className}`} style={style} aria-hidden={alt ? undefined : true}>
      {bands.map((i) => (
        <Band
          key={i}
          i={i}
          n={n}
          src={pictures ? pictures[i] : src}
          alt={i === 0 ? alt : ''}
          single={!pictures}
          show={show}
          scrollYProgress={scrollYProgress}
          rate={rate(i)}
          transition={{ duration, ease: EASE_CINE, delay: delay + order.indexOf(i) * stagger }}
        />
      ))}
      {wash && <span className="slats-wash" aria-hidden />}
    </div>
  );
}

function Band({ i, n, src, alt, single, show, scrollYProgress, rate, transition }) {
  const dy = useTransform(scrollYProgress, [0, 1], [rate, -rate]);

  return (
    <motion.div className="slat" style={{ '--i': i, '--n': n, y: dy }}>
      <motion.div
        className="slat-inner"
        initial={{ y: '104%' }}
        animate={{ y: show ? 0 : '104%' }}
        transition={transition}
      >
        <img className={single ? 'slat-img--single' : 'slat-img--own'} src={src} alt={alt} draggable="false" />
      </motion.div>
    </motion.div>
  );
}
