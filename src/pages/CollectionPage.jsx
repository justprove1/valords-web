import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PropertyCard from '../components/PropertyCard';
import { PROPERTIES, NEIGHBOURHOODS, TYPES, FEATURES, fmtPrice } from '../data/properties';
import { Lines } from '../components/Reveal';
import { EASE } from '../lib/anim';

const PRICES = [0, 1000000, 2000000, 3000000, 5000000, 8000000, Infinity];
const priceLabel = (v) => (v === Infinity ? 'No max' : v === 0 ? 'No min' : fmtPrice(v));

export default function CollectionPage() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState('');
  const [hood, setHood] = useState(params.get('hood') || 'all');
  const [type, setType] = useState('all');
  const [beds, setBeds] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(Infinity);
  const [size, setSize] = useState(0);
  const [feats, setFeats] = useState([]);
  const [sort, setSort] = useState('price-desc');
  const [openFilters, setOpenFilters] = useState(false);

  const toggleFeat = (f) =>
    setFeats((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]));

  const reset = () => {
    setQ(''); setHood('all'); setType('all'); setBeds(0);
    setMin(0); setMax(Infinity); setSize(0); setFeats([]); setParams({});
  };

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let r = PROPERTIES.filter((p) => {
      if (hood !== 'all' && p.hoodSlug !== hood) return false;
      if (type !== 'all' && p.type !== type) return false;
      if (beds && p.beds < beds) return false;
      if (p.price < min || p.price > max) return false;
      if (size && p.size < size) return false;
      if (feats.length && !feats.every((f) => p.features.includes(f))) return false;
      if (needle) {
        const hay = `${p.title} ${p.hood} ${p.type} ${p.lede} ${p.features.join(' ')}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    const s = {
      'price-desc': (a, b) => b.price - a.price,
      'price-asc': (a, b) => a.price - b.price,
      'size-desc': (a, b) => b.size - a.size,
    }[sort];
    return [...r].sort(s);
  }, [q, hood, type, beds, min, max, size, feats, sort]);

  const activeCount =
    (hood !== 'all') + (type !== 'all') + (beds > 0) + (min > 0) + (max !== Infinity) + (size > 0) + feats.length;

  return (
    <>
      <header className="shell" style={{ paddingTop: 'calc(var(--nav-h) + clamp(50px,9vh,120px))', paddingBottom: 'clamp(30px,5vh,60px)' }}>
        <p className="eyebrow">The collection</p>
        <h1 className="display d-lg" style={{ marginTop: 20, maxWidth: '14ch' }}>
          <Lines lines={['Every home', 'we represent.']} />
        </h1>
      </header>

      <div className="shell" style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(246,244,239,.9)', backdropFilter: 'blur(14px)', borderBlock: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingBlock: 16, flexWrap: 'wrap' }}>
          <input
            className="field filter-bar-search"
            style={{ flex: '1 1 220px', borderBottom: 0, padding: 0 }}
            placeholder="Search — Pedralbes, terrace, penthouse…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="meta" style={{ letterSpacing: '.18em' }} onClick={() => setOpenFilters((o) => !o)}>
            Filters{activeCount ? ` (${activeCount})` : ''} {openFilters ? '—' : '+'}
          </button>
          <select className="field meta" style={{ width: 'auto', borderBottom: 0, padding: 0, letterSpacing: '.14em' }} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="price-desc">Price · high to low</option>
            <option value="price-asc">Price · low to high</option>
            <option value="size-desc">Surface · largest</option>
          </select>
          <span className="meta num" style={{ marginLeft: 'auto' }}>{results.length} homes</span>
        </div>

        <AnimatePresence initial={false}>
          {openFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ overflow: 'hidden' }}
            >
              <div className="filter-grid" style={{ paddingBottom: 28, paddingTop: 8 }}>
                <label>
                  <span className="label">Location</span>
                  <select className="field" value={hood} onChange={(e) => setHood(e.target.value)}>
                    <option value="all">All neighbourhoods</option>
                    {NEIGHBOURHOODS.map((n) => <option key={n.slug} value={n.slug}>{n.name}</option>)}
                  </select>
                </label>
                <label>
                  <span className="label">Type</span>
                  <select className="field" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="all">Any type</option>
                    {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </label>
                <label>
                  <span className="label">Min price</span>
                  <select className="field" value={min} onChange={(e) => setMin(Number(e.target.value))}>
                    {PRICES.slice(0, -1).map((v) => <option key={v} value={v}>{priceLabel(v)}</option>)}
                  </select>
                </label>
                <label>
                  <span className="label">Max price</span>
                  <select className="field" value={max} onChange={(e) => setMax(Number(e.target.value))}>
                    {PRICES.slice(1).map((v) => <option key={v} value={v}>{priceLabel(v)}</option>)}
                  </select>
                </label>
                <label>
                  <span className="label">Bedrooms</span>
                  <select className="field" value={beds} onChange={(e) => setBeds(Number(e.target.value))}>
                    <option value={0}>Any</option>
                    {[2, 3, 4, 5, 6].map((b) => <option key={b} value={b}>{b}+</option>)}
                  </select>
                </label>
                <label>
                  <span className="label">Minimum m²</span>
                  <select className="field" value={size} onChange={(e) => setSize(Number(e.target.value))}>
                    <option value={0}>Any</option>
                    {[150, 200, 300, 400, 500].map((s) => <option key={s} value={s}>{s} m²+</option>)}
                  </select>
                </label>
              </div>

              <div style={{ paddingBottom: 28 }}>
                <span className="label" style={{ marginBottom: 14 }}>Features</span>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {FEATURES.map((f) => (
                    <button key={f} className="chip" data-on={feats.includes(f)} onClick={() => toggleFeat(f)}>{f}</button>
                  ))}
                  {activeCount > 0 && (
                    <button className="chip" onClick={reset} style={{ borderStyle: 'dashed' }}>Clear all</button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <section className="shell" style={{ paddingBlock: 'clamp(50px,8vh,110px)' }}>
        {results.length === 0 ? (
          <div style={{ paddingBlock: 120, textAlign: 'center' }}>
            <p className="display d-sm">Nothing matches — yet.</p>
            <p className="lead" style={{ color: 'var(--warm)', marginTop: 14 }}>
              A third of what we sell never reaches a listing. Tell us what you are looking for.
            </p>
            <button className="btn" style={{ marginTop: 30 }} onClick={reset}>Clear filters</button>
          </div>
        ) : (
          <div className="card-grid">
            {results.map((p, i) => <PropertyCard key={p.slug} p={p} index={i} />)}
          </div>
        )}
      </section>
    </>
  );
}
