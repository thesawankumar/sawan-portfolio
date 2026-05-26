import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { data1, data2, data3 } from "../constants/skillsData";

const bp = {
  320:  { slidesPerView: 3,   spaceBetween: 10 },
  480:  { slidesPerView: 4,   spaceBetween: 12 },
  768:  { slidesPerView: 6,   spaceBetween: 14 },
  1024: { slidesPerView: 8,   spaceBetween: 16 },
};

function SkillChip({ item }) {
  return (
    <div className="flex flex-col items-center gap-2 bg-white border border-slate-100 rounded-xl px-3 py-3.5 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-sky-200 transition-all duration-200 cursor-default group w-20 lg:w-24">
      <img
        src={item.imgSrc}
        alt={item.label}
        className="w-8 h-8 lg:w-10 lg:h-10 object-contain group-hover:scale-110 transition-transform duration-200"
      />
      <span className="text-[9px] lg:text-[10px] font-semibold text-slate-500 text-center leading-tight">
        {item.label}
      </span>
    </div>
  );
}

function CarouselRow({ data, reverse = false, bg = "bg-slate-50" }) {
  return (
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${bg === "bg-white" ? "#ffffff" : "#f8fafc"}, transparent)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${bg === "bg-white" ? "#ffffff" : "#f8fafc"}, transparent)` }} />
      <Swiper
        breakpoints={bp}
        loop
        autoplay={{ delay: 1800, disableOnInteraction: false, reverseDirection: reverse }}
        modules={[Autoplay]}
      >
        {data.map(item => (
          <SwiperSlide key={item.id} className="flex justify-center py-2">
            <SkillChip item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const rows = [
  { label: "Frontend",          data: data1, reverse: false },
  { label: "Backend & Database",data: data2, reverse: true  },
  { label: "AI / ML & DevOps",  data: data3, reverse: false },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-slate-50">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}
        >
          <p className="eyebrow">Tech stack</p>
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <div className="title-line" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} viewport={{ once: true }}
        className="flex flex-col gap-6 mt-2"
      >
        {rows.map((row, i) => (
          <div key={i} className="flex flex-col gap-2">
            {/* Row label */}
            <div className="section-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {row.label}
              </span>
            </div>
            <CarouselRow data={row.data} reverse={row.reverse} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
