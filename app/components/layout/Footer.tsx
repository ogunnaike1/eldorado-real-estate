"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight, Loader2, CheckCircle } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/blog" },
    { label: "CSR", href: "/csr" },
  ],
  properties: [
    { label: "Residential", href: "/projects" },
    { label: "Commercial", href: "/projects" },
    { label: "Hospitality", href: "/projects" },
    { label: "New Developments", href: "/projects" },
    { label: "Investment", href: "/projects" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Market Reports", href: "/blog" },
    { label: "Buyer's Guide", href: "/blog" },
    { label: "FAQs", href: "/contact" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/eldoradorealestate", svg: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z" },
  { label: "Twitter / X", href: "https://x.com/eldoradorestate", svg: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/eldoradorealestate", svg: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" },
  { label: "Facebook", href: "https://www.facebook.com/eldoradorealestate", svg: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
  { label: "TikTok", href: "https://www.tiktok.com/@eldoradorealestate", svg: "M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("idle");
    }
  };

  return (
    <footer className="bg-brand-dark">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Newsletter Bar */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-20 xl:px-28 py-10 md:py-14 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl sm:text-2xl text-white">
              Stay <span className="font-heading italic text-brand-silver">Informed</span>
            </h3>
            <p className="font-body text-sm text-white/30 mt-1">Get exclusive updates on new developments</p>
          </div>
          {status === "success" ? (
            <div className="flex items-center gap-2 text-green-400 font-body text-sm">
              <CheckCircle size={16} /> Subscribed successfully!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" required disabled={status === "loading"}
                className="flex-1 lg:w-72 bg-white/[0.06] border border-white/10 px-5 py-3 font-body text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors disabled:opacity-50" />
              <button type="submit" disabled={status === "loading"} className="btn-white !py-3 disabled:opacity-70">
                {status === "loading" ? <Loader2 size={14} className="animate-spin" /> : <>Subscribe <ArrowRight size={14} className="ml-1.5" /></>}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-20 xl:px-28 py-14 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-5">
                <Image src="/images/logo-white.png" alt="Eldorado Real Estate" width={160} height={26} className="h-6 sm:h-7 w-auto opacity-80" />
              </Link>
              <p className="font-body text-sm text-white/35 leading-relaxed max-w-xs mb-6">
                Premium luxury developments crafted for those who demand excellence. Redefining real estate across Nigeria and beyond.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="text-white/25 mt-0.5 flex-shrink-0" />
                  <span className="font-body text-sm text-white/40">Plot 12, Victoria Island,<br />Lagos, Nigeria</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={15} className="text-white/25 flex-shrink-0" />
                  <a href="tel:+2348000000000" className="font-body text-sm text-white/40 hover:text-white/60 transition-colors">+234 800 000 0000</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={15} className="text-white/25 flex-shrink-0" />
                  <a href="mailto:info@eldoradorealestate.com" className="font-body text-sm text-white/40 hover:text-white/60 transition-colors">info@eldoradorealestate.com</a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 lg:col-start-6">
              <h4 className="font-body text-[10px] sm:text-[11px] font-semibold tracking-ultrawide uppercase text-white/25 mb-5">Company</h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.label}><Link href={link.href} className="font-body text-sm text-white/40 hover:text-white/70 transition-colors duration-300">{link.label}</Link></li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-body text-[10px] sm:text-[11px] font-semibold tracking-ultrawide uppercase text-white/25 mb-5">Properties</h4>
              <ul className="space-y-2.5">
                {footerLinks.properties.map((link) => (
                  <li key={link.label}><Link href={link.href} className="font-body text-sm text-white/40 hover:text-white/70 transition-colors duration-300">{link.label}</Link></li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-body text-[10px] sm:text-[11px] font-semibold tracking-ultrawide uppercase text-white/25 mb-5">Resources</h4>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}><Link href={link.href} className="font-body text-sm text-white/40 hover:text-white/70 transition-colors duration-300">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06] px-5 sm:px-8 md:px-12 lg:px-20 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/20 tracking-wider">
            &copy; {new Date().getFullYear()} Eldorado Real Estate. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center border border-white/[0.06] text-white/20 hover:text-white/50 hover:border-white/15 transition-all duration-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.svg} /></svg>
              </a>
            ))}
          </div>

          <div className="flex gap-5">
            <a href="#" className="font-body text-xs text-white/20 hover:text-white/40 tracking-wider transition-colors">Privacy Policy</a>
            <a href="#" className="font-body text-xs text-white/20 hover:text-white/40 tracking-wider transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}