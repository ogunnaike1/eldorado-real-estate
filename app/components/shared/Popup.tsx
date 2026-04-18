"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, X, AlertCircle } from "lucide-react";

type PopupType = "success" | "error" | "info";

interface PopupProps {
  type: PopupType;
  title: string;
  message?: string;
  isOpen: boolean;
  onClose: () => void;
  autoClose?: number; // milliseconds, 0 = don't auto-close
}

export default function Popup({
  type,
  title,
  message,
  isOpen,
  onClose,
  autoClose = 3000,
}: PopupProps) {
  useEffect(() => {
    if (isOpen && autoClose > 0) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;

  const config = {
    success: { icon: CheckCircle, color: "#38a169", bg: "#f0fdf4", border: "#86efac" },
    error: { icon: XCircle, color: "#e53e3e", bg: "#fef2f2", border: "#fca5a5" },
    info: { icon: AlertCircle, color: "#2d3748", bg: "#f5f7fa", border: "#cbd5e0" },
  };

  const { icon: Icon, color, bg, border } = config[type];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(26, 32, 44, 0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 9998,
          animation: "fadeIn 0.2s ease-out",
        }}
      />

      {/* Popup */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#ffffff",
          width: "90%",
          maxWidth: "420px",
          zIndex: 9999,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
          animation: "popupIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: "3px", width: "100%", backgroundColor: color }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a0aec0",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#2d3748")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a0aec0")}
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div style={{ padding: "40px 32px 32px", textAlign: "center" }}>
          {/* Icon */}
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: bg,
              border: `2px solid ${border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              animation: "iconPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
            }}
          >
            <Icon size={30} style={{ color }} strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: "22px",
              color: "#2d3748",
              margin: "0 0 8px",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h3>

          {/* Message */}
          {message && (
            <p
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: "14px",
                color: "#718096",
                margin: "0 0 24px",
                lineHeight: 1.6,
              }}
            >
              {message}
            </p>
          )}

          {/* OK Button */}
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#2d3748",
              color: "#ffffff",
              padding: "10px 32px",
              fontFamily: '"DM Sans", sans-serif',
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a202c")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2d3748")}
          >
            OK
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        @keyframes iconPop {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}