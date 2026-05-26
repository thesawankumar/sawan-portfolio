import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { data } from "../constants/projectsData";

/* ─────────────────────────────────────────
   Tilt card wrapper — subtle 3-D on hover
───────────────────────────────────────── */
function TiltCard({ children, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [6, -6]);
  const rotateY = useTransform(x, [-60, 60], [-6, 6]);

  const handleMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width  / 2);
    y.set(e.clientY - rect.top  - rect.height / 2);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Featured card — ResumeRefine
───────────────────────────────────────── */
const featuredBullets = [
  "RAG pipeline — FAISS vector indexing for semantic similarity",
  "Skill gap detection & contextual interview question generation",
  "Schema-based validation for consistent LLM output",
  "Modular architecture: embedding → retrieval → generation",
];

function FeaturedCard({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="relative rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden flex flex-col lg:flex-row group"
    >
      {/* ── Screenshot side ── */}
      <div className="relative lg:w-[54%] h-56 lg:h-auto overflow-hidden bg-slate-950 flex-shrink-0">
        <motion.img
          src={item.imgSrc}
          alt={item.label}
          className="w-full h-full object-cover object-top"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          onError={e => { e.target.style.display = "none"; }}
        />
        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/30 pointer-events-none" />

        {/* Floating "Live" badge */}
        <motion.a
          href={item.view} target="_blank"
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-slate-800 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </motion.a>
      </div>

      {/* ── Content side ── */}
      <div className="flex flex-col justify-between p-6 lg:p-8 flex-1">
        <div className="flex flex-col gap-4">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-sky-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600">
              Featured Project
            </span>
          </div>

          {/* Title + desc */}
          <div>
            <h3 className="text-xl font-bold text-slate-900">{item.label}</h3>
            <p className="mt-2 text-[13px] text-slate-500 leading-relaxed">{item.desc}</p>
          </div>

          {/* Animated bullet list */}
          <ul className="flex flex-col gap-1.5">
            {featuredBullets.map((pt, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start gap-2 text-[12px] text-slate-600"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full bg-sky-500 flex-shrink-0" />
                {pt}
              </motion.li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                viewport={{ once: true }}
                className="tag"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Link to={item.view} target="_blank">
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
              className="btn-primary text-xs px-4 py-2"
            >
              <ExternalLink size={13} /> Live Demo
            </motion.button>
          </Link>
          <Link to={item.github} target="_blank">
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
              className="btn-ghost text-xs px-4 py-2"
            >
              <Github size={13} /> Source
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Regular project card with tilt + reveal
───────────────────────────────────────── */
function ProjectCard({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <TiltCard className="h-full">
        <div
          className="card flex flex-col overflow-hidden h-full cursor-default"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image */}
          <div className="relative h-40 overflow-hidden bg-slate-100 flex-shrink-0">
            <motion.img
              src={item.imgSrc}
              alt={item.label}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Overlay — slides up on hover */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "100%" }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px] flex items-center justify-center gap-3"
                >
                  <Link to={item.view} target="_blank">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 }}
                      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
                      className="flex items-center gap-1.5 bg-white text-slate-900 text-[11px] font-bold px-3.5 py-2 rounded-xl shadow-lg"
                    >
                      <ExternalLink size={12} /> Live
                    </motion.div>
                  </Link>
                  <Link to={item.github} target="_blank">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
                      className="flex items-center gap-1.5 bg-sky-600 text-white text-[11px] font-bold px-3.5 py-2 rounded-xl shadow-lg"
                    >
                      <Github size={12} /> Code
                    </motion.div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-2 p-4 flex-1">
            {/* Title row */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900 leading-snug">{item.label}</h3>
              <motion.div
                animate={{ rotate: hovered ? 45 : 0, color: hovered ? "#0ea5e9" : "#94a3b8" }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 mt-0.5"
              >
                <ArrowUpRight size={15} />
              </motion.div>
            </div>

            <p className="text-[12px] text-slate-500 leading-relaxed flex-1">{item.desc}</p>

            {/* Tags — stagger in */}
            <div className="flex flex-wrap gap-1.5 mt-1">
              {item.tags.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + i * 0.04 }}
                  viewport={{ once: true }}
                  className="tag"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export default function Projects() {
  const featured = data.filter(p => p.featured);
  const rest     = data.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="section-wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="eyebrow">What I&apos;ve built</p>
          <h2 className="section-title">Projects</h2>
          <div className="title-line" />
        </motion.div>

        <div className="flex flex-col gap-10">

          {/* Featured */}
          {featured.map(item => (
            <FeaturedCard key={item.id} item={item} />
          ))}

          {/* Divider with label */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }} viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              More Projects
            </span>
            <div className="flex-1 h-px bg-slate-100" />
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((item, i) => (
              <ProjectCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
