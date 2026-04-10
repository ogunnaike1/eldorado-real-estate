"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react";

const slides = [
  { image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80", tag: "Market Insight", title: "The Future of Luxury Real Estate in Lagos", date: "March 2026", read: "8 min" },
  { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80", tag: "Investment", title: "Why Banana Island Remains Africa's Most Valuable Address", date: "February 2026", read: "6 min" },
  { image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80", tag: "Architecture", title: "Smart Buildings: Technology Meets Luxury Living", date: "January 2026", read: "5 min" },
];

const bgV: Variants = {
  enter: (d: number) => ({ opacity: 0, scale: 1.08 }),
  center: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  exit: () => ({ opacity: 0, scale: 1.03, transition: { duration: 0.7 } }),
};

export default function BlogHero() {
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const next = useCallback(() => { setDir(1); setCur(p => (p + 1) % slides.length); }, []);
  const prev = useCallback(() => { setDir(-1); setCur(p => (p - 1 + slides.length) % slides.length); }, []);
  useEffect(() => { const t = setInterval(next, 6500); return () => clearInterval(t); }, [next]);
  const s = slides[cur];

  return (
    <section className="relative h-[70vh] min-h-[450px] lg:h-[80vh] w-full overflow-hidden bg-brand-dark">
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div key={cur} custom={dir} variants={bgV} initial="enter" animate="center" exit="exit" className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${s.image}')` }} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-brand-dark/50 z-[1]" />

      <div className="relative z-10 h-full flex items-end px-5 sm:px-8 md:px-12 lg:px-20 pb-14 sm:pb-20">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={cur}>
              <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }} exit={{ opacity: 0 }}
                className="inline-block font-body text-[10px] font-semibold tracking-ultrawide uppercase bg-white/10 backdrop-blur-md border border-white/10 text-white/70 px-3 py-1.5 mb-4">
                {s.tag}
              </motion.span>
              <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.7 } }} exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] mb-4">
                {s.title}
              </motion.h1>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.55 } }} exit={{ opacity: 0 }}
                className="flex items-center gap-4 text-white/35 font-body text-xs tracking-wider">
                <span>{s.date}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="flex items-center gap-1"><Clock size={11} />{s.read} read</span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 sm:bottom-10 right-5 sm:right-8 md:right-12 z-20 flex items-center gap-3">
        {slides.map((_, i) => <button key={i} onClick={() => { setDir(i > cur ? 1 : -1); setCur(i); }} className={`h-[2px] rounded-full transition-all duration-700 ${i === cur ? "w-8 bg-white" : "w-3 bg-white/20"}`} />)}
        <button onClick={prev} className="w-10 h-10 ml-3 flex items-center justify-center border border-white/15 text-white/40 hover:text-white transition-all"><ChevronLeft size={16} /></button>
        <button onClick={next} className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/40 hover:text-white transition-all"><ChevronRight size={16} /></button>
      </div>
    </section>
  );
}