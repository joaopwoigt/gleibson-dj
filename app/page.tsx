// Shell da página (design "DJ Gleib One Page"): Header · Hero · faixa de onda ·
// bloco do modo · Como funciona · Disponibilidade · Footer. O ModeProvider (no
// layout) governa o modo; o grão do Modo Eventos fica no nível da página.

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Grain } from "@/components/Grain";
import { WaveStrip } from "@/components/WaveStrip";
import { Hero } from "@/components/sections/Hero";
import { ModeBlock } from "@/components/sections/ModeBlock";
import { Process } from "@/components/sections/Process";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Grain layer="paper" />
      <Grain layer="surface" />

      <Header />

      <main className="flex-1">
        <Hero />
        <WaveStrip />
        <ModeBlock />
        <Process />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
