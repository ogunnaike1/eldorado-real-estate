"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

import { fadeUp, staggerContainer } from "../lib/animations";

const projects = [
  {
    title: "The Meridian Tower",
    location: "Victoria Island, Lagos",
    type: "Residential",
    price: "From ₦850M",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    featured: true,
  },
  {
    title: "Cascade Residences",
    location: "Ikoyi, Lagos",
    type: "Luxury Apartments",
    price: "From ₦420M",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    featured: false,
  },
  {
    title: "Azure Waterfront",
    location: "Banana Island, Lagos",
    type: "Villa Estate",
    price: "From ₦1.2B",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    featured: false,
  },
  {
    title: "Pinnacle One",
    location: "Maitama, Abuja",
    type: "Commercial",
    price: "Leasing Now",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    featured: false,
  },
];

export default function FeaturedProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} id="projects" className="section-pad bg-brand-ice">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16"
        >
          <div>
            <motion.p variants={fadeUp} custom={0} className="section-label mb-3">
              Our Portfolio
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="section-title">
              Featured <span className="font-heading italic text-brand-silver">Projects</span>
            </motion.h2>
          </div>
          <motion.a
            variants={fadeUp}
            custom={2}
            href="#projects"
            className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-ultrawide uppercase text-brand-slate hover:text-brand-dark mt-4 md:mt-0 transition-colors group"
          >
            View All
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              custom={i}
              className={`group relative overflow-hidden cursor-pointer ${
                project.featured ? "md:row-span-2" : ""
              }`}
            >
              {/* Image Container */}
              <div
                className={`relative overflow-hidden ${
                  project.featured
                    ? "aspect-4/3 md:aspect-auto md:h-full"
                    : "aspect-16/10"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-brand-dark via-brand-dark/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />
              </div>

              {/* Hover Overlay Line */}
              <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-brand-slate transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

              {/* Tag */}
              <span className="absolute top-4 sm:top-5 left-4 sm:left-5 font-body text-[10px] font-semibold tracking-ultrawide uppercase text-white/80 bg-brand-slate/60 backdrop-blur-md px-3 py-1.5 border border-white/10">
                {project.type}
              </span>

              {/* Price */}
              <span className="absolute top-4 sm:top-5 right-4 sm:right-5 font-body text-[10px] font-semibold tracking-wider text-white/90 bg-white/10 backdrop-blur-md px-3 py-1.5">
                {project.price}
              </span>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                <h3
                  className={`font-display text-white mb-1.5 leading-tight group-hover:translate-x-1 transition-transform duration-500 ${
                    project.featured
                      ? "text-2xl sm:text-3xl md:text-4xl"
                      : "text-xl sm:text-2xl"
                  }`}
                >
                  {project.title}
                </h3>
                <div className="flex items-center gap-1.5 text-white/50">
                  <MapPin size={12} />
                  <span className="font-body text-xs tracking-wider">
                    {project.location}
                  </span>
                </div>

                {/* Hover CTA */}
                <div className="mt-4 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                  <span className="font-body text-xs font-semibold tracking-ultrawide uppercase">
                    View Project
                  </span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}