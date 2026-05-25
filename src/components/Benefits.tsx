"use client";

import { motion } from "framer-motion";
import { Users, CalendarDays, UserCircle, Star, LayoutDashboard, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Captação de Alunos",
    description: "Apareça para quem está buscando um instrutor em Vila Velha agora. Seu perfil fica visível no marketplace local.",
    color: "blue",
  },
  {
    icon: CalendarDays,
    title: "Agenda Inteligente",
    description: "Receba agendamentos online 24h. Sem ligações, sem confusão. Sua agenda organizada automaticamente.",
    color: "violet",
  },
  {
    icon: UserCircle,
    title: "Perfil Profissional",
    description: "Monte um perfil completo com sua experiência, especialidades, fotos e certificações.",
    color: "sky",
  },
  {
    icon: Star,
    title: "Avaliações Reais",
    description: "Alunos avaliam suas aulas. Construa reputação online e se destaque com provas sociais verificadas.",
    color: "amber",
  },
  {
    icon: LayoutDashboard,
    title: "Gestão Simplificada",
    description: "Acompanhe alunos, aulas, pagamentos e histórico em um painel simples e moderno.",
    color: "emerald",
  },
  {
    icon: ShieldCheck,
    title: "Plataforma Segura",
    description: "Conformidade com LGPD, dados criptografados e backups automáticos. Sua operação protegida.",
    color: "rose",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue:    { bg: "bg-blue-50",    text: "text-blue-600",   border: "border-blue-100" },
  violet:  { bg: "bg-violet-50",  text: "text-violet-600", border: "border-violet-100" },
  sky:     { bg: "bg-sky-50",     text: "text-sky-600",    border: "border-sky-100" },
  amber:   { bg: "bg-amber-50",   text: "text-amber-600",  border: "border-amber-100" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600",border: "border-emerald-100" },
  rose:    { bg: "bg-rose-50",    text: "text-rose-600",   border: "border-rose-100" },
};

export default function Benefits() {
  return (
    <section id="beneficios" className="py-24 xl:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[640px] mb-16 xl:mb-20"
        >
          <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-[0.12em] mb-4">Benefícios</span>
          <h2 className="text-3xl sm:text-4xl xl:text-[2.8rem] font-extrabold text-slate-900 mb-5 leading-[1.15]">
            Tudo que você precisa para crescer
          </h2>
          <p className="text-slate-500 text-[16px] xl:text-[17px] leading-relaxed">
            Reunimos as ferramentas que instrutores autônomos precisam para atrair alunos,
            organizar a rotina e construir reputação profissional.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6">
          {benefits.map(({ icon: Icon, title, description, color }, i) => {
            const c = colorMap[color];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`group relative bg-white border border-slate-100 rounded-2xl p-7 xl:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
              >
                {/* decorative corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 ${c.bg} rounded-bl-[60px] opacity-40 transition-opacity group-hover:opacity-70`} />

                <div className={`relative w-11 h-11 rounded-xl flex items-center justify-center mb-6 ${c.bg} border ${c.border} group-hover:scale-105 transition-transform duration-200`}>
                  <Icon className={`w-5 h-5 ${c.text}`} />
                </div>
                <h3 className="relative font-bold text-slate-800 text-[16px] xl:text-[17px] mb-2">{title}</h3>
                <p className="relative text-slate-500 text-[13.5px] xl:text-[14px] leading-relaxed">{description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
