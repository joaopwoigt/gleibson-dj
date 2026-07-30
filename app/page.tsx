// Shell da página: Header · main · Footer. O <main> monta as seções na ordem de
// venda (layouts.md): Hero primeiro; MODO, galeria, prova social e CTA entram
// nas próximas tasks. O Header hospeda as ModeTabs, que governam o data-mode.

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-content flex-1 px-4">
        <Hero />
        {/* MODO (Task 11) · galeria (Task 13) · prova social (Task 16) · CTA (Task 17) */}
      </main>

      <Footer />
    </>
  );
}
