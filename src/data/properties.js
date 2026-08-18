import { IMG } from './images';

/* Demo portfolio — illustrative listings for the concept build.
   Neighbourhoods, coordinates and market language are real; the homes are not. */

export const NEIGHBOURHOODS = [
  { slug:'eixample',   name:'Eixample',            sub:"Cerdà's grid, chamfered light",        image:IMG.bcnAerial,  note:'The nineteenth-century plan that gave Barcelona its rhythm. Principal floors, five-metre ceilings, mosaic underfoot.' },
  { slug:'pedralbes',  name:'Pedralbes',           sub:'Gardens above the city',                image:IMG.villaSea,   note:'Detached houses behind long walls, pine shade and pools, ten minutes from the Diagonal.' },
  { slug:'sarria',     name:'Sarrià',              sub:'A village that stayed one',             image:IMG.bcnHill,    note:'Low streets, a market, the mountain behind. The quietest address in the upper city.' },
  { slug:'turo-park',  name:'Turó Park',           sub:'Plane trees and discretion',            image:IMG.minimal,    note:'The most residential corner of Sant Gervasi–Galvany, built around its park.' },
  { slug:'passeig-de-gracia', name:'Passeig de Gràcia', sub:'Modernisme, at eye level',         image:IMG.bcnGaudi,   note:'Gaudí, Puig i Cadafalch, Domènech i Montaner — and the apartments above them.' },
  { slug:'ciutat-vella', name:'Ciutat Vella',      sub:'Stone, courtyards, salt air',           image:IMG.lines,      note:'Gothic palaces reworked from within, minutes from the water.' },
];

export const TYPES = ['Apartment','Penthouse','Villa','Townhouse','Loft'];

export const FEATURES = [
  'Private terrace','Swimming pool','Sea views','Garden','Concierge','Parking',
  'Lift','Fireplace','Period floors','Home automation','Wine cellar','Gym',
];

export const PROPERTIES = [
  {
    slug:'exceptional-villa-pedralbes', ref:'014', title:'Exceptional Villa',
    hood:'Pedralbes', hoodSlug:'pedralbes', type:'Villa',
    price:6850000, size:680, beds:6, baths:5, plot:1450, year:1974, floor:'—',
    coords:[41.3897,2.1141], orientation:'South-west',
    features:['Swimming pool','Garden','Parking','Home automation','Wine cellar','Fireplace'],
    cover:IMG.villaSea,
    images:[IMG.villaSea,IMG.poolRoom,IMG.dining,IMG.bedroom,IMG.kitchenMar,IMG.bath],
    lede:'A 1970s house rebuilt around its garden, where the ground floor opens along its full length to the pool.',
    body:'Set on a level plot of 1,450 m² behind a stone wall, the house was taken back to its structure and rebuilt over two years. Living spaces run east to west on a single level, each one opening to the terrace through full-height glazing; the six bedrooms sit above, all with their own bathroom. Below, a garage for four cars, a cellar and a service apartment. The garden is mature — pine, olive, bougainvillea — and the pool is oriented to hold the afternoon sun.',
  },
  {
    slug:'principal-passeig-de-gracia', ref:'021', title:'Principal Floor',
    hood:'Passeig de Gràcia', hoodSlug:'passeig-de-gracia', type:'Apartment',
    price:8200000, size:410, beds:5, baths:4, plot:null, year:1908, floor:'Principal',
    coords:[41.3925,2.1650], orientation:'East / West',
    features:['Private terrace','Period floors','Lift','Concierge','Fireplace'],
    cover:IMG.living1,
    images:[IMG.living1,IMG.livingLite,IMG.stair,IMG.dining,IMG.bedroom,IMG.kitchen1],
    lede:'The principal floor of a 1908 building, with fourteen balconies over the boulevard and its original hydraulic mosaic intact.',
    body:'Four and a half metres of ceiling height, plasterwork restored panel by panel, and a floor plan that still reads as it was drawn: reception rooms along the façade, private quarters around the interior courtyard. The kitchen was moved to the garden side and opens to a 40 m² terrace planted with citrus. Two parking spaces in the building. Passeig de Gràcia is at the door; the block is protected, and the restoration was carried out under municipal supervision.',
  },
  {
    slug:'penthouse-turo-park', ref:'009', title:'Penthouse with Terrace',
    hood:'Turó Park', hoodSlug:'turo-park', type:'Penthouse',
    price:4300000, size:265, beds:4, baths:3, plot:null, year:2019, floor:'8th',
    coords:[41.3932,2.1387], orientation:'South',
    features:['Private terrace','Swimming pool','Lift','Concierge','Parking','Home automation'],
    cover:IMG.livingView,
    images:[IMG.livingView,IMG.poolRoom,IMG.kitchenMar,IMG.bedroom,IMG.bath,IMG.dining],
    lede:'Two floors at the top of a 2019 building, wrapped by a 180 m² terrace with a plunge pool facing the park.',
    body:'The living floor is a single continuous room with a kitchen by Bulthaup at one end and a glazed wall that slides fully into the structure. Above, three bedrooms and a study open onto the upper terrace. Materials are quiet throughout: travertine, oiled oak, plaster. Climate, lighting and shading run on a single system. The park is a hundred metres away and the building has a concierge from seven in the morning.',
  },
  {
    slug:'garden-house-sarria', ref:'032', title:'Garden House',
    hood:'Sarrià', hoodSlug:'sarria', type:'Townhouse',
    price:3450000, size:390, beds:5, baths:4, plot:620, year:1931, floor:'—',
    coords:[41.3991,2.1201], orientation:'South-east',
    features:['Garden','Fireplace','Parking','Period floors','Wine cellar'],
    cover:IMG.houseDusk,
    images:[IMG.houseDusk,IMG.living2,IMG.stair,IMG.kitchen2,IMG.bedroom,IMG.arch1],
    lede:'A 1931 house on one of Sarrià’s quiet streets, with a walled garden and a carriage entrance still in use.',
    body:'Three floors and a basement, arranged as they were built: hall and reception rooms at street level, bedrooms above, a light-filled attic under the eaves. The garden of 620 m² faces south-east and holds a magnolia older than the house. Recent work has been limited and careful — heating, wiring, two bathrooms — leaving the carpentry, tiles and staircase untouched. Sarrià market and the FGC line are both within five minutes on foot.',
  },
  {
    slug:'loft-ciutat-vella', ref:'046', title:'Palace Loft',
    hood:'Ciutat Vella', hoodSlug:'ciutat-vella', type:'Loft',
    price:1980000, size:210, beds:3, baths:2, plot:null, year:1640, floor:'1st',
    coords:[41.3838,2.1789], orientation:'North / South',
    features:['Period floors','Lift','Fireplace','Home automation'],
    cover:IMG.glass1,
    images:[IMG.glass1,IMG.glass2,IMG.living1,IMG.kitchen3,IMG.bedroom,IMG.bath],
    lede:'A seventeenth-century palace floor in the Born, opened up into one room with the vaults left exposed.',
    body:'Catalan vaulting, stone arches and a beamed ceiling six metres up, above a plan that has been reduced to essentials: one great room, three bedrooms behind sliding panels, a kitchen along the north wall. Windows face both the street and the interior courtyard, so the light moves through the day. The building has a lift and eight neighbours. Santa Maria del Mar is around the corner; the beach is a fifteen-minute walk.',
  },
  {
    slug:'corner-apartment-eixample', ref:'027', title:'Chamfer Apartment',
    hood:'Eixample', hoodSlug:'eixample', type:'Apartment',
    price:2450000, size:238, beds:4, baths:3, plot:null, year:1924, floor:'4th',
    coords:[41.3942,2.1663], orientation:'South-west',
    features:['Period floors','Lift','Concierge','Parking','Private terrace'],
    cover:IMG.livingLite,
    images:[IMG.livingLite,IMG.dining,IMG.kitchen1,IMG.bedroom,IMG.stair,IMG.bath],
    lede:'On the chamfered corner of the Dreta de l’Eixample, with twenty-two windows and light from three sides.',
    body:'The apartment occupies the whole fourth floor and keeps its original enfilade of reception rooms along the façade. Mosaic floors were lifted, restored and relaid; the carpentry is the building’s own. A new kitchen sits at the interior end beside a 25 m² gallery terrace over the block’s courtyard. Ceilings are 3.6 metres. Parking space included, in the building.',
  },
  {
    slug:'modern-villa-pedralbes', ref:'051', title:'House Among Pines',
    hood:'Pedralbes', hoodSlug:'pedralbes', type:'Villa',
    price:5200000, size:520, beds:5, baths:5, plot:980, year:2021, floor:'—',
    coords:[41.3876,2.1102], orientation:'South',
    features:['Swimming pool','Garden','Parking','Home automation','Gym','Sea views'],
    cover:IMG.villaWhite,
    images:[IMG.villaWhite,IMG.villaPool,IMG.poolRoom,IMG.kitchenMar,IMG.bedroom,IMG.arch2],
    lede:'Completed in 2021 on a sloping plot, arranged as three volumes stepping down towards the city.',
    body:'The upper volume holds the entrance and garage, the middle the living floor, the lower the bedrooms and a gym opening at pool level. Every room faces south; from the terrace the line of the sea is visible above the rooftops. Construction is concrete and lime render, with deep reveals that keep the summer sun off the glass. Aerothermal heating, photovoltaic roof, rainwater recovery for the garden.',
  },
  {
    slug:'atelier-sarria', ref:'038', title:'The Atelier',
    hood:'Sarrià', hoodSlug:'sarria', type:'Loft',
    price:1290000, size:175, beds:2, baths:2, plot:null, year:1955, floor:'Ground',
    coords:[41.4009,2.1235], orientation:'North',
    features:['Private terrace','Garden','Fireplace','Parking'],
    cover:IMG.facadeWood,
    images:[IMG.facadeWood,IMG.living2,IMG.kitchen3,IMG.dining,IMG.bedroom,IMG.arch1],
    lede:'A former sculptor’s workshop, converted with its north light and roof structure kept in place.',
    body:'Six metres of ceiling under a sawtooth roof, glazed to the north so the light never changes through the day. The conversion added a mezzanine for two bedrooms and left the ground floor entirely open. A courtyard of 60 m² sits behind, walled and planted. Rare in Sarrià, and rarer still with a garage door onto the street.',
  },
  {
    slug:'duplex-passeig-de-gracia', ref:'058', title:'Rooftop Duplex',
    hood:'Passeig de Gràcia', hoodSlug:'passeig-de-gracia', type:'Penthouse',
    price:5900000, size:320, beds:4, baths:4, plot:null, year:1902, floor:'7th',
    coords:[41.3911,2.1638], orientation:'West',
    features:['Private terrace','Swimming pool','Lift','Concierge','Sea views','Home automation'],
    cover:IMG.minimal,
    images:[IMG.minimal,IMG.livingView,IMG.dining,IMG.kitchen2,IMG.bedroom,IMG.bath],
    lede:'Added above a 1902 block in 2018, with the rooftops of the Eixample on every side and a pool facing the sunset.',
    body:'Two floors joined by a steel stair, both opening to terraces: 90 m² below off the living room, 140 m² above with the pool and an outdoor kitchen. The addition is deliberately light — steel, glass and lime plaster — so it reads as a separate building resting on the old one. From the upper terrace, Tibidabo to the west, the Sagrada Família to the east, the sea straight ahead.',
  },
  {
    slug:'courtyard-house-ciutat-vella', ref:'062', title:'Courtyard House',
    hood:'Ciutat Vella', hoodSlug:'ciutat-vella', type:'Townhouse',
    price:2750000, size:295, beds:4, baths:3, plot:180, year:1780, floor:'—',
    coords:[41.3812,2.1755], orientation:'East',
    features:['Private terrace','Garden','Period floors','Fireplace','Wine cellar'],
    cover:IMG.stair,
    images:[IMG.stair,IMG.stair,IMG.living1,IMG.kitchen1,IMG.bedroom,IMG.bath],
    lede:'A whole house in the Gothic quarter, built around a courtyard that brings light to all four floors.',
    body:'Eighteenth-century construction with a stone stair, restored over three years by a studio specialising in protected buildings. The courtyard was reopened after decades closed, and now serves as the centre of the plan: kitchen and dining at its level, living above, bedrooms on the two upper floors, a roof terrace at the top. Vaulted cellar below, currently used for wine.',
  },
  {
    slug:'galvany-apartment', ref:'071', title:'Galvany Apartment',
    hood:'Turó Park', hoodSlug:'turo-park', type:'Apartment',
    price:1650000, size:186, beds:4, baths:3, plot:null, year:1968, floor:'5th',
    coords:[41.3948,2.1421], orientation:'South-east',
    features:['Private terrace','Lift','Concierge','Parking'],
    cover:IMG.dining,
    images:[IMG.dining,IMG.livingLite,IMG.kitchen1,IMG.bedroom,IMG.bath,IMG.living2],
    lede:'A well-proportioned 1968 flat two streets from the park, fully renovated and ready to move into.',
    body:'The renovation removed a corridor and gained a single living space of 55 m² facing south-east over a quiet interior street. Four bedrooms, three of them doubles, all with fitted wardrobes. Oak floors, underfloor heating, ducted air conditioning. The building has a concierge, a lift to the garage and very little turnover — flats here change hands perhaps twice a decade.',
  },
  {
    slug:'gallery-flat-eixample', ref:'084', title:'Gallery Flat',
    hood:'Eixample', hoodSlug:'eixample', type:'Apartment',
    price:1150000, size:142, beds:3, baths:2, plot:null, year:1919, floor:'2nd',
    coords:[41.3903,2.1601], orientation:'South',
    features:['Period floors','Lift','Private terrace'],
    cover:IMG.living2,
    images:[IMG.living2,IMG.kitchen3,IMG.dining,IMG.bedroom,IMG.stair,IMG.bath],
    lede:'A second floor on the Esquerra with its enclosed gallery restored and reglazed in slim steel.',
    body:'The gallery runs the width of the flat over a planted courtyard, and does what galleries were built to do: catch the winter sun and keep the summer out. Behind it, an open kitchen and dining room; along the street façade, three bedrooms with the original doors. Mosaic throughout, restored. Ceilings 3.4 metres, and a building with a lift and only two flats per landing.',
  },
];

export const byslug = (s) => PROPERTIES.find((p) => p.slug === s);
export const fmtPrice = (n) =>
  '€' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
