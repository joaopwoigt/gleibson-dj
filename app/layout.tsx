import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ModeProvider } from "@/components/ModeProvider";
import "./globals.css";

// Fonte da marca (tokens.md §4). next/font/google baixa e self-hosta no build:
// nenhum request a fonts.gstatic.com em runtime.
//
// v2 do brand book (2026-08-18): UMA só família — Poppins. Peso e tracking fazem
// toda a hierarquia; não existe segunda família para resolver contraste.
// (Antes: Unbounded + Space Grotesk + IBM Plex Mono.)
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  // 300: a primeira linha do h1 ("Uns tocam música.") no design One Page.
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// URL base para as URLs absolutas de OG. Domínio final é definido na Task 27 —
// por ora, a URL da Vercel. Trocar aqui quando o .com.br apontar.
const SITE_URL = "https://gleibson-dj.vercel.app";
// Copy da marca (messaging.md): assinatura (frase 1) + categoria + fecho (frase 8).
const TITLE = "DJ Gleib — Uns tocam música. Eu comando o momento.";
const DESCRIPTION =
  "DJ de eventos e balada, do casamento à pista. No comando do seu momento.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "DJ Gleib",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "DJ Gleib" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-mode="eventos"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-fg">
        <ModeProvider>
          {/* page-root: o que a Passagem clona. z-0 isola o contexto de
              empilhamento, para o grão de papel (-z-10) ficar entre o fundo e o
              conteúdo. A troca de cor é o corte da Passagem, não um fade. */}
          <div id="page-root" className="relative z-0 flex min-h-screen flex-col bg-bg text-fg">
            {children}
          </div>
        </ModeProvider>
      </body>
    </html>
  );
}
