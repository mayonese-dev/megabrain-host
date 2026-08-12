import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { DialUpLoader } from "@/components/DialUpLoader";
import { MinimalSite } from "@/components/MinimalSite";
import { RetroSite } from "@/components/RetroSite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mega Brain Host — Hospedagem em nuvem no Brasil" },
      {
        name: "description",
        content:
          "Hospedagem em nuvem com NVMe, uptime de 99,99%, migração grátis e suporte 24/7 em português. Planos a partir de R$ 12/mês.",
      },
      { property: "og:title", content: "Mega Brain Host — Hospedagem em nuvem no Brasil" },
      {
        property: "og:description",
        content:
          "Servidores NVMe, backup diário e SSL ilimitado. Publique seu site em minutos com o Mega Brain Host.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [mode, setMode] = useState<"minimal" | "loading" | "retro">("minimal");
  const [dark, setDark] = useState(false);
  const toggleDark = () => setDark((d) => !d);

  if (mode === "loading") return <DialUpLoader onDone={() => setMode("retro")} />;
  if (mode === "retro")
    return <RetroSite onRevert={() => setMode("minimal")} win98={dark} onToggleWin98={toggleDark} />;
  return <MinimalSite onConvert={() => setMode("loading")} dark={dark} onToggleDark={toggleDark} />;
}
