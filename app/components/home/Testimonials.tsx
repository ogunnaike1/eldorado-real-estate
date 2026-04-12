"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Award, Clock, Handshake } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

const trustSignals = [
  {
    icon: Shield,
    title: "Verified Developer",
    desc: "Fully registered with the Corporate Affairs Commission and compliant with all Nigerian real estate regulations.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    desc: "Every project is built with premium materials sourced globally and inspected at every stage of construction.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "We commit to realistic timelines and deliver on schedule. No surprises, no delays, no excuses.",
  },
  {
    icon: Handshake,
    title: "Transparent Process",
    desc: "Clear pricing, documented agreements, and regular progress updates throughout your investment journey.",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="section-pad bg-brand-ice overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <motion.p variants={fadeUp} custom={0} className="section-label mb-3">
            Why Trust Us
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="section-title">
            Our{" "}
            <span className="font-heading italic text-brand-silver">
              Promise
            </span>{" "}
            to You
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="font-body text-sm sm:text-base text-brand-slate/50 leading-relaxed mt-4"
          >
            We&apos;re building a reputation one project at a time. Here&apos;s
            what you can count on when you partner with Eldorado.
          </motion.p>
        </motion.div>

        {/* Trust Signal Cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {trustSignals.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                className="bg-white p-6 sm:p-7 text-center group hover:shadow-lg hover:shadow-brand-slate/[0.04] transition-all duration-500 border border-transparent hover:border-brand-silver/15"
              >
                <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center border border-brand-silver/20 group-hover:border-brand-slate/30 group-hover:scale-110 transition-all duration-500">
                  <Icon
                    size={22}
                    className="text-brand-silver group-hover:text-brand-slate transition-colors duration-500"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-display text-lg text-brand-slate mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-brand-slate/45 leading-relaxed">
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