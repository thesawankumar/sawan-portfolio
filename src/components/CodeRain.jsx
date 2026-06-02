import { useEffect, useRef } from "react";

/**
 * Matrix-style vertical code rain — canvas based.
 * Columns of falling chars: mix of code symbols + binary.
 * Blue-toned to match accent palette.
 */
const CHARS = "01{}[]()<>=!+*&|;:.,/\\ABCDEFabcdef#$@%^~`?";

export default function CodeRain({ opacity = 0.45 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const FONT_SIZE = 13;
    let cols = Math.floor(canvas.width / FONT_SIZE);
    let drops = Array.from({ length: cols }, () => Math.random() * -50);

    const tick = () => {
      cols = Math.floor(canvas.width / FONT_SIZE);
      if (drops.length !== cols) {
        drops = Array.from({ length: cols }, () => Math.random() * -50);
      }

      // Fade trail
      ctx.fillStyle = "rgba(255, 255, 255, 0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px "Fira Code", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y    = drops[i] * FONT_SIZE;

        // Head char — bright
        if (drops[i] > 0) {
          ctx.fillStyle = "#93c5fd"; // blue-300 head
          ctx.fillText(char, i * FONT_SIZE, y);
        }

        // Body chars slightly behind — drawn by trail fade
        // Gradient along column: bright at head, dim further up
        const norm = (drops[i] % 30) / 30;
        if (norm > 0.15) {
          ctx.fillStyle = `rgba(37, 99, 235, ${norm * 0.55})`; // accent blue
          ctx.fillText(
            CHARS[Math.floor(Math.random() * CHARS.length)],
            i * FONT_SIZE,
            y - FONT_SIZE * 3
          );
        }

        // Reset when past bottom or random reset
        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ opacity }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
