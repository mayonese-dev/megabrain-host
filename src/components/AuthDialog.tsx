import { useState } from "react";

import { BRAND } from "@/lib/site-content";

type Props = {
  open: boolean;
  onClose: () => void;
  variant: "minimal" | "retro";
};

export function AuthDialog({ open, onClose, variant }: Props) {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const retro = variant === "retro";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Entrar ou criar conta"
    >
      <button
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-[oklch(0.2_0.03_250/0.45)] backdrop-blur-sm"
      />

      <div
        className={
          retro
            ? "aero-panel relative w-full max-w-md p-0 text-center"
            : "relative w-full max-w-md rounded-2xl border border-hairline bg-surface p-8 shadow-[var(--shadow-soft)]"
        }
      >
        {retro ? (
          <div className="flex items-center justify-between rounded-t-[16px] bg-[oklch(0.35_0.14_255)] px-3 py-1.5 font-retro-display text-xl text-[oklch(0.97_0.02_220)]">
            <span>🔒 {BRAND.toUpperCase()} — ÁREA DO CLIENTE</span>
            <button onClick={onClose} className="aero-bevel px-2 leading-none text-base">
              X
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-4 top-4 text-sm text-ink/40 transition-colors hover:text-ink"
          >
            ✕
          </button>
        )}

        <div className={retro ? "p-5" : ""}>
          <div className={retro ? "flex justify-center gap-2" : "flex gap-6 text-sm"}>
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setSent(false);
                }}
                className={
                  retro
                    ? `aero-bevel px-4 py-1 text-xl ${tab === t ? "" : "opacity-70"}`
                    : `pb-1 transition-colors ${
                        tab === t
                          ? "border-b-2 border-brand text-ink"
                          : "border-b-2 border-transparent text-ink/45 hover:text-ink"
                      }`
                }
              >
                {t === "login" ? "Entrar" : "Criar conta"}
              </button>
            ))}
          </div>

          {sent ? (
            <p className={retro ? "mt-6 text-xl" : "mt-8 text-sm leading-relaxed text-ink/60"}>
              {retro
                ? "✔ PEDIDO ENVIADO!! AGUARDE O FAX DE CONFIRMAÇÃO."
                : "Pronto. Este é um site de demonstração — nenhum dado foi enviado."}
            </p>
          ) : (
            <form
              className={retro ? "mt-5 space-y-3 text-left text-lg" : "mt-8 space-y-4 text-left"}
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              {tab === "signup" && (
                <Field retro={retro} label="Nome" type="text" placeholder="Seu nome" />
              )}
              <Field retro={retro} label="E-mail" type="email" placeholder="voce@email.com" />
              <Field retro={retro} label="Senha" type="password" placeholder="••••••••" />
              <button
                type="submit"
                className={
                  retro
                    ? "aero-bevel w-full py-2 text-2xl"
                    : "w-full rounded-full bg-ink py-3 text-sm text-surface transition-opacity hover:opacity-85"
                }
              >
                {tab === "login"
                  ? retro
                    ? ">> ENTRAR <<"
                    : "Entrar"
                  : retro
                    ? ">> CRIAR CONTA <<"
                    : "Criar conta"}
              </button>
              <p className={retro ? "text-center text-base" : "text-center text-xs text-ink/45"}>
                {retro
                  ? "* seus dados ficam guardados em um disquete seguro *"
                  : "Demonstração: nada é armazenado."}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  retro,
  label,
  type,
  placeholder,
}: {
  retro: boolean;
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className={retro ? "font-retro-display text-xl" : "text-xs text-ink/55"}>{label}</span>
      <input
        required
        type={type}
        placeholder={placeholder}
        className={
          retro
            ? "mt-1 w-full rounded-lg border-2 border-[oklch(0.45_0.14_250/0.5)] bg-[oklch(1_0_0/0.85)] px-3 py-1.5 text-lg outline-none"
            : "mt-1.5 w-full rounded-xl border border-hairline bg-[oklch(1_0_0)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand"
        }
      />
    </label>
  );
}
