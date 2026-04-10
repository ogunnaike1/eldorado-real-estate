"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
    label: "Signature Collection",
    title: "Redefining\nLuxury Living",
    subtitle:
      "Discover bespoke residences crafted with meticulous attention to detail in the most prestigious locations.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    label: "New Development",
    title: "The Meridian\nResidences",
    subtitle:
      "A landmark 32-storey tower offering panoramic views, world-class amenities, and an unrivalled lifestyle.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    label: "Now Selling",
    title: "Waterfront\nEstate Villas",
    subtitle:
      "Expansive waterfront homes with private docks, infinity pools, and bespoke interior design by leading architects.",
  },
];

const bgVariants: Variants = {
  enter: (d: number) => ({ opacity: 0, scale: 1.08, x: d > 0 ? 80 : -80 }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (d: number) => ({
    opacity: 0,
    scale: 1.04,
    x: d > 0 ? -80 : 80,
    transition: { duration: 0.8 },
  }),
};

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-brand-dark">
      {/* Background Carousel */}
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
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/20 to-brand-dark/80 z-[1]" />
      <div className="absolute inset-0 bg-brand-dark/25 z-[1]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-[2]" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-[2]" />
      <div className="hidden md:block absolute left-8 lg:left-16 top-1/3 bottom-1/3 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent z-[2]" />

      {/* Glass Card + Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-5 sm:px-8">
        <div className="glass-card rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 lg:p-14 max-w-[680px] w-full text-center">
          <AnimatePresence mode="wait">
            <motion.div key={current}>
              {/* Label */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                className="font-body text-[10px] sm:text-[11px] font-semibold tracking-megawide uppercase text-white/60 mb-4 sm:mb-5"
              >
                {slide.label}
              </motion.p>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.52, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                className="font-display text-[2rem] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.05] text-white whitespace-pre-line mb-4 sm:mb-6"
              >
                {slide.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.64, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                className="font-body text-sm sm:text-base text-white/65 max-w-md mx-auto leading-relaxed mb-6 sm:mb-8"
              >
                {slide.subtitle}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.76, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <Link href="#projects" className="btn-white">
                  Explore Projects
                  <ArrowRight size={15} className="ml-2" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center px-7 py-3 font-body text-xs sm:text-sm font-semibold tracking-wider uppercase border border-white/25 text-white hover:bg-white/10 transition-all duration-500"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-20 flex items-center justify-center gap-6">
        <button
          onClick={prev}
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all duration-400"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`h-[3px] rounded-full transition-all duration-700 ${
                i === current
                  ? "w-8 sm:w-10 bg-white"
                  : "w-3 sm:w-4 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all duration-400"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-6 sm:bottom-10 right-5 sm:right-8 md:right-12 z-20 font-body text-xs text-white/30 tracking-wider hidden md:block">
        <span className="text-white/80 text-sm">{String(current + 1).padStart(2, "0")}</span>
        <span className="mx-1">/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}