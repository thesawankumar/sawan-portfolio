import { useEffect, useRef } from "react";

/**
 * 3D Rotating Rings — concentric ellipses with perspective, mouse-tilt, glowing dots.
 */
export default function RingCanvas({ opacity = 0.65 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;
    let mx = 0, my = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width  - .5;
      my = (e.clientY - r.top)  / r.height - .5;
    });

    const RINGS = [
      { r: 100, speed: .007, phase: 0,           hue: 199, dots: 8  },
      { r: 165, speed: .005, phase: Math.PI / 3, hue: 215, dots: 12 },
      { r: 230, speed: .004, phase: Math.PI / 6, hue: 235, dots: 16 },
      { r: 300, speed: .003, phase: Math.PI / 2, hue: 243, dots: 20 },
      { r: 370, speed: .002, phase: Math.PI,     hue: 253, dots: 24 },
    ];

    const tick = () => {
      t += 1;
      const W = canvas.width, H = canvas.height;
      const cx = W / 2, cy = H / 2;
      ctx.clearRect(0, 0, W, H);

      // Tilt angles from mouse
      const tiltX = my * .7;
      const tiltY = mx * .5;

      RINGS.forEach((ring, ri) => {
        const angle = t * ring.speed + ring.phase;
        // Perspective squash for 3D ring
        const cosT = Math.cos(tiltX + ri * .05);
        const cosP = Math.cos(tiltY + ri * .04);

        const rx = ring.r * Math.abs(cosP);      // horizontal radius
        const ry = ring.r * Math.abs(cosT) * .55; // vertical (foreshortened)

        if (rx < 5 || ry < 2) return;

        // Draw ellipse (the ring)
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, angle * .2, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${ring.hue},70%,62%,0.12)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Dots on the ring
        for (let d = 0; d < ring.dots; d++) {
          const a = (d / ring.dots) * Math.PI * 2 + angle;
          const dx = rx * Math.cos(a);
          const dy = ry * Math.sin(a);
          const depth = Math.sin(a); // -1..1 for pseudo-depth
          const dotR = 2.5 + depth * 1.5;
          const alp  = .25 + (depth + 1) * .35;

          // Glow
          const g = ctx.createRadialGradient(
            cx + dx, cy + dy, 0, cx + dx, cy + dy, dotR * 4
          );
          g.addColorStop(0, `hsla(${ring.hue},80%,70%,${alp * .4})`);
          g.addColorStop(1, `hsla(${ring.hue},80%,70%,0)`);
          ctx.beginPath();
          ctx.arc(cx + dx, cy + dy, dotR * 4, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(cx + dx, cy + dy, Math.max(.5, dotR), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${ring.hue},80%,70%,${alp})`;
          ctx.fill();
        }
      });

      // Center glow
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      cg.addColorStop(0, `rgba(14,165,233,0.08)`);
      cg.addColorStop(1, `rgba(14,165,233,0)`);
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
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
