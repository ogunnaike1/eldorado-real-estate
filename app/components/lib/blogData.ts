export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  date: string;
  readTime: string;
  image: string;
  author: { name: string; role: string; avatar: string };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "future-of-luxury-real-estate-lagos",
    title: "The Future of Luxury Real Estate in Lagos: 2026 Market Outlook",
    excerpt: "As global capital increasingly flows into African real estate markets, Lagos stands at the forefront of a transformation.",
    tag: "Market Insight",
    date: "March 15, 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    author: { name: "Adewale Ogundimu", role: "CEO, Eldorado Real Estate", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
    content: `The Nigerian luxury real estate market is undergoing a fundamental shift. Where once the conversation centered on whether Lagos could support premium property, the question has evolved to how high the ceiling can go.

## A Market Coming of Age

Over the past five years, Banana Island has cemented its position as the most expensive real estate per square meter in sub-Saharan Africa. Properties that sold for ₦300M in 2020 now command upwards of ₦800M — a trajectory that shows no sign of slowing.

Several macroeconomic factors are driving this surge. The diaspora investment wave has brought sophisticated buyers who benchmark Lagos properties against London, Dubai, and Miami. These buyers expect — and are willing to pay for — world-class finishes, smart home integration, and resort-style amenities.

## Technology as a Differentiator

The next frontier isn't just about marble and chandeliers. Today's luxury buyer wants EV charging stations, integrated building management systems, and AI-powered security. At Eldorado, we've embraced this shift — our Meridian Tower will be the first residential building in Nigeria with 48 EV charging stations and a virtual indoor golf facility.

## Investment Returns

For investors, the numbers speak for themselves. Off-plan acquisitions in premium Lagos developments have consistently delivered 150-200% returns upon completion. The key is identifying developers with a track record of on-time, on-spec delivery — a standard that unfortunately remains rare in the market.

## Looking Ahead

We project that by 2028, Lagos will have at least three residential buildings exceeding 40 storeys, a dedicated luxury hospitality district in Eko Atlantic, and property values in Banana Island crossing the ₦2B mark for premium units. The question isn't whether this will happen — it's whether you'll be positioned to benefit when it does.

The golden age of luxury real estate in Lagos isn't coming. It's here.`,
  },
  {
    slug: "banana-island-most-valuable-address",
    title: "Why Banana Island Remains Africa's Most Valuable Address",
    excerpt: "An in-depth look at the factors that make this exclusive enclave the continent's most sought-after residential destination.",
    tag: "Investment",
    date: "February 20, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    author: { name: "Chukwuemeka Nwosu", role: "Director of Sales", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
    content: `Banana Island isn't just a neighbourhood — it's a statement. This man-made island in the Ikoyi area of Lagos has become synonymous with the very pinnacle of African luxury living.

## The Scarcity Factor

What makes Banana Island fundamentally different from any other premium neighbourhood in Africa is its fixed supply. The island is fully reclaimed — there is no more land to create. Every new development replaces or builds upon existing structures, creating a relentless upward pressure on values.

## Who Lives There

The resident profile reads like a who's who of Nigerian business. Telecoms magnates, oil industry leaders, banking executives, and an increasing number of tech entrepreneurs call Banana Island home. This concentration of wealth creates a self-reinforcing cycle — the neighbourhood's prestige attracts more affluent residents, which further elevates its status.

## Infrastructure Investment

Recent infrastructure improvements have addressed historical concerns about access and utilities. The approach roads have been upgraded, water treatment facilities modernized, and fiber-optic connectivity is now standard. These improvements remove friction for potential buyers who previously hesitated.

## The Development Pipeline

Currently, over ₦500B worth of development is either under construction or in planning on Banana Island. This includes our own Meridian Tower and Azure Waterfront projects. Each new premium development raises the bar for the entire neighbourhood.

## The Bottom Line

For investors with a 3-5 year horizon, Banana Island remains the single most reliable store of value in Nigerian real estate. The fundamentals — fixed supply, concentrated wealth, improving infrastructure, and rising development quality — all point in one direction.`,
  },
  {
    slug: "smart-buildings-technology-luxury",
    title: "Smart Buildings: Technology Meets Luxury Living",
    excerpt: "From automated climate control to AI-powered security — how technology is reshaping the luxury property experience.",
    tag: "Architecture",
    date: "January 12, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    author: { name: "Raj Mehta", role: "Head of Engineering", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" },
    content: `The definition of luxury in residential real estate has expanded beyond materials and finishes. Today, the most discerning buyers evaluate a property's intelligence — its ability to anticipate, adapt, and respond to their needs.

## The Smart Home Standard

At Eldorado, every new development ships with an integrated building management system (IBMS) that controls lighting, climate, security, and entertainment from a single interface. Residents can adjust their home environment from anywhere in the world via smartphone.

## Beyond Convenience

Smart building technology isn't just about convenience — it's about efficiency and sustainability. Our IBMS reduces energy consumption by 30-40% through intelligent load management, automated shade control, and occupancy-based climate adjustment.

## Security Reimagined

Traditional security cameras are giving way to AI-powered systems that can distinguish between residents, authorized visitors, and potential threats in real-time. Facial recognition entry, license plate detection, and anomaly detection provide layers of protection that human guards alone cannot match.

## The EV Revolution

Nigeria's luxury segment is leading the country's EV adoption. Our Meridian Tower includes 48 EV charging stations — a first for any residential building in the country. As the global auto industry shifts to electric, properties without charging infrastructure will face a significant disadvantage.

## What's Next

The next wave includes integrated health monitoring (air quality sensors, water purity tracking), predictive maintenance (the building tells you when something needs fixing before it breaks), and energy generation (solar facades and micro-wind turbines). The buildings of tomorrow won't just be smart — they'll be self-sustaining.`,
  },
  {
    slug: "sustainable-luxury-building-green",
    title: "Sustainable Luxury: Building Green Without Compromise",
    excerpt: "How Eldorado integrates eco-friendly materials and energy-efficient systems while maintaining world-class luxury standards.",
    tag: "Sustainability",
    date: "December 5, 2025",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&q=80",
    author: { name: "Fatima Al-Hassan", role: "Head of Sustainability", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80" },
    content: `There's a persistent myth in the Nigerian construction industry that sustainability and luxury are mutually exclusive. At Eldorado, we've spent the last three years proving that wrong.

## The Business Case

Green buildings command a 10-20% price premium globally. In Lagos, where power supply remains unreliable and diesel costs eat into household budgets, energy-efficient buildings offer a tangible financial advantage to residents — lower running costs, fewer generator hours, and reduced maintenance.

## Our Approach

Every Eldorado project now undergoes a sustainability assessment during the design phase. We evaluate materials sourcing, energy systems, water management, waste reduction, and indoor environmental quality against international benchmarks.

## Materials Innovation

We've replaced conventional concrete blocks with AAC (autoclaved aerated concrete) blocks in several projects — lighter, better insulated, and with a lower carbon footprint. Our facade systems use double-glazed low-E glass that reduces solar heat gain by 60% while maintaining crystal-clear views.

## Water & Energy

Rainwater harvesting, greywater recycling, and water-efficient fixtures reduce municipal water dependence by 40%. Solar panels on rooftops and facades generate 15-20% of common area electricity needs. LED lighting with occupancy sensors is standard.

## The Road Ahead

Our goal is for every Eldorado project completed after 2027 to achieve a minimum EDGE (Excellence in Design for Greater Efficiencies) certification. Sustainability isn't a marketing checkbox — it's a design principle that makes our buildings better, more valuable, and more resilient.`,
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}