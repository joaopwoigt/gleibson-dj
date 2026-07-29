import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site estático (Perfil B): sem servidor, sem SSR em runtime.
  // O build pré-renderiza tudo para /out. Ver Task 01 e PLAN.md no hub.
  output: "export",
  images: {
    // Export desliga a otimização automática do Next — o pipeline de imagem é próprio (Task 12).
    unoptimized: true,
  },
};

export default nextConfig;
