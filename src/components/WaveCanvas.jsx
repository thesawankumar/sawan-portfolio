import { useEffect, useRef } from "react";

/**
 * 3D Wave Grid — animated sine-wave mesh with perspective projection.
 * Mouse tilts the entire grid in 3D.
 */
export default function WaveCanvas({ opacity = 0.7 }) {
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

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width  - .5;
      my = (e.clientY - r.top)  / r.height - .5;
    };
    window.addEventListener("mousemove", onMove);

    // Grid params
    const COLS = 22, ROWS = 16;

    const tick = () => {
      t += 0.018;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2, cy = H / 2;
      const fov = 500;
      const rotX = my * .5;
      const rotY = mx * .6;
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

      const stepX = 40, stepZ = 40;
      const offX = -(COLS * stepX) / 2;
      const offZ = -(ROWS * stepZ) / 2;

      // Build projected grid
      const grid = [];
      for (let row = 0; row < ROWS; row++) {
        const rowPts = [];
        for (let col = 0; col < COLS; col++) {
          const x3 = offX + col * stepX;
          const z3 = offZ + row * stepZ;
          // Wave height
          const wave = Math.sin(col * .4 + t) * 28
                     + Math.sin(row * .35 + t * .8) * 18
                     + Math.sin((col + row) * .25 + t * 1.2) * 12;
          const y3 = wave;

          // Rotate Y
          const x1 = x3 * cosY - z3 * sinY;
          const z1 = x3 * sinY + z3 * cosY;
          // Rotate X
          const y2 = y3 * cosX - z1 * sinX;
          const z2 = y3 * sinX + z1 * cosX;

          const s  = fov / (fov + z2 + 350);
          const sx = cx + x1 * s;
          const sy = cy + y2 * s;

          // Color by height
          const norm = (wave + 58) / 116; // 0..1
          const hue  = 199 + norm * 44;   // sky → indigo
          const lum  = 55 + norm * 20;
          const alp  = .12 + norm * .35;

          rowPts.push({ sx, sy, s, hue, lum, alp, z2 });
        }
        grid.push(rowPts);
      }

      // Draw horizontal lines
      for (let row = 0; row < ROWS; row++) {
        ctx.beginPath();
        grid[row].forEach((pt, col) => {
          col === 0 ? ctx.moveTo(pt.sx, pt.sy) : ctx.lineTo(pt.sx, pt.sy);
        });
        const mid = grid[row][Math.floor(COLS / 2)];
        ctx.strokeStyle = `hsla(${mid.hue},70%,${mid.lum}%,${mid.alp})`;
        ctx.lineWidth = .9;
        ctx.stroke();
      }

      // Draw vertical lines
      for (let col = 0; col < COLS; col++) {
        ctx.beginPath();
        grid.forEach((row, ri) => {
          const pt = row[col];
          ri === 0 ? ctx.moveTo(pt.sx, pt.sy) : ctx.lineTo(pt.sx, pt.sy);
        });
        const mid = grid[Math.floor(ROWS / 2)][col];
        ctx.strokeStyle = `hsla(${mid.hue},70%,${mid.lum}%,${mid.alp * .7})`;
        ctx.lineWidth = .6;
        ctx.stroke();
      }

      // Draw intersection dots
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const { sx, sy, s, hue, lum, alp } = grid[row][col];
          const r = Math.max(1, s * 2.5);
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue},75%,${lum + 10}%,${alp * 1.5})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
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
