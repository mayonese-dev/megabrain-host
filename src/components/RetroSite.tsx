import { useState } from "react";

import heroImg from "@/assets/frutiger-hero.jpg";
import { AuthDialog } from "@/components/AuthDialog";
import { CookieBanner } from "@/components/CookieBanner";
import { NetworkStatus } from "@/components/NetworkStatus";
import { Guestbook, RetroBadges, VisitorCounter } from "@/components/RetroExtras";
import { SupportChat } from "@/components/SupportChat";
import { BRAND, DOMAINS, FAQ, FEATURES, NAV, PLANS, STATS } from "@/lib/site-content";

export function RetroSite({
  onRevert,
  win98,
  onToggleWin98,
}: {
  onRevert: () => void;
  win98: boolean;
  onToggleWin98: () => void;
}) {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className={`theme-retro scanlines min-h-screen ${win98 ? "is-win98" : ""}`}>
      <div className="retro-marquee border-y-2 border-[oklch(1_0_0/0.8)] bg-[oklch(0.25_0.12_265)] py-1 font-retro-display text-xl text-[oklch(0.95_0.15_120)]">
        <span>
          ★ BEM-VINDO AO {BRAND.toUpperCase()} ★ VOCÊ É O VISITANTE Nº 000.184.203 ★ MELHOR
          VISUALIZADO EM 1024x768 ★ UPTIME 99,99% GARANTIDO ★ MIGRAÇÃO GRÁTIS ★
        </span>
      </div>

      <header className="mx-auto max-w-5xl px-4 pt-6">
        <div className="aero-panel px-5 py-6 text-center">
          <h1 className="retro-rainbow text-5xl md:text-6xl">{BRAND.toUpperCase()}!!</h1>
          <p className="mt-1 font-retro-display text-2xl text-[oklch(0.35_0.14_255)]">
            ~*~ hospedagem em nuvem TURBO desde sempre ~*~
          </p>
          <nav className="mt-4 flex flex-wrap justify-center gap-2">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="aero-bevel px-4 py-1 text-lg">
                {n.label}
              </a>
            ))}
            <button onClick={() => setAuthOpen(true)} className="aero-bevel px-4 py-1 text-lg">
              ENTRAR / CRIAR CONTA
            </button>
            <button onClick={onToggleWin98} className="aero-bevel px-4 py-1 text-lg">
              {win98 ? "☀ MODO FRUTIGER AERO" : "\u{1FA9F} MODO WINDOWS 98"}
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-6">
        <section className="aero-panel overflow-hidden">
          <img
            src={heroImg}
            alt="Céu azul, grama e bolhas de vidro no estilo Frutiger Aero"
            width={1536}
            height={768}
            className="h-56 w-full border-b-2 border-[oklch(1_0_0/0.8)] object-cover md:h-72"
          />
          <div className="p-6 text-center">
            <h2 className="aero-glow text-4xl">HOSPEDAGEM EM NUVEM SEM BARULHO!!!</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg">
              Infraestrutura rápida, previsível e simples de operar. Você publica; a gente cuida de
              escala, backup e segurança. <span className="retro-blink">*NOVO*</span>
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a href="#planos" className="aero-bevel retro-bob px-7 py-2 text-2xl">
                &gt;&gt; VER PLANOS &lt;&lt;
              </a>
              <a href="#infra" className="aero-bevel px-7 py-2 text-2xl">
                COMO FUNCIONA A INFRA
              </a>
            </div>
            <table className="mx-auto mt-7 border-collapse text-left">
              <tbody>
                {STATS.map((s) => (
                  <tr key={s.label} className="border-2 border-[oklch(0.45_0.14_250/0.4)]">
                    <th className="border-2 border-[oklch(0.45_0.14_250/0.4)] bg-[oklch(0.9_0.06_215/0.7)] px-4 py-1 font-retro-display text-2xl">
                      {s.value}
                    </th>
                    <td className="px-4 py-1">{s.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="infra" className="grid gap-6 md:grid-cols-2">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="aero-panel p-5">
              <h3 className="text-3xl">
                {["◆", "★", "☁", "✿"][i]} {f.title}
              </h3>
              <p className="mt-2 text-lg">{f.text}</p>
            </div>
          ))}
        </section>

        <section id="planos" className="aero-panel p-6">
          <h2 className="text-center text-4xl">-=[ PLANOS ]=-</h2>
          <p className="mt-1 text-center text-lg">
            Sem taxa de setup. Cancele quando quiser.{" "}
            <b className="text-[oklch(0.55_0.22_25)]">PROMOÇÃO!</b>
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border-4 p-5 text-center ${
                  p.highlight
                    ? "border-[oklch(0.8_0.2_95)] bg-[oklch(0.97_0.06_120/0.75)]"
                    : "border-[oklch(1_0_0/0.85)] bg-[oklch(0.98_0.02_220/0.6)]"
                }`}
              >
                {p.highlight && (
                  <p className="retro-blink font-retro-display text-xl text-[oklch(0.55_0.22_25)]">
                    ☀ MAIS VENDIDO ☀
                  </p>
                )}
                <h3 className="text-3xl">{p.name}</h3>
                <p className="font-retro-display text-5xl text-[oklch(0.35_0.16_255)]">
                  {p.price}
                  <span className="text-xl">{p.period}</span>
                </p>
                <ul className="mt-4 space-y-1 text-left text-base">
                  {p.items.map((i) => (
                    <li key={i}>✔ {i}</li>
                  ))}
                </ul>
                <a href="#converter-retro" className="aero-bevel mt-5 block py-2 text-xl">
                  ASSINAR {p.name.toUpperCase()}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="dominios" className="aero-panel p-6">
          <h2 className="text-center text-4xl">DOMÍNIOS BARATÍSSIMOS</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-4">
            {DOMAINS.map((d) => (
              <div
                key={d.tld}
                className="rounded-xl border-4 border-[oklch(1_0_0/0.85)] bg-[oklch(0.93_0.05_215/0.7)] py-4 text-center"
              >
                <p className="font-retro-display text-3xl">{d.tld}</p>
                <p className="text-base">{d.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="suporte" className="aero-panel p-6">
          <h2 className="text-center text-4xl">F.A.Q. — PERGUNTAS FREQUENTES</h2>
          <div className="mt-5 space-y-4">
            {FAQ.map((f) => (
              <div
                key={f.q}
                className="border-l-8 border-[oklch(0.7_0.19_140)] bg-[oklch(1_0_0/0.6)] p-4"
              >
                <h3 className="text-2xl">? {f.q}</h3>
                <p className="text-lg">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <NetworkStatus variant="retro" />

        <VisitorCounter />

        <Guestbook />

        <RetroBadges />

        <section id="converter-retro" className="aero-panel p-8 text-center">
          <h2 className="retro-rainbow text-4xl">O SITE FOI CONVERTIDO COM SUCESSO!!!</h2>
          <p className="mt-3 text-lg">
            Mesmas informações, mesmas funções — só com muito mais brilho. Quer voltar ao silêncio?
          </p>
          <button onClick={onRevert} className="aero-bevel mt-6 px-8 py-3 text-2xl">
            ← VOLTAR AO MINIMALISMO
          </button>
        </section>
      </main>

      <footer className="border-t-4 border-[oklch(1_0_0/0.8)] bg-[oklch(0.25_0.12_265)] py-6 text-center font-retro-display text-xl text-[oklch(0.95_0.03_220)]">
        © 2026 {BRAND.toUpperCase()} · NUVEM FEITA NO BRASIL · assinado no livro de visitas
      </footer>

      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} variant="retro" />
      <SupportChat variant="retro" />
      <CookieBanner variant="retro" />
    </div>
  );
}
