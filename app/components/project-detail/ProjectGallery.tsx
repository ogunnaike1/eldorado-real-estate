"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

import type { Project } from "../lib/projectData";

export default function ProjectGallery({ project }: { project: Project }) {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const next = () => setCurrent((p) => (p + 1) % project.gallery.length);
  const prev = () => setCurrent((p) => (p - 1 + project.gallery.length) % project.gallery.length);

  return (
    <>
      <section className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] min-h-[400px] bg-brand-dark overflow-hidden">
        {/* Main Image */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${project.gallery[current]}')` }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-brand-dark/30 z-[1]" />

        {/* Nav Arrows */}
        <button onClick={prev} className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/15 text-white/70 hover:text-white hover:bg-white/20 transition-all">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/15 text-white/70 hover:text-white hover:bg-white/20 transition-all">
          <ChevronRight size={20} />
        </button>

        {/* Expand Button */}
        <button onClick={() => setFullscreen(true)} className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/15 text-white/70 hover:text-white transition-all">
          <Expand size={16} />
        </button>

        {/* Thumbnails */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {project.gallery.map((img, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`w-14 h-10 sm:w-16 sm:h-11 bg-cover bg-center border-2 transition-all duration-300 ${i === current ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-80"}`}
              style={{ backgroundImage: `url('${img}')` }}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-20 font-body text-xs text-white/40 tracking-wider">
          {current + 1} / {project.gallery.length}
        </div>
      </section>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
            onClick={() => setFullscreen(false)}>
            <div className="absolute inset-0 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
              <img src={project.gallery[current]} alt="" className="max-w-full max-h-full object-contain" />
            </div>
            <button onClick={() => setFullscreen(false)} className="absolute top-4 right-4 text-white/60 hover:text-white font-body text-sm tracking-wider">Close</button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 text-white/60 hover:text-white"><ChevronLeft size={20} /></button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 text-white/60 hover:text-white"><ChevronRight size={20} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}