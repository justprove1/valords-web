import Counter from '../components/Counter';
import { NEIGHBOURHOODS, PROPERTIES } from '../data/properties';
import { useT } from '../i18n';

/* Only figures that are actually true of the office. */
const ROWS = [
  { n: 2016, key: 'figures.founded', dur: 1500 },
  { n: NEIGHBOURHOODS.length, key: 'figures.hoods' },
  { n: PROPERTIES.length, key: 'figures.homes' },
  { n: 4, key: 'figures.langs' },
];

export default function Figures() {
  const t = useT();
  return (
    <section className="figures" aria-label="The office in figures">
      {ROWS.map((r) => (
        <div className="fig" key={r.key}>
          <p className="fig-n foil"><Counter to={r.n} duration={r.dur ?? 1400} /></p>
          <p className="fig-l meta" style={{ lineHeight: 1.7, letterSpacing: '.06em', textTransform: 'none', fontSize: 13 }}>
            {t(r.key)}
          </p>
        </div>
      ))}
    </section>
  );
}
