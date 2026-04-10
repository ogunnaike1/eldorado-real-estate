"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Eye, Gem, Target, Handshake, Lightbulb } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    desc: "Transparency and honesty form the foundation of every relationship we build — with clients, partners, and communities.",
  },
  {
    icon: Eye,
    title: "Vision",
    desc: "We see beyond the blueprint. Every project begins with a bold vision of what luxury living should feel like.",
  },
  {
    icon: Gem,
    title: "Excellence",
    desc: "We don't do things 10% better — we do things 10 times better. Mediocrity has no place in the Eldorado standard.",
  },
  {
    icon: Target,
    title: "Precision",
    desc: "From design to delivery, we meticulously dot every i and cross every t to create flawless masterpieces.",
  },
  {
    icon: Handshake,
    title: "Trust",
    desc: "Our track record speaks for itself. We deliver on every promise and stand behind every structure we build.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We embrace cutting-edge technologies — smart home automation, sustainable building, and future-proof engineering.",
  },
];

export default function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="section-pad bg-brand-ice">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <motion.p variants={fadeUp} custom={0} className="section-label mb-3">
            What Drives Us
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="section-title">
            Our Core{" "}
            <span className="font-heading italic text-brand-silver">
              Values
            </span>
          </motion.h2>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {values.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                className="bg-white p-6 sm:p-8 group hover:shadow-lg hover:shadow-brand-slate/[0.04] transition-all duration-500 border border-transparent hover:border-brand-silver/15"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-brand-silver/20 mb-5 group-hover:border-brand-slate/30 group-hover:scale-110 transition-all duration-500">
                  <Icon
                    size={22}
                    className="text-brand-silver group-hover:text-brand-slate transition-colors duration-500"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-display text-lg sm:text-xl text-brand-slate mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-brand-slate/50 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}