"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight, Bed, Bath, Maximize } from "lucide-react";
import { fadeUp,  staggerContainer} from "../lib/animations";

type Category = "all" | "residential" | "commercial" | "hospitality" | "mixed-use";

interface Project {
  title: string;
  location: string;
  category: Category;
  beds?: number;
  baths?: number;
  sqft: string;
  image: string;
}

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
  { key: "hospitality", label: "Hospitality" },
  { key: "mixed-use", label: "Mixed Use" },
];

const allProjects: Project[] = [
  {
    title: "Sapphire Heights",
    location: "Ikoyi, Lagos",
    category: "residential",
    beds: 4,
    baths: 5,
    sqft: "4,200",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    title: "Eldorado Plaza",
    location: "Victoria Island, Lagos",
    category: "commercial",
    sqft: "85,000",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
  },
  {
    title: "The Grand Hotel",
    location: "Eko Atlantic, Lagos",
    category: "hospitality",
    sqft: "120,000",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
  },
  {
    title: "Oasis Apartments",
    location: "Lekki Phase 1, Lagos",
    category: "residential",
    beds: 3,
    baths: 3,
    sqft: "2,800",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
  },
  {
    title: "Vertex Business Hub",
    location: "Maitama, Abuja",
    category: "mixed-use",
    sqft: "60,000",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    title: "Coral Cove Villas",
    location: "Banana Island, Lagos",
    category: "residential",
    beds: 6,
    baths: 7,
    sqft: "8,500",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
  },
];

export default function ProjectFilter() {
  const [active, setActive] = useState<Category>("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  const filtered =
    active === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === active);

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
        >
          <motion.p variants={fadeUp} custom={0} className="section-label mb-3">
            Explore
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="section-title">
            Find Your{" "}
            <span className="font-heading italic text-brand-silver">Ideal</span>{" "}
            Property
          </motion.h2>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={2}
          className="flex flex-wrap justify-center gap-2 mb-10 md:mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-4 sm:px-5 py-2.5 font-body text-[10px] sm:text-[11px] font-semibold tracking-ultrawide uppercase transition-all duration-400 ${
                active === cat.key
                  ? "bg-brand-slate text-white shadow-md shadow-brand-slate/15"
                  : "bg-brand-ice text-brand-silver hover:text-brand-slate hover:bg-brand-ice/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer bg-white border border-brand-ice hover:border-brand-silver/30 hover:shadow-xl hover:shadow-brand-slate/[0.06] transition-all duration-500"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-16/11">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                  <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-brand-dark/25 transition-colors duration-500" />

                  {/* Category badge */}
                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 font-body text-[9px] sm:text-[10px] font-semibold tracking-ultrawide uppercase text-white bg-brand-slate/70 backdrop-blur-md px-2.5 py-1">
                    {project.category}
                  </span>

                  {/* Hover arrow */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white/0 group-hover:bg-white text-transparent group-hover:text-brand-slate transition-all duration-500 rounded-full">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-lg sm:text-xl text-brand-slate group-hover:text-brand-dark transition-colors mb-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-brand-silver mb-4">
                    <MapPin size={12} />
                    <span className="font-body text-xs tracking-wider">
                      {project.location}
                    </span>
                  </div>

                  {/* Specs */}
                  <div className="flex items-center gap-4 pt-3 border-t border-brand-ice">
                    {project.beds && (
                      <div className="flex items-center gap-1.5 text-brand-silver">
                        <Bed size={13} />
                        <span className="font-body text-xs">{project.beds} Beds</span>
                      </div>
                    )}
                    {project.baths && (
                      <div className="flex items-center gap-1.5 text-brand-silver">
                        <Bath size={13} />
                        <span className="font-body text-xs">{project.baths} Baths</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-brand-silver">
                      <Maximize size={13} />
                      <span className="font-body text-xs">{project.sqft} sqft</span>
                    </div>
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
