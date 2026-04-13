"use client";

import { motion } from "framer-motion";
import { Clock, ArrowLeft, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { SanityBlogPost } from "../../sanity/lib/queries";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostContent({ post }: { post: SanityBlogPost }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[50vh] sm:h-[60vh] min-h-[350px] bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${post.image}')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/30 to-brand-dark/40" />
      </section>

      {/* Article */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 -mt-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="bg-white p-6 sm:p-8 md:p-10 shadow-lg shadow-brand-slate/[0.06] border border-brand-ice">

            {/* Back link */}
            <Link href="/blog" className="inline-flex items-center gap-1.5 font-body text-xs font-semibold tracking-ultrawide uppercase text-brand-silver hover:text-brand-slate transition-colors mb-6">
              <ArrowLeft size={14} /> Back to Blog
            </Link>

            {/* Tag */}
            <span className="inline-block font-body text-[10px] font-semibold tracking-ultrawide uppercase bg-brand-ice text-brand-silver px-3 py-1.5 mb-4">
              {post.tag}
            </span>

            {/* Title */}
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-brand-slate leading-[1.15] mb-4">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-brand-silver font-body text-xs tracking-wider mb-8 pb-8 border-b border-brand-ice">
              <span>{formatDate(post.date)}</span>
              <span className="flex items-center gap-1"><Clock size={11} />{post.readTime || "5 min"} read</span>
            </div>

            {/* Author Card */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-brand-ice flex-shrink-0"
                style={{ backgroundImage: `url('${post.author?.avatar || ""}')` }} />
              <div>
                <p className="font-display text-base text-brand-slate">{post.author?.name || "Eldorado Team"}</p>
                <p className="font-body text-xs text-brand-silver">{post.author?.role || "Author"}</p>
              </div>
            </div>

            {/* Content */}
            <div className="prose-eldorado">
              {(post.content || "").split("\n\n").map((block, i) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2 key={i} className="font-display text-xl sm:text-2xl text-brand-slate mt-10 mb-4">
                      {block.replace("## ", "")}
                    </h2>
                  );
                }
                return (
                  <p key={i} className="font-body text-base text-brand-slate/60 leading-[1.8] mb-5">
                    {block}
                  </p>
                );
              })}
            </div>

            {/* Share Bar */}
            <div className="mt-10 pt-8 border-t border-brand-ice flex flex-wrap items-center justify-between gap-4">
              <p className="font-body text-xs font-semibold tracking-ultrawide uppercase text-brand-silver">
                Share this article
              </p>
              <div className="flex items-center gap-2">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-brand-ice text-brand-silver hover:text-brand-slate hover:border-brand-slate/20 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-brand-ice text-brand-silver hover:text-brand-slate hover:border-brand-slate/20 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" /></svg>
                </a>
                <a href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + shareUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-brand-ice text-brand-silver hover:text-brand-slate hover:border-brand-slate/20 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </a>
                <button onClick={copyLink}
                  className="w-9 h-9 flex items-center justify-center border border-brand-ice text-brand-silver hover:text-brand-slate hover:border-brand-slate/20 transition-all">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}