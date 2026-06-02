import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const edu = [
  {
    degree: "B.Tech — Computer Science Engineering",
    school: "Asansol Engineering College",
    year:   "2021 – 2025",
    img:    "/assets/college.jpg",
  },
  {
    degree: "Higher Secondary — Science",
    school: "B N's Collegiate School, Patna",
    year:   "2019 – 2021",
    img:    "/assets/school.jpg",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 bg-white relative overflow-hidden">
      {/* 3D geometric rotating shapes */}
      <div className="bg-geo">
        <div className="geo-shape" />
        <div className="geo-shape" />
        <div className="geo-shape" />
        <div className="geo-shape" />
        <div className="geo-shape" />
      </div>
      <div className="relative z-10 section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}
        >
          <p className="eyebrow">Background</p>
          <h2 className="section-title">Education</h2>
          <div className="title-line" />
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-5">
          {edu.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.5 }} viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="card flex-1 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img src={item.img} alt={item.school}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <span className="absolute bottom-3 left-4 text-[10px] font-bold text-white/80 uppercase tracking-widest">
                  {item.year}
                </span>
                <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                  ✓ Completed
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-1.5">
                <div className="flex items-start gap-2">
                  <GraduationCap size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <h3 className="text-sm font-bold text-slate-800 leading-snug">{item.degree}</h3>
                </div>
                <p className="text-xs text-slate-500 font-medium pl-6">{item.school}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
