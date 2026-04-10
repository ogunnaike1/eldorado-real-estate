"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

const photos = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80",
];

export default function CareersLife() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.p variants={fadeUp} custom={0} className="section-label mb-3">Culture</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="section-title">
            Life at <span className="font-heading italic text-brand-silver">Eldorado</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="font-body text-sm sm:text-base text-brand-slate/45 leading-relaxed mt-4">
            A vibrant, collaborative workspace where great ideas are born, celebrated, and brought to life.
          </motion.p>
        </motion.div>

        {/* Photo Grid */}
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-14 md:mb-20">
          {photos.map((src, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}
              className={`relative overflow-hidden group ${i === 0 ? "md:row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-[4/3]"}`}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${src}')` }} />
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}>
          <motion.div variants={fadeUp} custom={0}
            className="bg-brand-slate p-8 sm:p-10 md:p-14 text-center relative overflow-hidden">
            {/* Pattern */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
            <div className="relative z-10">
              <p className="font-body text-[10px] sm:text-[11px] font-semibold tracking-megawide uppercase text-white/30 mb-3">
                Don&apos;t See Your Role?
              </p>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-white mb-4">
                We&apos;re Always Looking for{" "}
                <span className="font-heading italic text-brand-silver">Exceptional</span> Talent
              </h3>
              <p className="font-body text-sm text-white/40 max-w-lg mx-auto mb-6 leading-relaxed">
                Send us your resume and a note about why you&apos;d be a great fit. We review every application and reach out when the right opportunity arises.
              </p>
              <a href="mailto:careers@eldoradorealestate.com" className="btn-white">
                Send Your Resume <ArrowRight size={15} className="ml-2" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}