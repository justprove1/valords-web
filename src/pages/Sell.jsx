import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NEIGHBOURHOODS, TYPES, FEATURES } from '../data/properties';
import { U, IMG } from '../data/images';
import { EASE } from '../lib/anim';
import ShaderImage from '../lib/ShaderImage';
import { useT } from '../i18n';

const STEPS = ['Location', 'Type', 'Surface', 'Character', 'Contact'];

export default function Sell() {
  const t = useT();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [f, setF] = useState({
    hood: '', street: '', type: '', size: 200, beds: 3, baths: 2,
    features: [], name: '', email: '', phone: '',
  });

  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const toggle = (x) => setF((s) => ({ ...s, features: s.features.includes(x) ? s.features.filter((y) => y !== x) : [...s.features, x] }));

  const canNext = [
    () => Boolean(f.hood),
    () => Boolean(f.type),
    () => f.size > 0,
    () => true,
    () => f.name && f.email,
  ][step]();

  const go = (d) => setStep((s) => Math.min(STEPS.length - 1, Math.max(0, s + d)));

  return (
    <div className="sell-page">
      <div className="sell-media">
        <ShaderImage src={U(IMG.arch1, 1600)} alt="" amp={0.6} style={{ position: 'absolute', inset: 0 }} />
      </div>

      <div className="sell-form shell">
        <div style={{ maxWidth: 620, width: '100%' }}>
          <p className="eyebrow">Valuation</p>
          <h1 className="display d-md" style={{ marginTop: 18, maxWidth: '15ch' }}>
            {t('sell.d1')} {t('sell.d2')} {t('sell.d3')}
          </h1>

          <div style={{ display: 'flex', gap: 8, marginTop: 44, alignItems: 'center' }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ flex: 1 }}>
                <div style={{ height: 1, background: 'var(--line)', position: 'relative' }}>
                  <motion.div
                    animate={{ scaleX: i <= step ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    style={{ position: 'absolute', inset: 0, background: 'var(--brass)', transformOrigin: 'left' }}
                  />
                </div>
                <p className="meta" style={{ fontSize: 9.5, marginTop: 10, opacity: i === step ? 1 : 0.45 }}>{s}</p>
              </div>
            ))}
          </div>

          <div style={{ minHeight: 320, marginTop: 44, position: 'relative' }}>
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
                  <p className="display d-sm">Request registered.</p>
                  <p className="lead" style={{ color: 'var(--warm)', marginTop: 18, maxWidth: '42ch' }}>
                    We do not publish an automated figure. A consultant will visit {f.street ? `${f.street}, ` : ''}{f.hood ? NEIGHBOURHOODS.find((n) => n.slug === f.hood)?.name : 'the property'} and prepare the valuation in person.
                  </p>
                  <dl className="summary">
                    {[
                      ['Location', NEIGHBOURHOODS.find((n) => n.slug === f.hood)?.name || '—'],
                      ['Type', f.type || '—'],
                      ['Surface', `${f.size} m²`],
                      ['Bedrooms', f.beds],
                      ['Features', f.features.length ? f.features.join(', ') : '—'],
                      ['Contact', `${f.name} · ${f.email}`],
                    ].map(([k, v]) => (
                      <div key={k}><dt className="label">{k}</dt><dd style={{ margin: '6px 0 0' }}>{v}</dd></div>
                    ))}
                  </dl>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  {step === 0 && (
                    <>
                      <p className="lead" style={{ marginBottom: 26 }}>Where is the property?</p>
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {NEIGHBOURHOODS.map((n) => (
                          <button key={n.slug} className="chip" data-on={f.hood === n.slug} onClick={() => set('hood', n.slug)}>{n.name}</button>
                        ))}
                        <button className="chip" data-on={f.hood === 'other'} onClick={() => set('hood', 'other')}>Elsewhere</button>
                      </div>
                      <label style={{ display: 'block', marginTop: 34 }}>
                        <span className="label">Street (optional)</span>
                        <input className="field" value={f.street} onChange={(e) => set('street', e.target.value)} placeholder="Carrer…" />
                      </label>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <p className="lead" style={{ marginBottom: 26 }}>What kind of property is it?</p>
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {TYPES.map((t) => (
                          <button key={t} className="chip" data-on={f.type === t} onClick={() => set('type', t)}>{t}</button>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <p className="lead" style={{ marginBottom: 30 }}>How large is it?</p>
                      <p className="display d-md num">{f.size} m²</p>
                      <input
                        type="range" min="40" max="900" step="10" value={f.size}
                        onChange={(e) => set('size', Number(e.target.value))}
                        style={{ width: '100%', marginTop: 20, accentColor: '#12120F' }}
                      />
                      <div style={{ display: 'flex', gap: 34, marginTop: 34, flexWrap: 'wrap' }}>
                        {[['beds', 'Bedrooms'], ['baths', 'Bathrooms']].map(([k, label]) => (
                          <div key={k}>
                            <span className="label">{label}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
                              <button className="chip" onClick={() => set(k, Math.max(1, f[k] - 1))}>–</button>
                              <span className="num" style={{ fontSize: 20, minWidth: 20, textAlign: 'center' }}>{f[k]}</span>
                              <button className="chip" onClick={() => set(k, f[k] + 1)}>+</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <p className="lead" style={{ marginBottom: 26 }}>What does it have?</p>
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {FEATURES.map((x) => (
                          <button key={x} className="chip" data-on={f.features.includes(x)} onClick={() => toggle(x)}>{x}</button>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <div style={{ display: 'grid', gap: 26 }}>
                      <p className="lead">Where shall we send the valuation?</p>
                      <label><span className="label">Name</span><input className="field" value={f.name} onChange={(e) => set('name', e.target.value)} /></label>
                      <label><span className="label">Email</span><input type="email" className="field" value={f.email} onChange={(e) => set('email', e.target.value)} /></label>
                      <label><span className="label">Telephone</span><input className="field" value={f.phone} onChange={(e) => set('phone', e.target.value)} /></label>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!done && (
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 30 }}>
              {step > 0 && <button className="btn" onClick={() => go(-1)}>Back</button>}
              {step < STEPS.length - 1 ? (
                <button className="btn btn--solid" disabled={!canNext} style={{ opacity: canNext ? 1 : 0.32 }} onClick={() => canNext && go(1)}>Continue</button>
              ) : (
                <button className="btn btn--solid" disabled={!canNext} style={{ opacity: canNext ? 1 : 0.32 }} onClick={() => canNext && setDone(true)}>Send request</button>
              )}
              <span className="meta num" style={{ marginLeft: 'auto' }}>{step + 1} / {STEPS.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
