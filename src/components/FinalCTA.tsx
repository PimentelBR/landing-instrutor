"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Users, Zap } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 xl:py-32 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 dot-grid opacity-[0.04]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-indigo-500/10 blur-[80px]" />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">
        <div className="max-w-[800px] xl:max-w-[900px] mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[12px] font-semibold px-4 py-2 rounded-full mb-8">
              <Users className="w-3.5 h-3.5" />
              Vagas limitadas por região para garantir qualidade dos leads
            </div>

            <h2 className="text-[2.4rem] sm:text-5xl xl:text-[3.6rem] 2xl:text-[4rem] font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              Comece hoje a profissionalizar
              <br />
              <span className="gradient-text">sua carreira como instrutor.</span>
            </h2>

            <p className="text-slate-400 text-[16px] xl:text-[18px] mb-10 leading-relaxed max-w-[560px] mx-auto">
              Mais de 200 instrutores autônomos em Vila Velha já usam a plataforma para lotar a agenda e crescer profissionalmente.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-9 py-4 xl:py-5 rounded-xl transition-all duration-200 glow text-[16px] xl:text-[17px]"
              >
                Criar Conta Grátis
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#planos"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold px-9 py-4 xl:py-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 text-[16px] xl:text-[17px]"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                Assinar Premium
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 xl:gap-8">
              {["Gratuito para começar", "Sem cartão de crédito", "Cancele quando quiser"].map(t => (
                <div key={t} className="flex items-center gap-2 text-[13px] text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
