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

// Placeholder mínimo — metadata completa, Open Graph e favicon vêm na Task 18.
export const metadata: Metadata = {
  title: "DJ Gleib",
  description: "Site-portfólio do DJ Gleib.",
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
