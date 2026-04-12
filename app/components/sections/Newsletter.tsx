"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Shield, Loader2, CheckCircle } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

export default function Newsletter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section ref={ref} className="section-pad bg-white" id="contact">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="relative bg-brand-slate overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-dark/30 to-transparent" />

          <div className="relative z-10 px-6 sm:px-10 md:px-14 lg:px-20 py-14 md:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <motion.p variants={fadeUp} custom={0} className="font-body text-[11px] sm:text-xs font-semibold tracking-megawide uppercase text-white/35 mb-3">Stay Updated</motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] text-white leading-[1.15] mb-4">
                  Get Exclusive Access to <span className="font-heading italic text-brand-silver">New Listings</span>
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="font-body text-sm sm:text-base text-white/45 leading-relaxed max-w-md">
                  Be the first to know about our latest developments, investment opportunities, and exclusive previews.
                </motion.p>
              </div>

              <motion.div variants={fadeUp} custom={3}>
                {status === "success" ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 bg-white/[0.08] border border-white/10 px-5 py-4">
                    <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                    <div>
                      <p className="font-body text-sm text-white font-semibold">You&apos;re subscribed!</p>
                      <p className="font-body text-xs text-white/40">You&apos;ll receive exclusive updates on new listings and developments.</p>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" required disabled={status === "loading"}
                        className="flex-1 bg-white/[0.08] border border-white/10 px-5 py-3.5 sm:py-4 font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors duration-400 disabled:opacity-50" />
                      <button type="submit" disabled={status === "loading"} className="btn-white flex-shrink-0 !py-3.5 sm:!py-4 disabled:opacity-70">
                        {status === "loading" ? <Loader2 size={15} className="animate-spin" /> : <>Subscribe <ArrowRight size={15} className="ml-2" /></>}
                      </button>
                    </form>
                    {status === "error" && <p className="font-body text-xs text-red-400 mt-3">Something went wrong. Please try again.</p>}
                    <div className="flex items-center gap-2 mt-4 text-white/25">
                      <Shield size={13} />
                      <span className="font-body text-xs">We respect your privacy. Unsubscribe at any time.</span>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}