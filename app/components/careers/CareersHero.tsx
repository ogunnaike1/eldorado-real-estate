"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80", title: "Build Your Career\nWith Purpose" },
  { image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80", title: "Where Talent Meets\nOpportunity" },
  { image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80", title: "Join the Team Behind\nExcellence" },
];

const bgV: Variants = {
  enter: () => ({ opacity: 0, scale: 1.1 }),
  center: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } },
  exit: () => ({ opacity: 0, transition: { duration: 0.7 } }),
};

export default function CareersHero() {
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const next = useCallback(() => { setDir(1); setCur(p => (p + 1) % slides.length); }, []);
  const prev = useCallback(() => { setDir(-1); setCur(p => (p - 1 + slides.length) % slides.length); }, []);
  useEffect(() => { const t = setInterval(next, 5500); return () => clearInterval(t); }, [next]);

  return (
    <section className="relative h-[75vh] min-h-[500px] lg:h-[85vh] overflow-hidden bg-brand-dark">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div key={cur} variants={bgV} initial="enter" animate="center" exit="exit" className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${slides[cur].image}')` }} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-brand-dark/50 z-[1]" />

      <div className="relative z-10 h-full flex items-center justify-center text-center px-5 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div key={cur}>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }} exit={{ opacity: 0 }}
              className="font-body text-[10px] sm:text-[11px] font-semibold tracking-megawide uppercase text-white/40 mb-5">Careers at Eldorado</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.7 } }} exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] whitespace-pre-line max-w-3xl">
              {slides[cur].title}
            </motion.h1>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <button onClick={prev} className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/40 hover:text-white transition-all"><ChevronLeft size={16} /></button>
        {slides.map((_, i) => <button key={i} onClick={() => { setDir(i > cur ? 1 : -1); setCur(i); }} className={`h-[2px] rounded-full transition-all duration-700 ${i === cur ? "w-8 bg-white" : "w-3 bg-white/20"}`} />)}
        <button onClick={next} className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/40 hover:text-white transition-all"><ChevronRight size={16} /></button>
      </div>
    </section>
  );
}