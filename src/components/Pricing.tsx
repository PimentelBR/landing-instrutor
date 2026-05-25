"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, ArrowRight } from "lucide-react";

const freeFeatures  = ["Perfil público básico", "Até 5 alunos ativos", "Até 20 agendamentos/mês", "Página de perfil pessoal", "Receber avaliações", "Suporte por e-mail"];
const freeMissing   = ["Destaque nas buscas", "Alunos ilimitados", "Agendamentos ilimitados", "Relatórios e métricas", "Selo Premium", "Suporte prioritário"];
const premiumFeatures = ["Tudo do Free", "Destaque prioritário nas buscas", "Alunos ilimitados", "Agendamentos ilimitados", "Agenda inteligente completa", "Relatórios e métricas avançadas", "Selo de instrutor verificado", "Suporte prioritário 24h", "Notificações automáticas", "Perfil em destaque no app"];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const price = annual ? 55 : 69;

  return (
    <section id="planos" className="py-24 xl:py-32 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 xl:mb-16"
        >
          <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-[0.12em] mb-4">Planos</span>
          <h2 className="text-3xl sm:text-4xl xl:text-[2.8rem] font-extrabold text-slate-900 mb-5 leading-[1.15]">
            Escolha o plano certo para você
          </h2>
          <p className="text-slate-500 text-[16px] max-w-[440px] mx-auto leading-relaxed mb-8">
            Comece gratuitamente. Faça upgrade quando estiver pronto para crescer de verdade.
          </p>

          <div className="inline-flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`px-6 py-2.5 rounded-lg text-[13.5px] font-semibold transition-all ${
                !annual ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-6 py-2.5 rounded-lg text-[13.5px] font-semibold transition-all flex items-center gap-2 ${
                annual ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Anual
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-[900px] xl:max-w-[1000px] mx-auto">

          {/* FREE */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl xl:rounded-3xl p-8 xl:p-10 border border-slate-200 shadow-sm"
          >
            <div className="mb-7">
              <h3 className="text-[22px] xl:text-[24px] font-extrabold text-slate-900 mb-1">Free</h3>
              <p className="text-[14px] text-slate-500">Para começar a construir presença digital.</p>
            </div>

            <div className="flex items-end gap-1 mb-2">
              <span className="text-[52px] xl:text-[60px] font-extrabold text-slate-900 leading-none">Grátis</span>
            </div>
            <p className="text-[13px] text-slate-400 mb-7">Para sempre. Sem cartão de crédito.</p>

            <a
              href="#"
              className="block text-center font-bold py-3.5 xl:py-4 rounded-xl border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200 text-[15px] mb-8"
            >
              Começar Grátis
            </a>

            <div className="space-y-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Incluso</p>
              {freeFeatures.map(f => (
                <div key={f} className="flex items-center gap-2.5 text-[14px]">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-slate-600">{f}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-slate-100 mt-4">
                <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-3">Não incluso</p>
                {freeMissing.map(f => (
                  <div key={f} className="flex items-center gap-2.5 text-[14px] mb-3 opacity-40">
                    <div className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
                    <span className="text-slate-400">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* PREMIUM */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative bg-gradient-to-b from-blue-600 to-[#1a3a8f] rounded-2xl xl:rounded-3xl p-8 xl:p-10 shadow-2xl shadow-blue-600/25 border border-blue-500/30 overflow-hidden"
          >
            {/* bg decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/3 rounded-full -translate-x-1/3 translate-y-1/3" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-900 text-[11px] font-extrabold px-3 py-1 rounded-full">
                  <Zap className="w-3 h-3" />
                  Mais popular
                </span>
              </div>

              <div className="mb-7">
                <h3 className="text-[22px] xl:text-[24px] font-extrabold text-white mb-1">Premium</h3>
                <p className="text-[14px] text-blue-100">Para instrutores sérios que querem lotar a agenda.</p>
              </div>

              <div className="flex items-end gap-1.5 mb-1">
                <span className="text-[18px] font-medium text-blue-300 mb-2.5">R$</span>
                <span className="text-[52px] xl:text-[60px] font-extrabold text-white leading-none">{price}</span>
                <span className="text-[15px] text-blue-300 mb-2.5">/mês</span>
              </div>
              {annual ? (
                <p className="text-[12px] text-blue-200 mb-7">Cobrado anualmente (R$ {price * 12}/ano) · Você economiza R$ {(69 - price) * 12}/ano</p>
              ) : (
                <p className="text-[12px] text-blue-200 mb-7">Ou R$ 55/mês no plano anual</p>
              )}

              <a
                href="#"
                className="relative flex items-center justify-center gap-2 font-bold py-3.5 xl:py-4 rounded-xl bg-white text-blue-700 hover:bg-blue-50 transition-all duration-200 text-[15px] mb-8 shadow-lg"
              >
                Assinar Premium
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="space-y-3">
                <p className="text-[11px] font-bold text-blue-300 uppercase tracking-widest mb-3">Tudo incluso</p>
                {premiumFeatures.map(f => (
                  <div key={f} className="flex items-center gap-2.5 text-[14px]">
                    <CheckCircle2 className="w-4 h-4 text-blue-300 flex-shrink-0" />
                    <span className="text-blue-50">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-[13px] text-slate-400 mt-8"
        >
          Sem contratos. Cancele quando quiser. Seus dados sempre pertencem a você.
        </motion.p>
      </div>
    </section>
  );
}
