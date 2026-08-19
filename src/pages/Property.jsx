import { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROPERTIES, byslug, fmtPrice } from '../data/properties';
import { U } from '../data/images';
import { Lines, FadeUp, RevealImage } from '../components/Reveal';
import { EASE } from '../lib/anim';
import ShaderImage from '../lib/ShaderImage';
import { useI18n } from '../i18n';

export default function Property() {
  const { t, lang } = useI18n();
  const { slug } = useParams();
  const p = byslug(slug);
  const navigate = useNavigate();
  const hero = useRef(null);
  const [sent, setSent] = useState(false);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  if (!p) {
    return (
      <div className="shell" style={{ paddingTop: 'calc(var(--nav-h) + 22vh)', paddingBottom: '22vh' }}>
        <h1 className="display d-lg">Not in the collection.</h1>
        <Link to="/collection" className="btn" style={{ marginTop: 30 }}>Back to the collection</Link>
      </div>
    );
  }

  const idx = PROPERTIES.findIndex((x) => x.slug === p.slug);
  const next = PROPERTIES[(idx + 1) % PROPERTIES.length];
  const [lat, lng] = p.coords;
  const d = 0.006;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d}%2C${lat - d / 1.6}%2C${lng + d}%2C${lat + d / 1.6}&layer=mapnik&marker=${lat}%2C${lng}`;

  const facts = [
    ['Price', fmtPrice(p.price, lang)],
    ['Surface', `${p.size} m²`],
    ['Bedrooms', p.beds],
    ['Bathrooms', p.baths],
    ['Type', p.type],
    ['Neighbourhood', p.hood],
    p.plot ? ['Plot', `${p.plot} m²`] : ['Floor', p.floor],
    ['Built', p.year],
    ['Aspect', p.orientation],
    ['Reference', `Nº ${p.ref}`],
  ];

  return (
    <>
      <section ref={hero} style={{ height: '100svh', position: 'relative', overflow: 'hidden', background: 'var(--deep)' }}>
        <motion.div style={{ scale, position: 'absolute', inset: 0 }}>
          <ShaderImage src={U(p.cover, 2400, 76)} alt={p.title} amp={0.72} style={{ position: 'absolute', inset: 0 }} />
        </motion.div>
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(10,16,13,.44),rgba(10,16,13,.05) 40%,rgba(10,16,13,.68))' }} />
        <motion.div className="shell" style={{ position: 'relative', height: '100%', display: 'grid', alignContent: 'end', paddingBottom: 'clamp(40px,7vh,80px)', color: 'var(--paper)', opacity: fade, pointerEvents: 'none' }}>
          <motion.p className="meta" style={{ color: 'rgba(246,244,239,.75)' }}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.5 }}>
            {p.hood} · Barcelona · Nº {p.ref}
          </motion.p>
          <motion.h1 className="display d-lg" style={{ marginTop: 14 }}
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: EASE, delay: 0.62 }}>
            {p.title}
          </motion.h1>
          <motion.p className="num" style={{ marginTop: 16, fontSize: 17 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.8 }}>
            {fmtPrice(p.price, lang)} · {p.size} m² · {p.beds} {t('feature.beds')} · {p.baths} {t('feature.baths')}
          </motion.p>
        </motion.div>
      </section>

      <section className="shell section">
        <div className="prop-intro">
          <div>
            <p className="eyebrow">The property</p>
          </div>
          <div>
            <h2 className="display d-md" style={{ maxWidth: '22ch' }}>
              <Lines lines={[p.lede]} />
            </h2>
            <FadeUp i={1}>
              <p className="lead" style={{ marginTop: 30, maxWidth: '58ch', color: 'var(--warm)' }}>{p.body}</p>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="shell" style={{ paddingBottom: 'clamp(60px,9vh,120px)' }}>
        <div className="facts">
          {facts.map(([k, v], i) => (
            <FadeUp i={i % 4} key={k}>
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: 14 }}>
                <p className="label">{k}</p>
                <p className="num" style={{ margin: '6px 0 0', fontSize: 18 }}>{v}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="shell" style={{ paddingBottom: 'clamp(60px,9vh,120px)' }}>
        <div className="gal-grid">
          {p.images.map((im, i) => (
            <RevealImage
              key={im + i}
              src={U(im, i % 3 === 0 ? 1800 : 1200)}
              alt={`${p.title} — ${i + 1}`}
              ratio={i % 3 === 0 ? '16 / 10' : '4 / 5'}
              className={i % 3 === 0 ? 'gal-wide' : ''}
            />
          ))}
        </div>
      </section>

      <section className="shell" style={{ paddingBottom: 'clamp(60px,9vh,120px)' }}>
        <div className="prop-intro">
          <p className="eyebrow">Features</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: 40 }}>
            {p.features.map((f, i) => (
              <li key={f} style={{ breakInside: 'avoid' }}>
                <FadeUp i={i % 4}>
                  <span style={{ display: 'block', borderBottom: '1px solid var(--line)', paddingBlock: 15, fontSize: 17 }}>{f}</span>
                </FadeUp>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell" style={{ paddingBottom: 'clamp(60px,9vh,120px)' }}>
        <div className="prop-intro">
          <p className="eyebrow">Location</p>
          <div>
            <div style={{ aspectRatio: '16 / 9', border: '1px solid var(--line)', overflow: 'hidden', filter: 'grayscale(1) contrast(.92)' }}>
              <iframe title="Map" src={mapSrc} style={{ width: '100%', height: '100%', border: 0 }} loading="lazy" />
            </div>
            <p className="meta" style={{ marginTop: 14 }}>{p.hood}, Barcelona — exact address on request</p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--paper-2)', paddingBlock: 'clamp(70px,11vh,150px)' }}>
        <div className="shell prop-intro">
          <p className="eyebrow">Enquire</p>
          <div>
            <h2 className="display d-md" style={{ maxWidth: '16ch' }}>
              <Lines lines={['Arrange a private', 'viewing.']} />
            </h2>
            {sent ? (
              <motion.p className="lead" style={{ marginTop: 30, maxWidth: '40ch' }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}>
                Thank you — your request for Nº {p.ref} has been registered. A consultant will be in touch to agree a time.
              </motion.p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                style={{ marginTop: 34, display: 'grid', gap: 26, maxWidth: 560 }}
              >
                <label><span className="label">Name</span><input required className="field" name="name" /></label>
                <label><span className="label">Email</span><input required type="email" className="field" name="email" /></label>
                <label><span className="label">Telephone</span><input className="field" name="phone" /></label>
                <label><span className="label">Message</span><textarea className="field" rows={3} defaultValue={`I would like to visit Nº ${p.ref} in ${p.hood}.`} /></label>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 6 }}>
                  <button className="btn btn--solid" type="submit">Request a viewing</button>
                  <a className="btn" href="tel:+34938298005">+34 938 29 80 05</a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--paper)' }}>
        <button
          onClick={() => navigate(`/property/${next.slug}`)}
          data-cursor="Next"
          style={{ display: 'block', width: '100%', textAlign: 'left' }}
        >
          <div className="shell" style={{ paddingBlock: 'clamp(50px,8vh,110px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 26, flexWrap: 'wrap' }}>
            <div>
              <p className="eyebrow">Next</p>
              <p className="display d-md" style={{ marginTop: 12 }}>{next.title}</p>
              <p className="meta num" style={{ marginTop: 10 }}>{next.hood} · {fmtPrice(next.price, lang)}</p>
            </div>
            <div style={{ width: 'min(320px,42vw)', aspectRatio: '4/3', overflow: 'hidden' }}>
              <img src={U(next.cover, 900)} alt="" className="img-cover" loading="lazy" />
            </div>
          </div>
        </button>
      </section>
    </>
  );
}
