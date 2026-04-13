"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { fadeUp, staggerContainer } from "../lib/animations";
import type { SanityBlogPost } from "../../sanity/lib/queries";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function FeaturedPost({ post }: { post?: SanityBlogPost }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  if (!post) return null;

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}>
          <motion.p variants={fadeUp} custom={0} className="section-label mb-3">Featured Article</motion.p>
          <Link href={`/blog/${post.slug}`}>
            <motion.div variants={fadeUp} custom={1}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-brand-ice group cursor-pointer hover:shadow-lg hover:shadow-brand-slate/[0.04] transition-all duration-500">
            <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${post.image || ""}')` }} />
            </div>
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <span className="font-body text-[10px] font-semibold tracking-ultrawide uppercase text-brand-silver mb-3">{post.tag || "News"}</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-brand-slate leading-[1.15] mb-4 group-hover:text-brand-dark transition-colors">
                {post.title}
              </h2>
              <p className="font-body text-sm text-brand-slate/50 leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-brand-silver font-body text-xs tracking-wider">
                  <span>{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{post.readTime || "5 min"} read</span>
                </div>
                <span className="flex items-center gap-1.5 font-body text-xs font-semibold tracking-ultrawide uppercase text-brand-slate group-hover:gap-2.5 transition-all">
                  Read <ArrowRight size={13} />
                </span>
              </div>
            </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}