"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "../lib/animations";

function AnimatedCounter({ target, suffix = "", prefix = "", decimals = 0 }: { target: number; suffix?: string; prefix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { 
        setCount(target); 
        clearInterval(timer); 
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString(undefined, { 
        minimumFractionDigits: decimals, 
        maximumFractionDigits: decimals 
      })}
      {suffix}
    </span>
  );
}

const stats = [
  { val: 15, suffix: "+", label: "Billion Portfolio Value", prefix: "₦", decimals: 1 },
  { val: 4, suffix: "", label: "Prime Developments" },
  { val: 98, suffix: "%", label: "Client Satisfaction" },
  { val: 120, suffix: "+", label: "Artisans Empowered" },
  { val: 8, suffix: "", label: "Strategic Partnerships" },
  { val: 24, suffix: "/7", label: "Concierge Support" },
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
          <motion.p variants={fadeUp} custom={0} className="font-body text-[11px] sm:text-xs font-semibold tracking-megawide uppercase text-white/30 mb-3">
            Our Trajectory
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1]">
            Defining Excellence in <span className="font-heading italic text-brand-silver">Numbers</span>
          </motion.h2>
        </motion.div>

        <motion.div 
          initial="hidden" 
          animate={isInView ? "visible" : "hidden"} 
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5 rounded-lg overflow-hidden border border-white/5"
        >
          {stats.map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} custom={i} className="text-center py-10 sm:py-14 bg-brand-dark">
              <p className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-2">
                <AnimatedCounter 
                  target={s.val} 
                  suffix={s.suffix} 
                  prefix={s.prefix || ""} 
                  decimals={s.decimals || 0} 
                />
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