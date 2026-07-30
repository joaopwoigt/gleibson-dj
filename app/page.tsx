// Shell da página: Header · main · Footer (Task 07 encaixa os reais).
// O conteúdo do <main> ainda é placeholder — hero, portfólio, prova social e CTA
// entram nas Tasks 08+. O Header hospeda as ModeTabs, que governam o data-mode.

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-content flex-1 px-4">
        <section className="py-16 lg:py-24">
          <span className="font-mono text-label uppercase tracking-[0.16em] text-accent">
            Shell dual-mode
          </span>
          <h1 className="mt-3 max-w-[20ch] font-display text-h1 text-fg">
            Troque o modo pelas abas acima.
          </h1>
          <p className="mt-3 max-w-[52ch] font-body text-body text-fg-2">
            Header e footer da marca já no lugar. As seções — hero, portfólio,
            prova social e CTA — entram nas próximas tasks.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
