import type { Mode } from "@/lib/mode";

/**
 * "A Passagem": a troca de modo como um corte. Uma cópia do estado ANTERIOR da
 * página desliza para fora enquanto o novo modo já está por baixo, com uma linha
 * de accent na borda. 250ms, ease-command. Só DOM + Web Animations: sem lib.
 *
 * As cores do clone vêm de MODE_VARS (inline no clone), porque os tokens --ds-*
 * normalmente derivam do [data-mode] do <html>, que a essa altura já é o novo.
 * Por isso o conteúdo por modo é decidido por estado React (useMode), nunca pelas
 * variants CSS `eventos:`/`balada:` — dentro do clone elas leriam o modo novo.
 */

export const MODE_VARS: Record<Mode, Record<string, string>> = {
  eventos: {
    "--ds-bg": "#F1EEE8",
    "--ds-surface": "#F7F4EE",
    "--ds-fg": "#16131C",
    "--ds-fg-2": "#45424C",
    "--ds-accent": "#6D28D9",
    "--ds-accent-emphasis": "#6D28D9",
    "--ds-on-accent": "#FFFFFF",
    "--ds-border": "#DAD4CA",
    "--ds-glow": "none",
    "--ds-photo": "grayscale(1) contrast(1.18) brightness(1.02)",
  },
  balada: {
    "--ds-bg": "#100E14",
    "--ds-surface": "#211B2E",
    "--ds-fg": "#F1EEE8",
    "--ds-fg-2": "#948BA6",
    "--ds-accent": "#9B5CFF",
    "--ds-accent-emphasis": "#B98CFF",
    "--ds-on-accent": "#100E14",
    "--ds-border": "#2A2536",
    "--ds-glow": "0 0 24px rgba(155,92,255,.45)",
    "--ds-photo": "grayscale(1) contrast(1.36) brightness(0.94)",
  },
};

const DURATION = 250;
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

/** Chamar ANTES de trocar o estado: o clone precisa capturar o modo de partida. */
export function runPassage(root: HTMLElement, from: Mode, to: Mode): void {
  if (!document.body) return;
  // Eventos entra pela esquerda, Balada pela direita: espelha a ordem das abas.
  const sign = to === "eventos" ? 1 : -1;
  const edge = to === "eventos" ? "left" : "right";

  const rect = root.getBoundingClientRect();
  const clone = root.cloneNode(true) as HTMLElement;
  clone.removeAttribute("id");
  for (const [key, value] of Object.entries(MODE_VARS[from])) {
    clone.style.setProperty(key, value);
  }
  clone.style.width = `${rect.width}px`;

  // Canvas clonado nasce em branco: copia o frame atual.
  const sources = root.querySelectorAll("canvas");
  const copies = clone.querySelectorAll("canvas");
  sources.forEach((source, index) => {
    const copy = copies[index];
    if (!copy) return;
    copy.width = source.width;
    copy.height = source.height;
    copy.getContext("2d")?.drawImage(source, 0, 0);
  });

  // O header é sticky: dentro do overlay (overflow hidden) ele ficaria no topo
  // da página, fora da tela se o usuário rolou. Fixa no topo do quadro e deixa um
  // espaçador da mesma altura, senão o conteúdo do clone sobe e "pula" no corte.
  const headers = root.querySelectorAll("header");
  clone.querySelectorAll("header").forEach((header, index) => {
    const spacer = document.createElement("div");
    spacer.style.height = `${headers[index]?.offsetHeight ?? 0}px`;
    header.before(spacer);
    Object.assign(header.style, { position: "fixed", top: "0", left: "0", right: "0" });
  });

  const overlay = document.createElement("div");
  overlay.setAttribute("aria-hidden", "true");
  overlay.inert = true;
  overlay.style.cssText =
    "position:fixed;inset:0;z-index:9999;overflow:hidden;pointer-events:none;";

  const shifter = document.createElement("div");
  shifter.style.cssText = "position:absolute;inset:0;overflow:hidden;will-change:transform;";
  const inner = document.createElement("div");
  inner.style.cssText = "position:absolute;inset:0;overflow:hidden;will-change:transform;";
  const holder = document.createElement("div");
  holder.style.cssText = `position:absolute;left:${rect.left}px;top:${rect.top}px;`;

  holder.appendChild(clone);
  inner.appendChild(holder);
  shifter.appendChild(inner);
  overlay.appendChild(shifter);

  const accent = MODE_VARS[to]["--ds-accent"];
  const glow = to === "balada" ? `box-shadow:${MODE_VARS[to]["--ds-glow"]};` : "";
  const line = document.createElement("div");
  line.style.cssText = `position:absolute;top:0;bottom:0;width:2px;background:${accent};will-change:transform;${glow}`;
  line.style[edge] = "0";
  overlay.appendChild(line);

  document.body.appendChild(overlay);

  const opts: KeyframeAnimationOptions = { duration: DURATION, easing: EASING, fill: "forwards" };
  shifter.animate(
    [{ transform: "translateX(0)" }, { transform: `translateX(${sign * 100}%)` }],
    opts,
  );
  inner.animate(
    [{ transform: "translateX(0)" }, { transform: `translateX(${-sign * 100}%)` }],
    opts,
  );
  line.animate(
    [{ transform: "translateX(0)" }, { transform: `translateX(${sign * 100}vw)` }],
    opts,
  );
  window.setTimeout(() => overlay.remove(), DURATION + 30);
}
