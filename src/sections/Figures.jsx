import Counter from '../components/Counter';
import { NEIGHBOURHOODS, PROPERTIES } from '../data/properties';

/* Only figures that are actually true of the office. */
const ROWS = [
  { n: 2016, label: 'Founded beside Turó Park, and independent since 2024.', dur: 1500 },
  { n: NEIGHBOURHOODS.length, label: 'Neighbourhoods of the upper city, worked street by street.' },
  { n: PROPERTIES.length, label: 'Homes on the books right now — never more than we can walk.' },
  { n: 4, label: 'Languages spoken in the office: Spanish, Catalan, English, French.' },
];

export default function Figures() {
  return (
    <section className="figures" aria-label="The office in figures">
      {ROWS.map((r) => (
        <div className="fig" key={r.label}>
          <p className="fig-n foil"><Counter to={r.n} duration={r.dur ?? 1400} /></p>
          <p className="fig-l meta" style={{ lineHeight: 1.7, letterSpacing: '.06em', textTransform: 'none', fontSize: 13 }}>
            {r.label}
          </p>
        </div>
      ))}
    </section>
  );
}
