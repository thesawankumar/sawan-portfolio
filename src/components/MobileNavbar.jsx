import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, User, Layers, GraduationCap, Briefcase, Code2, Mail } from "lucide-react";

// Replaced MUI icons with lucide-react — saves ~200KB from bundle

const NAV = [
  { id: "home",       icon: <Home size={18} />,         label: "Home" },
  { id: "about",      icon: <User size={18} />,         label: "About" },
  { id: "skills",     icon: <Layers size={18} />,       label: "Skills" },
  { id: "education",  icon: <GraduationCap size={18} />,label: "Edu" },
  { id: "experience", icon: <Briefcase size={18} />,    label: "Exp" },
  { id: "projects",   icon: <Code2 size={18} />,        label: "Work" },
  { id: "contact",    icon: <Mail size={18} />,         label: "Contact" },
];

export default function MobileNavbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].id);
        if (el && window.scrollY >= el.offsetTop - 100) { setActive(NAV[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-around items-center bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl py-2 px-1 shadow-xl shadow-slate-200/60"
      >
        {NAV.map(item => {
          const on = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-label={item.label}
              className="relative flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl"
            >
              {on && (
                <motion.span
                  layoutId="mob-pill"
                  className="absolute inset-0 bg-accent-lt rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-200 ${on ? "text-accent" : "text-slate-500"}`}>
                {item.icon}
              </span>
              <span className={`relative z-10 text-[9px] font-semibold transition-colors duration-200 ${on ? "text-accent" : "text-slate-400"}`}>
                {item.label}
              </span>
            </a>
          );
        })}
      </motion.div>
    </nav>
  );
}
