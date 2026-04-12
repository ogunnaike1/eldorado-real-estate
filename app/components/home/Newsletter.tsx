"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Shield, Loader2, CheckCircle } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

export default function Newsletter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // 1. ADD STATE
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // 2. ADD SUBMIT HANDLER
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

      if (!res.ok) throw new Error("Failed to subscribe");

      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("error");
      // Reset error after 3 seconds so user can try again
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
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-dark/30 to-transparent" />

          <div className="relative z-10 px-6 sm:px-10 md:px-14 lg:px-20 py-14 md:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Text */}
              <div>
                <motion.p variants={fadeUp} custom={0} className="font-body text-[11px] sm:text-xs font-semibold tracking-megawide uppercase text-white/35 mb-3">
                  Stay Updated
                </motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] text-white leading-[1.15] mb-4">
                  Get Exclusive Access to <span className="font-heading italic text-brand-silver">New Listings</span>
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="font-body text-sm sm:text-base text-white/45 leading-relaxed max-w-md">
                  Be the first to know about our latest developments, investment opportunities, and exclusive previews.
                </motion.p>
              </div>

              {/* Form */}
              <motion.div variants={fadeUp} custom={3}>
                {status === "success" ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-4 bg-white/10 border border-white/20 p-6 rounded-sm"
                  >
                    <CheckCircle className="text-brand-silver" size={32} />
                    <div>
                      <p className="text-white font-display text-lg">You're on the list!</p>
                      <p className="text-white/50 text-sm font-body">Watch your inbox for our latest updates.</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        disabled={status === "loading"}
                        className="flex-1 bg-white/[0.08] border border-white/10 px-5 py-3.5 sm:py-4 font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors duration-400 disabled:opacity-50"
                      />
                      <button 
                        type="submit"
                        disabled={status === "loading"}
                        className="btn-white flex-shrink-0 !py-3.5 sm:!py-4 flex items-center justify-center min-w-[140px]"
                      >
                        {status === "loading" ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <>
                            Subscribe
                            <ArrowRight size={15} className="ml-2" />
                          </>
                        )}
                      </button>
                    </div>
                    {status === "error" && (
                      <p className="text-red-400 text-xs mt-2 font-body">Something went wrong. Please try again.</p>
                    )}
                  </form>
                )}
                
                <div className="flex items-center gap-2 mt-4 text-white/25">
                  <Shield size={13} />
                  <span className="font-body text-xs">
                    We respect your privacy. Unsubscribe at any time.
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}