"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "../lib/animations";

const goals = [
  { val: "100+", label: "Families to Support Annually" },
  { val: "10+", label: "Schools to Partner With" },
  { val: "50+", label: "Scholarships Planned" },
  { val: "5", label: "Community Programs Launching" },
];

export default function CSRImpact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="section-pad bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-20"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="font-body text-[11px] sm:text-xs font-semibold tracking-megawide uppercase text-white/30 mb-3"
          >
            Our Goals
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1]"
          >
            The Impact We&apos;re{" "}
            <span className="font-heading italic text-brand-silver">
              Building
            </span>{" "}
            Towards
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="font-body text-sm sm:text-base text-white/35 leading-relaxed mt-4 max-w-lg mx-auto"
          >
            As a new company, we&apos;re committed to making a real difference
            from day one. These are our targets for the first year.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-lg overflow-hidden"
        >
          {goals.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              custom={i}
              className="text-center py-10 sm:py-14 bg-brand-dark"
            >
              <p className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-2">
                {s.val}
              </p>
              <p className="font-body text-[10px] sm:text-xs tracking-ultrawide uppercase text-white/30">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}