import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { from: "bot" | "me"; text: string };

const FIRST_MINIMAL: Msg = {
  from: "bot",
  text: "Olá! Sou a assistente virtual da Mega Brain Host. Como posso ajudar você hoje?",
};

const FIRST_RETRO: Msg = {
  from: "bot",
  text: "Olá! Sou o Bráulio, atendente virtual da Mega Brain Host. Como posso ajudar?",
};

const MINIMAL_REPLIES = [
  "Entendi! Já abri um ticket #0184 para a equipe técnica. Você receberá uma resposta por e-mail em até 2 horas.",
  "Claro! Nosso time de suporte está disponível 24/7. Vou direcionar sua mensagem para um especialista.",
  "Obrigada pela mensagem! Enquanto aguarda, você pode conferir nossa documentação em docs.megabrainhost.com.br.",
  "Ticket atualizado com sucesso. Se precisar de mais alguma coisa, é só mandar aqui mesmo!",
];

const FAX_REPLIES = [
  "Recebemos sua mensagem. A resposta foi enviada por fax para o número cadastrado. Aguarde o toque.",
  "Ticket #0184-BR aberto. Nosso time responderá via fax em até 3 dias úteis (papel térmico incluso).",
  "BEEEEP... BRRRRT... KSSSHHH... (fax enviado com 2 páginas, sendo 1 folha de rosto)",
  "Sua dúvida é importante. Já imprimimos ela e colocamos no fax da recepção.",
];

export function SupportChat({ variant }: { variant: "minimal" | "retro" }) {
  const retro = variant === "retro";
  const replies = retro ? FAX_REPLIES : MINIMAL_REPLIES;
  const firstMsg = retro ? FIRST_RETRO : FIRST_MINIMAL;

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([firstMsg]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const mine = text.trim();
    setText("");
    setMsgs((m) => [...m, { from: "me", text: mine }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [
        ...m,
        {
          from: "bot",
          text: replies[m.filter((x) => x.from === "bot").length % replies.length]!,
        },
      ]);
    }, 1600);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir chat de suporte"
        className={
          retro
            ? "aero-bevel fixed bottom-24 right-4 z-40 px-4 py-2 text-xl"
            : "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-surface shadow-[var(--shadow-soft)] transition-all hover:scale-110 hover:shadow-lg"
        }
      >
        {retro ? "☎ SUPORTE AO VIVO" : <MessageCircle className="h-6 w-6" />}
      </button>
    );
  }

  return (
    <div
      className={
        retro
          ? "aero-panel fixed bottom-4 right-4 z-40 flex w-[min(92vw,22rem)] flex-col overflow-hidden"
          : "fixed bottom-4 right-4 z-40 flex w-[min(92vw,22rem)] flex-col overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[var(--shadow-soft)]"
      }
    >
      <div
        className={
          retro
            ? "flex items-center justify-between bg-[oklch(0.35_0.16_255)] px-3 py-1.5 font-retro-display text-xl text-[oklch(1_0_0)]"
            : "flex items-center justify-between border-b border-hairline bg-ink px-4 py-3 text-sm text-surface"
        }
      >
        <span className="flex items-center gap-2">
          {!retro && <MessageCircle className="h-4 w-4" />}
          {retro ? "SUPORTE MEGA BRAIN 24H" : "Suporte Mega Brain"}
        </span>
        <button
          onClick={() => setOpen(false)}
          aria-label="Fechar chat"
          className="rounded-full p-1 transition-colors hover:bg-surface/20"
        >
          {retro ? "✕" : <X className="h-4 w-4" />}
        </button>
      </div>
      <div className="max-h-72 space-y-2 overflow-y-auto p-3">
        {msgs.map((m, i) => (
          <p
            key={i}
            className={
              retro
                ? `border-2 border-[oklch(1_0_0/0.8)] p-2 text-base ${
                    m.from === "me"
                      ? "ml-8 bg-[oklch(0.95_0.06_120/0.7)]"
                      : "mr-8 bg-[oklch(0.95_0.03_220/0.8)]"
                  }`
                : `rounded-xl px-3 py-2 text-sm ${
                    m.from === "me"
                      ? "ml-8 bg-brand-soft text-ink"
                      : "mr-8 bg-surface-2 border border-hairline"
                  }`
            }
          >
            {m.text}
          </p>
        ))}
        {typing && (
          <p className={retro ? "text-base" : "text-xs text-ink/50"}>
            {retro ? (
              "discando fax..."
            ) : (
              <span className="flex items-center gap-1">
                <span className="flex gap-0.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/30 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/30 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/30 [animation-delay:300ms]" />
                </span>
                digitando...
              </span>
            )}
          </p>
        )}
      </div>
      <form onSubmit={send} className="flex gap-2 border-t border-hairline p-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={retro ? "digite aqui!!!" : "Escreva sua dúvida..."}
          className={
            retro
              ? "min-w-0 flex-1 border-2 border-[oklch(0.4_0.1_250/0.5)] px-2 py-1 text-base"
              : "min-w-0 flex-1 rounded-full border border-hairline bg-transparent px-3 py-1.5 text-sm outline-none focus:border-brand"
          }
        />
        <button
          aria-label="Enviar mensagem"
          className={
            retro
              ? "aero-bevel px-3 py-1 text-lg"
              : "flex h-8 w-8 items-center justify-center rounded-full bg-ink text-surface transition-opacity hover:opacity-85"
          }
        >
          {retro ? "ENVIAR" : <Send className="h-4 w-4" />}
        </button>
      </form>
    </div>
  );
}
