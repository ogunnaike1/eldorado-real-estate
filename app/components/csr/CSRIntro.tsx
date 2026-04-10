"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "../lib/animations";

export default function CSRIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="section-pad bg-white">
      <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}
        className="max-w-3xl mx-auto text-center">
        <motion.p variants={fadeUp} custom={0} className="section-label mb-3">Our Commitment</motion.p>
        <motion.h2 variants={fadeUp} custom={1} className="section-title mb-6">
          Beyond Bricks & <span className="font-heading italic text-brand-silver">Mortar</span>
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="font-body text-base sm:text-lg text-brand-slate/50 leading-relaxed mb-5">
          At Eldorado, we believe that true success is measured not just by the structures we build, but by the lives we transform. Our Corporate Social Responsibility program is rooted in a deep commitment to creating lasting, positive change in every community we serve.
        </motion.p>
        <motion.p variants={fadeUp} custom={3} className="font-body text-base sm:text-lg text-brand-slate/50 leading-relaxed">
          From sponsoring scholarships to renovating schools, from empowering young entrepreneurs to championing green construction — we invest in people, education, and sustainable futures.
        </motion.p>
      </motion.div>
    </section>
  );
}