import { FaLinkedinIn, FaGithub, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import { Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { WA } from "../constants/whatsapp";
import CodeWindow from "./CodeWindow";

const WA_LINK = WA.hire;

const socials = [
  { href: "https://www.linkedin.com/in/thesawankumar/", icon: <FaLinkedinIn size={14} />, label: "LinkedIn" },
  { href: "https://github.com/thesawankumar",           icon: <FaGithub size={14} />,     label: "GitHub" },
  { href: "https://twitter.com/thesawan_kumar",         icon: <FaTwitter size={14} />,    label: "Twitter" },
];

const clientWins = [
  "🌐 Website",
  "💬 WhatsApp Bot",
  "🤖 AI Tools",
  "⚙️ Full Stack App",
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp  = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  const [text] = useTypewriter({
    words: [
      "Full Stack Developer",
      "AI Engineer",
      "Freelancer · Available Now",
      "React + Node + Spring Boot",
    ],
    loop: 0, typeSpeed: 60, deleteSpeed: 35,
  });

  return (
    <div className="section-wrap w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

      {/* ── Left — Text ── */}
      <motion.div
        variants={stagger} initial="hidden" animate="show"
        className="flex flex-col gap-5 items-center lg:items-start text-center lg:text-left flex-1 max-w-lg"
      >
        {/* Avatar + name row */}
        <motion.div variants={fadeUp} className="flex flex-col lg:flex-row items-center lg:items-center gap-3">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-accent-md shadow-md flex-shrink-0">
            <img src="/assets/profile.png" alt="Sawan Kumar"
              fetchpriority="high" loading="eager" decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center lg:text-left">
            <p className="text-sm font-bold text-slate-900">Sawan Kumar</p>
            <p className="text-xs text-slate-400 font-medium">Full Stack & AI Engineer · Bengaluru</p>
          </div>
        </motion.div>

        {/* Status badges */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center lg:justify-start">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for Projects
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent-lt border border-accent-md px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Open to Full-time
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={fadeUp}>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            I build <span className="gradient-text">digital products</span>
            <br />businesses love.
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.p variants={fadeUp} className="text-base lg:text-lg font-semibold text-slate-500 min-h-[1.5rem]">
          <span className="text-accent">{text}</span>
          <Cursor cursorColor="#2563eb" />
        </motion.p>

        {/* Bio */}
        <motion.p variants={fadeUp} className="text-sm text-slate-500 leading-relaxed max-w-sm">
          Websites, WhatsApp bots, AI tools &amp; full-stack apps — delivered fast, built to scale.
          <span className="text-slate-400"> 3 internships · 500+ DSA solved.</span>
        </motion.p>

        {/* Service chips */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center lg:justify-start">
          {clientWins.map((w, i) => (
            <span key={i}
              className="text-[11px] font-medium text-accent bg-accent-lt border border-accent-md px-3 py-1 rounded-full"
            >{w}</span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center lg:justify-start">
          <Link to={WA_LINK} target="_blank">
            <motion.button whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              <FaWhatsapp size={15} /> Get a Free Quote
            </motion.button>
          </Link>
          <Link to="/assets/Sawan-Kumar-Resume.pdf" target="_blank">
            <motion.button whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
              className="btn-primary"
            >
              <Download size={14} /> Resume
            </motion.button>
          </Link>
          <a href="#projects">
            <motion.button whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
              className="btn-ghost"
            >
              Projects <ArrowRight size={14} />
            </motion.button>
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Find me on</span>
          <div className="flex gap-2">
            {socials.map(s => (
              <Link key={s.href} to={s.href} target="_blank" aria-label={s.label}>
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:border-accent hover:text-accent transition-all shadow-sm"
                >
                  {s.icon}
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Right — Code Window ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex flex-shrink-0 items-center justify-center"
      >
        <CodeWindow />
      </motion.div>

      {/* Mobile — code window below CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="lg:hidden w-full max-w-xs mx-auto"
      >
        <CodeWindow />
      </motion.div>
    </div>
  );
}
