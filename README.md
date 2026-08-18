# Valords Barcelona — concept site

A new visual direction for Valords, the luxury agency in Turó Park: part
international firm, part architecture gallery, part cinematic portrait of
Barcelona. Built from scratch — it borrows nothing from their current site.

## Run

```bash
npm run --prefix valords-web dev
```

Then open http://localhost:5183 (also registered in `.claude/launch.json` as
`valords-web`).

## Stack

React 19 · Vite · react-router · Framer Motion (reveals, page and shared-image
transitions) · GSAP + ScrollTrigger (the valuation section's line draw and
parallax) · Lenis (smooth scroll, driven off the GSAP ticker so both stay in sync)
· raw WebGL2 for the live photographs — no three.js, no shader library, one
three-hundred-line component.

## Routes

| Route | What it is |
|---|---|
| `/` | Hero → editorial statement → figures → cinematic passage → Explore Barcelona → marquee → Living Gallery → the reel → the map → The Barcelona Collection → valuation teaser |
| `/collection` | Search + real filters (location, price, type, bedrooms, m², features) and sorting |
| `/barcelona` | The six neighbourhoods, read one by one |
| `/property/:slug` | Full file: hero, facts, gallery, features, map, viewing request |
| `/sell` | Five-step valuation request |
| `/contact` | Form and office details |

## Structure

```
src/
  data/properties.js   portfolio, neighbourhoods, features
  data/images.js       photography pool (every id verified to resolve)
  lib/smooth.js        Lenis + GSAP ticker
  lib/Transition.jsx   the click-to-expand image → page transition
  lib/anim.js          shared easings and variants
  lib/ShaderImage.jsx  WebGL2 photograph: pointer ripple, drift, RGB split
  components/          Nav, Footer, Cursor, Reveal, PropertyCard, Intro,
                       Magnetic, Marquee, Counter
  sections/            Hero, Passage, Explore, Gallery, Collection, SellTeaser,
                       Figures, Reel, MapSection
  pages/               Home, CollectionPage, Property, Sell, Contact, Barcelona
```

## Notes on the build

- **Masked reveals observe the mask, not the moving text.** A child translated
  fully outside an `overflow:hidden` box never intersects the viewport, so an
  observer placed on it would leave the headline hidden for good.
- **The property transition is a real FLIP**: the clicked image is cloned into a
  fixed overlay, flown from its rect to full screen, and only then does the route
  change underneath it — no white flash, no reload.
- **No invented figures.** The valuation flow deliberately returns no automated
  estimate: it registers the request and says a consultant will value in person.
  Company facts (2016, Turó Park, address, phone, languages) are the real ones.
- **Photography is placeholder stock**, chosen for tone. Listings are illustrative,
  and the footer says so. Real shoots would replace `data/images.js` wholesale.
- In dev only, `?y=1500` jumps to a scroll offset — handy for visual checks.

## Second pass — what was added

The first build was correct but quiet. This pass keeps the paper-and-ink base
and layers on the things that make a luxury site feel expensive.

- **Live photographs (`lib/ShaderImage.jsx`).** The hero, the property hero and
  the valuation page render their image through a WebGL2 fragment shader: a
  ripple that follows the pointer, a slow fbm swell so the picture is never
  frozen, a chromatic split that only appears where the surface is moving, and
  an entrance where the photograph surfaces out of the dark through a noisy
  edge. The plain `<img>` stays in the DOM underneath and the canvas only fades
  in once the texture has really decoded — no WebGL, CORS refused, or reduced
  motion requested, and the page is exactly what it was before.
- **Brass.** A second palette sits over the greys: `--brass` for rules, pins,
  numerals and the cursor, `--foil` as a moving gradient for the wordmark and
  the figures, and `--deep` (a midnight green) replacing flat black in every
  dark section — black reads cheap at this size, a green-black does not.
- **The map (`sections/MapSection.jsx`).** A schematic of the city drawn from
  real coordinates: the sea, the Collserola ridge, the Diagonal, and the six
  neighbourhoods projected where they actually are. Hovering a pin swaps the
  photograph and the count beside it. Deliberately spare — a diagram, not a
  survey, so it never pretends to be cartography it isn't.
- **The reel (`sections/Reel.jsx`).** Vertical scroll drives twelve homes
  sideways, and the row skews into its own velocity. Travel is measured from
  the real track width, so it lands flush at both ends on any viewport.
- **The curtain (`components/Intro.jsx`).** Shown once per session — a visitor
  moving between pages never sits through it twice.
- **The viewfinder (`sections/Interior.jsx`).** One photograph in two states:
  soft and dark outside the circle, sharp and magnified inside it, around the
  exact point under the pointer. Two earlier versions were thrown away — one
  revealed a *different* house's interior (stock photography of a facade and
  stock photography of a living room are never the same building, and the eye
  catches it instantly), the other turned the frame into a survey drawing, which
  was honest but read as damage. Magnifying the same pixels cannot disagree with
  itself. The component still takes an `inside` prop, so a real interior of that
  same house turns the lens back into a window with no other change.
- **Cards with volume.** Each card leans towards the pointer, catches a soft
  highlight and cross-fades to a second photograph on hover.
- **Figures, marquee, magnetic buttons.** Counters that run once on entry, an
  endless band of neighbourhood names that pauses under the pointer, and
  buttons that reach for the cursor.

Every figure quoted is still real: 2016, six neighbourhoods, four languages,
and only as many homes as are actually on the books.
