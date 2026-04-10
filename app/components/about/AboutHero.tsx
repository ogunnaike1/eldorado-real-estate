"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    caption: "Crafting architectural masterpieces since 2014",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    caption: "Where vision meets precision engineering",
  },
  {
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
    caption: "Building legacies across Nigeria and beyond",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
    caption: "Every detail designed with purpose",
  },
];

const bgVariants: Variants = {
  enter: (d: number) => ({
    opacity: 0,
    scale: 1.1,
    x: d > 0 ? 100 : -100,
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (d: number) => ({
    opacity: 0,
    scale: 1.05,
    x: d > 0 ? -100 : 100,
    transition: { duration: 0.9 },
  }),
};

export default function AboutHero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  return (
    <section className="relative h-[85vh] min-h-[550px] lg:h-screen w-full overflow-hidden bg-brand-dark">
      {/* Carousel Background */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 via-brand-dark/30 to-brand-dark/90 z-[1]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-[10px] sm:text-[11px] font-semibold tracking-megawide uppercase text-white/50 mb-5"
        >
          Our Story
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] max-w-4xl mb-6"
        >
          Built on Vision,{" "}
          <span className="font-heading italic text-brand-silver">
            Driven by Excellence
          </span>
        </motion.h1>

        {/* Animated Caption synced to carousel */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-sm sm:text-base text-white/45 max-w-lg"
          >
            {slide.caption}
          </motion.p>
        </AnimatePresence>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span className="font-body text-[9px] tracking-megawide uppercase text-white/25">
            Scroll to explore
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </motion.div>
      </div>

      {/* Carousel Controls — bottom corners */}
      <div className="absolute bottom-10 left-5 sm:left-8 md:left-12 z-20 flex items-center gap-3">
        <button
          onClick={prev}
          className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/30 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={next}
          className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/30 transition-all"
          aria-label="Next"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Slide Progress Dots */}
      <div className="absolute bottom-10 right-5 sm:right-8 md:right-12 z-20 flex items-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`h-[2px] rounded-full transition-all duration-700 ${
              i === current
                ? "w-8 bg-white"
                : "w-3 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}