"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "../lib/animations";

interface FloorPlan { name: string; size: string; image: string; }

export default function ProjectFloorPlans({ floorPlans }: { floorPlans: FloorPlan[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}>
          <motion.p variants={fadeUp} custom={0} className="section-label mb-3">Layouts</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="section-title mb-10 md:mb-14">
            Floor <span className="font-heading italic text-brand-silver">Plans</span>
          </motion.h2>

          <motion.div variants={fadeUp} custom={2}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {floorPlans.map((plan, i) => (
              <motion.div key={plan.name} variants={fadeUp} custom={i}
                className="group cursor-pointer border border-brand-ice hover:border-brand-silver/30 hover:shadow-lg hover:shadow-brand-slate/[0.04] transition-all duration-500">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${plan.image}')` }} />
                  <div className="absolute inset-0 bg-brand-dark/5 group-hover:bg-brand-dark/15 transition-colors duration-500" />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-lg text-brand-slate mb-1">{plan.name}</h3>
                  <p className="font-body text-sm text-brand-silver">{plan.size}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}