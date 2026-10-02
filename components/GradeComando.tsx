"use client";

import { useEffect, useRef } from "react";

/**
 * A Grade de Comando: trilhos verticais com blocos que acendem na passagem de
 * uma varredura (Modo Balada, atrás do hero). Canvas 2D, sem libs.
 *
 * Regras do design:
 * - Variação entre blocos vizinhos limitada a 12% do trilho: a amplitude ampla
 *   vem ao longo da fileira, não de um bloco para o outro (senão vira confete).
 * - Mobile (<768px) e prefers-reduced-motion: grade congelada, sem varredura.
 * - Só anima enquanto está na tela.
 *
 * Cores fixas do Modo Balada: este componente só é montado nele.
 */
const AMP_MIN = 0.25;
const AMP_MAX = 0.9;
const BORDER = "#2A2536";
const ACCENT = "#9B5CFF";
const SWEEP_MS = 6000;
const TWEEN_MS = 400;

type Track = {
  x: number;
  v: number;
  from: number;
  to: number;
  start: number;
  lit: number;
  accent: boolean;
};

const nextAmp = (prev: number) =>
  Math.max(AMP_MIN, Math.min(AMP_MAX, prev + (Math.random() - 0.5) * 0.24));

// cubic-bezier(0.4, 0, 0.2, 1) resolvido por bisseção.
function ease(t: number) {
  const fx = (s: number) =>
    3 * (1 - s) * (1 - s) * s * 0.4 + 3 * (1 - s) * s * s * 0.2 + s * s * s;
  let lo = 0;
  let hi = 1;
  let s = t;
  for (let i = 0; i < 18; i++) {
    s = (lo + hi) / 2;
    if (fx(s) < t) lo = s;
    else hi = s;
  }
  return 3 * (1 - s) * s * s + s * s * s;
}

export function GradeComando() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!box || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let W = 1;
    let H = 1;
    let count = 48;
    let frozen = true;
    let tracks: Track[] = [];
    let lastX = 0;
    let frame = 0;
    let running = false;

    function build() {
      const rect = box!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      count = W < 768 ? 24 : W < 1024 ? 32 : 48;
      frozen = W < 768 || reduced;
      lastX = 0;
      let prev = (AMP_MIN + AMP_MAX) / 2;
      tracks = Array.from({ length: count }, (_, i) => {
        const v = nextAmp(prev);
        prev = v;
        return {
          x: (i + 0.5) * (W / count),
          v,
          from: v,
          to: v,
          start: -9999,
          lit: -9999,
          accent: (i * 7) % 47 < 7,
        };
      });
      draw(performance.now());
    }

    function draw(now: number) {
      const x = frozen ? -1 : (((now - t0) % SWEEP_MS) / SWEEP_MS) * W;
      if (!frozen) {
        if (x < lastX) tracks.forEach((tr) => (tr.lit = -9999));
        tracks.forEach((tr, i) => {
          if (tr.x > lastX && tr.x <= x) {
            // O alvo novo sai do vizinho da esquerda: o limite de 12% vale na fileira.
            const ref = i > 0 ? tracks[i - 1].to : tr.v;
            tr.from = tr.v;
            tr.to = nextAmp(ref);
            tr.start = now;
            tr.lit = now;
          }
        });
        lastX = x;
      }

      ctx!.clearRect(0, 0, W, H);
      const bh = 22;
      const bw = Math.max(6, Math.round(W / count - 4));
      for (const tr of tracks) {
        const progress = Math.min(1, Math.max(0, (now - tr.start) / TWEEN_MS));
        tr.v = tr.from + (tr.to - tr.from) * ease(progress);
        ctx!.fillStyle = BORDER;
        ctx!.fillRect(Math.round(tr.x), 0, 1, H);
        const y = Math.max(0, Math.min(H - bh, Math.round(H - tr.v * H - bh / 2)));
        const age = now - tr.lit;
        ctx!.save();
        if (age < 800) {
          ctx!.shadowColor = `rgba(155,92,255,${(0.45 * (1 - age / 800)).toFixed(3)})`;
          ctx!.shadowBlur = 18 * (1 - age / 800);
        }
        ctx!.fillStyle = tr.accent ? ACCENT : BORDER;
        ctx!.fillRect(Math.round(tr.x - bw / 2), y, bw, bh);
        ctx!.restore();
      }
      if (!frozen) {
        ctx!.save();
        ctx!.shadowColor = "rgba(155,92,255,.45)";
        ctx!.shadowBlur = 24;
        ctx!.fillStyle = ACCENT;
        ctx!.fillRect(Math.round(x), 0, 1, H);
        ctx!.restore();
      }
    }

    function loop(now: number) {
      if (!running) return;
      draw(now);
      frame = requestAnimationFrame(loop);
    }

    build();
    const resize = new ResizeObserver(build);
    resize.observe(box);
    const visible = new IntersectionObserver((entries) => {
      const on = entries[entries.length - 1].isIntersecting;
      if (on && !running && !frozen) {
        running = true;
        frame = requestAnimationFrame(loop);
      } else if (!on) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    visible.observe(box);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      resize.disconnect();
      visible.disconnect();
    };
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.42]"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
