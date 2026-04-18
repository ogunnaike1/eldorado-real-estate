"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { fadeUp, staggerContainer } from "../lib/animations";
import type { BlogPost } from "../lib/blogData";

function formatDate(value: string) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return value;
  }
}

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  // Featured post = first one (newest)
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      {/* Featured Post */}
      {featured && (
        <section className="section-pad bg-white">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-3">Featured Article</p>
            <Link
              href={`/blog/${featured.slug}`}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-brand-ice group cursor-pointer hover:shadow-lg hover:shadow-brand-slate/[0.04] transition-all duration-500"
            >
              <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${featured.image || ""}')` }}
                />
              </div>
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                <span className="font-body text-[10px] font-semibold tracking-ultrawide uppercase text-brand-silver mb-3">
                  {featured.tag || "News"}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-brand-slate leading-[1.15] mb-4 group-hover:text-brand-dark transition-colors">
                  {featured.title}
                </h2>
                <p className="font-body text-sm text-brand-slate/50 leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-brand-silver font-body text-xs tracking-wider">
                  <span>{formatDate(featured.date)}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {featured.readTime || "5 min"} read
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grid of other posts */}
      <section ref={ref} className="section-pad bg-brand-ice">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="mb-10 md:mb-14"
          >
            <motion.p variants={fadeUp} custom={0} className="section-label mb-3">
              Latest Articles
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="section-title">
              Insights &{" "}
              <span className="font-heading italic text-brand-silver">Stories</span>
            </motion.h2>
          </motion.div>

          {posts.length === 0 ? (
            <p className="font-body text-sm text-brand-silver text-center py-20">
              No blog posts published yet. Check back soon!
            </p>
          ) : rest.length === 0 ? (
            <p className="font-body text-sm text-brand-silver text-center py-10">
              More articles coming soon.
            </p>
          ) : (
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {rest.map((p, i) => (
                <motion.article
                  key={p.slug}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white group hover:shadow-lg hover:shadow-brand-slate/[0.04] transition-all duration-500 border border-transparent hover:border-brand-silver/15"
                >
                  <Link href={`/blog/${p.slug}`}>
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url('${p.image || ""}')` }}
                      />
                      <div className="absolute inset-0 bg-brand-dark/5 group-hover:bg-brand-dark/20 transition-colors duration-500" />
                      <span className="absolute top-3 left-3 font-body text-[9px] font-semibold tracking-ultrawide uppercase text-white bg-brand-slate/70 backdrop-blur-md px-2.5 py-1">
                        {p.tag || "News"}
                      </span>
                      <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/0 group-hover:bg-white text-transparent group-hover:text-brand-slate transition-all duration-500 rounded-full">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-3 text-brand-silver font-body text-[10px] tracking-wider mb-3">
                        <span>{formatDate(p.date)}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {p.readTime || "5 min"}
                        </span>
                      </div>
                      <h3 className="font-display text-lg text-brand-slate group-hover:text-brand-dark transition-colors leading-snug mb-2">
                        {p.title}
                      </h3>
                      <p className="font-body text-sm text-brand-slate/40 leading-relaxed line-clamp-2">
                        {p.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}