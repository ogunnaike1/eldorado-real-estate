"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ChevronDown, ArrowRight, Briefcase } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

const departments = ["All", "Engineering", "Design", "Sales", "Operations", "Marketing"];

const roles = [
  { title: "Senior Structural Engineer", dept: "Engineering", location: "Lagos", type: "Full-time", posted: "2 days ago", desc: "Lead structural design and analysis for our flagship high-rise developments. Collaborate with international architecture firms to deliver world-class buildings." },
  { title: "Project Manager — Commercial", dept: "Operations", location: "Abuja", type: "Full-time", posted: "5 days ago", desc: "Oversee end-to-end delivery of commercial projects from pre-construction through handover. Manage contractors, timelines, and budgets." },
  { title: "Interior Design Lead", dept: "Design", location: "Lagos", type: "Full-time", posted: "1 week ago", desc: "Direct the interior design vision for luxury residential projects. Source premium materials, coordinate with international brands, and present to clients." },
  { title: "Digital Marketing Manager", dept: "Marketing", location: "Lagos", type: "Full-time", posted: "1 week ago", desc: "Drive Eldorado's digital presence across social media, paid campaigns, and content marketing. Manage agency relationships and brand consistency." },
  { title: "Investment Sales Associate", dept: "Sales", location: "Lagos", type: "Full-time", posted: "2 weeks ago", desc: "Engage high-net-worth individuals and institutional investors. Present project value propositions, manage the sales pipeline, and close deals." },
  { title: "MEP Engineer", dept: "Engineering", location: "Lagos", type: "Full-time", posted: "2 weeks ago", desc: "Design and supervise mechanical, electrical, and plumbing systems for luxury developments with smart home automation integration." },
  { title: "Brand & Communications Specialist", dept: "Marketing", location: "Lagos", type: "Full-time", posted: "3 weeks ago", desc: "Craft compelling narratives for Eldorado across PR, events, partnerships, and corporate communications." },
  { title: "Quantity Surveyor", dept: "Operations", location: "Abuja", type: "Full-time", posted: "3 weeks ago", desc: "Manage cost planning, procurement, and financial reporting across multiple concurrent development projects." },
];

export default function OpenRoles() {
  const [activeDept, setActiveDept] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const filtered = activeDept === "All" ? roles : roles.filter(r => r.dept === activeDept);

  return (
    <section ref={ref} id="openings" className="section-pad bg-brand-ice">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer} className="text-center mb-10 md:mb-14">
          <motion.p variants={fadeUp} custom={0} className="section-label mb-3">Open Positions</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="section-title">
            Find Your <span className="font-heading italic text-brand-silver">Role</span>
          </motion.h2>
        </motion.div>

        {/* Department Filters */}
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} custom={2}
          className="flex flex-wrap justify-center gap-2 mb-10">
          {departments.map(d => (
            <button key={d} onClick={() => setActiveDept(d)}
              className={`px-4 py-2.5 font-body text-[10px] sm:text-[11px] font-semibold tracking-ultrawide uppercase transition-all duration-400 ${activeDept === d ? "bg-brand-slate text-white shadow-md shadow-brand-slate/15" : "bg-white text-brand-silver hover:text-brand-slate"}`}>
              {d}
            </button>
          ))}
        </motion.div>

        {/* Job Cards */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((role) => (
              <motion.div key={role.title} layout
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-transparent hover:border-brand-silver/15 transition-all duration-400">
                {/* Header Row */}
                <button onClick={() => setExpanded(expanded === role.title ? null : role.title)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base sm:text-lg text-brand-slate mb-1.5 truncate">{role.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-brand-silver font-body text-[10px] sm:text-xs tracking-wider">
                      <span className="flex items-center gap-1"><Briefcase size={11} />{role.dept}</span>
                      <span className="flex items-center gap-1"><MapPin size={11} />{role.location}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{role.type}</span>
                      <span className="text-brand-silver/50">{role.posted}</span>
                    </div>
                  </div>
                  <ChevronDown size={18} className={`text-brand-silver flex-shrink-0 ml-4 transition-transform duration-400 ${expanded === role.title ? "rotate-180" : ""}`} />
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expanded === role.title && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                        <div className="border-t border-brand-ice pt-4">
                          <p className="font-body text-sm text-brand-slate/50 leading-relaxed mb-5">{role.desc}</p>
                          <a href="#" className="btn-primary text-[10px] sm:text-xs">
                            Apply Now <ArrowRight size={13} className="ml-2" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center font-body text-sm text-brand-silver py-12">No open positions in this department right now. Check back soon!</p>
        )}
      </div>
    </section>
  );
}