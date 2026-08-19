/**
 * Barcelona, from coordinates.
 *
 * Everything the map draws is projected from real latitude and longitude, so
 * the relative positions are true even though the drawing is deliberately
 * spare. Two things this fixes over the previous schematic:
 *
 * The frame no longer distorts. At this latitude the box is 11.7km across and
 * 8.8km down — an aspect of 1.32. The old viewBox was 1000x620, or 1.61, which
 * stretched the whole city sideways by 22%.
 *
 * The Eixample grid sits at its real angle. Cerdà's blocks run parallel to the
 * coast, and taking Gran Via between Plaça d'Espanya and Glòries gives -44.8°.
 * The old pattern was rotated -27°, which put the grid visibly askew to the
 * shoreline it was supposed to follow.
 */

export const LNG0 = 2.075, LNG1 = 2.215;
export const LAT0 = 41.432, LAT1 = 41.352;
export const W = 1000, H = 757;          // 1.322 — the true proportion of the box
export const GRID_ANGLE = -44.8;         // Gran Via, measured

export const px = (lng) => ((lng - LNG0) / (LNG1 - LNG0)) * W;
export const py = (lat) => ((LAT0 - lat) / (LAT0 - LAT1)) * H;
export const pt = ([lat, lng]) => [px(lng), py(lat)];

export const path = (pts) =>
  pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

/* a rough kilometre, for sizing things that are measured in kilometres */
export const KM = W / 11.7;

/* The shoreline, Llobregat side up to the Besòs. Enough points that the port,
   the Barceloneta bulge and the Fòrum all land where they should. */
export const COAST = [
  [41.3520, 2.1290], [41.3585, 2.1470], [41.3660, 2.1660], [41.3712, 2.1755],
  [41.3757, 2.1830], [41.3790, 2.1905], [41.3860, 2.1985], [41.3930, 2.2055],
  [41.4010, 2.2120], [41.4090, 2.2185], [41.4160, 2.2250],
].map(pt);

/* Collserola: the ridge the whole upper city leans against */
export const RIDGE = [
  [41.4120, 2.0760], [41.4190, 2.0980], [41.4225, 2.1187], [41.4270, 2.1400],
  [41.4310, 2.1620], [41.4355, 2.1850], [41.4400, 2.2060],
].map(pt);

/* The avenues that actually organise the city, each between real endpoints */
export const STREETS = [
  { id: 'diagonal', w: 1.6, pts: [[41.3838, 2.1150], [41.3930, 2.1490], [41.3960, 2.1620], [41.4103, 2.2170]] },
  { id: 'granvia', w: 1.2, pts: [[41.3690, 2.1350], [41.3752, 2.1490], [41.4034, 2.1866], [41.4180, 2.2060]] },
  { id: 'meridiana', w: 1, pts: [[41.4034, 2.1866], [41.4180, 2.1930], [41.4320, 2.1990]] },
  { id: 'paralel', w: 1, pts: [[41.3752, 2.1490], [41.3735, 2.1650], [41.3752, 2.1790]] },
  { id: 'gracia', w: 1, pts: [[41.3870, 2.1700], [41.3975, 2.1600]] },
  { id: 'augusta', w: 1, pts: [[41.3900, 2.1370], [41.4020, 2.1520], [41.4110, 2.1600]] },
].map((s) => ({ ...s, pts: s.pts.map(pt) }));

/* Landmarks — drawn as marks, not as pins, so they place the city without
   competing with the six addresses that are actually for sale. */
export const LANDMARKS = [
  { id: 'tibidabo', label: 'Tibidabo', at: pt([41.4225, 2.1187]), peak: true },
  { id: 'guell', label: 'Park Güell', at: pt([41.4145, 2.1527]) },
  { id: 'sagrada', label: 'Sagrada Família', at: pt([41.4036, 2.1744]) },
  { id: 'montjuic', label: 'Montjuïc', at: pt([41.3641, 2.1650]), peak: true },
  { id: 'port', label: 'Port Vell', at: pt([41.3757, 2.1830]) },
];

/* The Eixample, as the quadrilateral the grid actually fills: Plaça d'Espanya,
   Glòries, the Diagonal above it and Plaça de Catalunya below. */
export const EIXAMPLE = [
  [41.3752, 2.1490], [41.4034, 2.1866], [41.4103, 2.1770], [41.3930, 2.1490],
].map(pt);

/**
 * Each neighbourhood as a soft territory rather than a boundary.
 *
 * Deliberately an ellipse: an agency's working area is not a cadastral line,
 * and drawing a precise polygon would claim an accuracy this does not have.
 * The centres are the real centroids and the radii are the real rough extents,
 * in kilometres.
 */
export const ZONES = {
  'pedralbes':          { at: [41.3890, 2.1120], rx: 0.90, ry: 0.70 },
  'sarria':             { at: [41.3995, 2.1215], rx: 0.60, ry: 0.72 },
  'turo-park':          { at: [41.3940, 2.1400], rx: 0.38, ry: 0.32 },
  'eixample':           { at: [41.3965, 2.1600], rx: 1.05, ry: 0.55 },
  'passeig-de-gracia':  { at: [41.3918, 2.1645], rx: 0.34, ry: 0.50 },
  'ciutat-vella':       { at: [41.3825, 2.1770], rx: 0.62, ry: 0.55 },
};

export const zoneOf = (slug) => {
  const z = ZONES[slug];
  if (!z) return null;
  const [x, y] = pt(z.at);
  return { x, y, rx: z.rx * KM, ry: z.ry * KM };
};
