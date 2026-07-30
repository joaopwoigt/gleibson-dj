import type { Metadata } from "next";
import { Unbounded, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Fontes da marca (tokens.md §4). next/font/google baixa e self-hosta no build:
// nenhum request a fonts.gstatic.com em runtime. Nomes de var próprios para não
// colidir com os tokens --font-display/body/mono do @theme (Task 02); o @theme
// referencia estas vars e adiciona os fallbacks.
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
      className={`${unbounded.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg transition-colors duration-250 ease-command">
        {children}
      </body>
    </html>
  );
}
