"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin, Quote } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

export default function CEOProfile() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="section-pad bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Image Column */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/5] overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                // UPDATED IMAGE PATH BELOW
                style={{ backgroundImage: `url('/images/eldorado-ceo.jpeg')` }}
              />
              {/* Decorative Frame */}
              <div className="absolute inset-0 border-[12px] border-white/10 m-4" />
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-brand-slate p-8 hidden md:block"
            >
              <Quote className="text-brand-silver mb-2" size={32} />
              <p className="text-white font-display text-lg italic leading-tight">
                Building legacies, <br />not just structures.
              </p>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            className="lg:col-span-7"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.p variants={fadeUp} className="section-label mb-4">
              Our Visionary
            </motion.p>
            
            <motion.h2 variants={fadeUp} className="section-title mb-6">
              Oluwasomidotun <span className="font-heading italic text-brand-silver">Olajide</span>
            </motion.h2>
            
            <motion.p variants={fadeUp} className="font-body text-brand-silver tracking-widest uppercase text-xs mb-8">
              Founder & Chief Executive Officer
            </motion.p>

            <motion.div variants={fadeUp} className="space-y-6 text-brand-slate/80 font-body leading-relaxed text-lg">
              <p>
                A visionary leader with over 10 years in luxury construction and real estate, 
                Oluwasomidotun Olajide has redefined the skyline of sub-Saharan Africa. His journey 
                began with a simple premise: that African luxury should be synonymous with 
                uncompromising global standards.
              </p>
              <p>
                Under his stewardship, Eldorado has evolved from a boutique developer into a 
                titan of the industry, known for architectural audacity and meticulous 
                engineering. Oluwasomidotun’s foresight and resilience have driven the brand’s 
                meteoric rise, securing its position as the preferred partner for 
                high-net-worth investors across the continent.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6">
              <a 
                href="#" 
                className="flex items-center gap-2 text-brand-slate hover:text-brand-silver transition-colors font-display tracking-wider text-sm"
              >
                <Linkedin size={18} />
                CONNECT ON LINKEDIN
              </a>
              <div className="h-px w-12 bg-brand-silver/30" />
              <p className="font-heading italic text-brand-silver">Leadership Excellence</p>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}