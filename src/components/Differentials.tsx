"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Lock, CalendarRange, BadgeCheck, Store, Scale } from "lucide-react";

const items = [
  { icon: BadgeCheck,   title: "Instrutores verificados",   description: "Todos os instrutores passam por verificação de documentação. Alunos sabem que estão em boas mãos." },
  { icon: MapPin,       title: "Foco em Vila Velha",        description: "Plataforma 100% voltada para instrutores e alunos de Vila Velha. Comunidade local, resultados locais." },
  { icon: Lock,         title: "LGPD e Privacidade",        description: "Conformidade total com a Lei Geral de Proteção de Dados. Seus dados e os de seus alunos protegidos." },
  { icon: CalendarRange,title: "Agendamento online 24h",    description: "Alunos agendam a qualquer hora, mesmo enquanto você dorme. Sua agenda trabalha por você." },
  { icon: ShieldCheck,  title: "Avaliações anti-fraude",    description: "Sistema que garante que somente alunos reais podem avaliar. Sua reputação é protegida." },
  { icon: Store,        title: "Marketplace especializado", description: "Diferente de sites genéricos, aqui o foco é 100% em instrutores de trânsito. Audiência certa." },
  { icon: Scale,        title: "Sem exclusividade",         description: "Você mantém total liberdade. A plataforma é uma ferramenta, não uma prisão. Cancele quando quiser." },
];

export default function Differentials() {
  return (
    <section className="py-24 xl:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">

        <div className="grid lg:grid-cols-[1fr_2fr] xl:grid-cols-[380px_1fr] gap-12 xl:gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-[0.12em] mb-4">Diferenciais</span>
            <h2 className="text-3xl sm:text-4xl xl:text-[2.8rem] font-extrabold text-slate-900 mb-5 leading-[1.15]">
              Por que escolher o PoloInstrutor
            </h2>
            <p className="text-slate-500 text-[15px] xl:text-[16px] leading-relaxed">
              Não é mais um site de classificados. É uma plataforma pensada de ponta a ponta para instrutores autônomos de trânsito em Vila Velha.
            </p>
          </motion.div>

          {/* Right grid */}
          <div className="grid sm:grid-cols-2 gap-5 xl:gap-6">
            {items.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-[15px] mb-1.5">{title}</h3>
                  <p className="text-[13.5px] text-slate-500 leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
