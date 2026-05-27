import { motion } from "framer-motion";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";

const WA_LINK =
  "https://wa.me/919187082916?text=Hi%20Sawan%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project%20with%20you.";

const highlights = [
  { value: "3",    label: "Internships" },
  { value: "500+", label: "DSA Solved"  },
  { value: "5+",   label: "Projects"    },
  { value: "7.87", label: "CGPA"        },
];

// What I do — concise, scannable
const focus = [
  { icon: "⚡", title: "Full Stack Dev",  desc: "React, Next.js, Node.js, Spring Boot — end-to-end." },
  { icon: "🤖", title: "AI Engineering", desc: "RAG pipelines, vector search, LLM integration with LangChain & FAISS." },
  { icon: "🧑‍💻", title: "Freelancer",     desc: "Available for freelance projects — web apps, APIs, AI tools." },
  { icon: "☁️", title: "Cloud & DevOps", desc: "AWS (EC2, S3), Docker, CI/CD — scalable deployments." },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="section-wrap">

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}
        >
          <p className="eyebrow">About me</p>
          <h2 className="section-title">A bit about me</h2>
          <div className="title-line" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* ── Left — Photo ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="flex flex-col items-center gap-6 flex-shrink-0 w-full lg:w-auto"
          >
            <div className="relative">
              <div className="w-52 h-52 lg:w-60 lg:h-60 rounded-3xl overflow-hidden shadow-lg border border-slate-100">
              <img
                src="/assets/profile.png"
                alt="Sawan Kumar"
                loading="lazy"
                decoding="async"
                width="240"
                height="240"
                className="w-full h-full object-cover"
              />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white border border-slate-200 shadow-md rounded-full px-4 py-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-700">Open to Work</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2.5 w-full max-w-[13rem] mt-2">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07 }} viewport={{ once: true }}
                  className="flex flex-col items-center bg-white border border-slate-100 rounded-2xl py-3 shadow-sm"
                >
                  <span className="text-xl font-extrabold text-sky-600">{h.value}</span>
                  <span className="text-[10px] text-slate-500 font-medium mt-0.5 text-center">{h.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Quick links */}
            <div className="flex gap-3">
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/thesawankumar/" },
                { label: "GitHub",   href: "https://github.com/thesawankumar" },
                { label: "LeetCode", href: "https://leetcode.com/thesawankumar" },
              ].map(l => (
                <Link key={l.href} to={l.href} target="_blank"
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-sky-600 transition-colors"
                >
                  {l.label} <ArrowUpRight size={10} />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* ── Right — Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="flex flex-col gap-7 flex-1"
          >
            {/* Headline bio — short & punchy */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900">
                Full Stack &amp; AI Engineer · Freelancer
              </h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">
                I build scalable backend systems and LLM-powered applications — from REST APIs and
                real-time platforms to vector search pipelines and deep learning workflows.
                Strong foundation in system design, database optimization, and DSA.
              </p>
              <p className="text-[15px] text-slate-600 leading-relaxed">
                Currently based in <strong className="text-slate-800">Bengaluru</strong>, open to
                full-time roles and <strong className="text-slate-800">freelance projects</strong>.
              </p>
            </div>

            {/* What I do — 3 focus areas */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">What I do</p>
              <div className="flex flex-col gap-2.5">
                {focus.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                    className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-sm hover:border-sky-200 hover:shadow-md transition-all duration-200"
                  >
                    <span className="text-xl flex-shrink-0 mt-0.5">{f.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{f.title}</p>
                      <p className="text-[12px] text-slate-500 mt-0.5">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact row */}
            <div className="flex flex-wrap gap-3 text-[13px] text-slate-500 pt-1">
              <a href="mailto:sawankushwaha249@gmail.com"
                className="flex items-center gap-1.5 hover:text-sky-600 transition-colors"
              >
                <Mail size={13} className="text-sky-500" />
                sawankushwaha249@gmail.com
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-sky-500" />
                Bengaluru, Karnataka
              </span>
              {/* WhatsApp quick contact */}
              <Link
                to={WA_LINK}
                target="_blank"
                className="flex items-center gap-1.5 font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <FaWhatsapp size={14} />
                WhatsApp me
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
