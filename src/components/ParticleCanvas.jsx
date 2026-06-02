import { useEffect, useRef } from "react";

/**
 * 3D Particle Network — canvas-based, mouse-reactive, perspective-projected.
 * Clearly visible sky-blue / indigo particles with connecting lines.
 */
export default function ParticleCanvas({ count = 90, opacity = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let mouseX = 0.5, mouseY = 0.5;
    let rotY = 0, rotX = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseX = (e.clientX - r.left) / r.width;
      mouseY = (e.clientY - r.top)  / r.height;
    };
    window.addEventListener("mousemove", onMove);

    // Build particles in 3D space
    const pts = Array.from({ length: count }, () => ({
      x:  (Math.random() - .5) * 700,
      y:  (Math.random() - .5) * 700,
      z:  (Math.random() - .5) * 700,
      vx: (Math.random() - .5) * .25,
      vy: (Math.random() - .5) * .25,
      vz: (Math.random() - .5) * .25,
      hue: Math.random() > .5 ? 199 : 243, // sky or indigo
    }));

    const project = (x, y, z, cx, cy) => {
      const f = 600;
      const s = f / (f + z + 400);
      return { sx: cx + x * s, sy: cy + y * s, s };
    };

    const LINK = 180 * 180;

    const tick = () => {
      const W = canvas.width, H = canvas.height;
      const cx = W / 2, cy = H / 2;
      ctx.clearRect(0, 0, W, H);

      // Lerp camera toward mouse
      rotY += ((mouseX - .5) * .6 - rotY) * .04;
      rotX += ((mouseY - .5) * .4 - rotX) * .04;
      const cY = Math.cos(rotY), sY = Math.sin(rotY);
      const cX = Math.cos(rotX), sX = Math.sin(rotX);

      const proj = pts.map(p => {
        p.x += p.vx; p.y += p.vy; p.z += p.vz;
        if (Math.abs(p.x) > 400) p.vx *= -1;
        if (Math.abs(p.y) > 400) p.vy *= -1;
        if (Math.abs(p.z) > 400) p.vz *= -1;

        // Rotate
        const x1 = p.x * cY - p.z * sY;
        const z1 = p.x * sY + p.z * cY;
        const y2 = p.y * cX - z1 * sX;
        const z2 = p.y * sX + z1 * cX;

        const { sx, sy, s } = project(x1, y2, z2, cx, cy);
        return { sx, sy, s, p, z2 };
      });

      // Sort back → front
      proj.sort((a, b) => a.z2 - b.z2);

      // Lines
      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const a = proj[i], b = proj[j];
          const dx = a.sx - b.sx, dy = a.sy - b.sy;
          if (dx*dx + dy*dy < LINK) {
            const alpha = (1 - (dx*dx+dy*dy)/LINK) * .22;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.strokeStyle = `hsla(${a.p.hue},70%,65%,${alpha})`;
            ctx.lineWidth = .8;
            ctx.stroke();
          }
        }
      }

      // Dots + glow
      proj.forEach(({ sx, sy, s, p }) => {
        const r   = Math.max(1.5, s * 5);
        const alp = Math.min(1, s * 1.4);

        // Soft glow
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 4);
        g.addColorStop(0, `hsla(${p.hue},80%,65%,${alp * .35})`);
        g.addColorStop(1, `hsla(${p.hue},80%,65%,0)`);
        ctx.beginPath();
        ctx.arc(sx, sy, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,68%,${alp})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
