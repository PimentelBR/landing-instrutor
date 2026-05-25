"use client";

import { Mail, Phone, MapPin } from "lucide-react";

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const navGroups = [
  {
    title: "Plataforma",
    links: [
      { label: "Benefícios", href: "/#beneficios" },
      { label: "Como Funciona", href: "/#como-funciona" },
      { label: "Planos", href: "/#planos" },
      { label: "Encontrar Instrutor", href: "/buscar" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Perguntas Frequentes", href: "/#faq" },
      { label: "Contato", href: "mailto:contato@poloinstrutor.com.br" },
      { label: "Cadastrar como Instrutor", href: "/cadastro" },
      { label: "Política de Cancelamento", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos de Uso", href: "#" },
      { label: "Política de Privacidade", href: "#" },
      { label: "LGPD", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d1117] text-slate-400">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10 py-16 xl:py-20">

        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 xl:gap-16 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-display)' }} className="font-bold text-[17px] text-white tracking-tight">
                Polo<span className="text-blue-400">Instrutor</span>
              </span>
            </a>

            <p className="text-[13.5px] leading-relaxed mb-6 max-w-[260px]">
              A plataforma completa para instrutores de trânsito autônomos em Vila Velha, ES.
            </p>

            <div className="flex flex-col gap-2.5 text-[13px] mb-7">
              <a href="mailto:contato@poloinstrutor.com.br" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                contato@poloinstrutor.com.br
              </a>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                (27) 9 9999-0000
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                Vila Velha, ES — Brasil
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[{ Icon: IconInstagram, label: "Instagram" }, { Icon: IconLinkedin, label: "LinkedIn" }, { Icon: IconX, label: "X" }].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-600 rounded-lg flex items-center justify-center transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {navGroups.map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-semibold text-white text-[13px] mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[13px] hover:text-white transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-slate-600">
            © {new Date().getFullYear()} PoloInstrutor. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-5 text-[12px] text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Todos os sistemas operacionais
            </span>
            {["Termos", "Privacidade", "LGPD"].map(l => (
              <a key={l} href="#" className="hover:text-slate-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
