import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NEIGHBOURHOODS, PROPERTIES } from '../data/properties';
import { U } from '../data/images';
import { EASE } from '../lib/anim';
import { Lines } from '../components/Reveal';
import Magnetic from '../components/Magnetic';
import { useT } from '../i18n';

/* A schematic of the city, not a survey: the sea, the ridge, the Diagonal and
   the six addresses, projected from their real coordinates so the relative
   positions are honest even though the drawing is deliberately spare. */

const W = 1000, H = 620;
const LNG0 = 2.075, LNG1 = 2.200;
const LAT0 = 41.418, LAT1 = 41.352;

const px = (lng) => ((lng - LNG0) / (LNG1 - LNG0)) * W;
const py = (lat) => ((LAT0 - lat) / (LAT0 - LAT1)) * H;
const pt = ([lat, lng]) => [px(lng), py(lat)];

/* mid-point of each neighbourhood, real coordinates */
const CENTRES = {
  'eixample':           [41.3965, 2.1600],
  'pedralbes':          [41.3890, 2.1120],
  'sarria':             [41.3995, 2.1215],
  'turo-park':          [41.3940, 2.1400],
  'passeig-de-gracia':  [41.3918, 2.1645],
  'ciutat-vella':       [41.3825, 2.1770],
};

const COAST = [[41.352, 2.095], [41.362, 2.130], [41.371, 2.165], [41.386, 2.200]].map(pt);
const DIAGONAL = [pt([41.3840, 2.1120]), pt([41.4050, 2.2000])];

const line = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

export default function MapSection() {
  const t = useT();
  const [active, setActive] = useState('turo-park');
  const hood = NEIGHBOURHOODS.find((n) => n.slug === active) ?? NEIGHBOURHOODS[0];
  const homes = PROPERTIES.filter((p) => p.hoodSlug === active);

  return (
    <section id="map" className="map-wrap section">
      <div className="shell">
        <header style={{ marginBottom: 'clamp(40px,6vh,80px)' }}>
          <p className="eyebrow eyebrow--tick" style={{ color: 'rgba(246,244,239,.62)' }}>The upper city, mapped</p>
          <h2 className="display d-lg" style={{ marginTop: 22, maxWidth: '16ch' }}>
            <Lines lines={[t('map.l1'), t('map.l2')]} />
          </h2>
        </header>

        <div className="map-grid">
          <div>
            <svg className="map-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Schematic map of Barcelona with the six neighbourhoods">
              <defs>
                <pattern id="eix" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(-27)">
                  <path d="M0,0 H26 M0,0 V26" stroke="rgba(246,244,239,.13)" strokeWidth=".8" fill="none" />
                </pattern>
                <linearGradient id="seaFade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#B08D57" stopOpacity=".16" />
                  <stop offset="1" stopColor="#B08D57" stopOpacity=".02" />
                </linearGradient>
              </defs>

              {/* the Eixample grid, hinted */}
              <rect x="560" y="150" width="330" height="230" fill="url(#eix)" opacity=".9" />

              {/* the Mediterranean */}
              <motion.path
                d={`${line(COAST)} L${W},${H} L${COAST[0][0]},${H} Z`}
                fill="url(#seaFade)"
                stroke="none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: EASE }}
              />
              <motion.path
                d={line(COAST)}
                fill="none" stroke="var(--brass)" strokeWidth="1.2" strokeOpacity=".7"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: EASE }}
              />

              {/* Collserola */}
              <motion.path
                d="M-20,362 C 220,300 480,196 1010,58"
                className="map-ridge" strokeDasharray="4 7"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: EASE, delay: 0.15 }}
              />

              {/* Avinguda Diagonal */}
              <motion.path
                d={line(DIAGONAL)}
                className="map-street"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: EASE, delay: 0.35 }}
              />

              <text x="30" y="330" fill="rgba(246,244,239,.34)" fontSize="13" letterSpacing="4">COLLSEROLA</text>
              <text x="770" y="590" fill="rgba(176,141,87,.6)" fontSize="13" letterSpacing="4">MEDITERRANI</text>

              {NEIGHBOURHOODS.map((n, i) => {
                const [x, y] = pt(CENTRES[n.slug] ?? [41.39, 2.15]);
                const on = n.slug === active;
                const flip = x > W * 0.72;
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
                      initial={false}
                      animate={{ r: on ? 6.5 : 3.5 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                    <motion.circle
                      cx={x} cy={y} r={26} fill="transparent"
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                    />
                    <text x={flip ? x - 16 : x + 16} y={y + 5} textAnchor={flip ? 'end' : 'start'}>
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
                <p className="meta num" style={{ color: 'var(--brass-hi)' }}>{homes.length} homes</p>
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
                See {hood.name}
              </Link>
            </Magnetic>
          </aside>
        </div>
      </div>
    </section>
  );
}
