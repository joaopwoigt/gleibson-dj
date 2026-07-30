// Shell da página: Header · main · Footer. O <main> monta as seções na ordem de
// venda (layouts.md): Hero primeiro; MODO, galeria, prova social e CTA entram
// nas próximas tasks. O Header hospeda as ModeTabs, que governam o data-mode.

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { ModeContent } from "@/components/sections/ModeContent";
import { Gallery } from "@/components/sections/Gallery";
import { VideoGallery } from "@/components/sections/VideoGallery";

export default function Home() {
  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-content flex-1 px-4">
        <Hero />
        <ModeContent />
        <Gallery />
        <VideoGallery />
        {/* prova social (Task 16) · CTA (Task 17) */}
      </main>

      <Footer />
    </>
  );
}
