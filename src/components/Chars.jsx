import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { EASE_CINE } from '../lib/anim';

/**
 * Type that arrives letter by letter.
 *
 * Every character sits in its own overflow box and rises from beneath it, so
 * the line assembles rather than fades. The stagger is small on purpose — at
 * 40ms the eye reads one gesture travelling across the word; at 120ms it
 * starts counting letters, which looks like a toy.
 *
 * `foil` exists because the brass gradient cannot survive the split on its
 * own: `background-clip:text` clips a gradient against the text of the element
 * that carries it, and once every letter is a transformed child there is no
 * text left on the parent to clip against — the word vanishes. So each letter
 * paints the gradient itself, sized to the whole word and shifted back by that
 * letter's own offset, which reassembles one continuous sweep instead of
 * restarting the brass in every character. The offsets are measured after
 * layout, and again when fonts land or the box resizes, because they are
 * pixel positions and nothing in CSS knows them ahead of time.
 *
 * The whole string is exposed once on the wrapper for assistive technology and
 * every fragment is hidden from it, or the word is announced one letter at a
 * time. Spaces get their own non-animating box so word gaps survive the split.
 */
export default function Chars({
  text,
  className = '',
  style,
  delay = 0,
  stagger = 0.04,
  duration = 1.3,
  from = '112%',
  foil = false,
}) {
  const wrap = useRef(null);

  useLayoutEffect(() => {
    if (!foil) return undefined;
    const el = wrap.current;
    if (!el) return undefined;

    const sync = () => {
      const w = el.getBoundingClientRect().width;
      if (!w) return;
      el.style.setProperty('--foil-w', `${w}px`);
      el.querySelectorAll('.char-mask').forEach((m) => {
        m.style.setProperty('--char-x', `${m.offsetLeft}px`);
      });
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    /* the serif is a web font: its metrics — and so every offset — change the
       moment it swaps in */
    if (document.fonts?.ready) document.fonts.ready.then(sync).catch(() => {});
    return () => ro.disconnect();
  }, [foil, text]);

  return (
    <span
      ref={wrap}
      className={`chars ${foil ? 'chars--foil' : ''} ${className}`}
      style={style}
      aria-label={text}
      role="text"
    >
      {[...text].map((c, i) =>
        c === ' ' ? (
          <span key={i} className="char-space" aria-hidden>&nbsp;</span>
        ) : (
          <span key={i} className="char-mask" aria-hidden>
            <motion.span
              className="char"
              initial={{ y: from }}
              animate={{ y: 0 }}
              transition={{ duration, ease: EASE_CINE, delay: delay + i * stagger }}
            >
              {c}
            </motion.span>
          </span>
        )
      )}
    </span>
  );
}
