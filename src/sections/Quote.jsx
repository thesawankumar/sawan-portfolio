import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, CheckCircle2, ChevronRight, ChevronLeft,
  Send, FolderOpen, Clock, DollarSign, User, Phone, Sparkles, Check
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { WA } from "../constants/whatsapp";

/* ─── Data ─────────────────────────────── */
const projectTypes = [
  { id: "website",    icon: "🌐", label: "Website Dev",      desc: "Landing page / business site / web app" },
  { id: "whatsapp",   icon: "💬", label: "WhatsApp Bot",     desc: "Auto-reply, lead capture, 24/7 automation" },
  { id: "ai",         icon: "🤖", label: "AI / LLM Tool",    desc: "RAG, chatbot, resume analyzer, LangChain" },
  { id: "fullstack",  icon: "⚙️", label: "Full Stack App",   desc: "End-to-end product — idea to deployment" },
  { id: "api",        icon: "🔌", label: "REST API",          desc: "Backend API, auth, DB design, cloud deploy" },
  { id: "other",      icon: "✨", label: "Other",             desc: "Tell me what you need" },
];

/* ─── Pricing packages — with full feature breakdown ─── */
const pricing = [
  {
    service: "🌐 Website Development",
    color: "border-accent-md",
    accent: "text-accent",
    bg: "bg-accent-lt",
    packages: [
      {
        name: "Basic Landing Page",
        price: "₹8,000",
        days: "5–7 days",
        popular: false,
        features: [
          "Single-page responsive design",
          "Sections: Hero, About, Services, Contact",
          "WhatsApp & call button integration",
          "Mobile-first layout with fast load time",
          "Basic SEO (meta tags, title, description)",
          "Deployed on Vercel / Netlify",
          "1 round of revisions included",
        ],
      },
      {
        name: "Full Business Website",
        price: "₹18,000",
        days: "10–14 days",
        popular: true,
        features: [
          "Multi-page website (up to 8 pages)",
          "Custom UI with smooth animations",
          "Contact form + WhatsApp integration",
          "Optional: blog, gallery, or pricing page",
          "Google Analytics & Search Console setup",
          "Full SEO — sitemap, meta, Open Graph",
          "Optimised for Core Web Vitals (90+ score)",
          "2 rounds of revisions included",
        ],
      },
      {
        name: "Custom Web App",
        price: "₹35,000+",
        days: "20–30 days",
        popular: false,
        features: [
          "Full-stack: React + Node.js / Spring Boot",
          "User authentication (login, register, roles)",
          "Custom database design & REST APIs",
          "Admin dashboard with analytics",
          "Payment gateway integration (Razorpay)",
          "Cloud deployment on AWS / Railway",
          "Secure, scalable & production-ready",
          "3 rounds of revisions included",
        ],
      },
    ],
  },
  {
    service: "💬 WhatsApp Bot",
    color: "border-emerald-200",
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
    packages: [
      {
        name: "Basic Bot",
        price: "₹6,000",
        days: "3–5 days",
        popular: false,
        features: [
          "Auto-reply to common customer queries",
          "Menu-driven conversation flow",
          "Business hours, location & contact info",
          "Instant lead notification to owner",
          "Always-live deployment on Railway",
          "Easy to update & maintain",
          "1 round of revisions included",
        ],
      },
      {
        name: "Advanced Bot + CRM",
        price: "₹14,000",
        days: "7–10 days",
        popular: true,
        features: [
          "Everything in Basic Bot",
          "Lead capture: name, phone, requirement",
          "Service-wise conversation flows",
          "Budget & timeline collection from client",
          "Instant structured lead alert to owner",
          "Google Sheets / Notion CRM integration",
          "Session memory (remembers user context)",
          "2 rounds of revisions included",
        ],
      },
      {
        name: "Full Automation Suite",
        price: "₹25,000",
        days: "10–15 days",
        popular: false,
        features: [
          "Everything in Advanced Bot + CRM",
          "Hindi + English bilingual support",
          "Broadcast & bulk messaging setup",
          "Automated follow-up reminders",
          "Custom integrations (payment, booking, etc.)",
          "Usage analytics & reporting dashboard",
          "Priority support for 30 days post-launch",
          "3 rounds of revisions included",
        ],
      },
    ],
  },
  {
    service: "🤖 AI / LLM Tools",
    color: "border-violet-200",
    accent: "text-violet-600",
    bg: "bg-violet-50",
    packages: [
      {
        name: "Basic AI Chatbot",
        price: "₹18,000",
        days: "7–10 days",
        popular: false,
        features: [
          "LLM-powered Q&A chatbot (GPT / Gemini)",
          "Custom knowledge base from your documents",
          "Clean web UI (React or Streamlit)",
          "Handles FAQs, product info, support queries",
          "Shareable link — ready to embed or share",
          "Prompt engineering for accurate responses",
          "1 round of revisions included",
        ],
      },
      {
        name: "RAG Pipeline + UI",
        price: "₹32,000",
        days: "14–21 days",
        popular: true,
        features: [
          "Full RAG pipeline (LangChain + FAISS)",
          "Ingests PDFs, CSVs, web pages, docs",
          "Semantic search with vector embeddings",
          "Structured & validated LLM output",
          "Custom React frontend with chat UI",
          "REST API endpoint for easy integration",
          "Deployed & production-ready",
          "2 rounds of revisions included",
        ],
      },
      {
        name: "Full AI Product",
        price: "₹55,000+",
        days: "25–40 days",
        popular: false,
        features: [
          "Multi-agent AI pipeline (LangGraph)",
          "Advanced prompt engineering & fine-tuning",
          "Vector database (FAISS / Pinecone)",
          "Full-stack web app with user auth",
          "Admin panel with usage analytics",
          "Cloud deployment on AWS / Railway",
          "Scalable, maintainable architecture",
          "3 rounds of revisions included",
        ],
      },
    ],
  },
  {
    service: "⚙️ Full Stack App",
    color: "border-orange-200",
    accent: "text-orange-600",
    bg: "bg-orange-50",
    packages: [
      {
        name: "MVP App",
        price: "₹25,000",
        days: "14–21 days",
        popular: false,
        features: [
          "Core feature set — lean, fast to market",
          "React frontend + Node.js / Spring Boot",
          "User auth with role-based access control",
          "REST API + MongoDB / PostgreSQL",
          "Basic admin panel",
          "Deployed on cloud (Vercel + Railway)",
          "Clean, documented codebase",
          "2 rounds of revisions included",
        ],
      },
      {
        name: "Production App",
        price: "₹50,000",
        days: "30–45 days",
        popular: true,
        features: [
          "Full feature set with polished, modern UI",
          "Real-time features (WebSocket / SSE)",
          "Payment integration (Razorpay / Stripe)",
          "Email & WhatsApp notification system",
          "AWS deployment (EC2 + S3 + CloudFront)",
          "CI/CD pipeline for automated deployments",
          "Performance-optimised (90+ Lighthouse)",
          "3 rounds of revisions included",
        ],
      },
      {
        name: "Enterprise Grade",
        price: "₹90,000+",
        days: "Custom timeline",
        popular: false,
        features: [
          "Modular / microservices architecture",
          "Multi-tenant support",
          "Advanced security — OAuth2, JWT, 2FA",
          "Scalable DB with Redis caching layer",
          "Docker + Kubernetes deployment",
          "Monitoring, logging & alerting setup",
          "Dedicated post-launch support (30 days)",
          "Unlimited revisions during development",
        ],
      },
    ],
  },
];

/* ─── Payment terms — 30/50/20 structure ─── */
const paymentTerms = [
  { icon: "🔐", title: "30% to Start",       desc: "Project kickoff after initial advance" },
  { icon: "🚀", title: "50% at Milestone",   desc: "Paid when core features are delivered" },
  { icon: "✅", title: "20% on Delivery",    desc: "Final payment after your approval" },
  { icon: "🔄", title: "Free Revisions",     desc: "Included in every package" },
];

const budgets = [
  { id: "b1", label: "Under ₹10k",    sub: "Basic / landing page" },
  { id: "b2", label: "₹10k – ₹25k",  sub: "Standard project" },
  { id: "b3", label: "₹25k – ₹50k",  sub: "Full-featured app" },
  { id: "b4", label: "₹50k+",         sub: "Enterprise / complex" },
  { id: "b5", label: "Let's discuss", sub: "Flexible budget" },
];

const timelines = [
  { id: "t1", label: "ASAP",        sub: "Within 1 week" },
  { id: "t2", label: "2–4 weeks",   sub: "Standard" },
  { id: "t3", label: "1–2 months",  sub: "Comfortable" },
  { id: "t4", label: "3+ months",   sub: "Long-term" },
];

const inputCls =
  "w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all duration-200";

/* ─── Step indicator ─────────────────── */
function Steps({ current, total }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            i < current
              ? "bg-accent text-white"
              : i === current
              ? "bg-accent-md text-accent ring-2 ring-accent"
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

/* ─── Pricing Tabs Component ─────────────── */
function PricingTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const cat = pricing[activeTab];

  return (
    <div className="flex flex-col gap-5">
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2">
        {pricing.map((p, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all duration-200 ${
              activeTab === i
                ? `${cat.color} ${cat.accent} ${cat.bg} border-current`
                : "border-slate-200 text-slate-500 hover:border-slate-300 bg-white"
            }`}
          >
            {p.service}
          </button>
        ))}
      </div>

      {/* Package cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {cat.packages.map((pkg, pi) => (
            <div
              key={pi}
              className={`relative flex flex-col rounded-2xl border p-5 shadow-sm transition-all duration-200 ${
                pkg.popular
                  ? `${cat.color} ${cat.bg} shadow-md`
                  : "border-slate-100 bg-white"
              }`}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white border ${cat.color} ${cat.accent} shadow-sm whitespace-nowrap`}>
                  ⭐ Most Popular
                </div>
              )}

              {/* Package name + price */}
              <div className="mb-4">
                <p className="text-sm font-bold text-slate-900">{pkg.name}</p>
                <div className="flex items-end gap-1.5 mt-1.5">
                  <span className={`text-2xl font-extrabold ${cat.accent}`}>{pkg.price}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={11} className="text-slate-400" />
                  <span className="text-[11px] text-slate-500">{pkg.days}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2 flex-1">
                {pkg.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-[12px] text-slate-600">
                    <Check size={13} className={`mt-0.5 flex-shrink-0 ${cat.accent}`} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`${WA.quoteBase}${encodeURIComponent(`Hi Sawan, I'm interested in the "${pkg.name}" package (${pkg.price}). Can we discuss?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-5 flex items-center justify-center gap-1.5 text-[12px] font-bold px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  pkg.popular
                    ? "bg-slate-900 hover:bg-slate-800 text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                }`}
              >
                <FaWhatsapp size={13} /> Get This Package
              </a>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
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

    // No emojis — encodeURIComponent handles the rest cleanly
    const msg = encodeURIComponent(
      `Hi Sawan, I'd like to get a quote.\n\n` +
      `Project: ${typeLabel}\n` +
      `Details: ${form.desc}\n` +
      `Budget: ${budgetLabel}\n` +
      `Timeline: ${timelineLabel}\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}`
    );

    window.open(`https://wa.me/919187082916?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const steps = [
    {
      icon: <FolderOpen size={16} className="text-accent" />,
      label: "Project Type",
    },
    {
      icon: <FileText size={16} className="text-accent" />,
      label: "Description",
    },
    {
      icon: <DollarSign size={16} className="text-accent" />,
      label: "Budget & Timeline",
    },
    {
      icon: <User size={16} className="text-accent" />,
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

        {/* ── Pricing packages ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">
            Pricing Packages
          </p>

          {/* Service tabs */}
          <PricingTabs />

          {/* Payment terms */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {paymentTerms.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }} viewport={{ once: true }}
                className="flex flex-col items-center text-center gap-1.5 bg-white border border-slate-100 rounded-2xl px-3 py-4 shadow-sm"
              >
                <span className="text-xl">{t.icon}</span>
                <p className="text-[11px] font-bold text-slate-800">{t.title}</p>
                <p className="text-[10px] text-slate-500 leading-snug">{t.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Free consultation note */}
          <div className="mt-4 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 w-fit">
            <Sparkles size={14} className="text-emerald-600 flex-shrink-0" />
            <p className="text-[12px] text-emerald-800 font-medium">
              Free 15-min consultation — discuss your project before committing.
            </p>
          </div>
        </motion.div>

        {/* ── Quote form ── */}
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
                                  ? "border-accent bg-accent-lt ring-1 ring-accent"
                                  : "border-slate-200 hover:border-accent-md hover:bg-slate-50"
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
                            <DollarSign size={14} className="text-accent" /> Budget range
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {budgets.map(b => (
                              <button
                                key={b.id}
                                onClick={() => set("budget", b.id)}
                                className={`flex flex-col items-start px-4 py-2.5 rounded-xl border text-left transition-all duration-200 ${
                                  form.budget === b.id
                                    ? "border-accent bg-accent-lt ring-1 ring-accent"
                                    : "border-slate-200 hover:border-accent-md"
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
                            <Clock size={14} className="text-accent" /> Timeline
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {timelines.map(t => (
                              <button
                                key={t.id}
                                onClick={() => set("timeline", t.id)}
                                className={`flex flex-col items-start px-4 py-2.5 rounded-xl border text-left transition-all duration-200 ${
                                  form.timeline === t.id
                                    ? "border-accent bg-accent-lt ring-1 ring-accent"
                                    : "border-slate-200 hover:border-accent-md"
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
