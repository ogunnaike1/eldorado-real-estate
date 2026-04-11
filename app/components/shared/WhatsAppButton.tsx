"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const WHATSAPP_NUMBER = "2348131561562";
const DEFAULT_MESSAGE = "Hi! I'd like to know more about your available properties.";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-lg shadow-xl shadow-black/10 border border-brand-ice p-4 max-w-[260px]"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="font-body text-sm font-semibold text-brand-slate">
                Chat with us
              </p>
              <button
                onClick={() => setShowTooltip(false)}
                className="text-brand-silver hover:text-brand-slate transition-colors flex-shrink-0"
              >
                <X size={14} />
              </button>
            </div>
            <p className="font-body text-xs text-brand-slate/50 leading-relaxed mb-3">
              Have questions about our properties? We typically reply within minutes.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2.5 bg-[#25D366] text-white font-body text-xs font-semibold tracking-wider uppercase rounded-md hover:bg-[#20bd5a] transition-colors"
            >
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button Row — Label + Icon side by side */}
      <div className="flex items-center gap-3">
        {/* Text Label */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setShowTooltip(!showTooltip)}
          className="cursor-pointer bg-white shadow-lg shadow-black/8 border border-brand-ice px-4 py-2.5 rounded-lg hover:shadow-xl transition-shadow duration-400 hidden sm:block"
        >
          <p className="font-body text-xs font-semibold text-brand-slate leading-none">
            Need Help?
          </p>
          <p className="font-body text-[10px] text-brand-silver mt-0.5 leading-none">
            Chat with us
          </p>
        </motion.div>

        {/* FAB Button */}
        <motion.button
          onClick={() => setShowTooltip(!showTooltip)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-shadow duration-500 group flex-shrink-0"
          aria-label="Chat on WhatsApp"
        >
          {/* Glow ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping opacity-40" />
          <span className="absolute inset-[-3px] rounded-full bg-[#25D366]/10 group-hover:inset-[-6px] transition-all duration-500" />

          {/* WhatsApp Icon */}
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="white"
            className="relative z-10"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}