"use client";

import { useRef, type KeyboardEvent } from "react";
import { cx } from "@/lib/cx";
import { useMode } from "@/components/ModeProvider";
import type { Mode } from "@/lib/mode";

/**
 * ModeTabs — o seletor Eventos/Balada, a assinatura "dois modos, um comando"
 * (design-system/components.md §2). O estado vive no ModeProvider; aqui só
 * chamamos switchMode (que dispara a Passagem) e cuidamos do teclado (APG).
 *
 * `short` aparece no mobile; `long` do breakpoint sm em diante. O nome acessível
 * é o texto visível (a versão oculta por display:none não entra no nome).
 */
const TABS: ReadonlyArray<{ mode: Mode; short: string; long: string }> = [
  { mode: "eventos", short: "Eventos", long: "Casamentos e eventos corporativos" },
  { mode: "balada", short: "Festas", long: "Festas" },
];

export function ModeTabs({ className }: { className?: string }) {
  const { mode, switchMode } = useMode();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = TABS.findIndex((tab) => tab.mode === mode);
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % TABS.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + TABS.length) % TABS.length;
    else return;
    event.preventDefault();
    switchMode(TABS[next].mode);
    tabRefs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label="Modo de atuação"
      onKeyDown={onKeyDown}
      className={cx("flex border border-line", className)}
    >
      {TABS.map((tab, index) => {
        const active = tab.mode === mode;
        return (
          <button
            key={tab.mode}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => switchMode(tab.mode)}
            className={cx(
              "flex-1 whitespace-nowrap px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-150 ease-command sm:flex-none sm:px-[18px]",
              "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent",
              active
                ? "bg-accent text-on-accent shadow-glow"
                : "bg-transparent text-fg-2 hover:opacity-85",
            )}
          >
            <span className="sm:hidden">{tab.short}</span>
            <span className="hidden sm:inline">{tab.long}</span>
          </button>
        );
      })}
    </div>
  );
}
