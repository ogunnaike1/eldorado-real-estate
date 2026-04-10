"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Linkedin, ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

const team = [
  {
    name: "Adewale Ogundimu",
    role: "Founder & CEO",
    bio: "A visionary leader with over 15 years in luxury construction and real estate. Adewale's foresight and resilience have driven Eldorado's meteoric rise as the premium brand in sub-Saharan Africa.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Ngozi Emenike",
    role: "Chief Operations Officer",
    bio: "With a decade of experience managing large-scale developments, Ngozi ensures every Eldorado project is delivered on time, on budget, and above expectations.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&q=80",
  },
  {
    name: "Raj Mehta",
    role: "Head of Engineering",
    bio: "An award-winning MEP engineer, Raj designed integrated building management systems for major global projects before bringing his expertise to Eldorado.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
  },
  {
    name: "Amaka Obi",
    role: "Head of Design & Architecture",
    bio: "Amaka leads our in-house design studio, collaborating with international architects to create award-winning facades, interiors, and spatial experiences.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
  },
  {
    name: "Chukwuemeka Nwosu",
    role: "Director of Sales & Investments",
    bio: "Emeka's deep knowledge of the Nigerian property market and investor relations has helped Eldorado build a loyal portfolio of high-net-worth clients.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Head of CSR & Sustainability",
    bio: "Fatima drives our community impact initiatives and ensures every project integrates sustainable building practices aligned with global standards.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
  },
];

export default function TeamCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const scrollTo = useCallback(
    (dir: "left" | "right") => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const cardWidth = container.firstElementChild
        ? (container.firstElementChild as HTMLElement).offsetWidth + 20
        : 320;
      const newIndex =
        dir === "right"
          ? Math.min(activeIndex + 1, team.length - 1)
          : Math.max(activeIndex - 1, 0);
      setActiveIndex(newIndex);
      container.scrollTo({
        left: cardWidth * newIndex,
        behavior: "smooth",
      });
    },
    [activeIndex]
  );

  return (
    <section ref={sectionRef} className="section-pad bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14"
        >
          <div>
            <motion.p
              variants={fadeUp}
              custom={0}
              className="section-label mb-3"
            >
              Leadership
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="section-title">
              The Team Behind{" "}
              <span className="font-heading italic text-brand-silver">
                Eldorado
              </span>
            </motion.h2>
          </div>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="flex gap-2 mt-4 sm:mt-0"
          >
            <button
              onClick={() => scrollTo("left")}
              disabled={activeIndex === 0}
              className="w-11 h-11 flex items-center justify-center border border-brand-silver/30 text-brand-silver hover:text-brand-slate hover:border-brand-slate disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous team member"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollTo("right")}
              disabled={activeIndex === team.length - 1}
              className="w-11 h-11 flex items-center justify-center border border-brand-silver/30 text-brand-silver hover:text-brand-slate hover:border-brand-slate disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next team member"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
          }
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {team.map((member, i) => (
              <div
                key={member.name}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] snap-start group"
              >
                {/* Photo */}
                <div className="relative overflow-hidden mb-5 aspect-[3/4]">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-brand-ice transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${member.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover overlay with bio */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <p className="font-body text-xs text-white/80 leading-relaxed line-clamp-4">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="font-display text-lg sm:text-xl text-brand-slate group-hover:text-brand-dark transition-colors">
                  {member.name}
                </h3>
                <p className="font-body text-xs tracking-wider text-brand-silver mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {team.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                if (scrollRef.current) {
                  const cardWidth = scrollRef.current.firstElementChild
                    ? (scrollRef.current.firstElementChild as HTMLElement)
                        .offsetWidth + 20
                    : 320;
                  scrollRef.current.scrollTo({
                    left: cardWidth * i,
                    behavior: "smooth",
                  });
                }
              }}
              className={`h-[2px] rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "w-7 bg-brand-slate"
                  : "w-2.5 bg-brand-silver/25 hover:bg-brand-silver/50"
              }`}
              aria-label={`Go to team member ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}