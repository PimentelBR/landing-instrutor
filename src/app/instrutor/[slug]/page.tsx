"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Star, BadgeCheck, MapPin, Clock, Users, CalendarDays,
  TrendingUp, Phone, MessageCircle, Share2, Zap, CheckCircle2, ChevronRight,
} from "lucide-react";
import { getInstrutorBySlug, criarAgendamento, type Instrutor } from "@/lib/api";

const DIAS_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const s = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`${s} ${i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`} />
      ))}
    </div>
  );
}

/* ─── Booking widget ─── */
function BookingWidget({ inst }: { inst: Instrutor }) {
  const [diaEscolhido, setDiaEscolhido] = useState("");
  const [slotEscolhido, setSlotEscolhido] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [booked, setBooked] = useState(false);

  const diasComSlots = inst.horarios.filter(h => h.slots.length > 0);
  const slotsDisponiveis = diasComSlots.find(h => h.dia === diaEscolhido)?.slots ?? [];

  async function handleAgendar() {
    if (!nome.trim() || !telefone.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      await criarAgendamento({
        instrutorId: inst.id,
        nomeAluno: nome.trim(),
        telefoneAluno: telefone.trim(),
        dia: diaEscolhido,
        horario: slotEscolhido,
      });
      setBooked(true);
    } catch {
      setError("Falha ao enviar. Tente novamente ou use o WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!inst.disponivel) {
    return (
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
        <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <CalendarDays className="w-6 h-6 text-red-400" />
        </div>
        <h4 className="font-bold text-slate-700 mb-1">Sem vagas disponíveis</h4>
        <p className="text-[13px] text-slate-400">Este instrutor está com agenda lotada.</p>
        <a
          href={`https://wa.me/55${inst.telefone.replace(/\D/g, "")}`}
          target="_blank" rel="noopener noreferrer"
          className="mt-4 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl text-[14px] transition-all"
        >
          <MessageCircle className="w-4 h-4" /> Entrar em contato
        </a>
      </div>
    );
  }

  if (booked) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center"
      >
        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        </div>
        <h4 className="font-bold text-emerald-800 mb-1">Solicitação enviada!</h4>
        <p className="text-[13px] text-emerald-600">
          {inst.nome} irá confirmar em {inst.tempoResposta}.
        </p>
        <p className="text-[12px] text-emerald-500 mt-1">{diaEscolhido} às {slotEscolhido}</p>
      </motion.div>
    );
  }

  return (
    <div id="agendar" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-baseline gap-1">
          <span className="text-[28px] font-extrabold text-slate-900">R$ {inst.preco}</span>
          <span className="text-slate-400 text-[14px]">/ aula</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <Stars rating={inst.avaliacao} />
          <span className="text-[13px] font-bold text-slate-700 ml-1">{inst.avaliacao.toFixed(1)}</span>
          <span className="text-[12px] text-slate-400">({inst.totalAvaliacoes} avaliações)</span>
        </div>
      </div>

      <div className="p-5">
        {/* Day selector */}
        <div className="mb-4">
          <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">
            Escolha o dia
          </label>
          <div className="grid grid-cols-3 gap-2">
            {diasComSlots.length > 0 ? diasComSlots.map(({ dia }) => (
              <button
                key={dia}
                onClick={() => { setDiaEscolhido(dia); setSlotEscolhido(""); setShowForm(false); }}
                className={`py-2 rounded-xl text-[12.5px] font-semibold border transition-all ${
                  diaEscolhido === dia
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300"
                }`}
              >
                {dia.substring(0, 3)}
              </button>
            )) : (
              <p className="col-span-3 text-[13px] text-slate-400 text-center py-2">Sem horários cadastrados</p>
            )}
          </div>
        </div>

        {/* Time slots */}
        {diaEscolhido && slotsDisponiveis.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">
              Horário disponível
            </label>
            <div className="grid grid-cols-3 gap-2">
              {slotsDisponiveis.map(slot => (
                <button
                  key={slot}
                  onClick={() => { setSlotEscolhido(slot); setShowForm(true); }}
                  className={`py-2 rounded-xl text-[12.5px] font-mono font-bold border transition-all ${
                    slotEscolhido === slot
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contact form */}
        {showForm && slotEscolhido && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 space-y-2"
          >
            <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block">Seus dados</label>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-[13.5px] text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
            />
            <input
              type="tel"
              placeholder="WhatsApp (com DDD)"
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-[13.5px] text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
            />
            {error && <p className="text-[12px] text-red-500">{error}</p>}
          </motion.div>
        )}

        <button
          onClick={handleAgendar}
          disabled={!diaEscolhido || !slotEscolhido || !nome.trim() || !telefone.trim() || submitting}
          className={`w-full py-3.5 rounded-xl font-bold text-[15px] transition-all ${
            diaEscolhido && slotEscolhido && nome.trim() && telefone.trim() && !submitting
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-blue-200 hover:shadow-md"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {submitting
            ? "Enviando..."
            : diaEscolhido && slotEscolhido
              ? `Solicitar — ${diaEscolhido} ${slotEscolhido}`
              : "Selecione dia e horário"}
        </button>

        {/* Contact options */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a
            href={`https://wa.me/55${inst.telefone.replace(/\D/g, "")}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href={`tel:${inst.telefone}`}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
          >
            <Phone className="w-4 h-4" />
            Ligar
          </a>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-3">
          Resposta em {inst.tempoResposta} · Sem cobrança até confirmar
        </p>
      </div>
    </div>
  );
}

/* ─── Loading skeleton ─── */
function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 h-[60px]" />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 xl:px-10 py-8 xl:py-10">
        <div className="grid xl:grid-cols-[1fr_360px] gap-8 xl:gap-12">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 xl:p-8 animate-pulse">
              <div className="flex items-start gap-5">
                <div className="w-24 h-24 xl:w-28 xl:h-28 rounded-2xl bg-slate-200 flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-7 bg-slate-200 rounded w-2/3" />
                  <div className="h-4 bg-slate-100 rounded w-1/2" />
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="flex gap-2">
                    {[1,2,3].map(i => <div key={i} className="h-6 w-16 bg-slate-100 rounded-lg" />)}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 xl:p-8 animate-pulse space-y-3">
              <div className="h-5 bg-slate-200 rounded w-1/3" />
              {[1,2,3].map(i => <div key={i} className="h-3 bg-slate-100 rounded w-full" />)}
            </div>
          </div>
          <div className="hidden xl:block">
            <div className="bg-white rounded-2xl border border-slate-200 h-64 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export default function InstructorPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const [inst, setInst] = useState<Instrutor | null | undefined>(undefined);
  const [copiado, setCopiado] = useState(false);

  function handleCompartilhar() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: inst?.nome ?? "Instrutor", url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
      });
    }
  }

  useEffect(() => {
    if (!slug) return;
    getInstrutorBySlug(slug)
      .then(setInst)
      .catch(() => setInst(null));
  }, [slug]);

  if (inst === undefined) return <ProfileSkeleton />;

  if (!inst) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-700 mb-3">Instrutor não encontrado</h1>
          <Link href="/buscar" className="text-blue-600 font-semibold hover:underline">
            ← Voltar para a busca
          </Link>
        </div>
      </div>
    );
  }

  const allDays = DIAS_SEMANA.map(dia => {
    const found = inst.horarios.find(h => h.dia === dia);
    return { dia, slots: found?.slots ?? [] };
  });

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Top bar ── */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 xl:px-10 h-[60px] flex items-center justify-between gap-4">
          <Link href="/buscar" className="flex items-center gap-2 text-[14px] font-semibold text-slate-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <span className="font-extrabold text-slate-900 text-[15px] hidden sm:block" style={{ fontFamily: "var(--font-display)" }}>
              Polo<span className="text-blue-600">Instrutor</span>
            </span>
          </Link>

          <button
            onClick={handleCompartilhar}
            className="flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-500 hover:text-slate-700 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:block">{copiado ? "Link copiado!" : "Compartilhar"}</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 xl:px-10 py-8 xl:py-10">
        <div className="grid xl:grid-cols-[1fr_360px] gap-8 xl:gap-12 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-6">

            {/* Profile header card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {inst.premium && (
                <div className="bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-900" />
                  <span className="text-[12px] font-extrabold text-amber-900 uppercase tracking-wide">Instrutor Premium · Destaque em buscas</span>
                </div>
              )}

              <div className="p-6 xl:p-8">
                <div className="flex items-start gap-5 xl:gap-6">
                  <div className={`w-24 h-24 xl:w-28 xl:h-28 rounded-2xl bg-gradient-to-br ${inst.avatarColor} text-white text-3xl font-extrabold flex items-center justify-center flex-shrink-0 shadow-md`}>
                    {inst.iniciais}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h1 className="text-[26px] xl:text-[30px] font-extrabold text-slate-900 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                        {inst.nome}
                      </h1>
                      {inst.verificado && (
                        <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 text-blue-700 text-[12px] font-bold px-2.5 py-1 rounded-full">
                          <BadgeCheck className="w-3.5 h-3.5" />
                          Verificado
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-[14px] text-slate-500">{inst.bairro}, {inst.cidade} · {inst.experiencia} anos de experiência</span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Stars rating={inst.avaliacao} size="lg" />
                        <span className="text-[17px] font-extrabold text-slate-800">{inst.avaliacao.toFixed(1)}</span>
                        <span className="text-[13px] text-slate-400">({inst.totalAvaliacoes} avaliações)</span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-[12px] font-bold px-3 py-1 rounded-full border ${
                        inst.disponivel ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-600 border-red-200"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${inst.disponivel ? "bg-emerald-500 animate-pulse" : "bg-red-400"}`} />
                        {inst.disponivel ? "Disponível" : "Agenda lotada"}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {inst.categorias.map(c => (
                        <span key={c} className="text-[12px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-lg">{c}</span>
                      ))}
                      {inst.especialidades.map(e => (
                        <span key={e} className="text-[12px] font-medium bg-slate-50 text-slate-600 border border-slate-100 px-3 py-1 rounded-lg">{e}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
                  {[
                    { icon: Users,         label: "Alunos formados",  value: inst.alunosFormados },
                    { icon: CalendarDays,  label: "Aulas realizadas", value: inst.aulasRealizadas },
                    { icon: TrendingUp,    label: "Taxa aprovação",   value: `${inst.taxaAprovacao}%` },
                    { icon: Clock,         label: "Tempo resposta",   value: inst.tempoResposta },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="text-center">
                      <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-[18px] font-extrabold text-slate-800 leading-none">{value}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Mobile booking widget */}
            <div className="xl:hidden">
              <BookingWidget inst={inst} />
            </div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 xl:p-8"
            >
              <h2 className="text-[18px] font-extrabold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Sobre {inst.nome.split(" ")[0]}
              </h2>
              <div className="text-[14.5px] text-slate-600 leading-[1.8] space-y-3">
                {inst.sobre.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>

            {/* Schedule */}
            {inst.disponivel && inst.horarios.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 xl:p-8"
              >
                <h2 className="text-[18px] font-extrabold text-slate-900 mb-5" style={{ fontFamily: "var(--font-display)" }}>
                  Disponibilidade semanal
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                  {allDays.map(({ dia, slots }) => (
                    <div
                      key={dia}
                      className={`rounded-xl border p-3 ${slots.length > 0 ? "border-blue-100 bg-blue-50/50" : "border-slate-100 bg-slate-50 opacity-50"}`}
                    >
                      <div className={`text-[12px] font-bold mb-2 ${slots.length > 0 ? "text-blue-700" : "text-slate-400"}`}>
                        {dia}
                      </div>
                      {slots.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {slots.map(s => (
                            <span key={s} className="text-[10px] font-mono font-semibold bg-white text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded-md">
                              {s}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400">Sem aulas</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 xl:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[18px] font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  Avaliações dos alunos
                </h2>
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-extrabold text-amber-700">{inst.avaliacao.toFixed(1)}</span>
                  <span className="text-[12px] text-amber-500">({inst.totalAvaliacoes})</span>
                </div>
              </div>

              {inst.avaliacoes.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {inst.avaliacoes.map(({ id, nome, iniciais, nota, texto, data }) => (
                    <div key={id} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                            {iniciais}
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-slate-800">{nome}</p>
                            <p className="text-[11px] text-slate-400">{data}</p>
                          </div>
                        </div>
                        <Stars rating={nota} />
                      </div>
                      <p className="text-[13px] text-slate-600 leading-relaxed">&ldquo;{texto}&rdquo;</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[14px] text-slate-400 text-center py-4">Ainda não há avaliações.</p>
              )}

              {inst.totalAvaliacoes > inst.avaliacoes.length && (
                <button className="mt-5 w-full text-[13.5px] font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1.5 py-3 border border-blue-100 rounded-xl hover:bg-blue-50 transition-all">
                  Ver todas as {inst.totalAvaliacoes} avaliações
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </motion.div>

            <div className="bg-slate-100 rounded-2xl border border-slate-200 p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-700 text-[14px]">Quer comparar com outros instrutores?</p>
                <p className="text-[13px] text-slate-500 mt-0.5">Ver todos os instrutores disponíveis em Vila Velha.</p>
              </div>
              <Link
                href="/buscar"
                className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 font-bold text-[13px] px-4 py-2.5 rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all whitespace-nowrap"
              >
                Ver busca <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ── RIGHT COLUMN (desktop only) ── */}
          <div className="hidden xl:block sticky top-[76px]">
            <BookingWidget inst={inst} />

            <div className="mt-4 bg-white rounded-2xl border border-slate-200 p-5">
              <h4 className="font-bold text-slate-700 text-[14px] mb-3">Garantias da plataforma</h4>
              <ul className="space-y-2.5">
                {[
                  "Instrutor verificado e certificado",
                  "Sem cobrança até confirmar",
                  "Cancelamento gratuito com 24h de antecedência",
                  "Suporte durante todo o processo",
                ].map(g => (
                  <li key={g} className="flex items-start gap-2 text-[13px] text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
