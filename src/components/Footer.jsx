import { Link } from 'react-router-dom';
import { Lines, FadeUp } from './Reveal';
import { useT } from '../i18n';

export default function Footer() {
  const t = useT();
  return (
    <footer style={{ background: 'var(--deep)', color: 'var(--paper)', paddingBlock: 'clamp(70px,10vh,130px) 40px' }}>
      <div className="shell">
        <h2 className="display d-lg" style={{ maxWidth: '14ch' }}>
          <Lines lines={['Let us open', 'the doors.']} />
        </h2>

        <FadeUp i={1}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 44 }}>
            <Link to="/contact" className="btn btn--light">{t('cta.viewing')}</Link>
            <Link to="/sell" className="btn btn--light">{t('sell.cta')}</Link>
          </div>
        </FadeUp>

        <div className="footer-grid" style={{ marginTop: 'clamp(60px,9vh,120px)', borderTop: '1px solid rgba(246,244,239,.16)', paddingTop: 40 }}>
          <div>
            <p className="eyebrow" style={{ color: 'var(--stone)' }}>{t('hero.office')}</p>
            <p style={{ margin: '10px 0 0', lineHeight: 1.7 }}>
              Carrer del Mestre Nicolau, 2<br />08021 Barcelona
            </p>
          </div>
          <div>
            <p className="eyebrow" style={{ color: 'var(--stone)' }}>{t('footer.contact')}</p>
            <p style={{ margin: '10px 0 0', lineHeight: 1.7 }}>
              <a href="tel:+34938298005" className="ul">+34 938 29 80 05</a><br />
              <a href="mailto:barcelona@valords.com" className="ul">barcelona@valords.com</a>
            </p>
          </div>
          <div>
            <p className="eyebrow" style={{ color: 'var(--stone)' }}>{t('footer.navigate')}</p>
            <p style={{ margin: '10px 0 0', lineHeight: 1.9, display: 'grid' }}>
              <Link to="/collection" className="ul" style={{ justifySelf: 'start' }}>{t('nav.collection')}</Link>
              <Link to="/barcelona" className="ul" style={{ justifySelf: 'start' }}>Barcelona</Link>
              <Link to="/sell" className="ul" style={{ justifySelf: 'start' }}>{t('sell.sellcta')}</Link>
            </p>
          </div>
          <div>
            <p className="eyebrow" style={{ color: 'var(--stone)' }}>{t('footer.follow')}</p>
            <p style={{ margin: '10px 0 0', lineHeight: 1.9, display: 'grid' }}>
              <span className="ul" style={{ justifySelf: 'start' }}>Instagram</span>
              <span className="ul" style={{ justifySelf: 'start' }}>LinkedIn</span>
            </p>
          </div>
        </div>

        <p className="meta" style={{ color: 'rgba(246,244,239,.42)', marginTop: 56, fontSize: 10 }}>
          Concept site — demonstration build. Listings shown are illustrative.
        </p>
      </div>
    </footer>
  );
}
