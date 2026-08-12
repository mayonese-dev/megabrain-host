import { useEffect, useState } from "react";

const STEPS = [
  "Discando 0800-MEGA-BRAIN...",
  "Negociando handshake em 56 kbps...",
  "Recebendo mega_brain_host.html (14%)...",
  "Carregando imagens... logo_animado.gif",
  "Carregando imagens... botao_brilhante.gif",
  "Aplicando planilha de estilos retrô...",
  "Tocando midi_de_fundo.mid",
  "Concluído. Bem-vindo à internet de verdade.",
];

export function DialUpLoader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((p) => {
        const next = p + (p > 70 ? 0.6 : p > 40 ? 1.1 : 1.8);
        if (next >= 100) {
          window.clearInterval(id);
          window.setTimeout(onDone, 900);
          return 100;
        }
        return next;
      });
    }, 90);
    return () => window.clearInterval(id);
  }, [onDone]);

  const step = STEPS[Math.min(STEPS.length - 1, Math.floor((progress / 100) * STEPS.length))];

  return (
    <div className="scanlines fixed inset-0 z-50 flex items-center justify-center bg-[oklch(0.16_0.03_250)] p-6">
      <div className="w-full max-w-xl border-2 border-[oklch(0.75_0.02_250)] bg-[oklch(0.82_0.01_250)] shadow-[8px_8px_0_oklch(0_0_0/0.5)]">
        <div className="flex items-center justify-between bg-[linear-gradient(90deg,oklch(0.42_0.16_260),oklch(0.62_0.12_235))] px-2 py-1">
          <span className="font-retro-display text-lg text-[oklch(1_0_0)]">
            Conectando ao Mega Brain Host
          </span>
          <span className="flex gap-1">
            {["_", "□", "×"].map((c) => (
              <span
                key={c}
                className="flex h-4 w-4 items-center justify-center border border-[oklch(0.35_0.02_250)] bg-[oklch(0.82_0.01_250)] text-[10px] text-[oklch(0.2_0.02_250)]"
              >
                {c}
              </span>
            ))}
          </span>
        </div>

        <div className="space-y-4 p-5 text-[oklch(0.2_0.02_250)]">
          <p className="font-retro-display text-2xl">{step}</p>
          <div className="h-6 border-2 border-[oklch(0.45_0.02_250)] bg-[oklch(0.95_0.01_250)] p-[3px]">
            <div className="dialup-bar h-full transition-[width] duration-200" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between font-retro-display text-xl">
            <span>{Math.floor(progress)}% concluído</span>
            <span className="retro-blink">▮</span>
          </div>
          <p className="text-xs leading-relaxed opacity-80">
            Não desligue o telefone. Esta página está sendo servida do futuro de 1999.
          </p>
        </div>
      </div>
    </div>
  );
}
