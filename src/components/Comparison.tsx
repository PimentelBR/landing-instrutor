"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const rows = [
  { topic: "Ser encontrado por novos alunos online" },
  { topic: "Agenda organizada automaticamente" },
  { topic: "Perfil profissional público" },
  { topic: "Avaliações visíveis para novos alunos" },
  { topic: "Confirmações e lembretes automáticos" },
  { topic: "Histórico completo de alunos e aulas" },
  { topic: "Relatórios de desempenho" },
  { topic: "Funciona 24h sem você responder" },
];

export default function Comparison() {
  return (
    <section className="py-24 xl:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">

        <div className="grid lg:grid-cols-[1fr_1.5fr] xl:grid-cols-[420px_1fr] gap-12 xl:gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-[0.12em] mb-4">Comparativo</span>
            <h2 className="text-3xl sm:text-4xl xl:text-[2.8rem] font-extrabold text-slate-900 mb-5 leading-[1.15]">
              O que muda com a plataforma
            </h2>
            <p className="text-slate-500 text-[15px] xl:text-[16px] leading-relaxed mb-8">
              Comparado ao método atual — WhatsApp + agenda de papel + indicação boca a boca.
            </p>

            <div className="bg-blue-600 text-white rounded-2xl p-6 xl:p-7">
              <p className="text-[13px] font-semibold text-blue-200 uppercase tracking-wider mb-3">Resumo</p>
              <p className="text-[22px] xl:text-[26px] font-extrabold leading-tight mb-2">
                8 vantagens que o método atual não te dá.
              </p>
              <p className="text-blue-100 text-[14px] leading-relaxed">
                Todas de graça no plano Free. Sem precisar trocar o que você já faz.
              </p>
            </div>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
          >
            {/* Header */}
            <div className="grid grid-cols-[1fr_auto_auto] bg-slate-900 text-white">
              <div className="py-4 px-5 xl:px-6 text-[13px] font-semibold">Funcionalidade</div>
              <div className="py-4 px-5 xl:px-6 text-center border-l border-slate-700 min-w-[120px] xl:min-w-[140px]">
                <span className="text-[12px] font-semibold text-slate-300">Método atual</span>
                <div className="text-[10px] text-slate-500 mt-0.5">WhatsApp + papel</div>
              </div>
              <div className="py-4 px-5 xl:px-6 text-center border-l border-slate-700 bg-blue-600 min-w-[120px] xl:min-w-[140px]">
                <span className="text-[12px] font-bold text-white">PoloInstrutor</span>
                <div className="text-[10px] text-blue-200 mt-0.5">Plataforma</div>
              </div>
            </div>

            {rows.map(({ topic }, i) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className={`grid grid-cols-[1fr_auto_auto] border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
              >
                <div className="py-4 px-5 xl:px-6 text-[13.5px] xl:text-[14px] text-slate-700 font-medium flex items-center">
                  {topic}
                </div>
                <div className="py-4 px-5 xl:px-6 flex items-center justify-center border-l border-slate-100 min-w-[120px] xl:min-w-[140px]">
                  <XCircle className="w-5 h-5 text-slate-300" />
                </div>
                <div className="py-4 px-5 xl:px-6 flex items-center justify-center border-l border-slate-100 bg-blue-50/40 min-w-[120px] xl:min-w-[140px]">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
