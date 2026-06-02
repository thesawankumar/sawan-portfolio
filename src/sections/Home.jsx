import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CodeRain from "../components/CodeRain";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const ref = useRef(null);
  const [vantaLoaded, setVantaLoaded] = useState(false);
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

  useEffect(() => {
    if (!isDesktop) return;
    let effect = null;
    import("vanta/dist/vanta.net.min").then(mod => {
      if (ref.current && !effect) {
        effect = mod.default({
          el: ref.current,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          color: 0x2563eb,        // accent blue
          backgroundColor: 0xffffff,
          points: 7,
          maxDistance: 18,
          spacing: 24,
          scale: 1,
        });
        setVantaLoaded(true);
      }
    });
    return () => { if (effect) effect.destroy(); };
  }, []); // eslint-disable-line

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex flex-col bg-white overflow-hidden">

      {/* Code rain — subtle on desktop, more visible on mobile */}
      <CodeRain opacity={isDesktop && vantaLoaded ? 0 : 0.28} />

      <div className="relative z-20"><Navbar /></div>

      <div className="flex-1 flex items-center justify-center z-10 pt-24 pb-16">
        <Hero />
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
        <span className="text-[10px] font-medium text-slate-400 tracking-widest uppercase">Scroll</span>
        <div className="w-4 h-7 border border-slate-300 rounded-full flex justify-center pt-1">
          <div className="w-0.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
