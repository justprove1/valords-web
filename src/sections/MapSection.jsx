import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NEIGHBOURHOODS, PROPERTIES } from '../data/properties';
import { U } from '../data/images';
import { EASE } from '../lib/anim';
import { Lines } from '../components/Reveal';
import Magnetic from '../components/Magnetic';
import { useT } from '../i18n';
import {
  W, H, GRID_ANGLE, KM, COAST, RIDGE, STREETS, LANDMARKS, EIXAMPLE, ZONES,
  path, pt, zoneOf,
} from '../lib/barcelona';

/* Every line here is projected from real coordinates; see lib/barcelona.js for
   where each one comes from and what was wrong with the previous drawing. */

const SEA = `${path(COAST)} L${W},${H} L${COAST[0][0]},${H} Z`;
const RIDGE_BAND = `${path(RIDGE)} L${W},0 L0,0 Z`;

export default function MapSection() {
  const t = useT();
  const [active, setActive] = useState('turo-park');
  const hood = NEIGHBOURHOODS.find((n) => n.slug === active) ?? NEIGHBOURHOODS[0];
  const homes = PROPERTIES.filter((p) => p.hoodSlug === active);
  const zone = zoneOf(active);

  return (
    <section id="map" className="map-wrap section">
      <div className="shell">
        <header style={{ marginBottom: 'clamp(40px,6vh,80px)' }}>
          <p className="eyebrow eyebrow--tick" style={{ color: 'rgba(246,244,239,.62)' }}>{t('map.eyebrow')}</p>
          <h2 className="display d-lg" style={{ marginTop: 22, maxWidth: '16ch' }}>
            <Lines lines={[t('map.l1'), t('map.l2')]} />
          </h2>
        </header>

        <div className="map-grid">
          <div>
            <svg className="map-svg" viewBox={`0 0 ${W} ${H}`} role="img"
              aria-label="Map of Barcelona showing the six neighbourhoods">
              <defs>
                {/* Cerdà's blocks at their measured angle, clipped to the real
                    extent of the Eixample rather than a rectangle on top of it */}
                <pattern id="eix" width="21" height="21" patternUnits="userSpaceOnUse"
                  patternTransform={`rotate(${GRID_ANGLE})`}>
                  <path d="M0,0 H21 M0,0 V21" stroke="rgba(246,244,239,.17)" strokeWidth=".7" fill="none" />
                </pattern>
                <clipPath id="eixClip"><polygon points={EIXAMPLE.map((p) => p.join(',')).join(' ')} /></clipPath>
                <linearGradient id="seaFade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#B08D57" stopOpacity=".18" />
                  <stop offset="1" stopColor="#B08D57" stopOpacity=".02" />
                </linearGradient>
                <linearGradient id="ridgeFade" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" stopColor="#F6F4EF" stopOpacity="0" />
                  <stop offset="1" stopColor="#F6F4EF" stopOpacity=".07" />
                </linearGradient>
                <radialGradient id="zoneFill">
                  <stop offset="0" stopColor="#E8CF9A" stopOpacity=".30" />
                  <stop offset="1" stopColor="#E8CF9A" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Collserola behind everything, as ground rather than a line */}
              <path d={RIDGE_BAND} fill="url(#ridgeFade)" />
              <motion.path
                d={path(RIDGE)} className="map-ridge" strokeDasharray="3 6"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                viewport={{ once: true }} transition={{ duration: 2.2, ease: EASE, delay: 0.1 }}
              />

              {/* the Mediterranean */}
              <motion.path
                d={SEA} fill="url(#seaFade)" stroke="none"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 1.6, ease: EASE }}
              />
              <motion.path
                d={path(COAST)} className="map-coastline"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                viewport={{ once: true }} transition={{ duration: 2, ease: EASE }}
              />

              <g clipPath="url(#eixClip)">
                <motion.rect
                  x="0" y="0" width={W} height={H} fill="url(#eix)"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
                />
              </g>

              {STREETS.map((s, i) => (
                <motion.path
                  key={s.id} d={path(s.pts)} className="map-street" strokeWidth={s.w}
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: EASE, delay: 0.3 + i * 0.09 }}
                />
              ))}

              {/* The working territory of whichever address is selected. One
                  ellipse that travels between neighbourhoods rather than a pair
                  crossfading: two overlapping highlights read as a smudge, and
                  a territory that glides reads as the map explaining itself. */}
              {zone && (
                <motion.ellipse
                  fill="url(#zoneFill)" stroke="rgba(232,207,154,.42)" strokeWidth="1"
                  initial={false}
                  animate={{ cx: zone.x, cy: zone.y, rx: zone.rx, ry: zone.ry }}
                  transition={{ duration: 0.85, ease: EASE }}
                />
              )}

              {LANDMARKS.map((l, i) => (
                <motion.g key={l.id} className="map-mark"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.9 + i * 0.07 }}>
                  {l.peak ? (
                    <path d={`M${l.at[0] - 7},${l.at[1] + 5} L${l.at[0]},${l.at[1] - 6} L${l.at[0] + 7},${l.at[1] + 5} Z`} />
                  ) : (
                    <circle cx={l.at[0]} cy={l.at[1]} r="2.4" />
                  )}
                  <text x={l.at[0] + 11} y={l.at[1] + 4}>{l.label}</text>
                </motion.g>
              ))}

              <text className="map-legend" x="18" y={H - 96}>COLLSEROLA</text>
              <text className="map-legend map-legend--sea" x={W - 18} y={H - 26} textAnchor="end">MEDITERRANI</text>

              {/* one kilometre, so the drawing can actually be read as a map */}
              <g className="map-scale" transform={`translate(18,${H - 30})`}>
                <path d={`M0,0 H${KM} M0,-4 V4 M${KM},-4 V4`} />
                <text x={KM / 2} y="16" textAnchor="middle">1 KM</text>
              </g>

              {NEIGHBOURHOODS.map((n, i) => {
                const [x, y] = pt(ZONES[n.slug]?.at ?? [41.39, 2.15]);
                const on = n.slug === active;
                const flip = x > W * 0.7;
                return (
                  <g
                    key={n.slug}
                    className="map-pin"
                    data-on={on}
                    onMouseEnter={() => setActive(n.slug)}
                    onFocus={() => setActive(n.slug)}
                    tabIndex={0}
                    role="button"
                    aria-label={n.name}
                  >
                    {on && (
                      <motion.circle
                        className="halo" cx={x} cy={y} r={9}
                        initial={{ r: 9, opacity: 0.7 }}
                        animate={{ r: [9, 40], opacity: [0.7, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                    <motion.circle
                      className="dot" cx={x} cy={y} r={3.5}
                      initial={false} animate={{ r: on ? 6.5 : 3.5 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                    <circle cx={x} cy={y} r={30} fill="transparent" />
                    <text x={flip ? x - 15 : x + 15} y={y + 5} textAnchor={flip ? 'end' : 'start'}>
                      {n.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <aside className="map-aside">
            <div className="map-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={hood.slug}
                  src={U(hood.image, 1100, 72)}
                  alt={hood.name}
                  className="img-cover"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ opacity: { duration: 0.7, ease: EASE }, scale: { duration: 1.8, ease: EASE } }}
                  style={{ position: 'absolute', inset: 0 }}
                />
              </AnimatePresence>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(11,19,16,.1),rgba(11,19,16,.82))' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 26 }}>
                <p className="meta num" style={{ color: 'var(--brass-hi)' }}>{homes.length} {t('map.homes')}</p>
                <h3 className="display d-sm" style={{ marginTop: 8 }}>{hood.name}</h3>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={hood.slug}
                className="lead"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: EASE }}
                style={{ marginTop: 24, color: 'rgba(246,244,239,.74)' }}
              >
                {hood.note}
              </motion.p>
            </AnimatePresence>

            <Magnetic style={{ marginTop: 28 }}>
              <Link to={`/collection?hood=${hood.slug}`} className="btn btn--light">
                {t('map.see')} {hood.name}
              </Link>
            </Magnetic>
          </aside>
        </div>
      </div>
    </section>
  );
}
