import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lines, FadeUp } from '../components/Reveal';
import { U, IMG } from '../data/images';
import { EASE } from '../lib/anim';

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <header className="shell" style={{ paddingTop: 'calc(var(--nav-h) + clamp(50px,9vh,120px))' }}>
        <p className="eyebrow">Contact</p>
        <h1 className="display d-lg" style={{ marginTop: 20, maxWidth: '13ch' }}>
          <Lines lines={['Come and see', 'us in Turó Park.']} />
        </h1>
      </header>

      <section className="shell contact-grid" style={{ paddingBlock: 'clamp(50px,8vh,110px)' }}>
        <div>
          {sent ? (
            <motion.p className="lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} style={{ maxWidth: '38ch' }}>
              Thank you — we have your message and will reply within the day.
            </motion.p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'grid', gap: 26, maxWidth: 520 }}>
              <label><span className="label">Name</span><input required className="field" /></label>
              <label><span className="label">Email</span><input required type="email" className="field" /></label>
              <label><span className="label">Telephone</span><input className="field" /></label>
              <label><span className="label">I am interested in</span>
                <select className="field" defaultValue="buying">
                  <option value="buying">Buying</option>
                  <option value="selling">Selling</option>
                  <option value="letting">Letting</option>
                  <option value="other">Something else</option>
                </select>
              </label>
              <label><span className="label">Message</span><textarea className="field" rows={4} /></label>
              <button className="btn btn--solid" type="submit" style={{ justifySelf: 'start' }}>Send</button>
            </form>
          )}
        </div>

        <FadeUp i={1}>
          <div>
            <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
              <img src={U(IMG.facadeWhite, 1200)} alt="" className="img-cover" />
            </div>
            <div style={{ marginTop: 28, display: 'grid', gap: 22 }}>
              <div>
                <p className="label">Office</p>
                <p style={{ margin: '6px 0 0', lineHeight: 1.7 }}>Carrer del Mestre Nicolau, 2<br />08021 Barcelona</p>
              </div>
              <div>
                <p className="label">Telephone</p>
                <p style={{ margin: '6px 0 0' }}><a className="ul" href="tel:+34938298005">+34 938 29 80 05</a></p>
              </div>
              <div>
                <p className="label">Hours</p>
                <p style={{ margin: '6px 0 0' }}>Monday to Friday, 9.30 – 19.00<br />Saturday by appointment</p>
              </div>
              <div>
                <p className="label">Languages</p>
                <p style={{ margin: '6px 0 0' }}>Català · Español · English · Français</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
