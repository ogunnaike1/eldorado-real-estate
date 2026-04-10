"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Heart, Globe, Lightbulb, Users, Award } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

const perks = [
  { icon: TrendingUp, title: "Growth-First Culture", desc: "Clear career progression paths, quarterly reviews, and leadership development programs to accelerate your trajectory." },
  { icon: Heart, title: "Wellness & Benefits", desc: "Comprehensive health insurance, mental health support, gym memberships, and generous paid time off." },
  { icon: Globe, title: "International Exposure", desc: "Work on projects across Lagos, Abuja, Dubai, and Johannesburg. Travel opportunities and global industry conferences." },
  { icon: Lightbulb, title: "Innovation Lab", desc: "Access to the latest construction technology, design tools, and a culture that rewards creative problem-solving." },
  { icon: Users, title: "World-Class Team", desc: "Collaborate with award-winning architects, engineers, and business leaders from across the globe." },
  { icon: Award, title: "Recognition & Rewards", desc: "Performance bonuses, employee of the quarter awards, profit sharing, and milestone celebration programs." },
];

export default function WhyEldorado() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — Text */}
          <div>
            <motion.p variants={fadeUp} custom={0} className="section-label mb-3">Why Eldorado</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="section-title mb-6">
              More Than a Job — A <span className="font-heading italic text-brand-silver">Mission</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="font-body text-base sm:text-lg text-brand-slate/50 leading-relaxed mb-5">
              At Eldorado, you won&apos;t just clock in and clock out. You&apos;ll be part of a team that&apos;s
              reshaping skylines, transforming communities, and setting new benchmarks for what luxury
              real estate means in Africa.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="font-body text-base sm:text-lg text-brand-slate/50 leading-relaxed mb-8">
              We invest in our people the same way we invest in our projects — with intention,
              excellence, and a long-term vision. Your growth is our growth.
            </motion.p>
            <motion.div variants={fadeUp} custom={4}>
              <a href="#openings" className="btn-primary">
                View Open Positions
              </a>
            </motion.div>
          </div>

          {/* Right — Perks Grid */}
          <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <motion.div key={perk.title} variants={fadeUp} custom={i}
                  className="p-5 sm:p-6 bg-brand-ice group hover:bg-brand-slate transition-all duration-500">
                  <div className="w-10 h-10 flex items-center justify-center border border-brand-silver/20 mb-4 group-hover:border-white/15 transition-colors duration-500">
                    <Icon size={18} className="text-brand-silver group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-base sm:text-lg text-brand-slate group-hover:text-white mb-1.5 transition-colors duration-500">
                    {perk.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-brand-slate/40 group-hover:text-white/50 leading-relaxed transition-colors duration-500">
                    {perk.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}