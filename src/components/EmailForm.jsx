import { Send } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmailForm() {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .send("service_d4ubllg", "template_jf7k12o",
        { from_name: form.name, from_email: form.email, to_name: "Sawan Kumar", message: form.message, to_email: "sawankushwaha249@gmail.com" },
        "VjZK3MFeMHV-GLiC2"
      )
      .then(() => {
        toast.success("Message sent! I'll reply soon 🎉");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => toast.error("Something went wrong. Try again."))
      .finally(() => setLoading(false));
  };

  const inputCls = "w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-200";

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text"    placeholder="Your name *"     required value={form.name}    onChange={set("name")}    className={inputCls} />
        <input type="email"   placeholder="Email address *" required value={form.email}   onChange={set("email")}   className={inputCls} />
        <textarea rows={4}    placeholder="Your message *"  required value={form.message} onChange={set("message")} className={`${inputCls} resize-none`} />
        <button type="submit" disabled={loading} className="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed">
          {loading
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
            : <><Send size={14} /> Send Message</>
          }
        </button>
      </form>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
