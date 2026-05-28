import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, CheckCircle2, ChevronRight, ChevronLeft,
  Send, FolderOpen, Clock, DollarSign, User, Phone, Sparkles
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

/* ─── Data ─────────────────────────────── */
const projectTypes = [
  { id: "web",      icon: "🌐", label: "Web App",        desc: "Full-stack web application" },
  { id: "ai",       icon: "🤖", label: "AI / LLM Tool",  desc: "RAG, chatbot, vector search" },
  { id: "api",      icon: "🔌", label: "REST API",        desc: "Backend API & database" },
  { id: "ecom",     icon: "🛒", label: "E-commerce",      desc: "Online store with payments" },
  { id: "landing",  icon: "🎯", label: "Landing Page",    desc: "Business / portfolio site" },
  { id: "other",    icon: "✨", label: "Other",            desc: "Tell me what you need" },
];

const budgets = [
  { id: "b1", label: "₹5k – ₹15k",   sub: "Small project" },
  { id: "b2", label: "₹15k – ₹40k",  sub: "Medium project" },
  { id: "b3", label: "₹40k – ₹1L",   sub: "Large project" },
  { id: "b4", label: "₹1L+",          sub: "Enterprise" },
  { id: "b5", label: "Let's discuss", sub: "Flexible" },
];

const timelines = [
  { id: "t1", label: "ASAP",        sub: "Within 1 week" },
  { id: "t2", label: "2–4 weeks",   sub: "Standard" },
  { id: "t3", label: "1–2 months",  sub: "Comfortable" },
  { id: "t4", label: "3+ months",   sub: "Long-term" },
];

const inputCls =
  "w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-200";

/* ─── Step indicator ─────────────────── */
function Steps({ current, total }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            i < current
              ? "bg-sky-600 text-white"
              : i === current
              ? "bg-sky-100 text-sky-700 ring-2 ring-sky-400"
              : "bg-slate-100 text-slate-400"
          }`}>
            {i < current ? <CheckCircle2 size={14} /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-0.5 w-6 rounded-full transition-all duration-300 ${i < current ? "bg-sky-400" : "bg-slate-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Main component ─────────────────── */
export default function Quote() {
  const [step, setStep]         = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    type:     "",
    desc:     "",
    budget:   "",
    timeline: "",
    name:     "",
    phone:    "",
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const canNext = () => {
    if (step === 0) return !!form.type;
    if (step === 1) return form.desc.trim().length >= 10;
    if (step === 2) return !!form.budget && !!form.timeline;
    if (step === 3) return form.name.trim().length >= 2 && form.phone.trim().length >= 10;
    return true;
  };

  const handleSubmit = () => {
    const typeLabel     = projectTypes.find(t => t.id === form.type)?.label || form.type;
    const budgetLabel   = budgets.find(b => b.id === form.budget)?.label || form.budget;
    const timelineLabel = timelines.find(t => t.id === form.timeline)?.label || form.timeline;

    const msg = encodeURIComponent(
      `Hi Sawan! 👋 I'd like to get a quote for a project.\n\n` +
      `📁 *Project Type:* ${typeLabel}\n` +
      `📝 *Description:* ${form.desc}\n` +
      `💰 *Budget:* ${budgetLabel}\n` +
      `⏱ *Timeline:* ${timelineLabel}\n` +
      `👤 *Name:* ${form.name}\n` +
      `📞 *Phone:* ${form.phone}\n\n` +
      `Looking forward to hearing from you!`
    );

    window.open(`https://wa.me/919187082916?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const steps = [
    {
      icon: <FolderOpen size={16} className="text-sky-500" />,
      label: "Project Type",
    },
    {
      icon: <FileText size={16} className="text-sky-500" />,
      label: "Description",
    },
    {
      icon: <DollarSign size={16} className="text-sky-500" />,
      label: "Budget & Timeline",
    },
    {
      icon: <User size={16} className="text-sky-500" />,
      label: "Your Details",
    },
  ];

  return (
    <section id="quote" className="py-24 bg-white">
      <div className="section-wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}
        >
          <p className="eyebrow">Freelance</p>
          <h2 className="section-title">Get a Free Quote</h2>
          <div className="title-line" />
          <p className="text-[14px] text-slate-500 max-w-lg -mt-6 mb-10">
            Fill in your project details and I&apos;ll send you a quote on WhatsApp within a few hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }} viewport={{ once: true }}
          className="max-w-2xl"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-10 flex flex-col items-center gap-5 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Quote request sent!</h3>
                  <p className="text-sm text-slate-500 mt-2">
                    WhatsApp opened with your project details. I&apos;ll reply within a few hours.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setStep(0); setForm({ type:"", desc:"", budget:"", timeline:"", name:"", phone:"" }); }}
                  className="btn-ghost text-sm"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" className="card overflow-hidden">

                {/* Progress header */}
                <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
                  <Steps current={step} total={steps.length} />
                  <span className="text-[11px] text-slate-400 font-medium">
                    Step {step + 1} of {steps.length}
                  </span>
                </div>

                {/* Step content */}
                <div className="p-6">
                  <AnimatePresence mode="wait">

                    {/* Step 0 — Project type */}
                    {step === 0 && (
                      <motion.div key="s0"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                        className="flex flex-col gap-4"
                      >
                        <div>
                          <p className="text-base font-bold text-slate-900">What type of project?</p>
                          <p className="text-[12px] text-slate-500 mt-0.5">Select the category that best fits your needs.</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {projectTypes.map(t => (
                            <button
                              key={t.id}
                              onClick={() => set("type", t.id)}
                              className={`flex flex-col items-start gap-1.5 p-3.5 rounded-xl border text-left transition-all duration-200 ${
                                form.type === t.id
                                  ? "border-sky-400 bg-sky-50 ring-1 ring-sky-300"
                                  : "border-slate-200 hover:border-sky-200 hover:bg-slate-50"
                              }`}
                            >
                              <span className="text-xl">{t.icon}</span>
                              <p className="text-xs font-bold text-slate-800">{t.label}</p>
                              <p className="text-[10px] text-slate-500 leading-tight">{t.desc}</p>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 1 — Description */}
                    {step === 1 && (
                      <motion.div key="s1"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                        className="flex flex-col gap-4"
                      >
                        <div>
                          <p className="text-base font-bold text-slate-900">Describe your project</p>
                          <p className="text-[12px] text-slate-500 mt-0.5">The more detail, the more accurate the quote.</p>
                        </div>
                        <textarea
                          rows={5}
                          placeholder="e.g. I need a gym website with membership plans, trainer profiles, a contact form, and WhatsApp integration. Should be mobile-friendly..."
                          value={form.desc}
                          onChange={e => set("desc", e.target.value)}
                          className={`${inputCls} resize-none`}
                        />
                        <p className={`text-[11px] text-right transition-colors ${form.desc.length < 10 ? "text-slate-400" : "text-emerald-500"}`}>
                          {form.desc.length} chars {form.desc.length < 10 ? `(min 10)` : "✓"}
                        </p>
                      </motion.div>
                    )}

                    {/* Step 2 — Budget & Timeline */}
                    {step === 2 && (
                      <motion.div key="s2"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                        className="flex flex-col gap-5"
                      >
                        {/* Budget */}
                        <div className="flex flex-col gap-2.5">
                          <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                            <DollarSign size={14} className="text-sky-500" /> Budget range
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {budgets.map(b => (
                              <button
                                key={b.id}
                                onClick={() => set("budget", b.id)}
                                className={`flex flex-col items-start px-4 py-2.5 rounded-xl border text-left transition-all duration-200 ${
                                  form.budget === b.id
                                    ? "border-sky-400 bg-sky-50 ring-1 ring-sky-300"
                                    : "border-slate-200 hover:border-sky-200"
                                }`}
                              >
                                <span className="text-xs font-bold text-slate-800">{b.label}</span>
                                <span className="text-[10px] text-slate-500">{b.sub}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="flex flex-col gap-2.5">
                          <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                            <Clock size={14} className="text-sky-500" /> Timeline
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {timelines.map(t => (
                              <button
                                key={t.id}
                                onClick={() => set("timeline", t.id)}
                                className={`flex flex-col items-start px-4 py-2.5 rounded-xl border text-left transition-all duration-200 ${
                                  form.timeline === t.id
                                    ? "border-sky-400 bg-sky-50 ring-1 ring-sky-300"
                                    : "border-slate-200 hover:border-sky-200"
                                }`}
                              >
                                <span className="text-xs font-bold text-slate-800">{t.label}</span>
                                <span className="text-[10px] text-slate-500">{t.sub}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3 — Contact details */}
                    {step === 3 && (
                      <motion.div key="s3"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                        className="flex flex-col gap-4"
                      >
                        <div>
                          <p className="text-base font-bold text-slate-900">Your contact details</p>
                          <p className="text-[12px] text-slate-500 mt-0.5">So I can reach you with the quote.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="relative">
                            <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Your full name *"
                              value={form.name}
                              onChange={e => set("name", e.target.value)}
                              className={`${inputCls} pl-9`}
                            />
                          </div>
                          <div className="relative">
                            <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="tel"
                              placeholder="WhatsApp number (with country code) *"
                              value={form.phone}
                              onChange={e => set("phone", e.target.value)}
                              className={`${inputCls} pl-9`}
                            />
                          </div>
                        </div>

                        {/* Summary preview */}
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-1.5 mt-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Quote Summary</p>
                          {[
                            ["Project", projectTypes.find(t => t.id === form.type)?.label],
                            ["Budget",  budgets.find(b => b.id === form.budget)?.label],
                            ["Timeline",timelines.find(t => t.id === form.timeline)?.label],
                          ].map(([k, v]) => (
                            <div key={k} className="flex items-center gap-2 text-[12px]">
                              <span className="text-slate-400 w-16">{k}</span>
                              <span className="font-semibold text-slate-700">{v}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* Navigation footer */}
                <div className="px-6 pb-6 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setStep(s => s - 1)}
                    disabled={step === 0}
                    className="btn-ghost text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={15} /> Back
                  </button>

                  {step < steps.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setStep(s => s + 1)}
                      disabled={!canNext()}
                      className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next <ChevronRight size={15} />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={handleSubmit}
                      disabled={!canNext()}
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <FaWhatsapp size={16} /> Send via WhatsApp
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
