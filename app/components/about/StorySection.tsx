"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "../lib/animations";

export default function StorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="section-pad bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image Side */}
          <motion.div variants={fadeUp} custom={0} className="relative">
            <div className="relative">
              <div
                className="aspect-[4/5] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80')",
                }}
              />
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-4 sm:right-auto sm:-left-6 bg-brand-slate text-white p-5 sm:p-6 shadow-xl max-w-[200px]">
                <p className="font-display text-3xl sm:text-4xl text-white mb-1">
                  10+
                </p>
                <p className="font-body text-[10px] tracking-ultrawide uppercase text-white/50">
                  Years of Delivering Excellence
                </p>
              </div>
            </div>
            {/* Decorative border */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-brand-silver/20 hidden lg:block" />
          </motion.div>

          {/* Text Side */}
          <div>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="section-label mb-3"
            >
              Who We Are
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={2}
              className="section-title mb-6"
            >
              A Legacy of{" "}
              <span className="font-heading italic text-brand-silver">
                Precision
              </span>{" "}
              & Purpose
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={3}
              className="font-body text-base sm:text-lg text-brand-slate/60 leading-relaxed mb-5"
            >
              Founded in 2014, Eldorado Real Estate set out with a singular
              vision — to redefine what luxury means in the Nigerian real
              estate landscape. We don&apos;t build houses. We engineer
              experiences, craft legacies, and create landmarks that stand
              as testaments to human ambition.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={4}
              className="font-body text-base sm:text-lg text-brand-slate/60 leading-relaxed mb-8"
            >
              From foundation to finishing, every Eldorado project undergoes
              an uncompromising process of research, design, and execution.
              We partner with world-renowned architects, source premium
              materials globally, and employ cutting-edge building
              technologies to deliver properties that exceed expectations.
            </motion.p>

            {/* Quick Stats Row */}
            <motion.div
              variants={fadeUp}
              custom={5}
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-brand-ice"
            >
              {[
                { val: "3,200+", label: "Units Delivered" },
                { val: "₦85B+", label: "Portfolio Value" },
                { val: "15+", label: "Active Projects" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-xl sm:text-2xl md:text-3xl text-brand-slate">
                    {stat.val}
                  </p>
                  <p className="font-body text-[10px] sm:text-xs tracking-wider text-brand-silver mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}