import Hero from '../sections/Hero';
import Passage from '../sections/Passage';
import Explore from '../sections/Explore';
import Gallery from '../sections/Gallery';
import CollectionSection from '../sections/Collection';
import SellTeaser from '../sections/SellTeaser';
import Figures from '../sections/Figures';
import MapSection from '../sections/MapSection';
import Reel from '../sections/Reel';
import Interior from '../sections/Interior';
import PhotoType from '../sections/PhotoType';
import Marquee from '../components/Marquee';
import { Lines, FadeUp } from '../components/Reveal';
import { NEIGHBOURHOODS } from '../data/properties';

export default function Home() {
  return (
    <>
      {/* the city pins and the house rides up over it, so the two opening
          screens read as one move instead of two sections in a list */}
      <div className="stack">
        <Hero />
        <Interior />
      </div>

      <section className="shell" style={{ paddingBlock: 'clamp(90px,15vh,200px)' }}>
        <div className="intro-grid">
          <p className="eyebrow eyebrow--tick">Valords, Barcelona</p>
          <div>
            <h2 className="display d-md" style={{ maxWidth: '20ch' }}>
              <Lines lines={['We represent a small number', 'of houses and apartments', 'in the upper city — and', 'we know each one by name.']} />
            </h2>
            <FadeUp i={2}>
              <hr className="hair" style={{ marginTop: 34, maxWidth: 260 }} />
              <p className="lead" style={{ marginTop: 26, maxWidth: '46ch', color: 'var(--warm)' }}>
                Founded in 2016 beside Turó Park. Buying, selling and letting exceptional homes in Barcelona, the Costa Brava and the Maresme, with legal and tax counsel under the same roof.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      <Figures />
      <Passage />
      <Explore />

      <Marquee items={NEIGHBOURHOODS.map((n) => n.name)} />

      <Gallery />
      <PhotoType />
      <Reel />
      <MapSection />
      <CollectionSection />
      <SellTeaser />
    </>
  );
}
