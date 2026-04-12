"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-brand-dark flex items-center justify-center relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-white/[0.06]" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-white/[0.06]" />

      <div className="relative z-10 text-center px-5 sm:px-8 max-w-lg">
        {/* Large 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-[8rem] sm:text-[10rem] md:text-[12rem] leading-none text-white/[0.04] select-none">
            404
          </h1>
        </motion.div>

        {/* Content overlapping the 404 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="-mt-20 sm:-mt-24"
        >
          <p className="font-body text-[10px] sm:text-[11px] font-semibold tracking-megawide uppercase text-white/30 mb-4">
            Page Not Found
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-[1.15] mb-4">
            This Page Doesn&apos;t{" "}
            <span className="font-heading italic text-brand-silver">Exist</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-white/40 leading-relaxed mb-10">
            The page you&apos;re looking for may have been moved, deleted, or
            never existed. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-white">
              <Home size={15} className="mr-2" />
              Back to Home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-7 py-3 font-body text-xs sm:text-sm font-semibold tracking-wider uppercase border border-white/20 text-white hover:bg-white/10 transition-all duration-500"
            >
              <Search size={15} className="mr-2" />
              Browse Projects
            </Link>
          </div>
        </motion.div>

        {/* Helpful links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-white/[0.06]"
        >
          <p className="font-body text-[10px] tracking-ultrawide uppercase text-white/20 mb-4">
            Popular Pages
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "About Us", href: "/about" },
              { label: "Projects", href: "/projects" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
              { label: "Careers", href: "/careers" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-xs text-white/30 hover:text-white/60 transition-colors tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}