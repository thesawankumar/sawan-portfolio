import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { WA } from "../constants/whatsapp";

const reviews = [
  {
    name: "Saurav",
    role: "Founder, BoothBloom",
    avatar: "SN",
    avatarBg: "bg-blue-100 text-blue-700",
    rating: 5,
    text: "Sawan delivered the BoothBloom platform ahead of schedule. The real-time availability tracking and JWT auth worked flawlessly from day one. Very professional, clean code, and great communication throughout.",
    project: "BoothBloom Platform",
  },
  {
    name: "Shiva Rajput",
    role: "Co-founder, Devi Zones",
    avatar: "SR",
    avatarBg: "bg-violet-100 text-violet-700",
    rating: 5,
    text: "The trading simulation platform Sawan built for us significantly boosted user engagement. The admin dashboard with Chart.js was exactly what we needed. Highly recommend for any full-stack work.",
    project: "Trading Simulation Platform",
  },
  {
    name: "Arjun Nair",
    role: "Owner, Castlewood Gym",
    avatar: "AN",
    avatarBg: "bg-emerald-100 text-emerald-700",
    rating: 4.5,
    text: "Our gym website looks amazing and works perfectly on all devices. Sawan understood our brand and delivered a modern, fast site with membership info, schedules, and WhatsApp integration. Clients love it.",
    project: "Castlewood Gym Website",
  },
  {
    name: "Tech Lead (Sreeram A M)",
    role: "MELE (Make Engineer's Life Easy)",
    avatar: "SM",
    avatarBg: "bg-sky-100 text-sky-700",
    rating: 5,
    text: "Sawan's AWS deployment work reduced our server costs by 30% while achieving 99.9% uptime. His code optimization improved load times by 35%. A reliable engineer who takes ownership of his work.",
    project: "Cloud Infrastructure",
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="section-wrap">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}
        >
          <p className="eyebrow">Client feedback</p>
          <h2 className="section-title">What clients say</h2>
          <div className="title-line" />
        </motion.div>

        {/* Overall rating bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
          className="flex items-center gap-4 mb-10 bg-amber-50 border border-amber-100 rounded-2xl px-5 py-4 w-fit"
        >
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-slate-900">5.0</span>
            <StarRating />
          </div>
          <div className="w-px h-10 bg-amber-200" />
          <div>
            <p className="text-sm font-semibold text-slate-700">Overall Rating</p>
            <p className="text-[12px] text-slate-500">Based on {reviews.length} client reviews</p>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="card p-6 flex flex-col gap-4 hover:border-slate-200 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote size={20} className="text-sky-200 fill-sky-100" />

              {/* Review text */}
              <p className="text-[13px] text-slate-600 leading-relaxed flex-1">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Project tag */}
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-md w-fit">
                {r.project}
              </span>

              {/* Divider */}
              <div className="h-px bg-slate-100" />

              {/* Reviewer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar initials */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${r.avatarBg}`}>
                    {r.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{r.name}</p>
                    <p className="text-[11px] text-slate-500">{r.role}</p>
                  </div>
                </div>
                <StarRating count={r.rating} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5"
        >
          <div>
            <p className="text-sm font-bold text-slate-800">Want to work together?</p>
            <p className="text-[13px] text-slate-500 mt-0.5">I&apos;m available for freelance projects and full-time roles.</p>
          </div>
          <a
            href="https://wa.me/919187082916?text=Hi%20Sawan%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
              className="btn-primary whitespace-nowrap"
            >
              Let&apos;s Talk
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
