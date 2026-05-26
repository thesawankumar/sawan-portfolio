import { FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const links = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

const socials = [
  { href: "https://www.linkedin.com/in/thesawankumar/", icon: <FaLinkedinIn size={14} />, label: "LinkedIn" },
  { href: "https://github.com/thesawankumar",           icon: <FaGithub size={14} />,     label: "GitHub" },
  { href: "https://twitter.com/thesawan_kumar",         icon: <FaTwitter size={14} />,    label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <span className="text-xl font-extrabold text-white">
              Sawan<span className="text-sky-500">.</span>
            </span>
            <p className="text-sm leading-relaxed">
              Full Stack Developer building scalable, user-focused web applications.
            </p>
            <div className="flex gap-2 mt-1">
              {socials.map(s => (
                <Link key={s.href} to={s.href} target="_blank" aria-label={s.label}>
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-400 hover:text-white transition-all duration-200">
                    {s.icon}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Navigation</p>
            <ul className="flex flex-col gap-2">
              {links.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm hover:text-sky-400 transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Contact</p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:sawankushwaha249@gmail.com" className="hover:text-sky-400 transition-colors">
                sawankushwaha249@gmail.com
              </a>
              <span>Bengaluru, Karnataka, India</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} Sawan Kumar. All rights reserved.</span>
          <span>Designed &amp; built by Sawan Kumar</span>
        </div>
      </div>
    </footer>
  );
}
