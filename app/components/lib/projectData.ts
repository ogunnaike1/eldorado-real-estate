export interface Project {
  slug: string;
  title: string;
  location: string;
  category: "residential" | "commercial" | "hospitality" | "mixed-use";
  status: "Selling" | "Coming Soon" | "Sold Out" | "Leasing" | "Under Construction";
  price: string;
  image: string;
  gallery: string[];
  beds?: number;
  baths?: number;
  sqft: string;
  description: string;
  longDescription: string;
  amenities: string[];
  floorPlans: { name: string; size: string; image: string }[];
  coordinates: { lat: number; lng: number };
  completionDate: string;
  architect: string;
}

export const projects: Project[] = [
  {
    slug: "the-meridian-tower",
    title: "The Meridian Tower",
    location: "Banana Island, Lagos",
    category: "residential",
    status: "Selling",
    price: "From ₦850M",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    ],
    beds: 5,
    baths: 6,
    sqft: "6,200",
    description: "A 32-storey landmark redefining skyline luxury with panoramic views and world-class amenities.",
    longDescription: "The Meridian Tower stands as a beacon of architectural excellence on Banana Island — Africa's most exclusive address. Rising 32 storeys above the Lagos skyline, this landmark development offers an unparalleled fusion of luxury, technology, and panoramic waterfront views.\n\nEvery residence features floor-to-ceiling windows, Italian marble finishes, Kohler kitchen fittings, and a fully integrated smart home system. The tower's Krion facade by Porcelanosa is a first in West Africa, combining aesthetic beauty with climate-responsive engineering.\n\nResidents enjoy an entire floor dedicated to wellness — including an infinity pool, spa, techno-gym, and meditation garden. The rooftop houses two sky restaurants, a helipad, and an observation lounge offering 360-degree views of the Lagos lagoon.",
    amenities: [
      "Infinity Pool & Spa",
      "48-Seater IMAX Cinema",
      "Techno-Gym & Squash Court",
      "Virtual Indoor Golf Bar",
      "Sky Restaurant (17th Floor)",
      "Helipad",
      "EV Charging Stations",
      "Smart Home Automation",
      "24/7 Concierge & Security",
      "Private Wine Cellar",
      "Children's Arcade & Creche",
      "Mini-Mart & Hair Salon",
    ],
    floorPlans: [
      { name: "3 Bedroom Apartment", size: "3,200 sqft", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" },
      { name: "4 Bedroom Maisonette", size: "4,800 sqft", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" },
      { name: "5 Bedroom Penthouse", size: "6,200 sqft", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80" },
    ],
    coordinates: { lat: 6.4541, lng: 3.4218 },
    completionDate: "Q4 2026",
    architect: "HKS Architects & Eldorado Design Studio",
  },
  {
    slug: "cascade-residences",
    title: "Cascade Residences",
    location: "Ikoyi, Lagos",
    category: "residential",
    status: "Selling",
    price: "From ₦420M",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    ],
    beds: 4,
    baths: 5,
    sqft: "4,200",
    description: "Intimate boutique apartments designed for discerning professionals who value privacy and elegance.",
    longDescription: "Cascade Residences is a carefully curated collection of 16 boutique apartments nestled in the heart of Ikoyi. Designed for professionals and families who demand privacy without compromising on luxury, each unit offers generous living spaces with premium finishes.\n\nThe architecture draws inspiration from cascading water forms, creating a flowing organic facade that stands out on the Ikoyi skyline. Interiors feature Porcelanosa bathrooms, Kohler kitchens, and engineered hardwood flooring throughout.\n\nA rooftop infinity pool, residents' lounge, and private garden courtyard create a serene escape from the city. Underground parking, 24/7 security, and a dedicated concierge complete the experience.",
    amenities: [
      "Rooftop Infinity Pool",
      "Residents' Lounge",
      "Private Garden Courtyard",
      "Underground Parking",
      "Fitness Center",
      "Smart Home System",
      "24/7 Security & CCTV",
      "Concierge Service",
      "Backup Power Supply",
      "Water Treatment Plant",
    ],
    floorPlans: [
      { name: "3 Bedroom Flat", size: "2,800 sqft", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" },
      { name: "4 Bedroom Duplex", size: "4,200 sqft", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
    ],
    coordinates: { lat: 6.4490, lng: 3.4346 },
    completionDate: "Q2 2026",
    architect: "Eldorado Design Studio",
  },
  {
    slug: "azure-waterfront",
    title: "Azure Waterfront",
    location: "Banana Island, Lagos",
    category: "residential",
    status: "Coming Soon",
    price: "From ₦1.2B",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    beds: 6,
    baths: 7,
    sqft: "8,500",
    description: "Expansive waterfront villas with private docks, infinity pools, and bespoke interior design.",
    longDescription: "Azure Waterfront represents the pinnacle of waterfront living in West Africa. This exclusive collection of 8 detached villas sits directly on the Banana Island waterfront, each with its own private dock, infinity pool, and landscaped garden.\n\nDesigned by a collaboration between Eldorado's in-house studio and international architects, every villa is a unique masterpiece featuring double-height living rooms, private elevators, wine cellars, and staff quarters.\n\nThe development includes a shared marina, private beach access, a clubhouse with restaurant, and round-the-clock marine and land security.",
    amenities: [
      "Private Dock per Villa",
      "Private Infinity Pool",
      "Double-Height Living Room",
      "Private Elevator",
      "Wine Cellar",
      "Staff Quarters",
      "Shared Marina",
      "Private Beach Access",
      "Clubhouse & Restaurant",
      "Marine & Land Security",
      "Landscaped Gardens",
      "Smart Home Automation",
    ],
    floorPlans: [
      { name: "6 Bedroom Villa Type A", size: "8,500 sqft", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80" },
      { name: "6 Bedroom Villa Type B", size: "9,200 sqft", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" },
    ],
    coordinates: { lat: 6.4565, lng: 3.4195 },
    completionDate: "Q1 2027",
    architect: "Foster + Partners & Eldorado",
  },
  {
    slug: "eldorado-plaza",
    title: "Eldorado Plaza",
    location: "Victoria Island, Lagos",
    category: "commercial",
    status: "Leasing",
    price: "Leasing",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
    ],
    sqft: "85,000",
    description: "Premium Grade-A office complex in the heart of Victoria Island's business district.",
    longDescription: "Eldorado Plaza is a 22-storey Grade-A commercial tower offering 85,000 sqft of premium office space in the heart of Victoria Island. The building features a striking glass curtain wall facade, column-free floor plates, and raised access flooring for maximum flexibility.\n\nTenants benefit from fiber-optic connectivity, centralized HVAC, backup power with 72-hour fuel reserves, and a building management system. The ground floor features a grand lobby with curated art installations, retail spaces, and a conference center.\n\nWith 350 underground parking spaces, 24/7 security, and proximity to Lagos's financial district, Eldorado Plaza is the address for businesses that demand excellence.",
    amenities: [
      "Column-Free Floor Plates",
      "Fiber-Optic Connectivity",
      "Centralized HVAC",
      "72-Hour Backup Power",
      "350 Parking Spaces",
      "Grand Lobby & Art Gallery",
      "Conference Center",
      "Retail Spaces",
      "24/7 Security & Access Control",
      "Building Management System",
    ],
    floorPlans: [
      { name: "Full Floor (Open Plan)", size: "4,200 sqft", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
      { name: "Half Floor Suite", size: "2,100 sqft", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
    ],
    coordinates: { lat: 6.4281, lng: 3.4219 },
    completionDate: "Completed",
    architect: "SOM (Skidmore, Owings & Merrill)",
  },
  {
    slug: "the-grand-hotel",
    title: "The Grand Hotel",
    location: "Eko Atlantic, Lagos",
    category: "hospitality",
    status: "Under Construction",
    price: "Investment",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    sqft: "120,000",
    description: "A 5-star boutique hotel blending Nigerian heritage with contemporary luxury hospitality.",
    longDescription: "The Grand Hotel by Eldorado is a 180-key boutique hotel that reimagines luxury hospitality through the lens of Nigerian culture and contemporary design. Located in the emerging Eko Atlantic district, it offers direct ocean views and is minutes from Victoria Island's business center.\n\nThe hotel features three signature restaurants, a rooftop bar, a full-service spa, an infinity pool, and 12,000 sqft of event and conference space. Each room is individually designed with curated African art, bespoke furniture, and smart room controls.\n\nInvestment opportunities are available through fractional ownership starting at $250K, with projected annual returns of 12-15%.",
    amenities: [
      "180 Luxury Rooms & Suites",
      "3 Signature Restaurants",
      "Rooftop Bar & Lounge",
      "Full-Service Spa",
      "Infinity Pool",
      "12,000 sqft Event Space",
      "Business Center",
      "Curated African Art Collection",
      "Airport Transfer Service",
      "Smart Room Controls",
    ],
    floorPlans: [
      { name: "Deluxe Room", size: "450 sqft", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80" },
      { name: "Executive Suite", size: "850 sqft", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" },
      { name: "Presidential Suite", size: "1,800 sqft", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80" },
    ],
    coordinates: { lat: 6.4098, lng: 3.4107 },
    completionDate: "Q3 2027",
    architect: "Gensler & Eldorado Design Studio",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}