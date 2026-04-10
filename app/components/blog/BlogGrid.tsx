"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

const posts = [
  { title: "Why Banana Island Remains Africa's Most Valuable Address", tag: "Investment", date: "Feb 20, 2026", read: "6 min", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80", excerpt: "An in-depth look at the factors that make this exclusive enclave the continent's most sought-after residential destination." },
  { title: "Smart Buildings: Technology Meets Luxury Living", tag: "Architecture", date: "Jan 12, 2026", read: "5 min", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80", excerpt: "From automated climate control to AI-powered security — how technology is reshaping the luxury property experience." },
  { title: "Sustainable Luxury: Building Green Without Compromise", tag: "Sustainability", date: "Dec 5, 2025", read: "7 min", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500&q=80", excerpt: "How Eldorado integrates eco-friendly materials and energy-efficient systems while maintaining world-class luxury standards." },
  { title: "Interior Design Trends Shaping Nigerian Luxury Homes", tag: "Design", date: "Nov 18, 2025", read: "4 min", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&q=80", excerpt: "From Italian marble to bespoke African art — the design philosophies defining modern Nigerian luxury interiors." },
  { title: "The Rise of Eko Atlantic: Lagos's New Frontier", tag: "Market Insight", date: "Oct 28, 2025", read: "6 min", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80", excerpt: "How the ambitious reclamation project is creating entirely new neighborhoods and investment opportunities." },
  { title: "A Buyer's Guide to Luxury Property Investment in Nigeria", tag: "Guide", date: "Sep 14, 2025", read: "10 min", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&q=80", excerpt: "Everything you need to know about navigating the luxury property market — from due diligence to financing." },
];

export default function BlogGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section ref={ref} className="section-pad bg-brand-ice">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer} className="mb-10 md:mb-14">
          <motion.p variants={fadeUp} custom={0} className="section-label mb-3">Latest Articles</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="section-title">Insights & <span className="font-heading italic text-brand-silver">Stories</span></motion.h2>
        </motion.div>

        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {posts.map((p, i) => (
            <motion.article key={p.title} variants={fadeUp} custom={i}
              className="bg-white group cursor-pointer hover:shadow-lg hover:shadow-brand-slate/[0.04] transition-all duration-500 border border-transparent hover:border-brand-silver/15">
              <div className="relative overflow-hidden aspect-[16/10]">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${p.image}')` }} />
                <div className="absolute inset-0 bg-brand-dark/5 group-hover:bg-brand-dark/20 transition-colors duration-500" />
                <span className="absolute top-3 left-3 font-body text-[9px] font-semibold tracking-ultrawide uppercase text-white bg-brand-slate/70 backdrop-blur-md px-2.5 py-1">{p.tag}</span>
                <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/0 group-hover:bg-white text-transparent group-hover:text-brand-slate transition-all duration-500 rounded-full">
                  <ArrowUpRight size={14} />
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-3 text-brand-silver font-body text-[10px] tracking-wider mb-3">
                  <span>{p.date}</span>
                  <span className="flex items-center gap-1"><Clock size={10} />{p.read}</span>
                </div>
                <h3 className="font-display text-lg text-brand-slate group-hover:text-brand-dark transition-colors leading-snug mb-2">{p.title}</h3>
                <p className="font-body text-sm text-brand-slate/40 leading-relaxed line-clamp-2">{p.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}