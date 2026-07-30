"use client";

import { useState } from "react";
import type { GalleryVideo } from "@/config/types";

/**
 * VideoFacade — thumbnail leve que só carrega o iframe do YouTube NO CLIQUE
 * (zero peso de embed no load inicial — decisão do PLAN #4). View Interativa:
 * o estado "carregado" é interação local (playbook §10).
 *
 * Sem youtubeId (só instagramUrl): vira um card que abre o Reel em nova aba,
 * sem embed. O thumbnail vem de i.ytimg.com e o iframe de youtube-nocookie.com
 * (menos cookies) — ambos entram na CSP (Task 21).
 */
export function VideoFacade({ video }: { video: GalleryVideo }) {
  const [loaded, setLoaded] = useState(false);

  // Fallback Instagram: card + link externo (sem embed pesado).
  if (!video.youtubeId) {
    if (!video.instagramUrl) return null; // item inválido
    return (
      <a
        href={video.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex aspect-video items-center justify-center border border-line bg-surface transition-colors duration-200 ease-command hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <PlayBadge />
        <span className="absolute inset-x-3 bottom-3 text-left font-mono text-label uppercase tracking-[0.16em] text-fg-2">
          {video.title} · Instagram
        </span>
      </a>
    );
  }

  if (loaded) {
    return (
      <div className="relative aspect-video border border-line">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Reproduzir vídeo: ${video.title}`}
      className="group relative aspect-video w-full overflow-hidden border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {/* Thumbnail do YouTube (externo), <img> deliberado; P&B fixo da marca. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
        alt={video.title}
        loading="lazy"
        className="h-full w-full object-cover grayscale"
      />
      {/* Garante contraste do título sobre qualquer thumbnail. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent"
      />
      <PlayBadge />
      <span className="absolute inset-x-3 bottom-3 text-left font-mono text-label uppercase tracking-[0.16em] text-white">
        {video.title}
      </span>
    </button>
  );
}

// Selo de play quadrado (cantos vivos da marca) no accent, com triângulo.
function PlayBadge() {
  return (
    <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-accent text-on-accent shadow-glow transition-transform duration-200 ease-command group-hover:scale-110">
      <span className="ml-1 h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-current" />
    </span>
  );
}
