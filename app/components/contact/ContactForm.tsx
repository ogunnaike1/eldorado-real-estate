"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

export default function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", project: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus("success");
    } catch {
      setStatus("success");
    }
  };

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Form */}
          <div>
            <motion.p variants={fadeUp} custom={0} className="section-label mb-3">Send a Message</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="section-title mb-8">
              We&apos;d Love to <span className="font-heading italic text-brand-silver">Hear</span> From You
            </motion.h2>

            {status === "success" ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16 bg-brand-ice">
                <CheckCircle size={40} className="mx-auto mb-4 text-brand-slate" />
                <h3 className="font-display text-2xl text-brand-slate mb-2">Message Sent</h3>
                <p className="font-body text-sm text-brand-silver">We&apos;ll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <motion.form variants={fadeUp} custom={2} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-[10px] font-semibold tracking-ultrawide uppercase text-brand-silver mb-2">Full Name</label>
                    <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required disabled={status === "loading"} placeholder="John Doe"
                      className="w-full bg-brand-ice border border-transparent focus:border-brand-slate/20 px-4 py-3.5 font-body text-sm text-brand-slate placeholder:text-brand-silver/50 outline-none transition-colors disabled:opacity-50" />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] font-semibold tracking-ultrawide uppercase text-brand-silver mb-2">Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required disabled={status === "loading"} placeholder="+234 800 000 0000"
                      className="w-full bg-brand-ice border border-transparent focus:border-brand-slate/20 px-4 py-3.5 font-body text-sm text-brand-slate placeholder:text-brand-silver/50 outline-none transition-colors disabled:opacity-50" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-[10px] font-semibold tracking-ultrawide uppercase text-brand-silver mb-2">Email Address</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required disabled={status === "loading"} placeholder="you@example.com"
                    className="w-full bg-brand-ice border border-transparent focus:border-brand-slate/20 px-4 py-3.5 font-body text-sm text-brand-slate placeholder:text-brand-silver/50 outline-none transition-colors disabled:opacity-50" />
                </div>
                <div>
                  <label className="block font-body text-[10px] font-semibold tracking-ultrawide uppercase text-brand-silver mb-2">I&apos;m Interested In</label>
                  <select name="project" value={form.project} onChange={handleChange} disabled={status === "loading"}
                    className="w-full bg-brand-ice border border-transparent focus:border-brand-slate/20 px-4 py-3.5 font-body text-sm text-brand-slate outline-none transition-colors appearance-none cursor-pointer disabled:opacity-50">
                    <option value="">Select an option</option>
                    <option>Luxury Residences</option>
                    <option>Commercial Spaces</option>
                    <option>Investment Opportunities</option>
                    <option>Partnership</option>
                    <option>General Enquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block font-body text-[10px] font-semibold tracking-ultrawide uppercase text-brand-silver mb-2">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5} disabled={status === "loading"} placeholder="Tell us how we can help..."
                    className="w-full bg-brand-ice border border-transparent focus:border-brand-slate/20 px-4 py-3.5 font-body text-sm text-brand-slate placeholder:text-brand-silver/50 outline-none transition-colors resize-none disabled:opacity-50" />
                </div>
                <button type="submit" disabled={status === "loading"} className="btn-primary w-full sm:w-auto disabled:opacity-70">
                  {status === "loading" ? <><Loader2 size={15} className="animate-spin mr-2" />Sending...</> : <>Send Message <Send size={14} className="ml-2" /></>}
                </button>
              </motion.form>
            )}
          </div>

          {/* Map */}
          <motion.div variants={fadeUp} custom={3} className="relative">
            <div className="sticky top-24">
              <div className="aspect-square lg:aspect-auto lg:h-[560px] overflow-hidden bg-brand-ice">
                <iframe
                  src="https://maps.google.com/maps?q=6.4281,3.4219&z=14&output=embed"
                  width="100%" height="100%" style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen loading="lazy"
                  title="Eldorado Real Estate office location"
                />
              </div>
              <div className="bg-brand-slate p-5 flex items-center justify-between">
                <div>
                  <p className="font-body text-xs text-white/40">Head Office</p>
                  <p className="font-body text-sm text-white">Plot 12, Victoria Island, Lagos</p>
                </div>
                <a href="https://www.google.com/maps/dir/?api=1&destination=6.4281,3.4219" target="_blank" rel="noopener noreferrer"
                  className="font-body text-xs font-semibold tracking-ultrawide uppercase text-white/60 hover:text-white transition-colors">
                  Directions →
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}