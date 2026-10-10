export interface CoffeeProduct {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  category: 'Espresso & Classics' | 'Specialty Lattes' | 'Cold Brews' | 'Whole Beans & Roasts' | 'Artisan Gear';
  image: string;
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  isFeatured?: boolean;
  description: string;
  detailedDescription: string;
  tastingNotes: string[];
  roastLevel?: 'Light' | 'Light-Medium' | 'Medium' | 'Medium-Dark' | 'Dark';
  origin?: string;
  altitude?: string;
  process?: string;
  caffeine: 'High' | 'Medium' | 'Balanced' | 'Decaf Available';
  volumeOrWeight: string;
  recommendedBrew: string;
}

export const COFFEE_PRODUCTS: CoffeeProduct[] = [
  {
    id: 'espresso',
    name: 'Espresso Intenso',
    subtitle: 'Double shot velvet extraction',
    price: 3.80,
    category: 'Espresso & Classics',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 142,
    isBestseller: true,
    isFeatured: true,
    description: 'A concentrated, syrupy double shot pulled from our signature dark-roast blend with thick hazelnut crema.',
    detailedDescription: 'Our flagship espresso is extracted using a calibrated 1:2 ratio at 9 bars of pressure. Notes of intense dark baker’s chocolate, toasted almond, and a lingering caramelized plum finish.',
    tastingNotes: ['Dark Chocolate', 'Toasted Almond', 'Ripe Plum'],
    roastLevel: 'Medium-Dark',
    origin: 'Antioquia, Colombia & Cerrado, Brazil',
    altitude: '1,400 - 1,800m',
    process: 'Washed & Natural Pulped',
    caffeine: 'High',
    volumeOrWeight: '60ml (Double Shot)',
    recommendedBrew: '9-Bar Espresso Machine or Moka Pot'
  },
  {
    id: 'cappuccino',
    name: 'Artisan Cappuccino',
    subtitle: 'Velvet microfoam & golden crema',
    price: 4.75,
    category: 'Espresso & Classics',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 189,
    isBestseller: true,
    isFeatured: true,
    description: 'Harmonious balance of espresso, steamed organic milk, and a dense, cloud-soft microfoam crown with cocoa dust.',
    detailedDescription: 'Poured in the classical 1:1:1 third ratio of rich espresso, silky steamed whole milk, and micro-aerated foam. Delicate floral notes peak through sweet creaminess.',
    tastingNotes: ['Roasted Hazelnut', 'Warm Milk Chocolate', 'Vanilla Bloom'],
    roastLevel: 'Medium',
    origin: 'Huehuetenango, Guatemala',
    altitude: '1,650m',
    process: 'Fully Washed',
    caffeine: 'Medium',
    volumeOrWeight: '180ml / 6 oz',
    recommendedBrew: 'Espresso Steamer'
  },
  {
    id: 'caffe-latte',
    name: 'Caffè Latte',
    subtitle: 'Silky microfoam over double espresso',
    price: 4.95,
    category: 'Espresso & Classics',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 220,
    isBestseller: true,
    isFeatured: false,
    description: 'Freshly pulled double shot gently enveloped in silky steamed milk with hand-poured rosetta latte art.',
    detailedDescription: 'Smooth, approachable, and deeply comforting. Prepared with creamy milk steamed to a precise 62°C to naturally unlock lactose sweetness without artificial sugar.',
    tastingNotes: ['Sweet Cream', 'Milk Chocolate', 'Toffee Butter'],
    roastLevel: 'Medium',
    origin: 'Santa Rosa, Colombia',
    altitude: '1,500m',
    process: 'Washed',
    caffeine: 'Medium',
    volumeOrWeight: '280ml / 10 oz',
    recommendedBrew: 'Espresso Machine'
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    subtitle: 'Layered vanilla, espresso & amber caramel',
    price: 5.60,
    category: 'Specialty Lattes',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 312,
    isBestseller: true,
    isFeatured: true,
    description: 'Steamed milk infused with Tahitian vanilla bean, marked with bold espresso shots and sea-salt caramel drizzle.',
    detailedDescription: 'An iconic multi-layered treat. The warm milk base is subtly sweet, interrupted dramatically by fresh espresso poured directly through the foam, topped with house-made salted caramel glaze.',
    tastingNotes: ['Brown Sugar', 'Sea-Salt Caramel', 'Vanilla Pod'],
    roastLevel: 'Medium',
    origin: 'Antioquia, Colombia',
    caffeine: 'Medium',
    volumeOrWeight: '350ml / 12 oz',
    recommendedBrew: 'Specialty Espresso'
  },
  {
    id: 'mocha',
    name: 'Artisan Dark Mocha',
    subtitle: '70% Valrhona ganache & double espresso',
    price: 5.40,
    category: 'Specialty Lattes',
    image: 'https://images.unsplash.com/photo-1578314670185-300ea9431477?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 164,
    isBestseller: false,
    isFeatured: true,
    description: 'Single-origin 70% dark chocolate melted directly into hot espresso, frothed with velvety organic milk.',
    detailedDescription: 'We melt hand-chopped ethical dark chocolate chips directly with the espresso extraction. Thick, decadent, never cloying, garnished with shaved chocolate curls.',
    tastingNotes: ['Bittersweet Cocoa', 'Nutmeg', 'Malted Toffee'],
    roastLevel: 'Medium-Dark',
    origin: 'Cerrado, Brazil',
    caffeine: 'Medium',
    volumeOrWeight: '300ml / 10 oz',
    recommendedBrew: 'Espresso Bar'
  },
  {
    id: 'americano',
    name: 'Classic Americano',
    subtitle: 'Bold espresso over hot alpine water',
    price: 3.95,
    category: 'Espresso & Classics',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 98,
    isBestseller: false,
    isFeatured: false,
    description: 'Pure double espresso shots floated over mineral-rich hot water, preserving the fragile aromatic crema layer.',
    detailedDescription: 'Clean, crisp, and revealing. Highlights all the subtle terroir notes of our seasonal single-origin roast without the heaviness of dairy.',
    tastingNotes: ['Black Cherry', 'Bergamot', 'Roasted Pecan'],
    roastLevel: 'Medium',
    origin: 'Yirgacheffe, Ethiopia',
    altitude: '1,900m',
    process: 'Washed',
    caffeine: 'High',
    volumeOrWeight: '300ml / 10 oz',
    recommendedBrew: 'Espresso Long Pour'
  },
  {
    id: 'cold-brew',
    name: '18h Reserve Cold Brew',
    subtitle: 'Slow cold steeped single-origin',
    price: 4.85,
    category: 'Cold Brews',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 275,
    isBestseller: true,
    isFeatured: true,
    description: 'Steeped cold in micro-filtered water for 18 hours. Ultra-smooth with zero bitterness and natural chocolate finish.',
    detailedDescription: 'Our signature slow-steep method extracts delicate essential oils while leaving behind harsh tannic acids. Served over crystal ice spheres or straight from our chilled tap.',
    tastingNotes: ['Dark Cacao', 'Blackberry', 'Molasses'],
    roastLevel: 'Medium',
    origin: 'Sidama, Ethiopia & Tolima, Colombia',
    caffeine: 'High',
    volumeOrWeight: '400ml / 14 oz',
    recommendedBrew: 'Cold Immersion'
  },
  {
    id: 'vanilla-latte',
    name: 'Bourbon Vanilla Latte',
    subtitle: 'Madagascar vanilla pod infusion',
    price: 5.25,
    category: 'Specialty Lattes',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 205,
    isBestseller: false,
    isFeatured: false,
    description: 'Whole Madagascar vanilla bean caviar simmered in golden raw cane syrup with velvety microfoam and rich espresso.',
    detailedDescription: 'True vanilla flavor made with organic beans rather than artificial extracts. Harmonious, fragrant, and comforting with an elegant floral undertone.',
    tastingNotes: ['Bourbon Vanilla', 'Caramelized Custard', 'Light Cinnamon'],
    roastLevel: 'Medium',
    origin: 'Huila, Colombia',
    caffeine: 'Medium',
    volumeOrWeight: '320ml / 11 oz',
    recommendedBrew: 'Espresso Bar'
  },
  {
    id: 'signature-house-blend',
    name: 'Signature House Blend (Whole Bean)',
    subtitle: 'Flagship medium roast — 12 oz bag',
    price: 18.50,
    category: 'Whole Beans & Roasts',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 410,
    isBestseller: true,
    isFeatured: true,
    description: 'Our award-winning daily roast combining sweet washed Colombian beans with floral Ethiopian naturals.',
    detailedDescription: 'Roast profile calibrated weekly in small 12kg batches on our vintage cast iron Diedrich roaster. Designed to be forgiving across pour over, drip machines, and home espresso setups.',
    tastingNotes: ['Milk Chocolate', 'Candied Orange', 'Brown Sugar Honey'],
    roastLevel: 'Medium',
    origin: 'Colombia & Ethiopia Blend',
    altitude: '1,750m',
    process: 'Washed / Sun-dried Natural',
    caffeine: 'Medium',
    volumeOrWeight: '340g / 12 oz',
    recommendedBrew: 'Drip, French Press, Pour Over, Espresso'
  },
  {
    id: 'premium-coffee-beans',
    name: 'Yirgacheffe Geisha Reserve (Whole Bean)',
    subtitle: 'Limited harvest single-origin heirloom',
    price: 22.00,
    category: 'Whole Beans & Roasts',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 178,
    isBestseller: true,
    isFeatured: true,
    description: 'Exquisite jasmine blossom aromas, bright bergamot citrus acidity, and a silky white peach finish.',
    detailedDescription: 'Hand-picked above 2,100 meters on the misty slopes of Yirgacheffe. Dried on raised African beds for 24 days. A rare gem for pour over connoisseurs seeking floral transcendence.',
    tastingNotes: ['Jasmine Florals', 'Bergamot Citrus', 'White Peach'],
    roastLevel: 'Light',
    origin: 'Gedeo Zone, Yirgacheffe, Ethiopia',
    altitude: '2,150m',
    process: 'Natural Sun-Dried Anaerobic 48h',
    caffeine: 'Medium',
    volumeOrWeight: '250g / 8.8 oz',
    recommendedBrew: 'V60 Pour Over, Chemex, Kalita Wave'
  },
  {
    id: 'pistachio-rose-latte',
    name: 'Pistachio Rose Bloom Latte',
    subtitle: 'Roasted pistachio milk & organic rose petal',
    price: 5.85,
    category: 'Specialty Lattes',
    image: 'https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 156,
    isBestseller: false,
    isFeatured: true,
    description: 'In-house ground Sicilian pistachio paste, rosewater essence, micro-foamed oat milk, and espresso dust.',
    detailedDescription: 'Inspired by botanical Mediterranean gardens. The natural green nuttiness pairs flawlessly with delicate Damascus rose petals and rich espresso.',
    tastingNotes: ['Roasted Pistachio', 'Wild Rose Bloom', 'Cardamom'],
    roastLevel: 'Light-Medium',
    origin: 'Guatemala Huehuetenango',
    caffeine: 'Medium',
    volumeOrWeight: '320ml / 11 oz',
    recommendedBrew: 'Specialty Bar'
  },
  {
    id: 'copper-pour-over-kettle',
    name: 'Artisan Copper Gooseneck Kettle',
    subtitle: 'Precision 800ml barista pour kettle',
    price: 48.00,
    category: 'Artisan Gear',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 88,
    isBestseller: false,
    isFeatured: false,
    description: 'Heavy gauge copper-plated stainless steel with counterbalanced walnut handle for pinpoint pour speed control.',
    detailedDescription: 'Engineered specifically for specialty hand drip coffee. Features an ergonomic flow restrictor nozzle for uniform extraction spiral pours.',
    tastingNotes: ['Precision Flow', 'Ergonomic Grip', 'Solid Walnut Accents'],
    caffeine: 'Medium',
    volumeOrWeight: '800ml Capacity',
    recommendedBrew: 'Pour Over Equipment'
  }
];

export interface CustomerReview {
  id: string;
  name: string;
  avatar: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
  coffee: string;
}

export const REVIEWS: CustomerReview[] = [
  {
    id: '1',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'Architect & Daily Regular',
    comment: 'The Yirgacheffe Geisha single-origin is hands down the most fragrant pour over I have ever tasted. The ambiance of Brew & Bloom is pure tranquility.',
    rating: 5,
    date: '2 days ago',
    coffee: 'Yirgacheffe Geisha Reserve'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'Creative Director',
    comment: 'Their 18-hour cold brew has completely replaced my afternoon energy slump. Rich dark chocolate notes without a hint of acidity. Brilliant work.',
    rating: 5,
    date: '1 week ago',
    coffee: '18h Reserve Cold Brew'
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    role: 'Sommelier',
    comment: 'The caramel macchiato is subtly sweetened with real vanilla beans instead of chemical syrups. You can taste the respect for raw ingredients.',
    rating: 5,
    date: '3 weeks ago',
    coffee: 'Caramel Macchiato'
  }
];

export interface BrewStep {
  step: string;
  title: string;
  desc: string;
  icon: string;
}

export const BREW_PROCESS: BrewStep[] = [
  {
    step: '01',
    title: 'Ethical Direct Trade',
    desc: 'We partner directly with high-elevation micro-lot farms across Ethiopia, Colombia, and Guatemala, paying 40% above fair trade minimums.',
    icon: 'Sprout'
  },
  {
    step: '02',
    title: 'Small-Batch Roasting',
    desc: 'Each bean variety is gently roasted in 12kg cast-iron drums to highlight its inherent terroir, jasmine florals, and cacao sugars.',
    icon: 'Flame'
  },
  {
    step: '03',
    title: 'The 45s Artisan Bloom',
    desc: 'Freshly ground beans meet 93°C water, releasing sweet CO2 gases in a slow aromatic bloom before delicate extraction begins.',
    icon: 'Coffee'
  },
  {
    step: '04',
    title: 'Served With Intention',
    desc: 'Poured into pre-warmed handcrafted ceramic cups with silky microfoam rosettas — crafted to make every morning feel sacred.',
    icon: 'Heart'
  }
];
