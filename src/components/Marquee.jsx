/**
 * Endless band of names. The track holds the list twice and slides exactly
 * half its width, so the seam never shows; hovering pauses it.
 */
export default function Marquee({ items, symbol = '✦', style }) {
  const run = [...items, ...items];
  return (
    <div className="marquee" style={style} aria-hidden>
      <div className="marquee-track">
        {run.map((t, i) => (
          <span className="marquee-item" key={i}>
            {t}
            <b>{symbol}</b>
          </span>
        ))}
      </div>
    </div>
  );
}
