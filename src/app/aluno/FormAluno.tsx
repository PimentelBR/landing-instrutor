"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const CATEGORIAS = [
  { id: "A – Moto", label: "A – Moto", icon: "🏍️" },
  { id: "B – Carro", label: "B – Carro", icon: "🚗" },
  { id: "C – Caminhão", label: "C – Caminhão", icon: "🚚" },
  { id: "D – Ônibus", label: "D – Ônibus", icon: "🚌" },
  { id: "E – Combinado", label: "E – Combinado", icon: "🚛" },
];

const TURNOS = ["Manhã (7h–12h)", "Tarde (12h–18h)", "Noite (18h–22h)"];
const DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

const ORCAMENTOS = [
  { label: "Até R$ 80/aula", value: 80 },
  { label: "Até R$ 100/aula", value: 100 },
  { label: "Até R$ 120/aula", value: 120 },
  { label: "Até R$ 150/aula", value: 150 },
  { label: "Até R$ 200/aula", value: 200 },
  { label: "Sem limite", value: 500 },
];

export default function FormAluno() {
  const [categorias, setCategorias] = useState<string[]>([]);
  const [disponibilidade, setDisponibilidade] = useState<string[]>([]);
  const [orcamento, setOrcamento] = useState<number>(0);
  const [form, setForm] = useState({ nome: "", telefone: "", email: "", bairro: "", mensagem: "" });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    setErro("");
  }

  function toggle<T>(list: T[], item: T, setList: (v: T[]) => void) {
    setList(list.includes(item) ? list.filter(x => x !== item) : [...list, item]);
    setErro("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (categorias.length === 0) { setErro("Selecione ao menos uma categoria."); return; }
    if (disponibilidade.length === 0) { setErro("Selecione ao menos uma disponibilidade."); return; }
    if (!orcamento) { setErro("Selecione o orçamento esperado."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          telefone: form.telefone,
          email: form.email || undefined,
          bairro: form.bairro,
          categorias,
          disponibilidade,
          orcamento,
          mensagem: form.mensagem || undefined,
        }),
      });
      if (!res.ok) { setErro("Verifique os campos e tente novamente."); return; }
      setSucesso(true);
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (sucesso) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-500/8 border border-emerald-500/20 rounded-3xl p-10 xl:p-14 text-center"
      >
        <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Cadastro realizado!
        </h3>
        <p className="text-slate-400 text-[15px] leading-relaxed mb-8 max-w-sm mx-auto">
          Recebemos seu perfil. Nossa equipe vai analisar e encaminhar para os instrutores que mais combinam com você. Em até 24h você receberá contato no WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/buscar"
            className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-all text-[14px]"
          >
            Ver instrutores disponíveis
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 text-slate-500 hover:text-slate-300 font-semibold px-7 py-3.5 rounded-xl transition-all text-[14px]"
          >
            Voltar ao início
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/3 border border-white/8 rounded-3xl p-8 xl:p-10 space-y-7"
      noValidate
    >
      {/* Nome + Telefone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nome" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Nome completo *
          </label>
          <input
            id="nome" type="text" required autoComplete="name"
            value={form.nome} onChange={e => set("nome", e.target.value)}
            placeholder="Seu nome"
            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-blue-500/60 focus:bg-white/7 transition-all"
          />
        </div>
        <div>
          <label htmlFor="telefone" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            WhatsApp *
          </label>
          <input
            id="telefone" type="tel" required autoComplete="tel"
            value={form.telefone} onChange={e => set("telefone", e.target.value)}
            placeholder="(27) 9 9999-0000"
            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-blue-500/60 transition-all"
          />
        </div>
      </div>

      {/* Email + Bairro */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            E-mail <span className="normal-case font-normal">(opcional)</span>
          </label>
          <input
            id="email" type="email" autoComplete="email"
            value={form.email} onChange={e => set("email", e.target.value)}
            placeholder="seu@email.com"
            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-blue-500/60 transition-all"
          />
        </div>
        <div>
          <label htmlFor="bairro" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Bairro em Vila Velha *
          </label>
          <input
            id="bairro" type="text" required autoComplete="address-level3"
            value={form.bairro} onChange={e => set("bairro", e.target.value)}
            placeholder="Ex: Itaparica, Coqueiral..."
            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-blue-500/60 transition-all"
          />
        </div>
      </div>

      {/* Categorias */}
      <fieldset>
        <legend className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
          Categoria que busca *
        </legend>
        <div className="flex flex-wrap gap-2" role="group">
          {CATEGORIAS.map(cat => {
            const ativo = categorias.includes(cat.id);
            return (
              <button
                key={cat.id} type="button"
                onClick={() => toggle(categorias, cat.id, setCategorias)}
                aria-pressed={ativo}
                className={`flex items-center gap-2 text-[13px] font-semibold px-4 py-2.5 rounded-xl border transition-all duration-150 ${
                  ativo
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white/4 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                <span aria-hidden="true">{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Disponibilidade */}
      <fieldset>
        <legend className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
          Quando você pode ter aulas? *
        </legend>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {TURNOS.map(d => {
              const ativo = disponibilidade.includes(d);
              return (
                <button
                  key={d} type="button"
                  onClick={() => toggle(disponibilidade, d, setDisponibilidade)}
                  aria-pressed={ativo}
                  className={`text-[12.5px] font-semibold px-3.5 py-2 rounded-xl border transition-all duration-150 ${
                    ativo ? "bg-blue-600 border-blue-600 text-white" : "bg-white/4 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            {DIAS.map(d => {
              const ativo = disponibilidade.includes(d);
              return (
                <button
                  key={d} type="button"
                  onClick={() => toggle(disponibilidade, d, setDisponibilidade)}
                  aria-pressed={ativo}
                  className={`text-[12.5px] font-semibold px-3.5 py-2 rounded-xl border transition-all duration-150 ${
                    ativo ? "bg-blue-600 border-blue-600 text-white" : "bg-white/4 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      </fieldset>

      {/* Orçamento */}
      <fieldset>
        <legend className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
          Orçamento por aula *
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ORCAMENTOS.map(o => {
            const ativo = orcamento === o.value;
            return (
              <button
                key={o.value} type="button"
                onClick={() => { setOrcamento(o.value); setErro(""); }}
                aria-pressed={ativo}
                className={`text-[13px] font-semibold py-2.5 rounded-xl border transition-all duration-150 ${
                  ativo ? "bg-blue-600 border-blue-600 text-white" : "bg-white/4 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Mensagem */}
      <div>
        <label htmlFor="mensagem" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
          Mensagem adicional <span className="normal-case font-normal">(opcional)</span>
        </label>
        <textarea
          id="mensagem" rows={3}
          value={form.mensagem} onChange={e => set("mensagem", e.target.value)}
          placeholder="Alguma informação extra? Ex: primeira habilitação, medo de trânsito intenso, prefiro aulas aos fins de semana..."
          className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-blue-500/60 transition-all resize-none"
        />
      </div>

      {/* Erro */}
      <AnimatePresence>
        {erro && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="bg-red-500/10 border border-red-500/25 text-red-400 text-[13px] px-4 py-3 rounded-xl"
          >
            {erro}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 text-[15px] shadow-[0_0_30px_rgba(37,99,235,0.35)] hover:shadow-[0_0_50px_rgba(37,99,235,0.5)]"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          <>
            Quero receber propostas de instrutores
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-center text-[12px] text-slate-600">
        Ao enviar você concorda com a nossa{" "}
        <a href="#" className="text-slate-500 hover:text-slate-300 underline">Política de Privacidade</a>.
        Seus dados não serão compartilhados além dos instrutores selecionados pela nossa equipe.
      </p>
    </form>
  );
}
