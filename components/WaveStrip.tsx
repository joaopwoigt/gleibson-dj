"use client";

import { useEffect, useRef } from "react";
import { useMode } from "@/components/ModeProvider";

/**
 * A faixa de onda entre o hero e o conteúdo. Uma barra por coluna, escala em Y
 * calculada por frame (transform: sem layout, sem repaint de texto).
 *
 * - Eventos: três senoides lentas viajando para a direita (a longa cruza a faixa
 *   em ~8s). Calma, "papel".
 * - Balada: onda mais rápida + kick e riff a 130 BPM em ciclo de 8 compassos, com
 *   brilho nas barras altas. Ref. do ritmo: "Satisfaction" (electro house).
 *
 * Só anima enquanto está na tela; com prefers-reduced-motion fica estática.
 */
const BARS = 32;
const TAU = Math.PI * 2;
const BPM = 130;
// 1 = nota do riff, 0 = silêncio. Aproximação a afinar de ouvido.
const RIFF = [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0];

type Painter = (bars: HTMLElement[], t: number, still: boolean) => void;

function eventosHeight(x: number, t: number) {
  const v =
    0.58 * Math.sin(TAU * (x * 0.9 - t / 4)) +
    0.27 * Math.sin(TAU * (x * 2.3 - t / 3.05) + 1.3) +
    0.15 * Math.sin(TAU * (x * 3.7 - t / 2.45) + 2.4);
  return 0.425 + 0.175 * v;
}

const paintEventos: Painter = (bars, t) => {
  bars.forEach((bar, i) => {
    bar.style.transform = `scaleY(${eventosHeight(i / (bars.length - 1), t).toFixed(4)})`;
  });
};

function baladaHeight(x: number, t: number) {
  const v =
    0.5 * Math.sin(TAU * (x * 0.9 - t / 1.5)) +
    0.28 * Math.sin(TAU * (x * 2.0 - t / 1.1625) + 0.9) +
    0.22 * Math.sin(TAU * (x * 3.4 - t / 0.9) + 2.2);
  return 0.52 + 0.29 * v;
}

function baladaState(t: number) {
  const beat = 60 / BPM;
  const step = beat / 4;
  const barLen = beat * 4;
  const bar = Math.floor(t / barLen) % 8;
  const k = Math.floor(t / beat);
  const p = t - k * beat;
  const drop = bar === 0 && k % 4 === 0;
  let kick = 0;
  if (bar < 6) {
    const env = p < 0.04 ? p / 0.04 : Math.pow(Math.max(0, 1 - (p - 0.04) / 0.25), 2);
    kick = env * (drop ? 0.2 : 0.12);
  }
  const si = Math.floor(t / step);
  const q = t - si * step;
  const riff = RIFF[si % 16]
    ? (q < 0.02 ? q / 0.02 : Math.pow(Math.max(0, 1 - (q - 0.02) / 0.09), 2)) * 0.08
    : 0;
  let energy = 1;
  if (bar === 6) energy = 0.6;
  else if (bar === 7) energy = 0.6 + 0.4 * ((t % barLen) / barLen);
  return { kick, riff, energy, drop };
}

const paintBalada: Painter = (bars, t, still) => {
  const st = still ? { kick: 0, riff: 0, energy: 1, drop: false } : baladaState(t);
  const glowGain = st.drop ? 0.35 + 0.65 * (st.kick / 0.2) : 0.35 + 0.45 * (st.kick / 0.12);
  bars.forEach((bar, i) => {
    const x = i / (bars.length - 1);
    const riffWeight = st.riff * (0.3 + 0.7 * x);
    const h = Math.max(
      0.2,
      Math.min(1, baladaHeight(x, t) * (1 + st.kick + riffWeight) * st.energy),
    );
    bar.style.transform = `scaleY(${h.toFixed(4)})`;
    const glow = bar.firstElementChild as HTMLElement | null;
    if (glow) {
      glow.style.opacity = (Math.max(0, Math.min(1, (h - 0.8) / 0.15)) * glowGain).toFixed(3);
    }
  });
};

function useBars(paint: Painter) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bars = Array.from(el.children) as HTMLElement[];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    paint(bars, 0, reduced);
    if (reduced) return;

    let frame = 0;
    let running = false;
    let start = 0;
    const loop = (now: number) => {
      if (!running) return;
      paint(bars, (now - start) / 1000, false);
      frame = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver((entries) => {
      const on = entries[entries.length - 1].isIntersecting;
      if (on && !running) {
        running = true;
        start = performance.now();
        frame = requestAnimationFrame(loop);
      } else if (!on) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    io.observe(el);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [paint]);

  return ref;
}

const BAR_CLASS = "relative h-full flex-1 origin-bottom bg-accent will-change-transform";
const ROW_CLASS = "flex h-[84px] items-end gap-0.5 py-[22px]";

function EventosWave() {
  const ref = useBars(paintEventos);
  return (
    <div ref={ref} aria-hidden="true" className={ROW_CLASS}>
      {Array.from({ length: BARS }, (_, i) => (
        <div key={i} className={BAR_CLASS} style={{ transform: "scaleY(0.42)" }} />
      ))}
    </div>
  );
}

function BaladaWave() {
  const ref = useBars(paintBalada);
  return (
    <div ref={ref} aria-hidden="true" className={ROW_CLASS}>
      {Array.from({ length: BARS }, (_, i) => (
        <div key={i} className={BAR_CLASS} style={{ transform: "scaleY(0.6)" }}>
          <span
            className="absolute inset-0 opacity-0 will-change-[opacity]"
            style={{ boxShadow: "0 0 24px rgba(155,92,255,.45)" }}
          />
        </div>
      ))}
    </div>
  );
}

export function WaveStrip() {
  const { mode } = useMode();
  return (
    <div className="border-y border-line">
      <div className="mx-auto max-w-content px-4 sm:px-8">
        {mode === "eventos" ? <EventosWave /> : <BaladaWave />}
      </div>
    </div>
  );
}
