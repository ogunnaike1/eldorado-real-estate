"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "../lib/animations";

const images = [
  { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80", caption: "Annual Hamper Distribution 2025" },
  { src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80", caption: "School Renovation — Agege" },
  { src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80", caption: "Youth Mentorship Program" },
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80", caption: "Free Health Screening" },
  { src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80", caption: "Community Outreach — Ikorodu" },
  { src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80", caption: "Housing Support Initiative" },
];

export default function CSRGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer} className="text-center max-w-2xl mx-auto mb-12">
          <motion.p variants={fadeUp} custom={0} className="section-label mb-3">Gallery</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="section-title">Moments of <span className="font-heading italic text-brand-silver">Impact</span></motion.h2>
        </motion.div>

        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {images.map((img, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}
              className={`relative overflow-hidden group cursor-pointer ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
              <div className={`bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ${i === 0 ? "aspect-square" : "aspect-[4/3]"}`}
                style={{ backgroundImage: `url('${img.src}')` }} />
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/50 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <p className="font-body text-xs sm:text-sm text-white font-medium">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}