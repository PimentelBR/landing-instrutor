"use client";

import { motion } from "framer-motion";

const profiles = [
  {
    emoji: "🚗",
    title: "Instrutor autônomo",
    description: "Trabalha por conta própria e quer atrair mais alunos sem depender só de indicação.",
  },
  {
    emoji: "📱",
    title: "Sem presença digital",
    description: "Ainda usa WhatsApp e agenda de papel e quer uma solução profissional.",
  },
  {
    emoji: "🌱",
    title: "Início de carreira",
    description: "Está começando e precisa construir reputação e carteira de clientes rápido.",
  },
  {
    emoji: "📈",
    title: "Quer crescer",
    description: "Já tem alunos mas quer organizar melhor a rotina e aumentar a renda.",
  },
];

export default function ForWho() {
  return (
    <section className="py-20 xl:py-28 bg-slate-50 border-y border-slate-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">

        <div className="grid lg:grid-cols-[1fr_2fr] xl:grid-cols-[380px_1fr] gap-12 xl:gap-20 items-center">

          {/* Left text block */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-[0.12em] mb-4">Para quem é</span>
            <h2 className="text-3xl sm:text-4xl xl:text-[2.6rem] font-extrabold text-slate-900 mb-5 leading-[1.15]">
              Feito para instrutores <span className="gradient-text">autônomos</span>
            </h2>
            <p className="text-slate-500 text-[15px] xl:text-[16px] leading-relaxed mb-6">
              Se você é instrutor particular em Vila Velha, esta plataforma foi construída especificamente para você.
            </p>
            <div className="flex items-center gap-2 text-[13px] text-slate-400 bg-white border border-slate-200 rounded-xl px-4 py-2.5 w-fit">
              <span className="text-slate-300">✕</span>
              <span>Não se aplica a autoescolas ou centros de formação</span>
            </div>
          </motion.div>

          {/* Right cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {profiles.map(({ emoji, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <span className="text-3xl mb-4 block">{emoji}</span>
                <h3 className="font-bold text-slate-800 text-[15px] mb-1.5">{title}</h3>
                <p className="text-[13.5px] text-slate-500 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
