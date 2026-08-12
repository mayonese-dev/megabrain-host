import { useEffect, useState } from "react";

type Props = { variant: "minimal" | "retro" };

const PREFS = [
  { id: "essenciais", label: "Essenciais", note: "Obrigatórios (e também opcionais, mas não)" },
  { id: "analytics", label: "Análise de uso", note: "Contamos quantas vezes você pisca" },
  { id: "marketing", label: "Marketing", note: "Anúncios de coisas que você já comprou" },
  { id: "nostalgia", label: "Nostalgia", note: "Cookies de 1999, ainda crocantes" },
];

export function CookieBanner({ variant }: Props) {
  const retro = variant === "retro";
  const [stage, setStage] = useState<"hidden" | "banner" | "prefs" | "toast">("hidden");
  const [selected, setSelected] = useState<string[]>(["essenciais"]);

  useEffect(() => {
    const t = setTimeout(() => setStage("banner"), 1400);
    return () => clearTimeout(t);
  }, []);

  const troll = () => {
    setStage("toast");
    setTimeout(() => setStage("hidden"), 4000);
  };

  if (stage === "hidden") return null;

  if (stage === "toast") {
    return (
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-4">
        <div
          className={
            retro
              ? "aero-panel px-6 py-4 text-center"
              : "rounded-2xl border border-hairline bg-surface px-6 py-4 text-center shadow-[var(--shadow-soft)]"
          }
        >
          <p className={retro ? "font-retro-display text-3xl" : "text-sm font-medium"}>
            {retro ? "✔ COOKIES ARMAZENADOS COM SUCESSO!!!" : "Cookies armazenados com sucesso ✓"}
          </p>
          <p className={retro ? "text-lg" : "mt-1 text-xs text-ink/50"}>
            Todos eles. Inclusive os que você recusou. Obrigado pela colaboração.
          </p>
        </div>
      </div>
    );
  }

  const wrapper = retro
    ? "aero-panel fixed bottom-4 left-1/2 z-50 w-[min(92vw,44rem)] -translate-x-1/2 p-5"
    : "fixed bottom-4 left-1/2 z-50 w-[min(92vw,40rem)] -translate-x-1/2 rounded-2xl border border-hairline bg-surface p-6 shadow-[var(--shadow-soft)]";

  const primary = retro
    ? "aero-bevel px-5 py-1.5 text-xl"
    : "rounded-full bg-ink px-5 py-2 text-sm text-surface transition-opacity hover:opacity-85";
  const secondary = retro
    ? "aero-bevel px-5 py-1.5 text-xl"
    : "rounded-full border border-hairline px-5 py-2 text-sm transition-colors hover:border-brand hover:text-brand";

  if (stage === "prefs") {
    return (
      <div className={wrapper} role="dialog" aria-label="Preferências de cookies">
        <h3 className={retro ? "text-3xl" : "text-base font-medium"}>
          {retro ? "⚙ PREFERÊNCIAS DE COOKIES" : "Preferências de cookies"}
        </h3>
        <div className="mt-4 space-y-2.5">
          {PREFS.map((p) => {
            const on = selected.includes(p.id);
            return (
              <label
                key={p.id}
                className={
                  retro
                    ? "flex cursor-pointer items-start gap-3 border-l-8 border-[oklch(0.7_0.19_140)] bg-[oklch(1_0_0/0.6)] p-2 text-lg"
                    : "flex cursor-pointer items-start gap-3 rounded-xl border border-hairline p-3"
                }
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() =>
                    setSelected((s) => (on ? s.filter((i) => i !== p.id) : [...s, p.id]))
                  }
                  className="mt-1"
                />
                <span>
                  <span className={retro ? "font-retro-display text-xl" : "text-sm"}>{p.label}</span>
                  <span className={retro ? "block text-base" : "block text-xs text-ink/50"}>
                    {p.note}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <button onClick={() => setStage("banner")} className={secondary}>
            Voltar
          </button>
          <button onClick={troll} className={primary}>
            {retro ? "SALVAR ESCOLHAS" : "Salvar escolhas"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapper} role="dialog" aria-label="Aviso de cookies">
      <h3 className={retro ? "text-3xl" : "text-base font-medium"}>
        {retro ? "🍪 ACEITA UNS COOKIES?" : "Podemos usar cookies?"}
      </h3>
      <p className={retro ? "mt-1 text-lg" : "mt-2 text-sm leading-relaxed text-ink/60"}>
        Usamos cookies para melhorar sua experiência. Você escolhe — a decisão é 100% sua e será
        totalmente respeitada.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
        <button onClick={() => setStage("prefs")} className={secondary}>
          {retro ? "PREFERÊNCIAS" : "Preferências"}
        </button>
        <button onClick={troll} className={secondary}>
          {retro ? "NÃO, OBRIGADO" : "Não, obrigado"}
        </button>
        <button onClick={troll} className={primary}>
          {retro ? "SIM, QUERO!" : "Sim, aceitar"}
        </button>
      </div>
    </div>
  );
}
