import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { U, IMG } from '../data/images';

/* GSAP is used here for the line-draw + word stagger tied to scroll. */
export default function SellTeaser() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.sell-word', { yPercent: 118 });
      gsap.to('.sell-word', {
        yPercent: 0,
        duration: 1.15,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
      });
      gsap.set('.sell-rule', { scaleX: 0 });
      gsap.to('.sell-rule', {
        scaleX: 1,
        transformOrigin: 'left center',
        duration: 1.5,
        ease: 'power2.inOut',
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 68%' },
      });
      gsap.to('.sell-img', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const steps = ['Location', 'Type', 'Surface', 'Character', 'Contact'];

  return (
    <section id="sell" ref={root} className="section" style={{ background: 'var(--paper)' }}>
      <div className="shell sell-grid">
        <div>
          <p className="eyebrow">For owners</p>
          <h2 className="display d-lg" style={{ marginTop: 22, maxWidth: '11ch' }}>
            {['Discover', 'the value of', 'your property.'].map((w) => (
              <span className="mask" key={w}><span className="sell-word" style={{ display: 'block' }}>{w}</span></span>
            ))}
          </h2>
          <p className="lead" style={{ marginTop: 28, maxWidth: '38ch', color: 'var(--warm)' }}>
            Five questions, two minutes. A consultant then walks the property and prepares the valuation in person — no automated estimate, because no algorithm has stood in your entrance hall.
          </p>

          <ol style={{ listStyle: 'none', padding: 0, margin: '44px 0 0', maxWidth: 460 }}>
            {steps.map((s, i) => (
              <li key={s}>
                <div className="sell-rule" style={{ height: 1, background: 'var(--line)' }} />
                <div style={{ display: 'flex', gap: 20, paddingBlock: 16, alignItems: 'baseline' }}>
                  <span className="meta num">0{i + 1}</span>
                  <span style={{ fontSize: 17 }}>{s}</span>
                </div>
              </li>
            ))}
          </ol>

          <Link to="/sell" className="btn btn--solid" style={{ marginTop: 40 }}>Begin</Link>
        </div>

        <div style={{ overflow: 'hidden', alignSelf: 'stretch', minHeight: 380 }}>
          <img className="sell-img img-cover" src={U(IMG.stair, 1400)} alt="Interior" loading="lazy" style={{ height: '118%' }} />
        </div>
      </div>
    </section>
  );
}
