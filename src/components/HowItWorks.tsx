"use client";

import { motion } from "framer-motion";
import { UserPlus, Pencil, Bell, CalendarCheck, TrendingUp } from "lucide-react";

const steps = [
  { icon: UserPlus,      num: "01", title: "Cadastre-se",              description: "Crie sua conta gratuitamente em menos de 2 minutos. Sem cartão de crédito." },
  { icon: Pencil,        num: "02", title: "Monte seu perfil",         description: "Adicione especialidades, horários, fotos e valores. Quanto mais completo, mais alunos." },
  { icon: Bell,          num: "03", title: "Receba alunos",            description: "Alunos encontram seu perfil e solicitam agendamento diretamente pela plataforma." },
  { icon: CalendarCheck, num: "04", title: "Gerencie aulas",           description: "Confirme ou reagende com um clique. Notificações automáticas para você e o aluno." },
  { icon: TrendingUp,    num: "05", title: "Cresça profissionalmente", description: "Acumule avaliações, ganhe destaque e atraia cada vez mais alunos em Vila Velha." },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 xl:py-32 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 xl:mb-20"
        >
          <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-[0.12em] mb-4">Como funciona</span>
          <h2 className="text-3xl sm:text-4xl xl:text-[2.8rem] font-extrabold text-slate-900 mb-5 leading-[1.15]">
            Simples do início ao fim
          </h2>
          <p className="text-slate-500 text-[16px] max-w-[480px] mx-auto leading-relaxed">
            Cinco passos para transformar sua carreira como instrutor autônomo.
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Progress line */}
            <div className="absolute top-[36px] left-[calc(10%+40px)] right-[calc(10%+40px)] h-px bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />

            <div className="grid grid-cols-5 gap-4 xl:gap-6">
              {steps.map(({ icon: Icon, num, title, description }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative z-10 w-[72px] h-[72px] xl:w-20 xl:h-20 bg-white border-2 border-blue-100 rounded-2xl flex items-center justify-center shadow-md mb-5 group-hover:border-blue-400 group-hover:shadow-blue-100/50 group-hover:shadow-lg transition-all duration-300">
                    <Icon className="w-7 h-7 xl:w-8 xl:h-8 text-blue-600" />
                    <span className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-[14px] xl:text-[15px] mb-2">{title}</h3>
                  <p className="text-[12.5px] xl:text-[13px] text-slate-500 leading-relaxed">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden relative pl-10">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200" />
          <div className="flex flex-col gap-8">
            {steps.map(({ icon: Icon, num, title, description }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="relative flex gap-5 items-start"
              >
                <div className="absolute -left-[30px] w-[22px] h-[22px] bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm flex-shrink-0">
                  {i + 1}
                </div>
                <div className="w-12 h-12 bg-white border border-blue-100 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-slate-800 text-[15px] mb-1">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
