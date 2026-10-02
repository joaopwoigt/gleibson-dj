"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { isMode, type Mode } from "@/lib/mode";
import { runPassage } from "@/lib/passage";

/**
 * Estado do modo ativo (Eventos | Balada) para a página inteira. Substitui o
 * estado local que vivia dentro das ModeTabs: o conteúdo por modo e os efeitos
 * (grão, grade, ondas) precisam do modo em React, não só em CSS, porque a
 * Passagem clona o DOM e as variants CSS leriam o modo novo dentro do clone.
 *
 * O effect de sincronia reflete o modo no <html data-mode> (tokens --ds-*) e na
 * URL (?modo=balada), sem recarregar.
 */

type ModeContextValue = {
  mode: Mode;
  /** Troca o modo, com a Passagem quando o usuário não pede menos movimento. */
  switchMode: (next: Mode) => void;
};

const ModeContext = createContext<ModeContextValue | null>(null);

export function useMode(): ModeContextValue {
  const value = useContext(ModeContext);
  if (!value) throw new Error("useMode precisa estar dentro de <ModeProvider>");
  return value;
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("eventos");
  const modeRef = useRef<Mode>("eventos");

  // Deep-link: adota ?modo=balada depois do mount. Começar do "eventos" do
  // servidor e adotar a query só aqui é o que mantém a hidratação igual.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("modo");
    if (isMode(param) && param !== "eventos") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- adoção única de um param só do cliente
      setMode(param);
    }
  }, []);

  useEffect(() => {
    modeRef.current = mode;
    document.documentElement.dataset.mode = mode;
    const url = new URL(window.location.href);
    if (mode === "eventos") url.searchParams.delete("modo");
    else url.searchParams.set("modo", mode);
    window.history.replaceState(null, "", url);
  }, [mode]);

  const switchMode = useCallback((next: Mode) => {
    const current = modeRef.current;
    if (next === current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.getElementById("page-root");
    if (!reduced && root) runPassage(root, current, next);
    setMode(next);
  }, []);

  const value = useMemo(() => ({ mode, switchMode }), [mode, switchMode]);
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}
