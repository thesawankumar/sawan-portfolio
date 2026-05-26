import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import EmailForm from "../components/EmailForm";

const socials = [
  { href: "https://www.linkedin.com/in/thesawankumar/", icon: <FaLinkedinIn size={15} />, label: "LinkedIn",
    cls: "hover:bg-blue-600 hover:border-blue-600 hover:text-white" },
  { href: "https://github.com/thesawankumar",           icon: <FaGithub size={15} />,     label: "GitHub",
    cls: "hover:bg-slate-900 hover:border-slate-900 hover:text-white" },
  { href: "https://twitter.com/thesawan_kumar",         icon: <FaTwitter size={15} />,    label: "Twitter",
    cls: "hover:bg-sky-500 hover:border-sky-500 hover:text-white" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}
        >
          <p className="eyebrow">Say hello</p>
          <h2 className="section-title">Get In Touch</h2>
          <div className="title-line" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }} viewport={{ once: true }}
            className="flex flex-col gap-6 lg:w-[40%]"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Let&apos;s work <span className="gradient-text">together.</span>
              </h3>
              <p className="mt-3 text-[14px] text-slate-500 leading-relaxed">
                I&apos;m open to full-time roles, freelance projects, and interesting collaborations.
                Drop me a message and I&apos;ll get back within 24 hours.
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              <a href="mailto:sawankushwaha249@gmail.com"
                className="flex items-center gap-3 text-sm text-slate-700 hover:text-sky-600 transition-colors group"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-sky-50 border border-sky-100 group-hover:bg-sky-100 transition-colors">
                  <Mail size={15} className="text-sky-600" />
                </div>
                sawankushwaha249@gmail.com
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-sky-50 border border-sky-100">
                  <MapPin size={15} className="text-sky-600" />
                </div>
                Bengaluru, Karnataka, India
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Connect</p>
              <div className="flex gap-2">
                {socials.map(s => (
                  <Link key={s.href} to={s.href} target="_blank" aria-label={s.label}>
                    <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}
                      className={`w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-200 shadow-sm ${s.cls}`}
                    >
                      {s.icon}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }} viewport={{ once: true }}
            className="flex-1"
          >
            <div className="card p-6 lg:p-8">
              <h4 className="text-base font-bold text-slate-900 mb-1">Send a message</h4>
              <p className="text-xs text-slate-400 mb-6">I&apos;ll reply within 24 hours.</p>
              <EmailForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
