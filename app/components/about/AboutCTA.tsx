"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

export default function AboutCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="section-pad bg-brand-ice">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="relative bg-brand-slate overflow-hidden"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-slate via-brand-slate/95 to-brand-slate/80" />

          {/* Dot Pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 px-6 sm:px-10 md:px-14 lg:px-20 py-14 md:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <motion.p
                  variants={fadeUp}
                  custom={0}
                  className="font-body text-[11px] sm:text-xs font-semibold tracking-megawide uppercase text-white/30 mb-3"
                >
                  Let&apos;s Build Together
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] text-white leading-[1.15] mb-4"
                >
                  Ready to Own a Piece of{" "}
                  <span className="font-heading italic text-brand-silver">
                    Excellence
                  </span>
                  ?
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="font-body text-sm sm:text-base text-white/40 leading-relaxed max-w-lg"
                >
                  Whether you&apos;re an investor, homebuyer, or partner — we&apos;d
                  love to show you what Eldorado can build for you. Schedule a
                  private consultation with our team today.
                </motion.p>
              </div>

              <motion.div
                variants={fadeUp}
                custom={3}
                className="flex flex-col sm:flex-row gap-4 lg:justify-end"
              >
                <Link href="/#contact" className="btn-white">
                  Schedule Appointment
                  <ArrowRight size={15} className="ml-2" />
                </Link>
                <a
                  href="tel:+2348000000000"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 font-body text-xs sm:text-sm font-semibold tracking-wider uppercase border border-white/20 text-white hover:bg-white/10 transition-all duration-500"
                >
                  <Phone size={15} />
                  Call Us
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}