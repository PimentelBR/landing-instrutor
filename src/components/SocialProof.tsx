"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const stats = [
  { value: "200+",  label: "Instrutores ativos",    note: "em Vila Velha" },
  { value: "4.800+",label: "Aulas realizadas",       note: "na plataforma" },
  { value: "4.9/5", label: "Avaliação média",         note: "pelos alunos" },
  { value: "98%",   label: "Instrutores satisfeitos", note: "recomendam" },
];

const testimonials = [
  {
    name: "João Mendes",
    role: "Instrutor autônomo",
    time: "2 anos na plataforma",
    avatar: "JM",
    color: "from-blue-500 to-blue-700",
    stars: 5,
    highlight: "de 3 para 14 alunos em 4 meses",
    text: "Passei de 3 para 14 alunos ativos em 4 meses. Antes dependia só de indicação e agora recebo solicitações toda semana pela plataforma.",
  },
  {
    name: "Fernanda Lima",
    role: "Instrutora autônoma",
    time: "18 meses na plataforma",
    avatar: "FL",
    color: "from-violet-500 to-violet-700",
    stars: 5,
    highlight: "agenda 100% online",
    text: "A agenda online mudou tudo. Não preciso mais responder WhatsApp a toda hora. Os alunos agendam sozinhos e recebo confirmação automática.",
  },
  {
    name: "Ricardo Souza",
    role: "Instrutor autônomo",
    time: "1 ano na plataforma",
    avatar: "RS",
    color: "from-emerald-500 to-emerald-700",
    stars: 5,
    highlight: "reputação construída rapidamente",
    text: "Em início de carreira é difícil ganhar reputação. Com as avaliações da plataforma consegui construir meu nome em Vila Velha muito mais rápido.",
  },
  {
    name: "Ana Paula Costa",
    role: "Instrutora autônoma",
    time: "8 meses na plataforma",
    avatar: "AC",
    color: "from-rose-500 to-rose-700",
    stars: 5,
    highlight: "tudo em um lugar",
    text: "O painel é simples demais. Consigo ver tudo: alunos, aulas, dinheiro. Antes tinha planilha, caderno e WhatsApp. Agora é tudo em um lugar.",
  },
  {
    name: "Carlos Oliveira",
    role: "Instrutor autônomo",
    time: "3 anos na plataforma",
    avatar: "CO",
    color: "from-amber-500 to-amber-700",
    stars: 5,
    highlight: "agenda sempre cheia",
    text: "O destaque Premium fez meu perfil aparecer muito mais. Sem dúvida o melhor investimento que fiz na minha carreira. Agenda sempre cheia.",
  },
  {
    name: "Mariana Torres",
    role: "Instrutora autônoma",
    time: "6 meses na plataforma",
    avatar: "MT",
    color: "from-sky-500 to-sky-700",
    stars: 5,
    highlight: "8 alunos fixos em 6 meses",
    text: "Comecei há 6 meses e já tenho 8 alunos fixos. A plataforma me deu credibilidade que eu não conseguiria sozinha tão rápido.",
  },
];

export default function SocialProof() {
  return (
    <section className="py-24 xl:py-32 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 xl:mb-20"
        >
          <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-[0.12em] mb-4">Prova social</span>
          <h2 className="text-3xl sm:text-4xl xl:text-[2.8rem] font-extrabold text-slate-900 mb-5 leading-[1.15]">
            Instrutores que já cresceram
          </h2>
          <p className="text-slate-500 text-[16px] max-w-[480px] mx-auto leading-relaxed">
            Veja o que os instrutores autônomos de Vila Velha estão dizendo sobre a plataforma.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-5 mb-14 xl:mb-16">
          {stats.map(({ value, label, note }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 xl:p-8 shadow-sm border border-slate-100 text-center"
            >
              <div className="text-[2rem] xl:text-[2.5rem] font-extrabold gradient-text mb-1 leading-none">{value}</div>
              <div className="text-[14px] font-semibold text-slate-700 mt-1">{label}</div>
              <div className="text-[12px] text-slate-400 mt-0.5">{note}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6">
          {testimonials.map(({ name, role, time, avatar, color, stars, highlight, text }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-white rounded-2xl p-7 xl:p-8 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
            >
              <div className="flex mb-3">
                {Array.from({ length: stars }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <div className="text-[12px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1.5 w-fit mb-4">
                ✦ {highlight}
              </div>

              <p className="text-slate-600 text-[14px] xl:text-[14.5px] leading-relaxed mb-6 flex-1">
                &ldquo;{text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0`}>
                  {avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-[14px]">{name}</div>
                  <div className="text-[12px] text-slate-400">{role} · {time}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
