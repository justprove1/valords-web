import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useExpand } from '../lib/Transition';
import { PROPERTIES, fmtPrice } from '../data/properties';
import { U } from '../data/images';
import { EASE } from '../lib/anim';
import { Lines } from '../components/Reveal';

const SET = PROPERTIES.slice(0, 5);

function Slide({ p, i, total }) {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const { expand } = useExpand();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);
  const flip = i % 2 === 1;

  return (
    <article ref={ref} className="gal-slide" style={{ direction: flip ? 'rtl' : 'ltr' }}>
      <button
        data-cursor="View"
        onClick={() => expand(imgRef.current, U(p.cover, 2200), `/property/${p.slug}`)}
        style={{ display: 'block', width: '100%', direction: 'ltr' }}
      >
        <div ref={imgRef} className="gal-img">
          <motion.img src={U(p.cover, 1900, 74)} alt={p.title} loading="lazy" className="img-cover" style={{ y, scale }} />
        </div>
      </button>

      <div className="gal-txt" style={{ direction: 'ltr' }}>
        <motion.p
          className="meta num"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          style={{ margin: 0 }}
        >
          {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </motion.p>

        <p className="eyebrow" style={{ marginTop: 26 }}>{p.hood}</p>

        <h3 className="display d-md" style={{ marginTop: 12 }}>
          <Lines lines={[p.title]} />
        </h3>

        <p className="lead" style={{ marginTop: 22, maxWidth: '30ch', color: 'var(--warm)' }}>{p.lede}</p>

        <p className="num" style={{ marginTop: 30, fontSize: 14, letterSpacing: '.04em' }}>
          {p.size} m² · {p.beds} bedrooms
        </p>
        <p className="display d-sm num" style={{ marginTop: 8 }}>{fmtPrice(p.price)}</p>

        <button
          className="btn"
          style={{ marginTop: 34 }}
          onClick={() => expand(imgRef.current, U(p.cover, 2200), `/property/${p.slug}`)}
        >
          View property
        </button>
      </div>
    </article>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="section shell" style={{ background: 'var(--paper)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 30, flexWrap: 'wrap', marginBottom: 'clamp(50px,8vh,110px)' }}>
        <h2 className="display d-lg" style={{ maxWidth: '12ch' }}>
          <Lines lines={['Living', 'Gallery']} />
        </h2>
        <p className="lead" style={{ maxWidth: '32ch', color: 'var(--warm)' }}>
          Five homes, shown one at a time — the way they deserve to be seen.
        </p>
      </header>

      <div style={{ display: 'grid', gap: 'clamp(80px,14vh,190px)' }}>
        {SET.map((p, i) => (
          <Slide key={p.slug} p={p} i={i} total={SET.length} />
        ))}
      </div>
    </section>
  );
}
