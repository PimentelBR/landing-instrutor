import type { Metadata } from "next";
import { CheckCircle2, ChevronRight, Sparkles, Shield, ThumbsUp, BadgeCheck, TrendingDown, MessageCircle, Star } from "lucide-react";
import FormAluno from "./FormAluno";

export const metadata: Metadata = {
  title: "Encontre Instrutor de Trânsito em Vila Velha | PoloInstrutor",
  description:
    "Cadastre-se gratuitamente e receba propostas de instrutores de trânsito verificados em Vila Velha, ES. Nossa equipe seleciona os melhores para o seu perfil e orçamento. Sem compromisso.",
  keywords: [
    "instrutor de trânsito Vila Velha",
    "aulas de direção Vila Velha",
    "CNH Vila Velha ES",
    "instrutor particular CNH",
    "aulas de direção particulares",
    "habilitação Vila Velha",
    "instrutor de carro Vila Velha",
    "como tirar CNH Vila Velha",
    "aulas de moto Vila Velha",
  ],
  alternates: {
    canonical: "https://poloinstrutor.com.br/aluno",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://poloinstrutor.com.br/aluno",
    title: "Receba Propostas de Instrutores Verificados | PoloInstrutor Vila Velha",
    description:
      "Diga o que precisa. Nossa equipe seleciona os melhores instrutores de trânsito da sua região em Vila Velha e eles entram em contato com propostas dentro do seu orçamento.",
    siteName: "PoloInstrutor",
    images: [
      {
        url: "https://poloinstrutor.com.br/og-aluno.jpg",
        width: 1200,
        height: 630,
        alt: "PoloInstrutor – Encontre instrutores de trânsito em Vila Velha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Receba Propostas de Instrutores | PoloInstrutor Vila Velha",
    description:
      "Cadastre-se grátis e receba propostas de instrutores verificados em Vila Velha, ES.",
  },
  robots: { index: true, follow: true },
};

const COMO_FUNCIONA = [
  {
    num: "01",
    titulo: "Conta o que precisa",
    desc: "Preencha seu bairro, a categoria que deseja, disponibilidade de horário e o valor esperado por aula.",
  },
  {
    num: "02",
    titulo: "Nossa equipe seleciona",
    desc: "Analisamos seu perfil e escolhemos os instrutores verificados da sua região que melhor se encaixam.",
  },
  {
    num: "03",
    titulo: "Instrutores te contactam",
    desc: "Os selecionados entram em contato direto pelo WhatsApp com propostas personalizadas para você.",
  },
  {
    num: "04",
    titulo: "Você escolhe e fecha",
    desc: "Compare as propostas, negocie o valor e feche com quem mais te convenceu. Simples assim.",
  },
];

const BENEFICIOS = [
  {
    icon: Sparkles,
    titulo: "Seleção personalizada pela nossa equipe",
    desc: "Não é algoritmo. Nossa equipe analisa seu perfil e escolhe os instrutores que mais combinam com você.",
  },
  {
    icon: TrendingDown,
    titulo: "Negocie o melhor valor",
    desc: "Os instrutores sabem do seu orçamento e entram em contato com propostas dentro do que você espera pagar.",
  },
  {
    icon: BadgeCheck,
    titulo: "Apenas instrutores verificados",
    desc: "Só encaminhamos instrutores verificados pela plataforma, com avaliações reais de alunos da região.",
  },
  {
    icon: MessageCircle,
    titulo: "Sem compromisso nenhum",
    desc: "Você recebe o contato, conversa e decide. Sem pagamento, sem contrato antes de escolher.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "PoloInstrutor – Encontre seu instrutor de trânsito",
  description:
    "Plataforma que conecta alunos a instrutores de trânsito verificados em Vila Velha, ES. Cadastre-se gratuitamente e receba propostas personalizadas.",
  provider: {
    "@type": "Organization",
    name: "PoloInstrutor",
    url: "https://poloinstrutor.com.br",
    areaServed: {
      "@type": "City",
      name: "Vila Velha",
      addressRegion: "ES",
      addressCountry: "BR",
    },
  },
  serviceType: "Instrução de trânsito / Aulas de direção",
  audience: {
    "@type": "Audience",
    audienceType: "Alunos em busca de habilitação ou reciclagem",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
    description: "Cadastro gratuito para alunos",
  },
};

export default function AlunoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <div className="min-h-screen bg-[#05080f]">

        {/* ── Navbar ── */}
        <header className="fixed top-0 inset-x-0 z-50 bg-[#05080f]/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10 h-[64px] flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5" aria-label="PoloInstrutor – Início">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <span className="font-bold text-[17px] text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                Polo<span className="text-blue-400">Instrutor</span>
              </span>
            </a>
            <div className="flex items-center gap-3">
              <a href="/buscar" className="text-[13px] font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">
                Ver instrutores
              </a>
              <a href="/cadastro" className="text-[13px] font-semibold text-blue-400 border border-blue-500/30 hover:bg-blue-500/10 px-4 py-2 rounded-xl transition-all">
                Sou instrutor
              </a>
            </div>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 xl:pt-44 xl:pb-28 overflow-hidden" aria-label="Apresentação">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/8 blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)", backgroundSize: "40px 40px" }}
            />
          </div>

          <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10 text-center">
            <p className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[12px] font-semibold px-4 py-2 rounded-full mb-7">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              100% gratuito para alunos · Sem compromisso
            </p>

            <h1 className="text-[2.6rem] sm:text-5xl xl:text-[3.8rem] font-extrabold text-white leading-[1.08] tracking-tight mb-6 max-w-[820px] mx-auto" style={{ fontFamily: "var(--font-display)" }}>
              Instrutores verificados de Vila Velha{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                entram em contato com você.
              </span>
            </h1>

            <p className="text-slate-400 text-[17px] xl:text-[19px] leading-relaxed mb-10 max-w-[580px] mx-auto">
              Diga o que precisa. Nossa equipe seleciona os melhores instrutores da sua região e eles entram em contato com propostas sob medida para o seu orçamento.
            </p>

            <a
              href="#cadastro"
              className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold px-9 py-4 rounded-xl transition-all duration-200 text-[16px] shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.55)]"
            >
              Quero receber propostas de instrutores
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </a>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8" role="list">
              {[
                { icon: CheckCircle2, text: "100% gratuito para alunos" },
                { icon: Shield, text: "Instrutores verificados" },
                { icon: ThumbsUp, text: "Sem compromisso" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-[13px] text-slate-500" role="listitem">
                  <Icon className="w-4 h-4 text-blue-500/70 flex-shrink-0" aria-hidden="true" />
                  {text}
                </div>
              ))}
            </div>

            {/* Stars/social proof */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <div className="flex" aria-label="Avaliação 4.8 de 5 estrelas">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-4 h-4 ${i <= 4 ? "text-amber-400 fill-amber-400" : "text-amber-400/40"}`} aria-hidden="true" />
                ))}
              </div>
              <span className="text-[13px] text-slate-500">
                <strong className="text-slate-300">4.8</strong> · Mais de 200 instrutores em Vila Velha
              </span>
            </div>
          </div>
        </section>

        {/* ── Como funciona ── */}
        <section className="py-20 xl:py-24 border-t border-white/5" aria-labelledby="como-funciona-titulo">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">
            <div className="text-center mb-14">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.14em] mb-3 block">Como funciona</span>
              <h2 id="como-funciona-titulo" className="text-3xl xl:text-[2.4rem] font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Da sua necessidade ao instrutor ideal
              </h2>
              <p className="text-slate-500 text-[15px] max-w-[400px] mx-auto">
                Simples, rápido e sem precisar pesquisar por conta própria.
              </p>
            </div>

            <ol className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6" role="list">
              {COMO_FUNCIONA.map((step, i) => (
                <li
                  key={step.num}
                  className="relative bg-white/3 border border-white/8 rounded-2xl p-6 xl:p-7 hover:bg-white/5 hover:border-blue-500/20 transition-all duration-300"
                >
                  <div className="text-[44px] font-extrabold text-white/5 leading-none mb-4 select-none" style={{ fontFamily: "var(--font-display)" }} aria-hidden="true">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-white text-[16px] mb-2">{step.titulo}</h3>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed">{step.desc}</p>
                  {i < COMO_FUNCIONA.length - 1 && (
                    <ChevronRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500/25 hidden xl:block" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Benefícios ── */}
        <section className="py-20 xl:py-24 border-t border-white/5" aria-labelledby="beneficios-titulo">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">
            <div className="grid xl:grid-cols-2 gap-12 xl:gap-20 items-center">

              <div>
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.14em] mb-3 block">Por que usar</span>
                <h2 id="beneficios-titulo" className="text-[2rem] xl:text-[2.5rem] font-extrabold text-white mb-6 leading-[1.1]" style={{ fontFamily: "var(--font-display)" }}>
                  Você no controle.{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    Instrutores competindo por você.
                  </span>
                </h2>
                <p className="text-slate-400 text-[15px] leading-relaxed mb-8">
                  Em vez de você pesquisar e ligar para dezenas de instrutores, nossa equipe faz o filtro e entrega os melhores perfis direto no seu WhatsApp — já dentro do seu orçamento.
                </p>

                <ul className="flex flex-col gap-3.5" role="list">
                  {[
                    "Sem precisar comparar perfil por perfil manualmente",
                    "Instrutores já sabem seu orçamento — só propõem o que cabe",
                    "Equipe só encaminha verificados com histórico comprovado",
                    "Você decide com quem quer seguir, sem pressão",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-blue-500/15 border border-blue-500/30 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" aria-hidden="true">
                        <CheckCircle2 className="w-3 h-3 text-blue-400" />
                      </div>
                      <span className="text-slate-300 text-[14px] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {BENEFICIOS.map((b) => (
                  <div key={b.titulo} className="bg-white/3 border border-white/8 rounded-2xl p-5 hover:bg-white/5 transition-all duration-200">
                    <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-4" aria-hidden="true">
                      <b.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="font-bold text-white text-[14px] mb-1.5">{b.titulo}</h3>
                    <p className="text-slate-500 text-[13px] leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-14 border-t border-white/5" aria-label="Números da plataforma">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">
            <dl className="flex flex-wrap items-center justify-center gap-10 xl:gap-16">
              {[
                { valor: "200+", label: "Instrutores disponíveis em Vila Velha" },
                { valor: "4.8★", label: "Avaliação média verificada" },
                { valor: "< 24h", label: "Tempo médio de resposta da equipe" },
                { valor: "Grátis", label: "Para quem busca instrutor" },
              ].map(({ valor, label }) => (
                <div key={label} className="text-center">
                  <dt className="text-[28px] xl:text-[32px] font-extrabold text-white mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
                    {valor}
                  </dt>
                  <dd className="text-[12px] text-slate-500 max-w-[120px] mx-auto">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Form (Client Component) ── */}
        <section
          id="cadastro"
          className="py-20 xl:py-28 border-t border-white/5"
          aria-labelledby="form-titulo"
        >
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">
            <div className="max-w-[680px] xl:max-w-[720px] mx-auto">
              <div className="text-center mb-12">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.14em] mb-3 block">Cadastro gratuito</span>
                <h2 id="form-titulo" className="text-3xl xl:text-[2.4rem] font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  Preencha em 2 minutos
                </h2>
                <p className="text-slate-500 text-[15px]">
                  Nossa equipe revisa e encaminha para os instrutores certos em até 24 horas.
                </p>
              </div>
              <FormAluno />
            </div>
          </div>
        </section>

        {/* ── FAQ rápido (bom para SEO) ── */}
        <section className="py-16 xl:py-20 border-t border-white/5" aria-labelledby="faq-titulo">
          <div className="max-w-[720px] mx-auto px-5 sm:px-8 xl:px-10">
            <h2 id="faq-titulo" className="text-xl xl:text-2xl font-extrabold text-white mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Perguntas frequentes
            </h2>
            <dl className="space-y-5">
              {[
                {
                  q: "O cadastro é gratuito para alunos?",
                  a: "Sim, 100% gratuito. Você nunca paga nada para receber contatos de instrutores pelo PoloInstrutor.",
                },
                {
                  q: "Quanto tempo leva para um instrutor entrar em contato?",
                  a: "Nossa equipe analisa o seu perfil e encaminha em até 24 horas. Os instrutores selecionados costumam responder no mesmo dia.",
                },
                {
                  q: "Posso negociar o valor com o instrutor?",
                  a: "Sim. Como o instrutor já sabe o seu orçamento esperado, as propostas chegam compatíveis, mas você tem total liberdade para conversar e negociar diretamente.",
                },
                {
                  q: "Os instrutores são verificados?",
                  a: "Todos os instrutores cadastrados na plataforma passam por verificação. Apenas instrutores com documentação e avaliações positivas são encaminhados para os alunos.",
                },
                {
                  q: "Atende somente em Vila Velha?",
                  a: "Por enquanto focamos em Vila Velha, ES. Se você mora em outro município da Grande Vitória, preencha o cadastro e verificamos a disponibilidade de instrutores na sua área.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-white/5 pb-5">
                  <dt className="font-semibold text-white text-[15px] mb-1.5">{q}</dt>
                  <dd className="text-slate-500 text-[14px] leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-white/5 py-8" role="contentinfo">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-slate-700">
              © {new Date().getFullYear()} PoloInstrutor · Vila Velha, ES
            </p>
            <nav className="flex items-center gap-5 text-[12px] text-slate-700" aria-label="Rodapé">
              <a href="/buscar" className="hover:text-slate-500 transition-colors">Ver instrutores</a>
              <a href="/cadastro" className="hover:text-slate-500 transition-colors">Sou instrutor</a>
              <a href="/" className="hover:text-slate-500 transition-colors">Início</a>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
