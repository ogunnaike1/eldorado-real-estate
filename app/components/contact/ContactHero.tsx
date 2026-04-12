"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contacts = [
  { icon: MapPin, label: "Visit Us", value: "Plot 12, Victoria Island, Lagos", sub: "By appointment only" },
  { icon: Phone, label: "Call Us", value: "+234 706 261 4165", sub: "Mon – Sat, 9AM – 6PM", href: "tel:+2348000000000" },
  { icon: Mail, label: "Email Us", value: "info@eldoradorealestate.com", sub: "We respond within 24 hours", href: "mailto:info@eldoradorealestate.com" },
  { icon: Clock, label: "Office Hours", value: "Monday – Saturday", sub: "9:00 AM – 6:00 PM WAT" },
];

export default function ContactHero() {
  return (
    <>
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-brand-dark/40" />
        <div className="relative z-10 h-full flex items-end px-5 sm:px-8 md:px-12 lg:px-20 pb-14">
          <div>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="font-body text-[10px] sm:text-[11px] font-semibold tracking-megawide uppercase text-white/40 mb-4">Get in Touch</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.08]">
              Contact <span className="font-heading italic text-brand-silver">Us</span>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="bg-white border-b border-brand-ice">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((c, i) => {
            const Icon = c.icon;
            const Tag = c.href ? "a" : "div";
            return (
              <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                className="text-center py-10 px-6 border-b sm:border-b-0 sm:border-r border-brand-ice last:border-r-0 last:border-b-0">
                <div className="w-11 h-11 mx-auto mb-4 flex items-center justify-center border border-brand-silver/20">
                  <Icon size={18} className="text-brand-silver" strokeWidth={1.5} />
                </div>
                <p className="font-body text-[10px] font-semibold tracking-ultrawide uppercase text-brand-silver mb-2">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="font-display text-base text-brand-slate hover:text-brand-dark transition-colors block">{c.value}</a>
                ) : (
                  <p className="font-display text-base text-brand-slate">{c.value}</p>
                )}
                <p className="font-body text-xs text-brand-silver mt-1">{c.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}