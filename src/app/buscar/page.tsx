"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search, MapPin, Star, BadgeCheck, Clock, ChevronDown,
  SlidersHorizontal, X, Zap, ArrowRight, Users,
} from "lucide-react";
import { getInstrutores, type Instrutor } from "@/lib/api";

/* ─── Skeleton card ─── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-pulse">
      <div className="p-5 xl:p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-200 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded w-2/3" />
            <div className="h-3 bg-slate-100 rounded w-1/2" />
            <div className="h-3 bg-slate-100 rounded w-3/4" />
          </div>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3].map(i => <div key={i} className="h-6 w-16 bg-slate-100 rounded-lg" />)}
        </div>
        <div className="h-3 bg-slate-100 rounded w-full" />
        <div className="h-3 bg-slate-100 rounded w-4/5" />
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-50">
          {[1, 2, 3].map(i => <div key={i} className="h-8 bg-slate-100 rounded" />)}
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-slate-200 rounded-xl" />
          <div className="flex-1 h-10 bg-slate-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/* ─── Instructor Card ─── */
function InstructorCard({ inst, index }: { inst: Instrutor; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group"
    >
      {inst.premium && (
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-1.5 flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-amber-900" />
          <span className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wide">Instrutor Premium</span>
        </div>
      )}

      <div className="p-5 xl:p-6">
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 xl:w-[72px] xl:h-[72px] rounded-2xl bg-gradient-to-br ${inst.avatarColor} text-white text-xl font-extrabold flex items-center justify-center flex-shrink-0 shadow-sm`}>
            {inst.iniciais}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-extrabold text-slate-900 text-[16px] xl:text-[17px] leading-tight">{inst.nome}</h3>
                  {inst.verificado && (
                    <BadgeCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="text-[13px] text-slate-500">{inst.bairro}, {inst.cidade}</span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-[20px] xl:text-[22px] font-extrabold text-slate-900 leading-none">
                  R$ {inst.preco}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">por aula</div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-[13px] font-bold text-slate-700">{inst.avaliacao.toFixed(1)}</span>
                <span className="text-[12px] text-slate-400">({inst.totalAvaliacoes})</span>
              </div>
              <span className="text-slate-200">·</span>
              <span className="text-[12px] text-slate-500">{inst.experiencia} anos de exp.</span>
              <span className="text-slate-200">·</span>
              <div className="flex items-center gap-1 text-[12px] text-slate-500">
                <Clock className="w-3 h-3" />
                {inst.tempoResposta}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {inst.categorias.map(c => (
            <span key={c} className="text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-lg">
              {c}
            </span>
          ))}
          {inst.especialidades.slice(0, 3).map(e => (
            <span key={e} className="text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-100 px-2.5 py-1 rounded-lg">
              {e}
            </span>
          ))}
          {inst.especialidades.length > 3 && (
            <span className="text-[11px] text-slate-400 px-2 py-1">+{inst.especialidades.length - 3}</span>
          )}
        </div>

        <p className="mt-3 text-[13px] text-slate-500 leading-relaxed line-clamp-2">{inst.bio}</p>

        <div className="mt-4 grid grid-cols-3 gap-2 py-3 border-t border-slate-50">
          {[
            { label: "Alunos formados", value: inst.alunosFormados },
            { label: "Aulas realizadas", value: inst.aulasRealizadas },
            { label: "Taxa aprovação", value: `${inst.taxaAprovacao}%` },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-[15px] font-extrabold text-slate-800">{value}</div>
              <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/instrutor/${inst.slug}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[13.5px] font-bold py-3 rounded-xl text-center transition-all duration-150 flex items-center justify-center gap-1.5"
          >
            Ver Perfil
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={`/instrutor/${inst.slug}#agendar`}
            className={`flex-1 text-[13.5px] font-bold py-3 rounded-xl border transition-all duration-150 text-center ${
              inst.disponivel
                ? "border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
                : "border-slate-100 text-slate-300 cursor-not-allowed bg-slate-50 pointer-events-none"
            }`}
          >
            {inst.disponivel ? "Agendar Aula" : "Sem vagas"}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Filter chip ─── */
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-[12.5px] font-semibold px-3.5 py-1.5 rounded-xl border transition-all duration-150 whitespace-nowrap ${
        active
          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
          : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
      }`}
    >
      {label}
    </button>
  );
}

/* ─── Main page ─── */
export default function BuscarPage() {
  const [todos, setTodos] = useState<Instrutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [bairroAtivo, setBairroAtivo] = useState<string>("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("");
  const [precoMax, setPrecoMax] = useState<number>(200);
  const [apenasDisponiveis, setApenasDisponiveis] = useState(false);
  const [apenasVerificados, setApenasVerificados] = useState(false);
  const [ordem, setOrdem] = useState<"avaliacao" | "preco_asc" | "preco_desc" | "experiencia">("avaliacao");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getInstrutores()
      .then(data => setTodos(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const bairros = useMemo(() => [...new Set(todos.map(i => i.bairro))].sort(), [todos]);
  const todasCategorias = useMemo(() => [...new Set(todos.flatMap(i => i.categorias))].sort(), [todos]);

  const filtered = useMemo(() => {
    let list = [...todos];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.nome.toLowerCase().includes(q) ||
        i.bairro.toLowerCase().includes(q) ||
        i.especialidades.some(e => e.toLowerCase().includes(q)) ||
        i.categorias.some(c => c.toLowerCase().includes(q))
      );
    }
    if (bairroAtivo) list = list.filter(i => i.bairro === bairroAtivo);
    if (categoriaAtiva) list = list.filter(i => i.categorias.includes(categoriaAtiva));
    if (apenasDisponiveis) list = list.filter(i => i.disponivel);
    if (apenasVerificados) list = list.filter(i => i.verificado);
    list = list.filter(i => i.preco <= precoMax);

    list.sort((a, b) => {
      if (ordem === "avaliacao") return b.avaliacao - a.avaliacao || b.totalAvaliacoes - a.totalAvaliacoes;
      if (ordem === "preco_asc") return a.preco - b.preco;
      if (ordem === "preco_desc") return b.preco - a.preco;
      if (ordem === "experiencia") return b.experiencia - a.experiencia;
      return 0;
    });

    const premium = list.filter(i => i.premium);
    const rest    = list.filter(i => !i.premium);
    return [...premium, ...rest];
  }, [todos, search, bairroAtivo, categoriaAtiva, precoMax, apenasDisponiveis, apenasVerificados, ordem]);

  const hasActiveFilters = bairroAtivo || categoriaAtiva || apenasDisponiveis || apenasVerificados || precoMax < 200;

  function clearFilters() {
    setBairroAtivo("");
    setCategoriaAtiva("");
    setPrecoMax(200);
    setApenasDisponiveis(false);
    setApenasVerificados(false);
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Top bar ── */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 xl:px-10 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 shrink-0 mr-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <span className="font-extrabold text-slate-900 hidden sm:block" style={{ fontFamily: "var(--font-display)" }}>
                Polo<span className="text-blue-600">Instrutor</span>
              </span>
            </Link>

            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nome, bairro ou especialidade..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[13.5px] font-semibold transition-all ${
                showFilters || hasActiveFilters
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:block">Filtros</span>
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-white/20 rounded-full text-[10px] font-bold flex items-center justify-center">
                  {[bairroAtivo, categoriaAtiva, apenasDisponiveis, apenasVerificados, precoMax < 200].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          {/* Filter panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-1 flex flex-wrap items-center gap-3 border-t border-slate-100 mt-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Bairro</span>
                    <Chip label="Todos" active={!bairroAtivo} onClick={() => setBairroAtivo("")} />
                    {bairros.map(b => (
                      <Chip key={b} label={b} active={bairroAtivo === b} onClick={() => setBairroAtivo(bairroAtivo === b ? "" : b)} />
                    ))}
                  </div>

                  <div className="w-px h-5 bg-slate-200 hidden sm:block" />

                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Categoria</span>
                    <Chip label="Todas" active={!categoriaAtiva} onClick={() => setCategoriaAtiva("")} />
                    {todasCategorias.map(c => (
                      <Chip key={c} label={c} active={categoriaAtiva === c} onClick={() => setCategoriaAtiva(categoriaAtiva === c ? "" : c)} />
                    ))}
                  </div>

                  <div className="w-px h-5 bg-slate-200 hidden sm:block" />

                  <div className="flex flex-wrap gap-2 items-center">
                    <Chip label="✓ Disponível agora" active={apenasDisponiveis} onClick={() => setApenasDisponiveis(!apenasDisponiveis)} />
                    <Chip label="✓ Verificado" active={apenasVerificados} onClick={() => setApenasVerificados(!apenasVerificados)} />
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-[12px] text-slate-500">Até R$ {precoMax}</span>
                    <input
                      type="range" min={60} max={200} step={10}
                      value={precoMax}
                      onChange={e => setPrecoMax(Number(e.target.value))}
                      className="w-24 accent-blue-600"
                    />
                  </div>

                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="flex items-center gap-1 text-[12px] text-red-500 hover:text-red-700 font-semibold">
                      <X className="w-3.5 h-3.5" /> Limpar filtros
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 xl:px-10 py-8">

        {/* Results header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-[20px] xl:text-[22px] font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              {loading ? "Carregando..." : `${filtered.length} instrutore${filtered.length !== 1 ? "s" : ""} encontrado${filtered.length !== 1 ? "s" : ""}`}
            </h1>
            <p className="text-[13px] text-slate-500 mt-0.5">em Vila Velha, ES</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[13px] text-slate-500 hidden sm:block">Ordenar por</span>
            <div className="relative">
              <select
                value={ordem}
                onChange={e => setOrdem(e.target.value as typeof ordem)}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 pr-8 text-[13.5px] font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
              >
                <option value="avaliacao">Melhor avaliação</option>
                <option value="preco_asc">Menor preço</option>
                <option value="preco_desc">Maior preço</option>
                <option value="experiencia">Mais experiente</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((inst, i) => (
                <InstructorCard key={inst.slug} inst={inst} index={i} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="font-bold text-slate-700 text-lg mb-2">Nenhum instrutor encontrado</h3>
            <p className="text-slate-400 text-[14px] mb-6">Tente ajustar os filtros ou a busca.</p>
            <button
              onClick={() => { clearFilters(); setSearch(""); }}
              className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl text-[14px]"
            >
              Ver todos os instrutores
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 xl:p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 dot-grid" />
          <div className="relative">
            <p className="text-blue-200 text-[13px] font-semibold mb-2">Você é instrutor?</p>
            <h3 className="text-white text-[22px] xl:text-[26px] font-extrabold mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Cadastre-se e apareça para novos alunos
            </h3>
            <p className="text-blue-100 text-[14px] mb-6 max-w-md mx-auto">
              Mais de 200 instrutores já usam a plataforma. Comece grátis hoje.
            </p>
            <Link
              href="/#planos"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-all text-[14px]"
            >
              Quero me cadastrar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
