"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";


export default function ProjectAmenities({ amenities }: { amenities: string[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="section-pad bg-brand-ice">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}>
          <motion.p variants={fadeUp} custom={0} className="section-label mb-3">Features</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="section-title mb-10 md:mb-14">
            Amenities & <span className="font-heading italic text-brand-silver">Facilities</span>
          </motion.h2>

          <motion.div variants={fadeUp} custom={2}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {amenities.map((item, i) => (
              <motion.div key={item} variants={fadeUp} custom={i * 0.5}
                className="flex items-center gap-3 bg-white p-4 sm:p-5 group hover:bg-brand-slate transition-colors duration-500">
                <div className="w-8 h-8 flex items-center justify-center bg-brand-ice group-hover:bg-white/10 flex-shrink-0 transition-colors duration-500">
                  <Check size={14} className="text-brand-slate group-hover:text-white transition-colors duration-500" />
                </div>
                <span className="font-body text-sm text-brand-slate group-hover:text-white transition-colors duration-500">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}