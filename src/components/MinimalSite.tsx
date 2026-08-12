import { useState } from "react";

import heroImg from "@/assets/minimal-hero.jpg";
import logoImg from "@/assets/mega-brain-host-logo.png";
import { AuthDialog } from "@/components/AuthDialog";
import { CookieBanner } from "@/components/CookieBanner";
import { NetworkStatus } from "@/components/NetworkStatus";
import { SupportChat } from "@/components/SupportChat";
import { BRAND, DOMAINS, FAQ, FEATURES, NAV, PLANS, STATS } from "@/lib/site-content";
import {
  Sun,
  Moon,
  LogIn,
  Server,
  Globe,
  Shield,
  HardDrive,
  ArrowRightLeft,
  DatabaseBackup,
  Lock,
  Activity,
  Gauge,
  Headset,
  Check,
  MapPin,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Heart,
  Play,
} from "lucide-react";

const NAV_ICONS: Record<string, React.ReactNode> = {
  "#planos": <Server className="h-4 w-4" />,
  "#dominios": <Globe className="h-4 w-4" />,
  "#infra": <Shield className="h-4 w-4" />,
  "#suporte": <Headset className="h-4 w-4" />,
};

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  "Servidores NVMe": <HardDrive className="h-5 w-5 text-brand" />,
  "Migração grátis": <ArrowRightLeft className="h-5 w-5 text-brand" />,
  "Backup diário": <DatabaseBackup className="h-5 w-5 text-brand" />,
  "SSL ilimitado": <Lock className="h-5 w-5 text-brand" />,
};

const STAT_ICONS: Record<string, React.ReactNode> = {
  "Uptime garantido": <Activity className="h-4 w-4 text-brand" />,
  "Latência média no Brasil": <Gauge className="h-4 w-4 text-brand" />,
  "Suporte humano em português": <Headset className="h-4 w-4 text-brand" />,
};

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="text-base">{q}</h3>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-ink/40 transition-transform" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-ink/40 transition-transform" />
        )}
      </button>
      {open && <p className="mt-2 text-sm leading-relaxed text-ink/55">{a}</p>}
    </div>
  );
}

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
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
          <a href="#top" className="relative flex items-center">
            <img
              src={logoImg}
              alt={`${BRAND} logo`}
              width={220}
              height={64}
              className={`relative z-30 h-20 w-auto md:h-24 drop-shadow-sm ${dark ? "brightness-0 invert" : ""}`}
            />
          </a>
          <nav className="hidden gap-8 text-sm text-ink/60 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="flex items-center gap-1.5 transition-colors hover:text-ink"
              >
                {NAV_ICONS[n.href]}
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleDark}
              aria-label="Alternar tema escuro"
              className="flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 text-sm transition-colors hover:border-brand hover:text-brand"
            >
              {dark ? (
                <>
                  <Sun className="h-4 w-4" /> Claro
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" /> Escuro
                </>
              )}
            </button>
            <button
              onClick={() => setAuthOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-hairline px-4 py-1.5 text-sm transition-colors hover:border-brand hover:text-brand"
            >
              <LogIn className="h-4 w-4" />
              Entrar
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-20 md:grid-cols-2 md:pt-28">
          <div className="max-w-xl">
            <p className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs tracking-wide text-brand">
              <MapPin className="h-3.5 w-3.5" />
              Nuvem brasileira · datacenter no Rio de Janeiro
            </p>
            <h1 className="text-balance text-5xl leading-[1.05] md:text-6xl">
              Hospedagem em nuvem sem barulho.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink/60">
              Infraestrutura rápida, previsível e simples de operar. Você publica; a gente cuida de
              escala, backup e segurança.
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
                  <dd className="mt-1 flex items-center gap-1 text-xs leading-snug text-ink/50">
                    {STAT_ICONS[s.label]}
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-hairline shadow-[var(--shadow-soft)]">
            <img
              src={heroImg}
              alt="Pessoa trabalhando em um notebook em uma mesa clara e organizada"
              width={1200}
              height={912}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors group-hover:bg-ink/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface/90 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110">
                <Play className="h-7 w-7 fill-ink text-ink ml-0.5" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/60 to-transparent px-4 pb-4 pt-10">
              <p className="text-sm font-medium text-surface">
                Conheça a infraestrutura Mega Brain
              </p>
              <p className="text-xs text-surface/70">2:34 · Tour pelo datacenter</p>
            </div>
          </div>
        </section>

        <section id="infra" className="border-y border-hairline bg-surface-2">
          <div className="mx-auto grid max-w-6xl gap-px px-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="border-hairline py-12 sm:odd:border-r sm:odd:pr-12 sm:even:pl-12"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft">
                  {FEATURE_ICONS[f.title]}
                </div>
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
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 shrink-0 text-brand" />
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
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-brand" />
                    <p className="text-xl">{d.tld}</p>
                  </div>
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
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </section>

        <NetworkStatus variant="minimal" />

        <section id="converter" className="rupture px-6 py-24">
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="rupture-crack mx-auto mb-10 w-2/3" />

            <h2
              className="glitch-text text-4xl leading-tight"
              data-text="Cansado dessas páginas brancas e sem vida?"
            >
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
              <Sparkles className="mr-2 inline h-4 w-4" />
              CONVERTER O SITE
            </button>
            <div className="rupture-crack mx-auto mt-12 w-1/3" />
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline py-10 text-center text-xs text-ink/45">
        <span className="inline-flex items-center gap-1">
          © 2026 {BRAND} · Nuvem feita no Brasil com{" "}
          <Heart className="h-3 w-3 fill-current text-red-400" />
        </span>
      </footer>

      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} variant="minimal" />
      <SupportChat variant="minimal" />
      <CookieBanner variant="minimal" />
    </div>
  );
}
