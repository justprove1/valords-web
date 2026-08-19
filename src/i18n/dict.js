/* Four languages because the office speaks four: Spanish and Catalan for the
   half of the clientele that is national, English and French for the half that
   is not — the French share is not incidental, the founders are French.
   Spanish leads: this is a Barcelona agency, not an international portal. */

export const LANGS = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'ca', label: 'CA', name: 'Català' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
];

export const DICT = {
  es: {
    'nav.collection': 'Colección',
    'nav.barcelona': 'Barcelona',
    'nav.contact': 'Contacto',
    'nav.valuation': 'Valoración',
    'nav.sell': 'Vender',
    'nav.menu': 'Menú',
    'nav.language': 'Idioma',

    'hero.eyebrow': 'Inmobiliaria de excepción · desde 2016',
    'hero.line1': 'Casas excepcionales.',
    'hero.line2': 'Lugares excepcionales.',
    'hero.office': 'Oficina',
    'hero.scroll': 'Desliza',

    'feature.built': 'm² construidos',
    'feature.plot': 'm² de parcela',
    'feature.floor': 'planta',
    'feature.year': 'año',
    'feature.beds': 'dormitorios',
    'feature.open': 'Ver la ficha',
    'feature.placeholder': 'Fotografía provisional',

    'feature.baths': 'baños',
    'sell.d1': 'Descubre', 'sell.d2': 'el valor de', 'sell.d3': 'su propiedad.',
    'intro.eyebrow': 'Valords, Barcelona',
    'intro.l1': 'Representamos un número reducido',
    'intro.l2': 'de casas y pisos en la ciudad alta',
    'intro.l3': '— y conocemos cada uno',
    'intro.l4': 'por su nombre.',
    'intro.body': 'Fundada en 2016 junto al Turó Park. Compra, venta y alquiler de viviendas excepcionales en Barcelona, la Costa Brava y el Maresme, con asesoría jurídica y fiscal bajo el mismo techo.',
    'intro.cta': 'Ver la colección completa',

    'figures.founded': 'Fundada junto al Turó Park, e independiente desde 2024.',
    'figures.hoods': 'Barrios de la ciudad alta, trabajados calle a calle.',
    'figures.homes': 'Viviendas en cartera ahora mismo — nunca más de las que podemos recorrer.',
    'figures.langs': 'Idiomas que se hablan en la oficina: español, catalán, inglés y francés.',

    'passage.eyebrow': 'Barcelona',
    'passage.l1': 'Seis barrios.',
    'passage.l2': 'Una ciudad que guarda',
    'passage.l3': 'sus mejores direcciones en silencio.',

    'map.l1': 'Entre la sierra',
    'map.l2': 'y el agua.',
    'map.eyebrow': 'La ciudad alta, cartografiada',
    'map.homes': 'viviendas',
    'map.see': 'Ver',

    'collection.l1': 'La colección',
    'collection.l2': 'de Barcelona',
    'collection.eyebrow': 'Colección privada',

    'reel.l1': 'Doce casas,',
    'reel.l2': 'una tras otra.',
    'reel.eyebrow': 'Sigue deslizando',

    'gallery.l1': 'Galería',
    'gallery.l2': 'de interiores',

    'sell.eyebrow': 'Para propietarios',
    'sell.cta': 'Valorar mi propiedad',
    'sell.sellcta': 'Vender mi propiedad',
    'sell.step.location': 'Ubicación',
    'sell.step.type': 'Tipo',
    'sell.step.surface': 'Superficie',
    'sell.step.character': 'Carácter',
    'sell.step.contact': 'Contacto',

    'cta.viewing': 'Concertar una visita',
    'cta.discover': 'Descubrir',

    'footer.navigate': 'Navegar',
    'footer.follow': 'Seguir',
    'footer.contact': 'Contacto',
  },

  ca: {
    'nav.collection': 'Col·lecció',
    'nav.barcelona': 'Barcelona',
    'nav.contact': 'Contacte',
    'nav.valuation': 'Valoració',
    'nav.sell': 'Vendre',
    'nav.menu': 'Menú',
    'nav.language': 'Idioma',

    'hero.eyebrow': "Immobiliària d'excepció · des del 2016",
    'hero.line1': 'Cases excepcionals.',
    'hero.line2': 'Llocs excepcionals.',
    'hero.office': 'Oficina',
    'hero.scroll': 'Desplaça',

    'feature.built': 'm² construïts',
    'feature.plot': 'm² de parcel·la',
    'feature.floor': 'planta',
    'feature.year': 'any',
    'feature.beds': 'dormitoris',
    'feature.open': 'Veure la fitxa',
    'feature.placeholder': 'Fotografia provisional',

    'feature.baths': 'banys',
    'sell.d1': 'Descobreix', 'sell.d2': 'el valor de', 'sell.d3': 'la seva propietat.',
    'intro.eyebrow': 'Valords, Barcelona',
    'intro.l1': 'Representem un nombre reduït',
    'intro.l2': "de cases i pisos a la ciutat alta",
    'intro.l3': '— i coneixem cadascun',
    'intro.l4': 'pel seu nom.',
    'intro.body': 'Fundada el 2016 al costat del Turó Park. Compra, venda i lloguer d’habitatges excepcionals a Barcelona, la Costa Brava i el Maresme, amb assessoria jurídica i fiscal sota el mateix sostre.',
    'intro.cta': 'Veure la col·lecció completa',

    'figures.founded': 'Fundada al costat del Turó Park, i independent des del 2024.',
    'figures.hoods': 'Barris de la ciutat alta, treballats carrer a carrer.',
    'figures.homes': 'Habitatges en cartera ara mateix — mai més dels que podem recórrer.',
    'figures.langs': "Idiomes que es parlen a l'oficina: castellà, català, anglès i francès.",

    'passage.eyebrow': 'Barcelona',
    'passage.l1': 'Sis barris.',
    'passage.l2': 'Una ciutat que guarda',
    'passage.l3': 'les seves millors adreces en silenci.',

    'map.l1': 'Entre la serra',
    'map.l2': "i l'aigua.",
    'map.eyebrow': 'La ciutat alta, cartografiada',
    'map.homes': 'habitatges',
    'map.see': 'Veure',

    'collection.l1': 'La col·lecció',
    'collection.l2': 'de Barcelona',
    'collection.eyebrow': 'Col·lecció privada',

    'reel.l1': 'Dotze cases,',
    'reel.l2': "l'una rere l'altra.",
    'reel.eyebrow': 'Continua desplaçant',

    'gallery.l1': 'Galeria',
    'gallery.l2': "d'interiors",

    'sell.eyebrow': 'Per a propietaris',
    'sell.cta': 'Valorar la meva propietat',
    'sell.sellcta': 'Vendre la meva propietat',
    'sell.step.location': 'Ubicació',
    'sell.step.type': 'Tipus',
    'sell.step.surface': 'Superfície',
    'sell.step.character': 'Caràcter',
    'sell.step.contact': 'Contacte',

    'cta.viewing': 'Concertar una visita',
    'cta.discover': 'Descobrir',

    'footer.navigate': 'Navegar',
    'footer.follow': 'Seguir',
    'footer.contact': 'Contacte',
  },

  en: {
    'nav.collection': 'Collection',
    'nav.barcelona': 'Barcelona',
    'nav.contact': 'Contact',
    'nav.valuation': 'Valuation',
    'nav.sell': 'Sell',
    'nav.menu': 'Menu',
    'nav.language': 'Language',

    'hero.eyebrow': 'Remarkable realty · Est. 2016',
    'hero.line1': 'Exceptional homes.',
    'hero.line2': 'Exceptional places.',
    'hero.office': 'Office',
    'hero.scroll': 'Scroll',

    'feature.built': 'm² built',
    'feature.plot': 'm² plot',
    'feature.floor': 'floor',
    'feature.year': 'built',
    'feature.beds': 'bedrooms',
    'feature.open': 'Open the file',
    'feature.placeholder': 'Photography placeholder',

    'feature.baths': 'baths',
    'sell.d1': 'Discover', 'sell.d2': 'the value of', 'sell.d3': 'your property.',
    'intro.eyebrow': 'Valords, Barcelona',
    'intro.l1': 'We represent a small number',
    'intro.l2': 'of houses and apartments',
    'intro.l3': 'in the upper city — and',
    'intro.l4': 'we know each one by name.',
    'intro.body': 'Founded in 2016 beside Turó Park. Buying, selling and letting exceptional homes in Barcelona, the Costa Brava and the Maresme, with legal and tax counsel under the same roof.',
    'intro.cta': 'See the full collection',

    'figures.founded': 'Founded beside Turó Park, and independent since 2024.',
    'figures.hoods': 'Neighbourhoods of the upper city, worked street by street.',
    'figures.homes': 'Homes on the books right now — never more than we can walk.',
    'figures.langs': 'Languages spoken in the office: Spanish, Catalan, English, French.',

    'passage.eyebrow': 'Barcelona',
    'passage.l1': 'Six neighbourhoods.',
    'passage.l2': 'One city that keeps',
    'passage.l3': 'its best addresses quiet.',

    'map.l1': 'Between the ridge',
    'map.l2': 'and the water.',
    'map.eyebrow': 'The upper city, mapped',
    'map.homes': 'homes',
    'map.see': 'See',

    'collection.l1': 'The Barcelona',
    'collection.l2': 'Collection',
    'collection.eyebrow': 'Private collection',

    'reel.l1': 'Twelve homes,',
    'reel.l2': 'end to end.',
    'reel.eyebrow': 'Keep scrolling',

    'gallery.l1': 'Living',
    'gallery.l2': 'Gallery',

    'sell.eyebrow': 'For owners',
    'sell.cta': 'Value my property',
    'sell.sellcta': 'Sell your property',
    'sell.step.location': 'Location',
    'sell.step.type': 'Type',
    'sell.step.surface': 'Surface',
    'sell.step.character': 'Character',
    'sell.step.contact': 'Contact',

    'cta.viewing': 'Arrange a viewing',
    'cta.discover': 'Discover',

    'footer.navigate': 'Navigate',
    'footer.follow': 'Follow',
    'footer.contact': 'Contact',
  },

  fr: {
    'nav.collection': 'Collection',
    'nav.barcelona': 'Barcelone',
    'nav.contact': 'Contact',
    'nav.valuation': 'Estimation',
    'nav.sell': 'Vendre',
    'nav.menu': 'Menu',
    'nav.language': 'Langue',

    'hero.eyebrow': "L'immobilier d'exception · depuis 2016",
    'hero.line1': "Des maisons d'exception.",
    'hero.line2': "Des lieux d'exception.",
    'hero.office': 'Bureau',
    'hero.scroll': 'Défiler',

    'feature.built': 'm² habitables',
    'feature.plot': 'm² de terrain',
    'feature.floor': 'étage',
    'feature.year': 'année',
    'feature.beds': 'chambres',
    'feature.open': 'Voir le dossier',
    'feature.placeholder': 'Photographie provisoire',

    'feature.baths': 'salles de bain',
    'sell.d1': 'Découvrez', 'sell.d2': 'la valeur de', 'sell.d3': 'votre bien.',
    'intro.eyebrow': 'Valords, Barcelone',
    'intro.l1': 'Nous représentons un nombre restreint',
    'intro.l2': "de maisons et d'appartements",
    'intro.l3': 'dans les hauteurs de la ville —',
    'intro.l4': 'et nous connaissons chacun par son nom.',
    'intro.body': 'Fondée en 2016 près du Turó Park. Achat, vente et location de biens d’exception à Barcelone, sur la Costa Brava et le Maresme, avec conseil juridique et fiscal sous le même toit.',
    'intro.cta': 'Voir toute la collection',

    'figures.founded': 'Fondée près du Turó Park, et indépendante depuis 2024.',
    'figures.hoods': 'Quartiers des hauteurs, travaillés rue par rue.',
    'figures.homes': 'Biens au portefeuille aujourd’hui — jamais plus que ce que nous pouvons parcourir.',
    'figures.langs': 'Langues parlées au bureau : espagnol, catalan, anglais, français.',

    'passage.eyebrow': 'Barcelone',
    'passage.l1': 'Six quartiers.',
    'passage.l2': 'Une ville qui garde',
    'passage.l3': 'ses meilleures adresses discrètes.',

    'map.l1': 'Entre la crête',
    'map.l2': "et l'eau.",
    'map.eyebrow': 'Les hauteurs, cartographiées',
    'map.homes': 'biens',
    'map.see': 'Voir',

    'collection.l1': 'La collection',
    'collection.l2': 'de Barcelone',
    'collection.eyebrow': 'Collection privée',

    'reel.l1': 'Douze demeures,',
    'reel.l2': "l'une après l'autre.",
    'reel.eyebrow': 'Continuez à défiler',

    'gallery.l1': 'Galerie',
    'gallery.l2': "d'intérieurs",

    'sell.eyebrow': 'Pour les propriétaires',
    'sell.cta': 'Estimer mon bien',
    'sell.sellcta': 'Vendre mon bien',
    'sell.step.location': 'Emplacement',
    'sell.step.type': 'Type',
    'sell.step.surface': 'Surface',
    'sell.step.character': 'Caractère',
    'sell.step.contact': 'Contact',

    'cta.viewing': 'Organiser une visite',
    'cta.discover': 'Découvrir',

    'footer.navigate': 'Naviguer',
    'footer.follow': 'Suivre',
    'footer.contact': 'Contact',
  },
};
