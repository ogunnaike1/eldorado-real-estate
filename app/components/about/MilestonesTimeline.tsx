"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "../lib/animations";

const milestones = [
  {
    year: "2014",
    title: "Eldorado Founded",
    desc: "Established with a vision to transform the luxury real estate landscape in Nigeria. First office opened in Victoria Island, Lagos.",
  },
  {
    year: "2016",
    title: "First Project Delivered",
    desc: "Completed the Emerald Residences — 12 luxury apartments in Ikoyi that sold out before completion, setting the tone for our brand.",
  },
  {
    year: "2018",
    title: "African Property Award",
    desc: "Won Best Residential Real Estate Developer at the International African Property Awards, gaining continental recognition.",
  },
  {
    year: "2020",
    title: "Expansion to Abuja",
    desc: "Launched the Pinnacle One commercial complex in Maitama, marking our first project outside Lagos and entering a new market.",
  },
  {
    year: "2022",
    title: "Banana Island Landmark",
    desc: "Broke ground on the Meridian Tower — a 32-storey high-rise set to become the tallest residential building on Banana Island.",
  },
  {
    year: "2024",
    title: "₦85B Portfolio Milestone",
    desc: "Portfolio surpassed ₦85 billion in total value across 15+ active projects spanning residential, commercial, and hospitality.",
  },
  {
    year: "2025",
    title: "International Expansion",
    desc: "Entered the Dubai and Johannesburg markets with two landmark mixed-use developments, bringing the Eldorado standard to a global audience.",
  },
];

export default function MilestonesTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section ref={ref} className="section-pad bg-brand-dark overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-14 md:mb-20"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="font-body text-[11px] sm:text-xs font-semibold tracking-megawide uppercase text-white/30 mb-3"
          >
            Our Journey
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-[1.1]"
          >
            Key{" "}
            <span className="font-heading italic text-brand-silver">
              Milestones
            </span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/10 to-transparent" />

          <div className="space-y-10 md:space-y-0">
            {milestones.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <TimelineItem
                  key={item.year}
                  item={item}
                  index={i}
                  isLeft={isLeft}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
  isLeft,
}: {
  item: (typeof milestones)[0];
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative flex items-start sm:items-center gap-6 sm:gap-0 md:py-8 ${
        isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
      }`}
    >
      {/* Dot */}
      <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-slate border-2 border-white/20 z-10 mt-1 sm:mt-0" />

      {/* Content Card */}
      <div
        className={`ml-10 sm:ml-0 sm:w-1/2 ${
          isLeft ? "sm:pr-12 md:pr-16 sm:text-right" : "sm:pl-12 md:pl-16"
        }`}
      >
        <span className="font-body text-[10px] font-semibold tracking-megawide uppercase text-white/25">
          {item.year}
        </span>
        <h3 className="font-display text-lg sm:text-xl md:text-2xl text-white mt-1 mb-2">
          {item.title}
        </h3>
        <p className="font-body text-sm text-white/35 leading-relaxed">
          {item.desc}
        </p>
      </div>

      {/* Spacer for the other side */}
      <div className="hidden sm:block sm:w-1/2" />
    </motion.div>
  );
}