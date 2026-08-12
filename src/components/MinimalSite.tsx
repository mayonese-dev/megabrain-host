import { useState } from "react";

import heroImg from "@/assets/minimal-hero.jpg";
import logoAsset from "@/assets/logo.png.asset.json";
import { AuthDialog } from "@/components/AuthDialog";
import { CookieBanner } from "@/components/CookieBanner";
import { NetworkStatus } from "@/components/NetworkStatus";
import { SupportChat } from "@/components/SupportChat";
import { BRAND, DOMAINS, FAQ, FEATURES, NAV, PLANS, STATS } from "@/lib/site-content";

export function MinimalSite({
  onConvert,
  dark,
  onToggleDark,
}: {
  onConvert: () => void;
  dark: boolean;
  onToggleDark: () => void;
}) {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className={`theme-minimal min-h-screen ${dark ? "is-dark" : ""}`}>
      <header className="sticky top-0 z-20 border-b border-hairline bg-surface/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center">
            <img
              src={logoAsset.url}
              alt={`${BRAND} logo`}
              width={220}
              height={64}
              className={`h-8 w-auto md:h-9 ${dark ? "brightness-0 invert" : ""}`}
            />
          </a>
          <nav className="hidden gap-8 text-sm text-ink/60 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-ink">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleDark}
              aria-label="Alternar tema escuro"
              className="rounded-full border border-hairline px-3 py-1.5 text-sm transition-colors hover:border-brand hover:text-brand"
            >
              {dark ? "☀ Claro" : "☾ Escuro"}
            </button>
            <button
              onClick={() => setAuthOpen(true)}
              className="rounded-full border border-hairline px-4 py-1.5 text-sm transition-colors hover:border-brand hover:text-brand"
            >
              Entrar
            </button>
          </div>
        </div>
      </header>


      <main id="top">
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-20 md:grid-cols-2 md:pt-28">
          <div className="max-w-xl">
            <p className="mb-6 inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs tracking-wide text-brand">
              Nuvem brasileira · datacenter no Rio de Janeiro
            </p>
            <h1 className="text-balance text-5xl leading-[1.05] md:text-6xl">
              Hospedagem em nuvem sem barulho.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink/60">
              Infraestrutura rápida, previsível e simples de operar. Você publica; a gente cuida
              de escala, backup e segurança.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#planos"
                className="rounded-full bg-ink px-6 py-3 text-sm text-surface transition-opacity hover:opacity-85"
              >
                Ver planos
              </a>
              <a href="#infra" className="text-sm text-ink/60 underline-offset-4 hover:underline">
                Como funciona a infra
              </a>
            </div>
            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-hairline pt-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl tracking-tight">{s.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-ink/50">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <img
            src={heroImg}
            alt="Pessoa trabalhando em um notebook em uma mesa clara e organizada"
            width={1200}
            height={912}
            className="rounded-2xl border border-hairline object-cover shadow-[var(--shadow-soft)]"
          />

        </section>

        <section id="infra" className="border-y border-hairline bg-surface-2">
          <div className="mx-auto grid max-w-6xl gap-px px-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="border-hairline py-12 sm:odd:border-r sm:odd:pr-12 sm:even:pl-12">
                <h3 className="text-lg">{f.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/55">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="planos" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-3xl">Planos</h2>
          <p className="mt-2 text-sm text-ink/55">Sem taxa de setup. Cancele quando quiser.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-8 ${
                  p.highlight
                    ? "border-brand bg-brand-soft/40 shadow-[var(--shadow-soft)]"
                    : "border-hairline"
                }`}
              >
                <p className="text-sm text-ink/60">{p.name}</p>
                <p className="mt-4 text-4xl tracking-tight">
                  {p.price}
                  <span className="text-base text-ink/45">{p.period}</span>
                </p>
                <ul className="mt-7 space-y-2.5 text-sm text-ink/65">
                  {p.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-brand">—</span>
                      {i}
                    </li>
                  ))}
                </ul>
                <a
                  href="#converter"
                  className={`mt-8 block rounded-full py-2.5 text-center text-sm transition-opacity hover:opacity-85 ${
                    p.highlight ? "bg-ink text-surface" : "border border-hairline"
                  }`}
                >
                  Assinar {p.name}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="dominios" className="border-y border-hairline bg-surface-2 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl">Domínios</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-4">
              {DOMAINS.map((d) => (
                <div key={d.tld} className="rounded-xl border border-hairline px-5 py-6">
                  <p className="text-xl">{d.tld}</p>
                  <p className="mt-1 text-xs text-ink/50">{d.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="suporte" className="mx-auto max-w-3xl px-6 py-24">
          <h2 className="text-3xl">Perguntas frequentes</h2>
          <div className="mt-10 divide-y divide-hairline border-y border-hairline">
            {FAQ.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="text-base">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <NetworkStatus variant="minimal" />

        <section id="converter" className="rupture px-6 py-24">
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="rupture-crack mx-auto mb-10 w-2/3" />

            <h2 className="glitch-text text-4xl leading-tight" data-text="Cansado dessas páginas brancas e sem vida?">
              Cansado dessas páginas brancas e sem vida?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-ink/60">
              Volte para uma época em que as coisas tinham cor, brilho, gradiente e um contador de
              visitas. Mesmas informações, mesmas funções — outra atmosfera.
            </p>
            <button
              onClick={onConvert}
              className="mt-10 rounded-full bg-brand px-9 py-4 text-sm tracking-wide text-[oklch(1_0_0)] shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.04]"
            >
              CONVERTER O SITE
            </button>
            <div className="rupture-crack mx-auto mt-12 w-1/3" />
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline py-10 text-center text-xs text-ink/45">
        © 2026 {BRAND} · Nuvem feita no Brasil
      </footer>

      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} variant="minimal" />
      <SupportChat variant="minimal" />
      <CookieBanner variant="minimal" />
    </div>
  );
}

