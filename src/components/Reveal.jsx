import { motion } from 'framer-motion';
import { riseIn, fadeUp, VIEW } from '../lib/anim';

/**
 * Masked line-by-line text reveal.
 * The viewport observer lives on the *mask*, never on the moving child —
 * a child translated fully out of an overflow:hidden box never intersects,
 * so it would otherwise stay hidden for good.
 */
export function Lines({ lines, className = '', delay = 0 }) {
  return (
    <span className={className} style={{ display: 'block' }}>
      {lines.map((l, i) => (
        <motion.span
          className="mask"
          key={i}
          initial="hidden"
          whileInView="show"
          viewport={VIEW}
          custom={i + delay}
        >
          <motion.span variants={riseIn} custom={i + delay}>
            {l}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}

export function FadeUp({ children, i = 0, className = '', style }) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={fadeUp}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={VIEW}
    >
      {children}
    </motion.div>
  );
}

/** Image that reveals behind a sliding mask, then settles from a slight scale. */
export function RevealImage({ src, alt = '', className = '', style, ratio = '4 / 5', scale = 1.14 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEW}
      style={{ position: 'relative', overflow: 'hidden', aspectRatio: ratio, background: 'var(--paper-3)', ...style }}
    >
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        variants={{
          hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
          show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } },
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className="img-cover"
          variants={{
            hidden: { scale },
            show: { scale: 1, transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
      </motion.div>
    </motion.div>
  );
}
