import { Link } from 'react-router-dom';
import { NEIGHBOURHOODS, PROPERTIES } from '../data/properties';
import { U } from '../data/images';
import { Lines, RevealImage, FadeUp } from '../components/Reveal';

export default function BarcelonaPage() {
  return (
    <>
      <header className="shell" style={{ paddingTop: 'calc(var(--nav-h) + clamp(50px,9vh,120px))' }}>
        <p className="eyebrow">The city</p>
        <h1 className="display d-lg" style={{ marginTop: 20, maxWidth: '13ch' }}>
          <Lines lines={['Six neighbourhoods,', 'read closely.']} />
        </h1>
        <FadeUp i={1}>
          <p className="lead" style={{ marginTop: 26, maxWidth: '46ch', color: 'var(--warm)' }}>
            Barcelona changes character every few streets. This is where we work, and what we look for in each of them.
          </p>
        </FadeUp>
      </header>

      <section className="shell" style={{ paddingBlock: 'clamp(50px,8vh,110px)', display: 'grid', gap: 'clamp(60px,9vh,120px)' }}>
        {NEIGHBOURHOODS.map((n, i) => {
          const homes = PROPERTIES.filter((p) => p.hoodSlug === n.slug);
          return (
            <article key={n.slug} className="hood-row" style={{ direction: i % 2 ? 'rtl' : 'ltr' }}>
              <div style={{ direction: 'ltr' }}>
                <RevealImage src={U(n.image, 1500)} alt={n.name} ratio="4 / 3" />
              </div>
              <div style={{ direction: 'ltr' }}>
                <p className="meta num">0{i + 1}</p>
                <h2 className="display d-md" style={{ marginTop: 12 }}>{n.name}</h2>
                <p className="display d-sm italic" style={{ marginTop: 8, color: 'var(--warm)' }}>{n.sub}</p>
                <p className="lead" style={{ marginTop: 22, maxWidth: '36ch', color: 'var(--warm)' }}>{n.note}</p>
                <Link className="btn" to={`/collection?hood=${n.slug}`} style={{ marginTop: 28 }}>
                  {homes.length} {homes.length === 1 ? 'home' : 'homes'}
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
