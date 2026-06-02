import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { WA } from "../constants/whatsapp";

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  const options = [
    {
      label: "Hire Me for a Project",
      href: WA.hire,
      cls: "bg-emerald-500 hover:bg-emerald-600 text-white",
    },
    {
      label: "Ask About Services",
      href: WA.general,
      cls: "bg-white hover:bg-slate-50 text-slate-800 border border-slate-200",
    },
    {
      label: "Get a Free Quote",
      href: WA.quoteBase + encodeURIComponent("Hi Sawan, I'd like to get a free quote for my project."),
      cls: "bg-white hover:bg-slate-50 text-slate-800 border border-slate-200",
    },
  ];

  return (
    <div className="fixed bottom-24 lg:bottom-8 right-4 lg:right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-2 items-end"
          >
            <div className="bg-slate-900 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
              How can I help?
            </div>

            {options.map((opt, i) => (
              <motion.a
                key={i}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 text-[12px] font-semibold px-4 py-2.5 rounded-xl shadow-md whitespace-nowrap transition-all duration-200 ${opt.cls}`}
              >
                {opt.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-200 flex items-center justify-center transition-colors duration-200 relative"
        aria-label="Chat on WhatsApp"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="wa"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}
            >
              <FaWhatsapp size={26} />
            </motion.span>
          )}
        </AnimatePresence>

        {!open && (
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" />
        )}
      </motion.button>
    </div>
  );
}

