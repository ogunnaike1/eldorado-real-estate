"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Users, GraduationCap, TreePine } from "lucide-react";
import { fadeUp,  staggerContainer} from "../lib/animations";
const csrItems = [
  {
    icon: Heart,
    title: "Community Welfare",
    desc: "Providing essential support to 10,000+ families annually through targeted relief programs and empowerment initiatives.",
  },
  {
    icon: GraduationCap,
    title: "Education Access",
    desc: "Sponsoring scholarships, school renovations, and learning materials for students in underserved communities.",
  },
  {
    icon: Users,
    title: "Youth Empowerment",
    desc: "Mentoring young entrepreneurs with skills training, financial literacy, and startup seed funding programs.",
  },
  {
    icon: TreePine,
    title: "Sustainability",
    desc: "Championing green construction, energy-efficient buildings, and eco-conscious development across all projects.",
  },
];

export default function CSRSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} id="csr" className="relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-aerial-view-of-a-city-5765/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-brand-dark/85" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 section-pad">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-14 md:mb-20"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-body text-[11px] sm:text-xs font-semibold tracking-megawide uppercase text-white/40 mb-3"
            >
              Corporate Social Responsibility
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-[1.1] mb-5"
            >
              Building Communities,{" "}
              <span className="font-heading italic text-brand-silver">
                Not Just Structures
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-body text-sm sm:text-base text-white/50 leading-relaxed"
            >
              At Eldorado, our responsibility extends beyond bricks and mortar.
              We invest in people, education, and sustainable futures across
              every community we touch.
            </motion.p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {csrItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={i}
                  className="glass-card-dark rounded-lg p-6 sm:p-7 group hover:bg-white/[0.08] transition-all duration-500"
                >
                  <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center mb-5 group-hover:border-white/25 group-hover:scale-110 transition-all duration-500">
                    <Icon
                      size={20}
                      className="text-brand-silver group-hover:text-white transition-colors duration-500"
                    />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-white/40 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-px mt-12 md:mt-16 bg-white/5 rounded-lg overflow-hidden"
          >
            {[
              { val: "10,000+", label: "Families Supported" },
              { val: "₦2.5B+", label: "Community Investment" },
              { val: "50+", label: "Schools Renovated" },
              { val: "200+", label: "Scholarships Awarded" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i + 4}
                className="text-center py-8 sm:py-10 bg-white/[0.03]"
              >
                <p className="font-display text-2xl sm:text-3xl md:text-4xl text-white mb-1">
                  {stat.val}
                </p>
                <p className="font-body text-[10px] sm:text-xs tracking-ultrawide uppercase text-white/35">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
