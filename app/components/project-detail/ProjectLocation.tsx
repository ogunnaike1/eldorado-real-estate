"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";
import type { Project } from "../lib/projectData";

export default function ProjectLocation({ project }: { project: Project }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const mapUrl = `https://maps.google.com/maps?q=${project.coordinates.lat},${project.coordinates.lng}&z=15&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${project.coordinates.lat},${project.coordinates.lng}`;

  return (
    <section ref={ref} className="section-pad bg-brand-ice">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}>
          <motion.p variants={fadeUp} custom={0} className="section-label mb-3">Location</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="section-title mb-10 md:mb-14">
            Where You&apos;ll <span className="font-heading italic text-brand-silver">Live</span>
          </motion.h2>

          <motion.div variants={fadeUp} custom={2}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2 aspect-[16/10] lg:aspect-auto lg:min-h-[400px] bg-brand-dark overflow-hidden">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing ${project.title} location`}
              />
            </div>

            {/* Location Details */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-slate">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-display text-lg text-brand-slate">{project.location}</p>
                  <p className="font-body text-xs text-brand-silver">{project.title}</p>
                </div>
              </div>

              <p className="font-body text-sm text-brand-slate/50 leading-relaxed mb-6">
                Located in one of the most prestigious neighbourhoods,
                this property offers easy access to major business districts,
                international schools, shopping centers, and the Lagos waterfront.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "5 min to Victoria Island business district",
                  "10 min to Murtala Muhammed Int'l Airport",
                  "Walking distance to premium retail",
                  "Waterfront access",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-brand-silver">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-slate flex-shrink-0" />
                    <span className="font-body text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <a href={directionsUrl} target="_blank" rel="noopener noreferrer"
                className="btn-outline w-full text-center">
                <Navigation size={14} className="mr-2" />
                Get Directions
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}