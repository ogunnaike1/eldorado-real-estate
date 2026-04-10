"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { fadeUp,  staggerContainer} from "../lib/animations";

const testimonials = [
  {
    name: "Adebayo Ogunlesi",
    role: "CEO, Atlantic Capital Group",
    text: "Eldorado exceeded every expectation. The attention to detail in our Banana Island villa was extraordinary — from the Italian marble to the home automation. They don't just build homes, they create experiences.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Chidinma Nwosu",
    role: "Managing Director, Zenith Investments",
    text: "We invested in three Eldorado properties and the returns have been outstanding. Their market insight and build quality are unmatched in the Nigerian luxury real estate space.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80",
  },
  {
    name: "Emeka Okafor",
    role: "Founder, Meridian Holdings",
    text: "The Meridian Tower penthouse is unlike anything else in Lagos. Eldorado's team delivered a world-class product that rivals the best developments in Dubai and London. Truly remarkable craftsmanship.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    name: "Amara Eze",
    role: "Partner, West Africa Ventures",
    text: "From the first consultation to handover, the process was seamless. The Eldorado brand stands for trust, quality, and innovation. Our family home in Ikoyi is a masterpiece.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const next = useCallback(
    () => setCurrent((p) => (p + 1) % testimonials.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length),
    []
  );

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

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
            Testimonials
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="section-title">
            What Our{" "}
            <span className="font-heading italic text-brand-silver">Clients</span>{" "}
            Say
          </motion.h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={2}
          className="relative max-w-3xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm border border-brand-ice relative"
            >
              {/* Quote Icon */}
              <Quote
                size={40}
                className="text-brand-ice absolute top-6 right-6 sm:top-8 sm:right-8 hidden sm:block"
              />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className="text-brand-slate fill-brand-slate"
                  />
                ))}
              </div>

              {/* Quote Text */}
              <p className="font-body text-base sm:text-lg md:text-xl text-brand-slate/80 leading-relaxed mb-8 max-w-2xl">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cover bg-center shrink-0 border-2 border-brand-ice"
                  style={{ backgroundImage: `url('${t.image}')` }}
                />
                <div>
                  <p className="font-display text-base sm:text-lg text-brand-slate">
                    {t.name}
                  </p>
                  <p className="font-body text-xs sm:text-sm text-brand-silver">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 sm:mt-8">
            <div className="flex items-center gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-0.75 rounded-full transition-all duration-600 ${
                    i === current
                      ? "w-8 sm:w-10 bg-brand-slate"
                      : "w-3 bg-brand-silver/30 hover:bg-brand-silver/50"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 flex items-center justify-center border border-brand-silver/30 text-brand-silver hover:text-brand-slate hover:border-brand-slate transition-all duration-400"
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 flex items-center justify-center border border-brand-silver/30 text-brand-silver hover:text-brand-slate hover:border-brand-slate transition-all duration-400"
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
