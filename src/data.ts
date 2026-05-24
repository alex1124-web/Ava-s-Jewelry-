import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'heritage-gold-cuff',
    name: 'The Heritage Aurelia Cuff',
    collection: 'heritage-gold',
    price: 12500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGDTzewzQLLtb-UjPhLCtPZplTrfQLeiH4t99fEU4jA_0jYYIcYGJAiB4CqNk_xaZTlTKR-caQeueNHDbLtqQhedE6rocgDlXxCSFV02FS4MTSErVf4wOGK1UIRrchlw5JypyNJAu-H6IOJDqDmpYi57wtq0Si0IgR3v_E3XBVoTux1NgIlzzQD-KFNRxdrIE_abx-niq4J7e_TrFxayK4a_pC_VBG62qTU0jR_HOWYay-z2BJ_3IFHDeu10g1xIG0wKCD5eUv0DBk',
    description: 'Constructed from pure gold with ancestral geometric motifs, the Aurelia Cuff is hand-chased. Designed to replicate natural golden hour reflections, it sits with heavy sculptural assurance on the wrist.',
    details: [
      'Individually numbered certificate of lineage',
      'Artisanal hand-chased filigree detailing',
      'Hallmarked 18K Yellow Gold',
      'Width: 42mm, Weight: approximately 78g'
    ],
    materialOptions: ['18K Yellow Gold', 'Rose Gold Limited Edition']
  },
  {
    id: 'solitaire-studs',
    name: 'The Solitaire Radiance Studs',
    collection: 'diamond-edit',
    price: 8900,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3_CvQcAtfWyiSj6cymq6bvr2mn1XO6VCyS1nzfuOuJT6dIf4hD5JtVOeKHGp_TaqRPNow2suTFwZNpMGII3BobHN7wdJKwfBdR2cpv-_xAS6lea8XhsWOaYgTPdQl44d2ElFprmwpiHVu3y1phXd2nokgode6XJHnFrbQxpDSoxRvD1OwNQdOdG0KJJXHS1x0BiVzH7nsDbv2Q2neg-r_FQzDGMnRMTTMhGLx-XAyWVnOHw1kwhWnmM6wMcwYdSlImReliQ139Zyd',
    description: 'Uncompromisingly clear, ethically sourced diamonds selected for extreme brilliance and precise facet symmetry. Set in minimalist white gold studs that direct all focus to the stone.',
    details: [
      'GIA Certified D-Flawless Diamonds',
      'Total carat weight: 1.8 ct',
      'Prong setting optimized for supreme light refraction',
      'Ethically conflict-free sourced stone matching'
    ],
    materialOptions: ['18K White Gold', 'Platinum-950', '18K Yellow Gold'],
    carat: '1.8 TCW'
  },
  {
    id: 'bespoke-sapphire',
    name: 'The Imperial Sapphire Solitaire',
    collection: 'bespoke-creations',
    price: 24000,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
    description: 'An extraordinary royal blue sapphire, hand-selected from historical Sri Lankan mines, hugged by custom tapered baguette-cut diamonds on an architectural band of polished platinum.',
    details: [
      '4.2 Carat Untreated Royal Blue Ceylon Sapphire',
      'Tapered baguette diamond side stones: VVS Clairty',
      'Individually tailored by our master setting artisans',
      'Accompanied by a bespoke leather drafting case and sketch'
    ],
    materialOptions: ['Platinum-950', '18K Yellow gold accents'],
    carat: '4.2 Carat Sapphire'
  },
  {
    id: 'heritage-aether-choker',
    name: 'The Aether Pearl & gold Choker',
    collection: 'heritage-gold',
    price: 16800,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    description: 'Glistening organic white pearls woven into delicate rows of solid yellow gold chainmail. A classic editorial silhouette that gracefully contours the neckline in liquid gold.',
    details: [
      'Individually graded Japanese Akoya pearls',
      'Hand-woven high-ductility 18K Yellow Gold mesh',
      'Signature security lock with miniature gold diamond key',
      'Lengths tailored upon request'
    ],
    materialOptions: ['18K Yellow Gold', 'White Gold with South Sea Pearls']
  },
  {
    id: 'diamond-eternity-band',
    name: 'The Absolute Eternity Band',
    collection: 'diamond-edit',
    price: 19500,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop',
    description: 'A continuous, seamless circle of emerald-cut diamonds. Each stone is oriented with flawless parallel alignments so light reflects uninterrupted around the finger.',
    details: [
      'Symmetric emerald-cut laboratory natural matching',
      '12.4 Carat total weight (depending on precise ring size)',
      'Subtle internal gold hallmark',
      'Includes microscopic precision GIA inscriptions'
    ],
    materialOptions: ['Platinum-950', '18K Yellow Gold', '18K Rose Gold'],
    carat: '12.4 ct'
  },
  {
    id: 'bespoke-emerald-signet',
    name: 'The Sovereign Emerald Signet',
    collection: 'bespoke-creations',
    price: 15200,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    description: 'A deep forest emerald set flat inside a block of hammered ancient gold, carrying the signature handcraft of our atelier. Reclaims the bold confidence of sovereign rings.',
    details: [
      '2.8 Carat Zambian Octagonal Emerald',
      'Textured hammered finish custom created by hand-beating gold',
      'Heavy-signed inside the shank by Ava\'s Master Jeweler',
      'Oxidized shadow edges to enhance depth and character'
    ],
    materialOptions: ['18K Yellow Gold', 'Platinum & Gold Dual Core'],
    carat: '2.8 Carat'
  }
];
