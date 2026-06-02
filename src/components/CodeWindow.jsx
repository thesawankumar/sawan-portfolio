import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const SNIPPETS = [
  {
    lang: "tsx",
    file: "Hero.tsx",
    lines: [
      { text: `const Hero = () => {`,              color: "text-blue-400" },
      { text: `  const [ready, setReady] =`,       color: "text-slate-300" },
      { text: `    useState(false);`,               color: "text-amber-300" },
      { text: ``,                                   color: "" },
      { text: `  useEffect(() => {`,                color: "text-blue-400" },
      { text: `    setReady(true);`,                color: "text-emerald-400" },
      { text: `  }, []);`,                          color: "text-blue-400" },
      { text: ``,                                   color: "" },
      { text: `  return <Sawan ready={ready} />;`, color: "text-slate-300" },
      { text: `}`,                                  color: "text-blue-400" },
    ],
  },
  {
    lang: "py",
    file: "resume_ai.py",
    lines: [
      { text: `from langchain import FAISS`,        color: "text-blue-400" },
      { text: `from langchain.llms import OpenAI`,  color: "text-blue-400" },
      { text: ``,                                   color: "" },
      { text: `def analyze_resume(resume, jd):`,    color: "text-amber-300" },
      { text: `  embedder = HuggingFaceEmbed()`,    color: "text-slate-300" },
      { text: `  db = FAISS.from_texts(jd)`,        color: "text-emerald-400" },
      { text: `  gaps = db.similarity_search(`,     color: "text-slate-300" },
      { text: `    resume, k=5`,                    color: "text-amber-300" },
      { text: `  )`,                                color: "text-slate-300" },
      { text: `  return generate_report(gaps)`,     color: "text-emerald-400" },
    ],
  },
  {
    lang: "java",
    file: "SnapBuyController.java",
    lines: [
      { text: `@RestController`,                    color: "text-amber-300" },
      { text: `@RequestMapping("/api/orders")`,     color: "text-amber-300" },
      { text: `public class OrderController {`,     color: "text-blue-400" },
      { text: ``,                                   color: "" },
      { text: `  @PostMapping`,                     color: "text-amber-300" },
      { text: `  public ResponseEntity<Order>`,     color: "text-slate-300" },
      { text: `  placeOrder(@RequestBody`,          color: "text-slate-300" },
      { text: `    OrderRequest req) {`,            color: "text-slate-300" },
      { text: `    return orderService`,            color: "text-emerald-400" },
      { text: `      .create(req);`,                color: "text-emerald-400" },
      { text: `  }`,                                color: "text-blue-400" },
      { text: `}`,                                  color: "text-blue-400" },
    ],
  },
];

// Typewriter for a single line
function TypedLine({ text, color, delay, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const i = useRef(0);

  useEffect(() => {
    if (!text) { onDone?.(); return; }
    const t = setTimeout(() => {
      const id = setInterval(() => {
        i.current++;
        setDisplayed(text.slice(0, i.current));
        if (i.current >= text.length) {
          clearInterval(id);
          onDone?.();
        }
      }, 22);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay, onDone]);

  return (
    <span className={`font-mono text-[11px] leading-5 block ${color || "text-slate-400"}`}>
      {displayed || (text === "" ? "\u00A0" : "")}
      {displayed.length < text.length && displayed.length > 0 && (
        <span className="animate-pulse text-blue-300">▋</span>
      )}
    </span>
  );
}

export default function CodeWindow() {
  const [snippetIdx, setSnippetIdx]     = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [cycling, setCycling]           = useState(false);

  const snippet = SNIPPETS[snippetIdx];

  // When a line finishes typing, reveal next
  const handleLineDone = (lineIdx) => {
    if (lineIdx < snippet.lines.length - 1) {
      setTimeout(() => setVisibleLines(lineIdx + 2), 80);
    } else {
      // Pause then cycle to next snippet
      setTimeout(() => {
        setCycling(true);
        setTimeout(() => {
          setSnippetIdx(i => (i + 1) % SNIPPETS.length);
          setVisibleLines(1);
          setCycling(false);
        }, 600);
      }, 2500);
    }
  };

  // Reset on snippet change
  useEffect(() => {
    setVisibleLines(1);
  }, [snippetIdx]);

  const langColors = { tsx: "text-blue-400", py: "text-emerald-400", java: "text-amber-400" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-xs lg:max-w-sm"
      style={{ filter: "drop-shadow(0 20px 40px rgba(37,99,235,0.2))" }}
    >
      {/* Editor window */}
      <div className="rounded-2xl overflow-hidden border border-slate-800/60 bg-[#0f172a]">

        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800/60">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          {/* Filename */}
          <span className={`text-[11px] font-mono font-semibold ${langColors[snippet.lang] || "text-slate-400"}`}>
            {snippet.file}
          </span>
          {/* Breadcrumb */}
          <span className="text-[10px] text-slate-600 font-mono">sawan/src</span>
        </div>

        {/* Code area */}
        <div className={`px-4 py-3 min-h-[180px] transition-opacity duration-300 ${cycling ? "opacity-0" : "opacity-100"}`}>
          {/* Line numbers + code */}
          {snippet.lines.slice(0, visibleLines).map((line, i) => (
            <div key={`${snippetIdx}-${i}`} className="flex gap-3">
              <span className="text-[10px] font-mono text-slate-700 select-none w-4 text-right flex-shrink-0 leading-5">
                {i + 1}
              </span>
              <TypedLine
                key={`${snippetIdx}-${i}`}
                text={line.text}
                color={line.color}
                delay={0}
                onDone={i === visibleLines - 1 ? () => handleLineDone(i) : undefined}
              />
            </div>
          ))}

          {/* Blinking cursor at end */}
          {visibleLines >= snippet.lines.length && !cycling && (
            <div className="flex gap-3">
              <span className="text-[10px] font-mono text-slate-700 w-4 text-right leading-5">
                {snippet.lines.length + 1}
              </span>
              <span className="font-mono text-[11px] text-blue-300 animate-pulse leading-5">▋</span>
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-accent border-t border-blue-700">
          <span className="text-[10px] font-mono text-white/90 font-semibold">
            ✓ {snippet.lang.toUpperCase()}
          </span>
          <span className="text-[10px] font-mono text-white/70">
            Ln {visibleLines} · UTF-8
          </span>
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 -right-3 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-md flex items-center gap-1.5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold text-slate-700">Live coding</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-3 -left-3 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-md"
      >
        <span className="text-[10px] font-bold text-slate-700">⚡ React + Java + Python</span>
      </motion.div>
    </motion.div>
  );
}
