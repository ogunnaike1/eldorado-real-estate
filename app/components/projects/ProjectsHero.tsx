"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const featured = [
  { image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80", title: "The Meridian Tower", location: "Banana Island, Lagos", tag: "Flagship", desc: "A 32-storey landmark redefining skyline luxury with panoramic views and world-class amenities." },
  { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80", title: "Cascade Residences", location: "Ikoyi, Lagos", tag: "Now Selling", desc: "Intimate boutique apartments designed for discerning professionals who value privacy and elegance." },
  { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80", title: "Azure Waterfront", location: "Banana Island, Lagos", tag: "Coming Soon", desc: "Expansive waterfront villas with private docks, infinity pools, and bespoke interiors." },
  { image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80", title: "The Grand Hotel", location: "Eko Atlantic, Lagos", tag: "Hospitality", desc: "A 5-star boutique hotel blending Nigerian heritage with contemporary luxury hospitality." },
];

const bgV: Variants = {
  enter: (d: number) => ({ opacity: 0, scale: 1.08, x: d > 0 ? 80 : -80 }),
  center: { opacity: 1, scale: 1, x: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  exit: (d: number) => ({ opacity: 0, scale: 1.04, x: d > 0 ? -80 : 80, transition: { duration: 0.8 } }),
};

export default function ProjectsHero() {
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const next = useCallback(() => { setDir(1); setCur(p => (p + 1) % featured.length); }, []);
  const prev = useCallback(() => { setDir(-1); setCur(p => (p - 1 + featured.length) % featured.length); }, []);

  useEffect(() => { const t = setInterval(next, 6000); return () => clearInterval(t); }, [next]);

  const s = featured[cur];

  return (
    <section className="relative h-[85vh] min-h-[550px] lg:h-screen w-full overflow-hidden bg-brand-dark">
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div key={cur} custom={dir} variants={bgV} initial="enter" animate="center" exit="exit" className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${s.image}')` }} />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/50 to-brand-dark/30 z-[1]" />
      <div className="absolute inset-0 bg-brand-dark/20 z-[1]" />

      <div className="relative z-10 h-full flex items-center px-5 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div key={cur}>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } }} exit={{ opacity: 0 }}
                className="inline-block font-body text-[10px] font-semibold tracking-ultrawide uppercase bg-white/10 backdrop-blur-md border border-white/10 text-white/70 px-3 py-1.5 mb-5">
                {s.tag}
              </motion.span>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.7 } }} exit={{ opacity: 0, y: -15, transition: { duration: 0.25 } }}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] mb-3">
                {s.title}
              </motion.h1>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }} exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-white/40 mb-4">
                <MapPin size={13} /><span className="font-body text-xs tracking-wider">{s.location}</span>
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.6 } }} exit={{ opacity: 0 }}
                className="font-body text-sm sm:text-base text-white/50 leading-relaxed max-w-md mb-7">
                {s.desc}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.65, duration: 0.6 } }} exit={{ opacity: 0 }}>
                <Link href="#" className="btn-white">View Project <ArrowRight size={15} className="ml-2" /></Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 sm:bottom-10 right-5 sm:right-8 md:right-12 z-20 flex items-center gap-3">
        <div className="flex items-center gap-2 mr-4">
          {featured.map((_, i) => (
            <button key={i} onClick={() => { setDir(i > cur ? 1 : -1); setCur(i); }}
              className={`h-[2px] rounded-full transition-all duration-700 ${i === cur ? "w-8 bg-white" : "w-3 bg-white/20"}`} />
          ))}
        </div>
        <button onClick={prev} className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/30 transition-all"><ChevronLeft size={16} /></button>
        <button onClick={next} className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/30 transition-all"><ChevronRight size={16} /></button>
      </div>
    </section>
  );
}