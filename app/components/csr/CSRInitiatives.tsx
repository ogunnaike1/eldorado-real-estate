"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, GraduationCap, Users, TreePine, Home, Utensils } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

const initiatives = [
  { icon: Heart, title: "Community Welfare", desc: "Distributing 10,000+ hamper packages annually to widows, single mothers, and families in need across Lagos and Abuja.", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&q=80" },
  { icon: GraduationCap, title: "Education First", desc: "Funding 200+ scholarships, renovating 50+ schools, and providing learning materials to students in underserved communities.", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&q=80" },
  { icon: Users, title: "Youth Empowerment", desc: "Running mentorship programs teaching financial literacy, entrepreneurship, and digital skills to young Nigerians.", image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=500&q=80" },
  { icon: TreePine, title: "Green Building", desc: "Championing sustainable construction with solar panels, energy-efficient systems, and locally sourced eco-friendly materials.", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500&q=80" },
  { icon: Home, title: "Housing Support", desc: "Providing furnished accommodation and housing assistance to individuals in extraordinary circumstances.", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80" },
  { icon: Utensils, title: "Health & Wellness", desc: "Partnering with healthcare providers to deliver free medical screenings and wellness programs to underserved areas.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80" },
];

export default function CSRInitiatives() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section ref={ref} className="section-pad bg-brand-ice">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer} className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.p variants={fadeUp} custom={0} className="section-label mb-3">What We Do</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="section-title">Our <span className="font-heading italic text-brand-silver">Initiatives</span></motion.h2>
        </motion.div>

        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {initiatives.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={fadeUp} custom={i}
                className="bg-white group cursor-pointer hover:shadow-lg hover:shadow-brand-slate/[0.04] transition-all duration-500 overflow-hidden">
                <div className="relative overflow-hidden aspect-[16/9]">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${item.image}')` }} />
                  <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/40 transition-colors duration-500" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm">
                    <Icon size={18} className="text-brand-slate" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-display text-lg sm:text-xl text-brand-slate mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-brand-slate/45 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}