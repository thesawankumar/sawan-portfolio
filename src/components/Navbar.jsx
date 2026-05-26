import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Home",       href: "#home" },
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Education",  href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [open,    setOpen]    = useState(false);
  const [active,  setActive]  = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = NAV.map(n => n.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 100) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4">
      {/* Desktop pill */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`hidden lg:flex items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg shadow-slate-200/60 border border-slate-200/80"
            : "bg-white/70 backdrop-blur-sm border border-slate-200/50"
        }`}
      >
        {NAV.map(item => {
          const isActive = active === item.href.slice(1);
          return (
            <a
              key={item.href}
              href={item.href}
              className={`relative px-4 py-1.5 text-sm font-medium rounded-xl transition-colors duration-200 ${
                isActive ? "text-sky-600" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-bg"
                  className="absolute inset-0 bg-sky-50 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          );
        })}
      </motion.nav>

      {/* Mobile top bar */}
      <div className="lg:hidden w-full flex justify-between items-center px-1">
        <span className="text-lg font-bold text-slate-900">
          Sawan<span className="text-sky-500">.</span>
        </span>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} className="text-slate-700" /> : <Menu size={20} className="text-slate-700" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-2xl flex flex-col pt-16 px-5 gap-1"
            >
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100">
                <X size={18} className="text-slate-600" />
              </button>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-2">Menu</p>
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active === item.href.slice(1)
                      ? "bg-sky-50 text-sky-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
