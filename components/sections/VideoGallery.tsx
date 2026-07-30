import { Kicker } from "@/components/ui/Kicker";
import { VideoFacade } from "@/components/VideoFacade";
import { videos } from "@/config/content";
import type { Mode } from "@/config/types";

/**
 * VideoGallery — vídeos do portfólio por modo. Mesmo padrão da Gallery:
 * graceful-empty (config.videos vazio → nada; modo sem vídeos → sem bloco),
 * visibilidade por modo via @custom-variant (CSS). Os facades (VideoFacade)
 * é que são interativos. View pura.
 */
export function VideoGallery() {
  if (videos.length === 0) return null;
  return (
    <section id="videos">
      <VideoGrid mode="eventos" />
      <VideoGrid mode="balada" />
    </section>
  );
}

function VideoGrid({ mode }: { mode: Mode }) {
  const items = videos.filter((video) => video.mode === mode);
  if (items.length === 0) return null;

  const visibility = mode === "balada" ? "hidden balada:block" : "balada:hidden";
  return (
    <div className={`${visibility} border-t border-line py-16 lg:py-24`}>
      <Kicker>Vídeos</Kicker>
      <h2 className="mt-3 max-w-[20ch] font-display text-h2 font-bold text-fg">
        Não peço pra confiar. Mostro.
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((video) => (
          <VideoFacade key={video.youtubeId ?? video.instagramUrl} video={video} />
        ))}
      </div>
    </div>
  );
}
