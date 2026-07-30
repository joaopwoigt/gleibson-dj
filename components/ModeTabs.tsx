"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cx } from "@/lib/cx";
import { isMode, type Mode } from "@/lib/mode";

/**
 * ModeTabs — the Eventos/Balada switcher, the brand's signature "dois modos, um
 * comando" (design-system/components.md §2). View Interativa (playbook §10):
 * holds the active mode in LOCAL interaction state; an effect reflects it onto
 * <html> and the CSS vars do the rest. No data state, no fetch.
 *
 * Handlers only call setMode. Everything with the outside world (the <html>
 * attribute and the URL) happens in the sync effect — the sanctioned place to
 * push React state into an external system.
 */
const TABS: ReadonlyArray<{ mode: Mode; label: string }> = [
  { mode: "eventos", label: "Modo Eventos" },
  { mode: "balada", label: "Modo Balada" },
];

export function ModeTabs() {
  const [mode, setMode] = useState<Mode>("eventos");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Deep-link: adopt ?modo=balada after mount. Starting from the server-rendered
  // "eventos" and adopting the client-only query here (not in a lazy initializer)
  // is what keeps hydration matching. This setState fires at most once.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("modo");
    if (isMode(param) && param !== "eventos") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot adoption of a client-only URL param on mount
      setMode(param);
    }
  }, []);

  // Reflect the active mode onto <html> (governs the whole page via CSS vars)
  // and keep the URL shareable, without reloading. Runs after the deep-link
  // effect on mount, so it never clobbers the incoming ?modo.
  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    const url = new URL(window.location.href);
    if (mode === "eventos") url.searchParams.delete("modo");
    else url.searchParams.set("modo", mode);
    window.history.replaceState(null, "", url);
  }, [mode]);

  // Roving tabindex: arrows move selection + focus between the two tabs (APG).
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = TABS.findIndex((tab) => tab.mode === mode);
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % TABS.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + TABS.length) % TABS.length;
    else return;
    event.preventDefault();
    setMode(TABS[next].mode);
    tabRefs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label="Modo de atuação"
      onKeyDown={onKeyDown}
      className="inline-flex border-2 border-line font-mono text-label uppercase tracking-[0.16em]"
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
            onClick={() => setMode(tab.mode)}
            className={cx(
              "px-5 py-2.5 transition-colors duration-200 ease-command",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              index > 0 && "border-l-2 border-line",
              active
                ? "bg-accent text-on-accent"
                : "bg-transparent text-fg-2 hover:text-fg",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
