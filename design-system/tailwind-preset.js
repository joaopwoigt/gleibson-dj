/**
 * Design System — DJ Gleib (Etapa 4)
 * Preset Tailwind. Importar em tailwind.config.js:
 *
 *   const gleib = require('./design-system/tailwind-preset.js')
 *   module.exports = { presets: [gleib], content: [...] }
 *
 * Dual-mode: as cores SEMÂNTICAS (bg, surface, fg, accent, ...) apontam para
 * CSS variables que trocam conforme [data-mode="eventos"|"balada"].
 * Cole o bloco :root/[data-mode] de tokens.md §2 no seu globals.css.
 * A paleta BRUTA (pretotinta, uva, purpura-*, osso, ...) fica disponível para
 * casos que precisam de uma cor fixa independente do modo.
 *
 * Rastreabilidade: cada valor vem do brand-book.md (Etapa 3). Raio/espaçamento/
 * breakpoints são decisões de design system (o brand book não os define).
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        // --- Semânticas (trocam por modo via CSS vars) ---
        bg: 'var(--ds-bg)',
        surface: 'var(--ds-surface)',
        fg: 'var(--ds-fg)',
        'fg-2': 'var(--ds-fg-2)',
        accent: 'var(--ds-accent)',
        'accent-emphasis': 'var(--ds-accent-emphasis)',
        'on-accent': 'var(--ds-on-accent)',
        line: 'var(--ds-border)',

        // --- Paleta bruta (cores-âncora do brand book) ---
        pretotinta: '#100E14',
        uva: '#211B2E',
        'purpura-profunda': '#6D28D9',
        'purpura-eletrica': '#9B5CFF',
        'purpura-clara': '#B98CFF',
        osso: '#F1EEE8',
        'superficie-clara': '#F7F4EE',
        tinta: '#16131C',
        lavanda: '#948BA6',
        grafite: '#45424C',
        'borda-escura': '#2A2536',
        'borda-clara': '#DAD4CA',
        sucesso: '#2FA36B',
        erro: '#E5484D',
      },

      fontFamily: {
        display: ['Unbounded', 'system-ui', 'sans-serif'],
        body: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        // [size, { lineHeight, letterSpacing }]
        display: ['clamp(2.5rem, 6vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.01em' }],
        h1: ['clamp(2rem, 4.5vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        h2: ['1.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        h3: ['1.125rem', { lineHeight: '1.2' }],
        body: ['1rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        label: ['0.75rem', { lineHeight: '1', letterSpacing: '0.16em' }],
      },

      // Cantos vivos: 0px em tudo. radius-full só para círculos (avatar, símbolo).
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
        full: '9999px',
      },

      borderWidth: {
        DEFAULT: '1px',
        2: '2px',
      },

      // Sem sombras suaves (brand-book §4.7). Só glow de energia no Modo Balada.
      boxShadow: {
        none: 'none',
        glow: 'var(--ds-glow)',
        'glow-strong': '0 0 36px rgba(155,92,255,0.55)',
      },

      spacing: {
        1: '4px', 2: '8px', 3: '12px', 4: '16px', 6: '24px',
        8: '32px', 12: '48px', 16: '64px', 24: '96px',
      },

      maxWidth: {
        content: '1120px',
      },

      screens: {
        sm: '640px', md: '768px', lg: '1024px', xl: '1280px',
      },

      transitionTimingFunction: {
        command: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
}
