// Página de verificação temporária do design system (Task 02).
// Os dois painéis usam EXATAMENTE as mesmas classes de token; só o data-mode
// muda. Se a cor troca entre eles, o dual-mode está funcionando.
// A Task 06 substitui isto pelo shell real com o switcher de modo.

function TokenPanel({
  label,
  mode,
}: {
  label: string;
  mode?: "eventos" | "balada";
}) {
  return (
    <section
      data-mode={mode}
      className="flex flex-col gap-6 border border-line bg-bg p-8 text-fg"
    >
      <p className="font-mono text-label uppercase text-fg-2">{label}</p>

      <div className="flex flex-col gap-3 border border-line bg-surface p-6">
        <h2 className="font-display text-h2 text-fg">Uma marca, dois modos</h2>
        <p className="font-body text-body text-fg-2">
          Texto secundário sobre superfície. Cantos vivos, borda de 1px, sem
          sombra suave — as bordas fazem o trabalho.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <button className="bg-accent px-6 py-3 font-body font-semibold text-on-accent shadow-glow">
            Chamar no WhatsApp
          </button>
          <button className="border border-line px-6 py-3 font-body font-semibold text-fg">
            Ver portfólio
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="mx-auto grid w-full max-w-content gap-6 p-6 md:grid-cols-2">
      <TokenPanel label="Modo Eventos" />
      <TokenPanel label="Modo Balada" mode="balada" />
    </main>
  );
}
