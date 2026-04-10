"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight, Bed, Bath, Maximize } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

type Cat = "all" | "residential" | "commercial" | "hospitality" | "mixed-use";

const categories: { key: Cat; label: string }[] = [
  { key: "all", label: "All" },
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
  { key: "hospitality", label: "Hospitality" },
  { key: "mixed-use", label: "Mixed Use" },
];

const projects = [
  { title: "The Meridian Tower", location: "Banana Island, Lagos", category: "residential" as Cat, beds: 5, baths: 6, sqft: "6,200", price: "From ₦850M", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80", status: "Selling" },
  { title: "Cascade Residences", location: "Ikoyi, Lagos", category: "residential" as Cat, beds: 4, baths: 5, sqft: "4,200", price: "From ₦420M", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", status: "Selling" },
  { title: "Azure Waterfront", location: "Banana Island, Lagos", category: "residential" as Cat, beds: 6, baths: 7, sqft: "8,500", price: "From ₦1.2B", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80", status: "Coming Soon" },
  { title: "Eldorado Plaza", location: "Victoria Island, Lagos", category: "commercial" as Cat, sqft: "85,000", price: "Leasing", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", status: "Leasing" },
  { title: "The Grand Hotel", location: "Eko Atlantic, Lagos", category: "hospitality" as Cat, sqft: "120,000", price: "Investment", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80", status: "Under Construction" },
  { title: "Sapphire Heights", location: "Lekki Phase 1, Lagos", category: "residential" as Cat, beds: 3, baths: 3, sqft: "2,800", price: "From ₦280M", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", status: "Sold Out" },
  { title: "Vertex Business Hub", location: "Maitama, Abuja", category: "mixed-use" as Cat, sqft: "60,000", price: "Leasing", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", status: "Selling" },
  { title: "Coral Cove Villas", location: "Banana Island, Lagos", category: "residential" as Cat, beds: 6, baths: 7, sqft: "8,500", price: "From ₦1.5B", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", status: "Selling" },
  { title: "Oasis Apartments", location: "Lekki, Lagos", category: "residential" as Cat, beds: 2, baths: 2, sqft: "1,400", price: "From ₦120M", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", status: "Selling" },
];

export default function ProjectsGrid() {
  const [active, setActive] = useState<Cat>("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const filtered = active === "all" ? projects : projects.filter(p => p.category === active);

  return (
    <section ref={ref} className="section-pad bg-brand-ice">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer} className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14">
          <div>
            <motion.p variants={fadeUp} custom={0} className="section-label mb-3">Portfolio</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="section-title">All <span className="font-heading italic text-brand-silver">Projects</span></motion.h2>
          </div>
          <motion.div variants={fadeUp} custom={2} className="flex flex-wrap gap-2 mt-4 sm:mt-0">
            {categories.map(c => (
              <button key={c.key} onClick={() => setActive(c.key)}
                className={`px-4 py-2.5 font-body text-[10px] sm:text-[11px] font-semibold tracking-ultrawide uppercase transition-all duration-400 ${active === c.key ? "bg-brand-slate text-white shadow-md shadow-brand-slate/15" : "bg-white text-brand-silver hover:text-brand-slate"}`}>
                {c.label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map(p => (
              <motion.div key={p.title} layout initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer bg-white border border-brand-ice hover:border-brand-silver/30 hover:shadow-xl hover:shadow-brand-slate/[0.06] transition-all duration-500">
                <div className="relative overflow-hidden aspect-[16/11]">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" style={{ backgroundImage: `url('${p.image}')` }} />
                  <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-brand-dark/40 transition-colors duration-500" />
                  {/* Overlay details on hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="btn-white text-[10px] !py-2 !px-5">View Details <ArrowUpRight size={13} className="ml-1" /></span>
                  </div>
                  <span className="absolute top-3 left-3 font-body text-[9px] font-semibold tracking-ultrawide uppercase text-white bg-brand-slate/70 backdrop-blur-md px-2.5 py-1">{p.status}</span>
                  <span className="absolute top-3 right-3 font-body text-[9px] font-semibold tracking-wider text-white bg-white/10 backdrop-blur-md px-2.5 py-1">{p.price}</span>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-lg sm:text-xl text-brand-slate mb-1">{p.title}</h3>
                  <div className="flex items-center gap-1.5 text-brand-silver mb-4"><MapPin size={12} /><span className="font-body text-xs tracking-wider">{p.location}</span></div>
                  <div className="flex items-center gap-4 pt-3 border-t border-brand-ice">
                    {p.beds && <div className="flex items-center gap-1.5 text-brand-silver"><Bed size={13} /><span className="font-body text-xs">{p.beds} Beds</span></div>}
                    {p.baths && <div className="flex items-center gap-1.5 text-brand-silver"><Bath size={13} /><span className="font-body text-xs">{p.baths} Baths</span></div>}
                    <div className="flex items-center gap-1.5 text-brand-silver"><Maximize size={13} /><span className="font-body text-xs">{p.sqft} sqft</span></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}