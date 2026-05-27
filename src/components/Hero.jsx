import { FaLinkedinIn, FaGithub, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

const WA_LINK =
  "https://wa.me/919187082916?text=Hi%20Sawan%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project%20with%20you.";

const socials = [
  { href: "https://www.linkedin.com/in/thesawankumar/", icon: <FaLinkedinIn size={15} />, label: "LinkedIn" },
  { href: "https://github.com/thesawankumar",           icon: <FaGithub size={15} />,     label: "GitHub" },
  { href: "https://twitter.com/thesawan_kumar",         icon: <FaTwitter size={15} />,    label: "Twitter" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  const [text] = useTypewriter({
    words: ["Full Stack Developer", "AI Engineer", "Freelancer", "React & Node.js", "Problem Solver"],
    loop: 0,
    typeSpeed: 65,
    deleteSpeed: 35,
  });

  return (
    <div className="section-wrap w-full flex flex-col-reverse lg:flex-row items-center gap-14 lg:gap-8">

      {/* ── Left ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-5 items-center lg:items-start text-center lg:text-left flex-1"
      >
        {/* Availability badges row */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center lg:justify-start">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open to Work
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            Available for Freelance
          </div>
        </motion.div>

        {/* Name */}
        <motion.div variants={fadeUp} className="flex flex-col gap-1">
          <p className="text-base text-slate-500 font-medium">Hi, I&apos;m</p>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
            Sawan <span className="gradient-text">Kumar</span>
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.p variants={fadeUp} className="text-lg lg:text-xl font-semibold text-slate-500 min-h-[1.75rem]">
          <span className="text-sky-600">{text}</span>
          <Cursor cursorColor="#0ea5e9" />
        </motion.p>

        {/* Bio */}
        <motion.p variants={fadeUp} className="text-sm lg:text-base text-slate-500 max-w-md leading-relaxed">
          Building scalable backend systems &amp; LLM-powered apps.
          React · Node.js · Spring Boot · LangChain · AWS
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center lg:justify-start">
          <Link to="/assets/Sawan-Kumar-Resume.pdf" target="_blank">
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
              className="btn-primary"
            >
              <Download size={15} /> Resume
            </motion.button>
          </Link>

          {/* WhatsApp CTA — primary freelance contact */}
          <Link to={WA_LINK} target="_blank">
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FaWhatsapp size={16} /> Hire Me
            </motion.button>
          </Link>

          <a href="#contact">
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
              className="btn-ghost"
            >
              Contact
            </motion.button>
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Find me on</span>
          <div className="flex gap-2">
            {socials.map(s => (
              <Link key={s.href} to={s.href} target="_blank" aria-label={s.label}>
                <motion.div
                  whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-sky-400 hover:text-sky-600 transition-all duration-200 shadow-sm"
                >
                  {s.icon}
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Right — Photo ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex-shrink-0 flex items-center justify-center"
      >
        {/* Outer ring */}
        <div className="absolute w-72 h-72 lg:w-80 lg:h-80 rounded-full border border-dashed border-sky-200 animate-spin-slow" />
        {/* Glow */}
        <div className="absolute w-52 h-52 lg:w-64 lg:h-64 rounded-full bg-sky-100 blur-3xl opacity-60" />

        {/* Photo */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl shadow-sky-100"
        >
          <img
            src="/assets/profile.png"
            alt="Sawan Kumar — Full Stack & AI Engineer"
            fetchpriority="high"
            loading="eager"
            decoding="async"
            width="256"
            height="256"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Stat chips */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}
          className="absolute right-0 lg:-right-4 top-6 bg-white border border-slate-100 shadow-md rounded-xl px-3 py-2 flex items-center gap-2"
        >
          <span className="text-base">💼</span>
          <div className="leading-tight">
            <p className="text-xs font-bold text-slate-800">3 Internships</p>
            <p className="text-[10px] text-slate-400">Work Experience</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}
          className="absolute left-0 lg:-left-4 bottom-6 bg-white border border-slate-100 shadow-md rounded-xl px-3 py-2 flex items-center gap-2"
        >
          <FaWhatsapp size={14} className="text-emerald-500" />
          <div className="leading-tight">
            <p className="text-xs font-bold text-slate-800">Freelancer</p>
            <p className="text-[10px] text-slate-400">Available Now</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
