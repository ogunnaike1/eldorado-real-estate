"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Bed, Bath, Maximize, Calendar, Ruler, Building2 } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";
import { Project } from "../lib/projectData";

export default function ProjectInfo({ project }: { project: Project }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const specs = [
    ...(project.beds ? [{ icon: Bed, label: "Bedrooms", value: String(project.beds) }] : []),
    ...(project.baths ? [{ icon: Bath, label: "Bathrooms", value: String(project.baths) }] : []),
    { icon: Maximize, label: "Size", value: `${project.sqft} sqft` },
    { icon: Calendar, label: "Completion", value: project.completionDate },
    { icon: Building2, label: "Architect", value: project.architect },
  ];

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — Text (3 cols) */}
          <div className="lg:col-span-3">
            <motion.div variants={fadeUp} custom={0} className="flex flex-wrap items-center gap-3 mb-4">
              <span className="font-body text-[10px] font-semibold tracking-ultrawide uppercase bg-brand-slate text-white px-3 py-1.5">{project.status}</span>
              <span className="font-body text-[10px] font-semibold tracking-ultrawide uppercase bg-brand-ice text-brand-silver px-3 py-1.5">{project.category}</span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-slate leading-[1.1] mb-3">
              {project.title}
            </motion.h1>

            <motion.div variants={fadeUp} custom={2} className="flex items-center gap-1.5 text-brand-silver mb-6">
              <MapPin size={14} />
              <span className="font-body text-sm tracking-wider">{project.location}</span>
            </motion.div>

            <motion.p variants={fadeUp} custom={3} className="font-body text-lg text-brand-slate/50 leading-relaxed mb-6">
              {project.longDescription.split("\n\n").map((para, i) => (
                <span key={i} className="block mb-4">{para}</span>
              ))}
            </motion.p>

            <motion.div variants={fadeUp} custom={4}>
              <p className="font-display text-2xl sm:text-3xl text-brand-slate">{project.price}</p>
            </motion.div>
          </div>

          {/* Right — Specs Card (2 cols) */}
          <motion.div variants={fadeUp} custom={3} className="lg:col-span-2">
            <div className="bg-brand-ice p-6 sm:p-8 sticky top-24">
              <h3 className="font-display text-lg text-brand-slate mb-6">Project Specifications</h3>
              <div className="space-y-4">
                {specs.map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div key={spec.label} className="flex items-center justify-between py-3 border-b border-white">
                      <div className="flex items-center gap-3">
                        <Icon size={16} className="text-brand-silver" strokeWidth={1.5} />
                        <span className="font-body text-sm text-brand-silver">{spec.label}</span>
                      </div>
                      <span className="font-body text-sm font-semibold text-brand-slate">{spec.value}</span>
                    </div>
                  );
                })}
              </div>
              <a href="#inquiry" className="btn-primary w-full mt-6 text-center">
                Enquire About This Property
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}