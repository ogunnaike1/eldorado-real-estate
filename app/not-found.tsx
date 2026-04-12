"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <>
      {/* Override body background for this page */}
      <style>{`body { background-color: #1a202c !important; }`}</style>

      <section
        style={{ backgroundColor: "#1a202c", minHeight: "100vh" }}
        className="flex items-center justify-center relative overflow-hidden"
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.02,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Corner decorations */}
        <div
          className="absolute top-8 left-8 w-12 h-12"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
        />
        <div
          className="absolute bottom-8 right-8 w-12 h-12"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
        />

        <div className="relative z-10 text-center px-5 sm:px-8 max-w-lg">
          {/* Large 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: "clamp(8rem, 20vw, 12rem)",
                lineHeight: 1,
                color: "rgba(255,255,255,0.04)",
                userSelect: "none",
              }}
            >
              404
            </h1>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: "-5rem" }}
          >
            <p
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "16px",
              }}
            >
              Page Not Found
            </p>

            <h2
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                color: "#ffffff",
                lineHeight: 1.15,
                marginBottom: "16px",
              }}
            >
              This Page Doesn&apos;t{" "}
              <span
                style={{
                  fontFamily: '"Libre Caslon Display", Georgia, serif',
                  fontStyle: "italic",
                  color: "#a0aec0",
                }}
              >
                Exist
              </span>
            </h2>

            <p
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: "14px",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
                marginBottom: "40px",
              }}
            >
              The page you&apos;re looking for may have been moved, deleted, or
              never existed. Let&apos;s get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 28px",
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  backgroundColor: "#ffffff",
                  color: "#2d3748",
                  textDecoration: "none",
                }}
              >
                <Home size={15} style={{ marginRight: "8px" }} />
                Back to Home
              </Link>

              <Link
                href="/projects"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 28px",
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  backgroundColor: "transparent",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  textDecoration: "none",
                }}
              >
                <Search size={15} style={{ marginRight: "8px" }} />
                Browse Projects
              </Link>
            </div>
          </motion.div>

          {/* Popular links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: "64px",
              paddingTop: "32px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
                marginBottom: "16px",
              }}
            >
              Popular Pages
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: "About Us", href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
                { label: "Careers", href: "/careers" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.3)",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}