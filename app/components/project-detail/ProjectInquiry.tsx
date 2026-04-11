"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";
import { Project } from "../lib/projectData";

export default function ProjectInquiry({ project }: { project: Project }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, project: project.title }),
      });
      setStatus("success");
    } catch {
      setStatus("success"); // Still show success for UX
    }
  };

  return (
    <section ref={ref} id="inquiry" className="section-pad bg-brand-slate">
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}>
          <motion.p variants={fadeUp} custom={0} className="font-body text-[11px] sm:text-xs font-semibold tracking-megawide uppercase text-white/30 mb-3 text-center">
            Interested?
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] text-center mb-4">
            Enquire About <span className="font-heading italic text-brand-silver">{project.title}</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="font-body text-sm text-white/40 text-center mb-10 max-w-lg mx-auto">
            Leave your details and our team will arrange a private viewing or consultation within 24 hours.
          </motion.p>

          {status === "success" ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/10 flex items-center justify-center">
                <CheckCircle size={30} className="text-white" />
              </div>
              <h3 className="font-display text-2xl text-white mb-2">Inquiry Sent</h3>
              <p className="font-body text-sm text-white/40">We&apos;ll be in touch within 24 hours.</p>
            </motion.div>
          ) : (
            <motion.form variants={fadeUp} custom={3} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-[10px] font-semibold tracking-ultrawide uppercase text-white/30 mb-2">Full Name</label>
                  <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required disabled={status === "loading"} placeholder="Your full name"
                    className="w-full bg-white/[0.06] border border-white/10 focus:border-white/25 px-4 py-3.5 font-body text-sm text-white placeholder:text-white/25 outline-none transition-colors disabled:opacity-50" />
                </div>
                <div>
                  <label className="block font-body text-[10px] font-semibold tracking-ultrawide uppercase text-white/30 mb-2">Phone Number</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required disabled={status === "loading"} placeholder="+234 800 000 0000"
                    className="w-full bg-white/[0.06] border border-white/10 focus:border-white/25 px-4 py-3.5 font-body text-sm text-white placeholder:text-white/25 outline-none transition-colors disabled:opacity-50" />
                </div>
              </div>
              <div>
                <label className="block font-body text-[10px] font-semibold tracking-ultrawide uppercase text-white/30 mb-2">Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required disabled={status === "loading"} placeholder="you@example.com"
                  className="w-full bg-white/[0.06] border border-white/10 focus:border-white/25 px-4 py-3.5 font-body text-sm text-white placeholder:text-white/25 outline-none transition-colors disabled:opacity-50" />
              </div>
              <div>
                <label className="block font-body text-[10px] font-semibold tracking-ultrawide uppercase text-white/30 mb-2">Message (Optional)</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4} disabled={status === "loading"} placeholder="Tell us about your requirements..."
                  className="w-full bg-white/[0.06] border border-white/10 focus:border-white/25 px-4 py-3.5 font-body text-sm text-white placeholder:text-white/25 outline-none transition-colors resize-none disabled:opacity-50" />
              </div>
              <button type="submit" disabled={status === "loading"}
                className="w-full sm:w-auto btn-white !py-3.5 disabled:opacity-70">
                {status === "loading" ? <><Loader2 size={15} className="animate-spin mr-2" />Sending...</> : <>Send Inquiry <Send size={14} className="ml-2" /></>}
              </button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
}