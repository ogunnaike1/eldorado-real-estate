"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";
import type { BlogPost } from "../lib/blogData";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="section-pad bg-brand-ice">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}>
          <motion.p variants={fadeUp} custom={0} className="section-label mb-3">Keep Reading</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="section-title mb-10 md:mb-14">
            Related <span className="font-heading italic text-brand-silver">Articles</span>
          </motion.h2>

          <motion.div variants={fadeUp} custom={2} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}
                className="bg-white group cursor-pointer hover:shadow-lg hover:shadow-brand-slate/[0.04] transition-all duration-500 border border-transparent hover:border-brand-silver/15">
                <div className="relative overflow-hidden aspect-[16/10]">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${p.image}')` }} />
                  <span className="absolute top-3 left-3 font-body text-[9px] font-semibold tracking-ultrawide uppercase text-white bg-brand-slate/70 backdrop-blur-md px-2.5 py-1">{p.tag}</span>
                  <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/0 group-hover:bg-white text-transparent group-hover:text-brand-slate transition-all duration-500 rounded-full">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-3 text-brand-silver font-body text-[10px] tracking-wider mb-3">
                    <span>{formatDate(p.date)}</span>
                    <span className="flex items-center gap-1"><Clock size={10} />{p.readTime || "5 min"}</span>
                  </div>
                  <h3 className="font-display text-lg text-brand-slate group-hover:text-brand-dark transition-colors leading-snug">{p.title}</h3>
                </div>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}