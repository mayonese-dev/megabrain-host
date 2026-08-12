export const BRAND = "Mega Brain Host";

export const NAV = [
  { label: "Hospedagem", href: "#planos" },
  { label: "Domínios", href: "#dominios" },
  { label: "Infra", href: "#infra" },
  { label: "Suporte", href: "#suporte" },
];

export const STATS = [
  { value: "99,99%", label: "Uptime garantido" },
  { value: "12 ms", label: "Latência média no Brasil" },
  { value: "24/7", label: "Suporte humano em português" },
];

export const FEATURES = [
  {
    title: "Servidores NVMe",
    text: "Discos NVMe com cache inteligente. Seu site carrega em menos de 1 segundo.",
  },
  {
    title: "Migração grátis",
    text: "Nosso time move seu site de qualquer provedor sem tirar nada do ar.",
  },
  {
    title: "Backup diário",
    text: "Cópias automáticas de 30 dias, restauráveis em um clique.",
  },
  {
    title: "SSL ilimitado",
    text: "Certificados grátis e renovação automática em todos os domínios.",
  },
];

export const PLANS = [
  {
    name: "Finch",
    price: "R$ 12",
    period: "/mês",
    highlight: false,
    items: ["1 site", "10 GB NVMe", "SSL grátis", "1 e-mail"],
  },
  {
    name: "Cop Thief",
    price: "R$ 29",
    period: "/mês",
    highlight: true,
    items: ["25 sites", "100 GB NVMe", "CDN global", "E-mails ilimitados", "Backup diário"],
  },

  {
    name: "Mega Brain",
    price: "R$ 74",
    period: "/mês",
    highlight: false,
    items: ["Sites ilimitados", "300 GB NVMe", "IP dedicado", "Suporte prioritário"],
  },
];

export const DOMAINS = [
  { tld: ".com.br", price: "R$ 39/ano" },
  { tld: ".com", price: "R$ 59/ano" },
  { tld: ".app", price: "R$ 89/ano" },
  { tld: ".dev", price: "R$ 79/ano" },
];

export const FAQ = [
  {
    q: "Posso trocar de plano depois?",
    a: "Sim, a qualquer momento. O valor é proporcional aos dias restantes.",
  },
  {
    q: "Tem garantia?",
    a: "30 dias para pedir reembolso total, sem perguntas.",
  },
  {
    q: "Vocês cuidam da migração?",
    a: "Cuidamos de tudo: arquivos, banco de dados, e-mails e DNS.",
  },
];
