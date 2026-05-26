import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const jobs = [
  {
    role:     "Full Stack Developer Intern",
    company:  "Unique Tutor Arc Pvt. (Devi Zones)",
    period:   "Oct 2024 – Jan 2025",
    location: "Remote",
    points: [
      "Built an interactive trading simulation platform with React & Redux — real-time market data, portfolio tracking, boosted engagement by 20%.",
      "Developed admin dashboard with Chart.js for trade visualization, improving management efficiency by 25%.",
    ],
  },
  {
    role:     "Freelance Full Stack Developer",
    company:  "BoothBloom",
    period:   "Feb 2025 – May 2025",
    location: "Remote",
    points: [
      "Built real-time availability tracking with Node.js, Express & MongoDB — cut page load time by 0.7s.",
      "Implemented JWT role-based auth & Razorpay payment integration, reducing auth errors by 15%.",
    ],
  },
  {
    role:     "Full Stack Developer Intern",
    company:  "MELE (Make Engineer's Life Easy)",
    period:   "May 2024 – Sep 2024",
    location: "Remote",
    points: [
      "Deployed cloud solution on AWS — reduced server costs by 30%, achieved 99.9% uptime.",
      "Optimized codebase and security practices, cutting load times by 35%.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-slate-50">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}
        >
          <p className="eyebrow">Work history</p>
          <h2 className="section-title">Experience</h2>
          <div className="title-line" />
        </motion.div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-0">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200" />

          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}
              className="relative pl-10 pb-10 last:pb-0"
            >
              {/* Dot */}
              <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-sky-500 border-2 border-white shadow-sm ring-2 ring-sky-100" />

              {/* Card */}
              <div className="card p-5 hover:border-sky-200 transition-colors duration-200">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{job.role}</h3>
                    <p className="text-sm font-semibold text-sky-600 mt-0.5">{job.company}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1 flex-shrink-0">
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Calendar size={11} /> {job.period}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <MapPin size={11} /> {job.location}
                    </span>
                  </div>
                </div>

                {/* Points */}
                <ul className="flex flex-col gap-2">
                  {job.points.map((pt, j) => (
                    <li key={j} className="flex gap-2.5 text-[13px] text-slate-600 leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full bg-sky-400 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
