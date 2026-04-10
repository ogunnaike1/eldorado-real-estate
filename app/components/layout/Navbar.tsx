"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Careers", href: "#careers" },
  { label: "CSR", href: "#csr" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "bg-brand-slate/[0.97] backdrop-blur-lg py-3 shadow-[0_2px_40px_rgba(0,0,0,0.15)]"
            : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="flex items-center justify-between px-5 sm:px-8 md:px-12 lg:px-20">
          {/* Logo */}
          <Link href="/" className="relative z-10 shrink-0">
            <Image
              src={scrolled || isOpen ? "/images/logo-white.png" : "/images/logo-white.png"}
              alt="Eldorado Real Estate"
              width={160}
              height={26}
              className="h-5 sm:h-6 md:h-7 w-auto transition-all duration-500"
              priority
            />
          </Link>

          {/* Desktop Nav — Center */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 xl:px-5 py-2 font-body text-[11px] font-semibold tracking-ultrawide uppercase transition-colors duration-400 group ${
                  scrolled
                    ? "text-white/70 hover:text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-[1.5px] bg-white transition-all duration-500" />
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="#contact"
              className={`hidden md:inline-flex items-center gap-2 px-5 lg:px-6 py-2.5 font-body text-[10px] lg:text-[11px] font-semibold tracking-ultrawide uppercase transition-all duration-500 ${
                scrolled
                  ? "bg-white text-brand-slate hover:bg-brand-ice"
                  : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
              }`}
            >
              Schedule Appointment
              <ChevronRight size={14} />
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-[60] w-10 h-10 flex items-center justify-center text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] bg-brand-slate flex flex-col items-center justify-center lg:hidden"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-3xl sm:text-4xl text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10"
            >
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="btn-white"
              >
                Schedule Appointment
                <ChevronRight size={14} className="ml-2" />
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="absolute bottom-8 font-body text-xs text-white/30 tracking-wider"
            >
              info@eldoradorealestate.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
