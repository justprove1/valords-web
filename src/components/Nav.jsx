import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../lib/anim';
import Magnetic from './Magnetic';
import { useI18n } from '../i18n';

const LINKS = [
  { to: '/collection', key: 'nav.collection' },
  { to: '/barcelona', key: 'nav.barcelona' },
  { to: '/contact', key: 'nav.contact' },
];

/* Sits in the bar rather than behind a globe icon: for an agency whose
   clientele is half international, the languages are a claim, not a setting. */
function LangSwitch({ light }) {
  const { lang, setLang, langs, t } = useI18n();
  return (
    <div className="langs" role="group" aria-label={t('nav.language')}>
      {langs.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-label={l.name}
          aria-current={l.code === lang ? 'true' : undefined}
          className={`lang ${l.code === lang ? 'is-on' : ''} ${light ? 'is-light' : ''}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const { t } = useI18n();
  const overHero = pathname === '/' || pathname.startsWith('/property/');

  useEffect(() => {
    if (!overHero) setSolid(true);
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // over a full-bleed hero the bar stays transparent; elsewhere it solidifies at once
      setSolid(y > (overHero ? window.innerHeight * 0.86 : 20));
      setHidden(y > last && y > 420 && !menu);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menu, overHero]);

  useEffect(() => setMenu(false), [pathname]);

  const light = overHero && !solid;

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 6000,
          height: 'var(--nav-h)', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', paddingInline: 'var(--gut)',
          color: light && !menu ? 'var(--paper)' : 'var(--ink)',
          transition: 'color .8s var(--ease)',
          mixBlendMode: menu ? 'normal' : 'normal',
        }}
      >
        <motion.div
          aria-hidden
          animate={{ opacity: solid && !menu ? 1 : 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ position: 'absolute', inset: 0, background: 'rgba(246,244,239,.86)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--line)', zIndex: -1 }}
        />
        <Link to="/" style={{ fontFamily: 'var(--serif)', fontSize: 25, letterSpacing: '.14em', lineHeight: 1 }}>
          VALORDS
        </Link>

        <nav style={{ display: 'flex', gap: 34, alignItems: 'center' }} className="nav-desktop">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className="ul" style={{ fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase' }}>
              {t(l.key)}
            </NavLink>
          ))}
          <Magnetic strength={0.28}>
            <Link
              to="/sell"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                border: '1px solid currentColor', borderRadius: 999, padding: '10px 20px',
                fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
                color: light && !menu ? 'var(--brass-hi)' : 'var(--brass-lo)',
                transition: 'color .8s var(--ease)',
              }}
            >
              {t('nav.valuation')}
            </Link>
          </Magnetic>
          <LangSwitch light={light && !menu} />
        </nav>

        <button className="nav-burger" onClick={() => setMenu((m) => !m)} aria-label={t('nav.menu')}
          style={{ display: 'none', flexDirection: 'column', gap: 6, width: 26 }}>
          <motion.span animate={{ rotate: menu ? 45 : 0, y: menu ? 4 : 0 }} style={{ height: 1, background: 'currentColor', display: 'block' }} />
          <motion.span animate={{ rotate: menu ? -45 : 0, y: menu ? -3 : 0 }} style={{ height: 1, background: 'currentColor', display: 'block' }} />
        </button>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 5900, background: 'var(--paper)', display: 'grid', alignContent: 'center', paddingInline: 'var(--gut)' }}
          >
            {[...LINKS, { to: '/sell', key: 'nav.sell' }].map((l, i) => (
              <span className="mask" key={l.to}>
                <motion.span
                  initial={{ y: '110%' }} animate={{ y: 0 }} exit={{ y: '110%' }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.08 * i }}
                  style={{ display: 'block' }}
                >
                  <Link to={l.to} className="display d-lg">{t(l.key)}</Link>
                </motion.span>
              </span>
            ))}
            <div style={{ marginTop: 34 }}><LangSwitch /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
