"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, Calendar, Loader2, AlertCircle } from "lucide-react";

const projectOptions = [
  "The Meridian Tower — Banana Island",
  "Cascade Residences — Ikoyi",
  "Azure Waterfront — Banana Island",
  "Eldorado Plaza — Victoria Island",
  "The Grand Hotel — Eko Atlantic",
  "Sapphire Heights — Lekki",
  "Vertex Business Hub — Abuja",
  "Coral Cove Villas — Banana Island",
  "Other / General Enquiry",
];

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    project: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setForm({ fullName: "", email: "", phone: "", project: "" });
        onClose();
      }, 3000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to submit. Please try again.";
      setErrorMsg(message);
      setStatus("error");
    }
  };

  const handleClose = () => {
    if (status !== "loading") {
      setStatus("idle");
      setErrorMsg("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 z-[150] bg-brand-dark/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div className="bg-white w-full max-w-[480px] shadow-2xl shadow-black/20 pointer-events-auto relative overflow-hidden">
              <div className="h-1 w-full bg-brand-slate" />

              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-brand-silver hover:text-brand-slate hover:bg-brand-ice transition-all duration-300 z-10"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-16 h-16 mx-auto mb-5 rounded-full bg-brand-ice flex items-center justify-center"
                      >
                        <CheckCircle size={30} className="text-brand-slate" />
                      </motion.div>
                      <h3 className="font-display text-2xl text-brand-slate mb-2">
                        Appointment Requested
                      </h3>
                      <p className="font-body text-sm text-brand-silver leading-relaxed">
                        Thank you, {form.fullName.split(" ")[0]}! Our team will
                        reach out within 24 hours to confirm your appointment.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 flex items-center justify-center bg-brand-ice flex-shrink-0">
                          <Calendar size={18} className="text-brand-slate" />
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl text-brand-slate">
                          Schedule Appointment
                        </h3>
                      </div>
                      <p className="font-body text-sm text-brand-silver mb-7">
                        Fill in your details and we&apos;ll arrange a private consultation.
                      </p>

                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-5 font-body text-xs"
                        >
                          <AlertCircle size={15} className="flex-shrink-0" />
                          {errorMsg}
                        </motion.div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label className="block font-body text-[10px] font-semibold tracking-ultrawide uppercase text-brand-silver mb-2">Full Name</label>
                          <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required disabled={status === "loading"} placeholder="e.g. Oluwasomidotun Olajide"
                            className="w-full bg-brand-ice border border-transparent focus:border-brand-slate/20 px-4 py-3 font-body text-sm text-brand-slate placeholder:text-brand-silver/50 outline-none transition-colors duration-300 disabled:opacity-50" />
                        </div>

                        <div>
                          <label className="block font-body text-[10px] font-semibold tracking-ultrawide uppercase text-brand-silver mb-2">Email Address</label>
                          <input type="email" name="email" value={form.email} onChange={handleChange} required disabled={status === "loading"} placeholder="you@example.com"
                            className="w-full bg-brand-ice border border-transparent focus:border-brand-slate/20 px-4 py-3 font-body text-sm text-brand-slate placeholder:text-brand-silver/50 outline-none transition-colors duration-300 disabled:opacity-50" />
                        </div>

                        <div>
                          <label className="block font-body text-[10px] font-semibold tracking-ultrawide uppercase text-brand-silver mb-2">Phone Number</label>
                          <input type="tel" name="phone" value={form.phone} onChange={handleChange} required disabled={status === "loading"} placeholder="+234 706 261 4165"
                            className="w-full bg-brand-ice border border-transparent focus:border-brand-slate/20 px-4 py-3 font-body text-sm text-brand-slate placeholder:text-brand-silver/50 outline-none transition-colors duration-300 disabled:opacity-50" />
                        </div>

                        <div>
                          <label className="block font-body text-[10px] font-semibold tracking-ultrawide uppercase text-brand-silver mb-2">Project of Interest</label>
                          <div className="relative">
                            <select name="project" value={form.project} onChange={handleChange} required disabled={status === "loading"}
                              className="w-full bg-brand-ice border border-transparent focus:border-brand-slate/20 px-4 py-3 font-body text-sm text-brand-slate outline-none transition-colors duration-300 appearance-none cursor-pointer disabled:opacity-50">
                              <option value="" disabled>Select a project</option>
                              {projectOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-silver"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                          </div>
                        </div>

                        <button type="submit" disabled={status === "loading"}
                          className="w-full bg-brand-slate text-white py-3.5 font-body text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors duration-500 active:scale-[0.98] mt-2 disabled:opacity-70 disabled:cursor-not-allowed">
                          {status === "loading" ? (
                            <><Loader2 size={15} className="animate-spin" />Sending...</>
                          ) : (
                            <>Request Appointment<Send size={14} /></>
                          )}
                        </button>
                      </form>

                      <p className="font-body text-[10px] text-brand-silver/60 text-center mt-4 leading-relaxed">
                        Your information is secure and will only be used to arrange your consultation.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}