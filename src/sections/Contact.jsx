import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, ArrowUpRight, Clock, Send, ChevronDown, ChevronUp } from "lucide-react";
import { FaWhatsapp, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { WA } from "../constants/whatsapp";

const WA_LINK = WA.contact;

/* ── Contact channels ── */
const channels = [
  {
    icon: <FaWhatsapp size={19} className="text-emerald-600" />,
    iconBg: "bg-emerald-50 border-emerald-200",
    label: "WhatsApp",
    value: "+91 91870 82916",
    sub: "Fastest · usually within hours",
    href: WA_LINK,
    highlight: true,
  },
  {
    icon: <Mail size={17} className="text-accent" />,
    iconBg: "bg-accent-lt border-accent-md",
    label: "Email",
    value: "sawankushwaha249@gmail.com",
    sub: "Within 24 hours",
    href: "mailto:sawankushwaha249@gmail.com",
  },
  {
    icon: <FaLinkedinIn size={16} className="text-blue-700" />,
    iconBg: "bg-blue-50 border-blue-200",
    label: "LinkedIn",
    value: "in/thesawankumar",
    sub: "Connect & DM",
    href: "https://www.linkedin.com/in/thesawankumar/",
  },
  {
    icon: <FaGithub size={16} className="text-slate-700" />,
    iconBg: "bg-slate-100 border-slate-200",
    label: "GitHub",
    value: "thesawankumar",
    sub: "See my code",
    href: "https://github.com/thesawankumar",
  },
  {
    icon: <SiLeetcode size={16} className="text-orange-500" />,
    iconBg: "bg-orange-50 border-orange-200",
    label: "LeetCode",
    value: "thesawankumar",
    sub: "500+ problems · 150+ day streak",
    href: "https://leetcode.com/thesawankumar",
  },
];

/* ── Services I offer ── */
const services = [
  { emoji: "🌐", title: "Website Development",   desc: "Landing pages, business sites, full web apps — React, Next.js, Node.js" },
  { emoji: "💬", title: "WhatsApp Bot",           desc: "24/7 auto-reply, lead capture, menu flows, owner notifications" },
  { emoji: "🤖", title: "AI / LLM Tools",         desc: "RAG pipelines, AI chatbots, resume analyzers, LangChain + FAISS" },
  { emoji: "⚙️", title: "Full Stack App",         desc: "End-to-end product development — idea to deployment on cloud" },
];

/* ── Quick message form (mailto — no backend needed) ── */
function QuickMessage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg]   = useState("");

  const handleSend = () => {
    if (!name.trim() || !msg.trim()) return;
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body    = encodeURIComponent(`Hi Sawan,\n\n${msg}\n\nBest,\n${name}`);
    window.open(`mailto:sawankushwaha249@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Send size={15} className="text-accent" />
          Send a quick message
        </span>
        {open ? <ChevronUp size={15} className="text-slate-400" /> : <ChevronDown size={15} className="text-slate-400" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 flex flex-col gap-3 border-t border-slate-100 pt-4">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all"
              />
              <textarea
                rows={3}
                placeholder="What would you like to discuss?"
                value={msg}
                onChange={e => setMsg(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all resize-none"
              />
              <p className="text-[11px] text-slate-400">
                This will open your email client with the message pre-filled.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleSend}
                disabled={!name.trim() || !msg.trim()}
                className="btn-primary justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={13} /> Open in Email
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main section ── */
export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Moving orbs */}
      <div className="bg-orbs" />
      {/* Gradient pulse */}
      <div className="bg-contact-anim" />
      <div className="relative z-10 section-wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}
        >
          <p className="eyebrow">Say hello</p>
          <h2 className="section-title">Get In Touch</h2>
          <div className="title-line" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-14">

          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }} viewport={{ once: true }}
            className="flex flex-col gap-7 lg:w-[42%]"
          >
            {/* Headline */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                Let&apos;s build something{" "}
                <span className="gradient-text">great together.</span>
              </h3>
              <p className="mt-3 text-[14px] text-slate-500 leading-relaxed">
                Whether you have a project in mind, a job opportunity, or just want to say hi —
                pick any channel and I&apos;ll get back to you quickly.
              </p>
            </div>

            {/* What I can help with */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                What I can help with
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {services.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }} viewport={{ once: true }}
                    className="flex items-start gap-2.5 bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm hover:border-accent-md hover:shadow-md transition-all duration-200"
                  >
                    <span className="text-lg flex-shrink-0">{s.emoji}</span>
                    <div>
                      <p className="text-[12px] font-bold text-slate-800">{s.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-[12px] text-slate-500">
                <Clock size={13} className="text-accent flex-shrink-0" />
                Avg. response: <strong className="text-slate-700 ml-1">under 24 hours</strong>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-slate-500">
                <MapPin size={13} className="text-accent flex-shrink-0" />
                Bengaluru, Karnataka, India
              </div>
            </div>
          </motion.div>

          {/* ── Right ── */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Channel list */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }} viewport={{ once: true }}
              className="flex flex-col gap-2.5"
            >
              {channels.map((ch, i) => (
                <motion.a
                  key={i}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-4 bg-white border rounded-2xl px-4 py-3.5 shadow-sm hover:shadow-md transition-all duration-200 group ${
                    ch.highlight
                      ? "border-emerald-200 ring-1 ring-emerald-100"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-9 h-9 flex items-center justify-center rounded-xl border flex-shrink-0 ${ch.iconBg}`}>
                    {ch.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-800">{ch.label}</p>
                      {ch.highlight && (
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
                          Fastest
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{ch.value}</p>
                  </div>

                  {/* Sub + arrow */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="hidden sm:block text-[10px] text-slate-400">{ch.sub}</span>
                    <ArrowUpRight
                      size={15}
                      className="text-slate-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    />
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Quick message accordion */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }} viewport={{ once: true }}
            >
              <QuickMessage />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
