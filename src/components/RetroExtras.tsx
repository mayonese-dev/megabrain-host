import { useEffect, useState } from "react";

const BASE_VISITS = 184203;

const SEED_ENTRIES = [
  { name: "xX_dark_finch_Xx", city: "Curitiba", text: "site mais rápido que meu 56k, parabéns!!!" },
  { name: "mari_2001", city: "Recife", text: "adorei o contador de visitas, muito profissional" },
  { name: "webmaster_junior", city: "Rio de Janeiro", text: "coloquei o banner de vocês no meu site ;)" },
];

export function VisitorCounter() {
  const [visits, setVisits] = useState(BASE_VISITS);

  useEffect(() => {
    const i = setInterval(() => setVisits((v) => v + 1 + Math.floor(Math.random() * 3)), 2000);
    return () => clearInterval(i);
  }, []);

  const digits = String(visits).padStart(9, "0").split("");

  return (
    <div className="aero-panel p-5 text-center">
      <p className="font-retro-display text-2xl">VOCÊ É O VISITANTE Nº</p>
      <div className="mt-2 inline-flex gap-1">
        {digits.map((d, i) => (
          <span
            key={i}
            className="border-2 border-[oklch(0.7_0.1_240)] bg-[oklch(0.15_0.03_260)] px-2 py-1 font-retro-display text-3xl text-[oklch(0.9_0.2_140)]"
          >
            {d}
          </span>
        ))}
      </div>
      <p className="mt-2 text-base">desde 12 de agosto de 1999 · 3 pessoas online agora</p>
    </div>
  );
}

export function Guestbook() {
  const [entries, setEntries] = useState(SEED_ENTRIES);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [text, setText] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setEntries((s) => [{ name: name.trim(), city: city.trim() || "internet", text: text.trim() }, ...s]);
    setName("");
    setCity("");
    setText("");
  };

  return (
    <section id="livro" className="aero-panel p-6">
      <h2 className="text-center text-4xl">✍ LIVRO DE VISITAS</h2>
      <p className="mt-1 text-center text-lg">Assine e deixe seu recado para a eternidade!</p>
      <form onSubmit={submit} className="mt-5 grid gap-3 sm:grid-cols-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="seu nick"
          className="border-2 border-[oklch(0.4_0.1_250/0.5)] px-3 py-2 text-lg"
        />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="sua cidade"
          className="border-2 border-[oklch(0.4_0.1_250/0.5)] px-3 py-2 text-lg"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="deixe seu recado..."
          rows={2}
          className="border-2 border-[oklch(0.4_0.1_250/0.5)] px-3 py-2 text-lg sm:col-span-2"
        />
        <button className="aero-bevel px-6 py-2 text-xl sm:col-span-2">ASSINAR O LIVRO</button>
      </form>
      <div className="mt-6 space-y-3">
        {entries.map((e, i) => (
          <div
            key={i}
            className="border-l-8 border-[oklch(0.7_0.19_140)] bg-[oklch(1_0_0/0.65)] p-3 text-lg"
          >
            <p className="font-retro-display text-2xl">
              {e.name} <span className="text-[oklch(0.45_0.12_250)]">— {e.city}</span>
            </p>
            <p>{e.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function RetroBadges() {
  return (
    <section className="aero-panel p-6 text-center">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {[
          "BEST VIEWED IN INTERNET EXPLORER 5",
          "HTML 4.0 VÁLIDO",
          "MADE WITH NOTEPAD",
          "POWERED BY 56K",
          "Y2K READY",
        ].map((b) => (
          <span
            key={b}
            className="border-2 border-[oklch(1_0_0)] bg-[oklch(0.25_0.12_265)] px-3 py-1 font-retro-display text-lg text-[oklch(0.95_0.15_120)]"
          >
            {b}
          </span>
        ))}
      </div>
      <div className="mt-6 border-4 border-dashed border-[oklch(1_0_0/0.8)] p-4">
        <p className="font-retro-display text-2xl">◄ WEBRING DA HOSPEDAGEM BRASILEIRA ►</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <a href="#top" className="aero-bevel px-4 py-1 text-lg">
            ◄ ANTERIOR
          </a>
          <a href="#top" className="aero-bevel px-4 py-1 text-lg">
            ALEATÓRIO
          </a>
          <a href="#top" className="aero-bevel px-4 py-1 text-lg">
            PRÓXIMO ►
          </a>
        </div>
        <p className="mt-3 text-base">membro nº 47 de 61 · atualizado em 14/03/2001</p>
      </div>
    </section>
  );
}
