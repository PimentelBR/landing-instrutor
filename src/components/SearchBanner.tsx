"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight, Star, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { getInstrutores, type Instrutor } from "@/lib/api";

export default function SearchBanner() {
  const [destaques, setDestaques] = useState<Instrutor[]>([]);

  useEffect(() => {
    getInstrutores({ premium: "true" })
      .then(data => setDestaques(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 xl:py-20 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-[0.12em] mb-3">Encontre seu instrutor</span>
          <h2 className="text-2xl sm:text-3xl xl:text-[2.2rem] font-extrabold text-slate-900 mb-3 leading-tight">
            Você é aluno? Encontre o instrutor ideal em Vila Velha
          </h2>
          <p className="text-slate-500 text-[15px] max-w-[440px] mx-auto">
            Compare instrutores, preços, especialidades e agende sua primeira aula online.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-[640px] mx-auto mb-10"
        >
          <Link
            href="/buscar"
            className="flex items-center gap-3 bg-white border-2 border-slate-200 hover:border-blue-400 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-all duration-200 group"
          >
            <Search className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
            <span className="text-slate-400 text-[15px] flex-1 text-left">
              Buscar por bairro, especialidade ou nome...
            </span>
            <div className="flex items-center gap-1.5 bg-blue-600 text-white text-[13px] font-bold px-4 py-2 rounded-xl group-hover:bg-blue-700 transition-colors">
              Buscar
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <div className="flex items-center justify-center gap-4 mt-3 flex-wrap">
            {["Itaparica", "Praia da Costa", "Terra Vermelha", "Glória", "Centro"].map(b => (
              <Link
                key={b}
                href={`/buscar?bairro=${encodeURIComponent(b)}`}
                className="flex items-center gap-1 text-[12.5px] text-slate-500 hover:text-blue-600 font-medium transition-colors"
              >
                <MapPin className="w-3 h-3" />
                {b}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Preview cards */}
        {destaques.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-4 xl:gap-5">
            {destaques.map((inst, i) => (
              <motion.div
                key={inst.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Link
                  href={`/instrutor/${inst.slug}`}
                  className="flex items-center gap-3.5 bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200 transition-all duration-200 group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${inst.avatarColor} text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0`}>
                    {inst.iniciais}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-bold text-slate-800 text-[14px] truncate">{inst.nome}</span>
                      {inst.verificado && <BadgeCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />}
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-slate-500">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-slate-700">{inst.avaliacao.toFixed(1)}</span>
                      </div>
                      <span>·</span>
                      <span>{inst.bairro}</span>
                      <span>·</span>
                      <span className="font-semibold text-slate-700">R$ {inst.preco}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-6"
        >
          <Link href="/buscar" className="text-[14px] font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
            Ver todos os instrutores disponíveis →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
