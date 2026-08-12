import { useEffect, useState } from "react";

const DATACENTERS = [
  { city: "Rio de Janeiro", code: "RIO-1", load: 38 },
  { city: "São Paulo", code: "SPO-2", load: 61 },
  { city: "Fortaleza", code: "FOR-1", load: 22 },
  { city: "Miami", code: "MIA-3", load: 47 },
];

export function NetworkStatus({ variant }: { variant: "minimal" | "retro" }) {
  const retro = variant === "retro";
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 2500);
    return () => clearInterval(i);
  }, []);

  const jitter = (n: number, seed: number) =>
    Math.min(96, Math.max(6, n + ((tick + seed) % 5) * 3 - 6));

  if (retro) {
    return (
      <section id="rede-retro" className="aero-panel p-6">
        <h2 className="text-center text-4xl">◉ STATUS DA REDE — AO VIVO!</h2>
        <p className="mt-1 text-center text-lg">
          Uptime global: <b>99,99%</b> · Latência média: <b>12 ms</b> ·{" "}
          <span className="retro-blink text-[oklch(0.5_0.18_140)]">
            TODOS OS SISTEMAS OPERANTES
          </span>
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {DATACENTERS.map((d, i) => (
            <div
              key={d.code}
              className="border-4 border-[oklch(1_0_0/0.85)] bg-[oklch(0.95_0.03_215/0.7)] p-3"
            >
              <p className="font-retro-display text-2xl">
                {d.code} — {d.city}
              </p>
              <div className="mt-2 h-4 border-2 border-[oklch(0.35_0.1_250/0.5)] bg-[oklch(1_0_0/0.8)]">
                <div className="dialup-bar h-full" style={{ width: `${jitter(d.load, i)}%` }} />
              </div>
              <p className="text-base">
                carga {jitter(d.load, i)}% · ping {8 + ((tick + i) % 7)} ms
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="rede" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl">Status da rede</h2>
          <p className="mt-2 text-sm text-ink/55">
            Uptime global 99,99% · latência média 12 ms · atualizado em tempo real
          </p>
        </div>
        <p className="flex items-center gap-2 text-sm text-ink/60">
          <span className="h-2 w-2 rounded-full bg-[oklch(0.65_0.17_150)]" />
          Todos os sistemas operando
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {DATACENTERS.map((d, i) => (
          <div key={d.code} className="rounded-2xl border border-hairline p-5">
            <p className="text-sm">{d.city}</p>
            <p className="text-xs text-ink/45">{d.code}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-hairline">
              <div
                className="h-full rounded-full bg-brand transition-all duration-700"
                style={{ width: `${jitter(d.load, i)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-ink/50">
              carga {jitter(d.load, i)}% · ping {8 + ((tick + i) % 7)} ms
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
