import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useExpand } from '../lib/Transition';
import { PROPERTIES, fmtPrice } from '../data/properties';
import { U } from '../data/images';
import { Lines, FadeUp } from '../components/Reveal';
import { EASE } from '../lib/anim';
import { useI18n } from '../i18n';

const PICKS = [PROPERTIES[6], PROPERTIES[1], PROPERTIES[8], PROPERTIES[9]];

/* Each piece gets its own editorial treatment — nothing repeats. */
function Piece({ p, layout }) {
  const { t, lang } = useI18n();
  const ref = useRef(null);
  const imgRef = useRef(null);
  const { expand } = useExpand();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const open = () => expand(imgRef.current, U(p.cover, 2200), `/property/${p.slug}`);

  const Label = (
    <div>
      <p className="meta num" style={{ margin: 0 }}>{t('collection.eyebrow')} Nº {p.ref}</p>
      <h3 className="display d-md" style={{ marginTop: 14 }}>{p.hood}</h3>
      <p className="meta" style={{ marginTop: 10 }}>Barcelona</p>
      <p className="display d-sm num" style={{ marginTop: 26 }}>{fmtPrice(p.price, lang)}</p>
      <p className="lead" style={{ marginTop: 20, maxWidth: '30ch', color: 'var(--warm)' }}>{p.lede}</p>
      <button className="btn" style={{ marginTop: 30 }} onClick={open}>{t('feature.open')}</button>
    </div>
  );

  if (layout === 'bleed') {
    return (
      <article ref={ref} className="coll-bleed">
        <button data-cursor="Open" onClick={open} style={{ display: 'block', width: '100%' }}>
          <div ref={imgRef} style={{ position: 'relative', height: '92svh', overflow: 'hidden' }}>
            <motion.img src={U(p.cover, 2400, 74)} alt={p.title} loading="lazy" className="img-cover" style={{ y, scale: 1.1 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(12,12,10,.34),rgba(12,12,10,0) 42%,rgba(12,12,10,.6))' }} />
            <div className="shell" style={{ position: 'absolute', inset: 0, display: 'grid', alignContent: 'space-between', paddingBlock: 44, color: 'var(--paper)', textAlign: 'left' }}>
              <p className="meta num" style={{ color: 'rgba(246,244,239,.8)' }}>{t('collection.eyebrow')} Nº {p.ref}</p>
              <div>
                <h3 className="display d-lg">{p.hood}</h3>
                <p className="num" style={{ marginTop: 10, fontSize: 15 }}>{fmtPrice(p.price, lang)} · {p.size} m²</p>
              </div>
            </div>
          </div>
        </button>
      </article>
    );
  }

  if (layout === 'split') {
    return (
      <article ref={ref} className="coll-split shell">
        {Label}
        <button data-cursor="Open" onClick={open} style={{ display: 'block' }}>
          <div ref={imgRef} style={{ position: 'relative', aspectRatio: '3 / 4', overflow: 'hidden' }}>
            <motion.img src={U(p.cover, 1500)} alt={p.title} loading="lazy" className="img-cover" style={{ y, scale: 1.1 }} />
          </div>
        </button>
      </article>
    );
  }

  if (layout === 'stack') {
    return (
      <article ref={ref} className="coll-stack shell">
        <button data-cursor="Open" onClick={open} style={{ display: 'block', gridArea: 'a' }}>
          <div ref={imgRef} style={{ position: 'relative', aspectRatio: '16 / 11', overflow: 'hidden' }}>
            <motion.img src={U(p.cover, 1800)} alt={p.title} loading="lazy" className="img-cover" style={{ y, scale: 1.1 }} />
          </div>
        </button>
        <div style={{ gridArea: 'b' }}>{Label}</div>
        <div style={{ gridArea: 'c', overflow: 'hidden' }}>
          <motion.img src={U(p.images[2], 1100)} alt="" loading="lazy" className="img-cover" style={{ aspectRatio: '3/4', y }} />
        </div>
      </article>
    );
  }

  return (
    <article ref={ref} className="coll-wide shell">
      <button data-cursor="Open" onClick={open} style={{ display: 'block' }}>
        <div ref={imgRef} style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden' }}>
          <motion.img src={U(p.cover, 2000)} alt={p.title} loading="lazy" className="img-cover" style={{ y, scale: 1.1 }} />
        </div>
      </button>
      <div className="coll-wide-foot">{Label}</div>
    </article>
  );
}

export default function CollectionSection() {
  const { t, lang } = useI18n();
  return (
    <section id="collection" style={{ background: 'var(--paper-2)', paddingBlock: 'clamp(90px,13vh,180px)' }}>
      <div className="shell" style={{ marginBottom: 'clamp(50px,8vh,110px)' }}>
        <p className="eyebrow">Private collection</p>
        <h2 className="display d-lg" style={{ marginTop: 22, maxWidth: '13ch' }}>
          <Lines lines={[t('collection.l1'), t('collection.l2')]} />
        </h2>
        <FadeUp i={1}>
          <p className="lead" style={{ marginTop: 26, maxWidth: '44ch', color: 'var(--warm)' }}>
            A handful of properties held apart from the market and shown by appointment. Each one is catalogued, photographed and presented as a single object.
          </p>
        </FadeUp>
      </div>

      <div style={{ display: 'grid', gap: 'clamp(70px,11vh,150px)' }}>
        <Piece p={PICKS[0]} layout="bleed" />
        <Piece p={PICKS[1]} layout="split" />
        <Piece p={PICKS[2]} layout="stack" />
        <Piece p={PICKS[3]} layout="wide" />
      </div>

      <div className="shell" style={{ marginTop: 'clamp(60px,9vh,120px)' }}>
        <Link to="/collection" className="btn btn--solid">See the full collection</Link>
      </div>
    </section>
  );
}
