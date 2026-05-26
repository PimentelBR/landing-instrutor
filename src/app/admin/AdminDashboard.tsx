"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, MessageCircle, TrendingUp, XCircle,
  LogOut, RefreshCw, Copy, Check, ChevronDown,
  Filter, Eye, EyeOff, Phone,
} from "lucide-react";

type Status = "novo" | "em_contato" | "convertido" | "descartado";

interface Lead {
  id: string;
  nome: string;
  telefone: string;
  email: string | null;
  bairro: string;
  categorias: string[];
  disponibilidade: string[];
  orcamento: number;
  mensagem: string | null;
  status: Status;
  criadoEm: string;
}

interface Stats {
  total: number;
  novo: number;
  em_contato: number;
  convertido: number;
  descartado: number;
}

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; border: string }> = {
  novo:        { label: "Novo",        color: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/25" },
  em_contato:  { label: "Em contato",  color: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/25" },
  convertido:  { label: "Convertido",  color: "text-emerald-400",bg: "bg-emerald-500/10",border: "border-emerald-500/25" },
  descartado:  { label: "Descartado",  color: "text-slate-500",  bg: "bg-slate-500/10",  border: "border-slate-700" },
};

function StatusBadge({ status }: { status: Status }) {
  const c = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg border ${c.color} ${c.bg} ${c.border}`}>
      {c.label}
    </span>
  );
}

function StatusSelect({ id, current, token, onChange }: { id: string; current: Status; token: string; onChange: (s: Status) => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function update(s: Status) {
    if (s === current) { setOpen(false); return; }
    setLoading(true);
    setOpen(false);
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: s }),
      });
      onChange(s);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        disabled={loading}
        className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400 hover:text-white border border-white/10 hover:border-white/20 px-2.5 py-1.5 rounded-lg transition-all"
      >
        {loading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <ChevronDown className="w-3 h-3" />}
        Mudar
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full mt-1 bg-[#0f1420] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden min-w-[160px]"
          >
            {(Object.entries(STATUS_CONFIG) as [Status, typeof STATUS_CONFIG[Status]][]).map(([s, cfg]) => (
              <button
                key={s}
                onClick={() => update(s)}
                className={`w-full text-left px-4 py-2.5 text-[12px] font-semibold flex items-center gap-2 transition-colors hover:bg-white/5 ${
                  s === current ? "opacity-40 cursor-default" : ""
                } ${cfg.color}`}
              >
                {cfg.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button onClick={copy} className="text-slate-500 hover:text-white transition-colors" title="Copiar">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

/* ── Login ────────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: value }),
      });
      if (!res.ok) { setErro("Token inválido."); return; }
      sessionStorage.setItem("admin_token", value);
      onLogin(value);
    } catch {
      setErro("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#05080f] flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[360px]"
      >
        <div className="flex items-center gap-2.5 mb-10 justify-center">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <span className="font-bold text-[18px] text-white" style={{ fontFamily: "var(--font-display)" }}>
            Admin · <span className="text-blue-400">PoloInstrutor</span>
          </span>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/3 border border-white/8 rounded-2xl p-8 space-y-4">
          <h1 className="text-white font-bold text-[18px] mb-6">Acesso restrito</h1>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Token de admin</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                required
                value={value}
                onChange={e => { setValue(e.target.value); setErro(""); }}
                placeholder="••••••••••••"
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-700 rounded-xl px-4 py-3 pr-11 text-[14px] focus:outline-none focus:border-blue-500/50 transition-all"
              />
              <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {erro && <p className="text-red-400 text-[13px]">{erro}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all text-[14px]"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ── Dashboard ───────────────────────────────────────────── */
function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<Status | "todos">("todos");
  const [expanded, setExpanded] = useState<string | null>(null);

  const headers = { Authorization: `Bearer ${token}` };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        fetch("/api/admin/leads", { headers }),
        fetch("/api/admin/stats", { headers }),
      ]);
      if (!leadsRes.ok) { onLogout(); return; }
      setLeads(await leadsRes.json());
      setStats(await statsRes.json());
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  function updateLeadStatus(id: string, status: Status) {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    setStats(prev => {
      if (!prev) return prev;
      const lead = leads.find(l => l.id === id);
      if (!lead) return prev;
      const next = { ...prev };
      next[lead.status] = Math.max(0, next[lead.status] - 1);
      next[status] = next[status] + 1;
      return next;
    });
  }

  const filtrados = filtroStatus === "todos" ? leads : leads.filter(l => l.status === filtroStatus);

  const STAT_CARDS = [
    { label: "Total de leads",  value: stats?.total ?? 0,        icon: Users,          color: "text-blue-400",    bg: "bg-blue-500/10" },
    { label: "Novos",           value: stats?.novo ?? 0,         icon: MessageCircle,  color: "text-blue-400",    bg: "bg-blue-500/10" },
    { label: "Em contato",      value: stats?.em_contato ?? 0,   icon: Phone,          color: "text-amber-400",   bg: "bg-amber-500/10" },
    { label: "Convertidos",     value: stats?.convertido ?? 0,   icon: TrendingUp,     color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Descartados",     value: stats?.descartado ?? 0,   icon: XCircle,        color: "text-slate-500",   bg: "bg-slate-500/10" },
  ];

  return (
    <div className="min-h-screen bg-[#05080f] text-white">

      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-[#05080f]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 h-[60px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <span className="font-bold text-[15px]" style={{ fontFamily: "var(--font-display)" }}>
              Polo<span className="text-blue-400">Instrutor</span>
              <span className="text-slate-600 font-normal ml-2">/ Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={load}
              disabled={loading}
              className="flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Atualizar
            </button>
            <button onClick={onLogout} className="flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-red-400 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-5 sm:px-8 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 mb-8">
          {STAT_CARDS.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white/3 border border-white/8 rounded-2xl p-5">
              <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className="text-[26px] font-extrabold text-white leading-none mb-1" style={{ fontFamily: "var(--font-display)" }}>
                {value}
              </div>
              <div className="text-[12px] text-slate-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <Filter className="w-4 h-4 text-slate-500" />
          {(["todos", "novo", "em_contato", "convertido", "descartado"] as const).map(s => (
            <button
              key={s}
              onClick={() => setFiltroStatus(s)}
              className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-lg border transition-all ${
                filtroStatus === s
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white/3 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {s === "todos" ? "Todos" : STATUS_CONFIG[s].label}
              {s !== "todos" && stats && (
                <span className="ml-1.5 opacity-60">{stats[s]}</span>
              )}
            </button>
          ))}
          <span className="text-[12px] text-slate-600 ml-auto">
            {filtrados.length} lead{filtrados.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Leads */}
        {loading ? (
          <div className="space-y-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white/3 border border-white/8 rounded-2xl h-[80px] animate-pulse" />
            ))}
          </div>
        ) : filtrados.length === 0 ? (
          <div className="text-center py-24 text-slate-600">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>Nenhum lead {filtroStatus !== "todos" ? `com status "${STATUS_CONFIG[filtroStatus as Status].label}"` : "ainda"}.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {filtrados.map((lead) => {
                const isOpen = expanded === lead.id;
                const cfg = STATUS_CONFIG[lead.status];
                return (
                  <motion.div
                    key={lead.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden hover:border-white/12 transition-colors"
                  >
                    {/* Row */}
                    <div className="flex items-center gap-4 px-5 py-4">

                      {/* Status strip */}
                      <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${
                        lead.status === "novo" ? "bg-blue-500" :
                        lead.status === "em_contato" ? "bg-amber-400" :
                        lead.status === "convertido" ? "bg-emerald-400" : "bg-slate-600"
                      }`} />

                      {/* Avatar */}
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-[13px] font-extrabold text-white flex-shrink-0">
                        {lead.nome.split(" ").slice(0,2).map(w => w[0]).join("").toUpperCase()}
                      </div>

                      {/* Main info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-white text-[15px]">{lead.nome}</span>
                          <StatusBadge status={lead.status} />
                        </div>
                        <div className="flex items-center gap-3 flex-wrap mt-0.5 text-[12px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {lead.telefone}
                            <CopyButton text={lead.telefone} />
                          </span>
                          {lead.email && (
                            <span className="flex items-center gap-1">
                              {lead.email}
                              <CopyButton text={lead.email} />
                            </span>
                          )}
                          <span>{lead.bairro}</span>
                          <span>R$ {lead.orcamento === 500 ? "Sem limite" : `até ${lead.orcamento}/aula`}</span>
                          <span className="text-slate-600">
                            {new Date(lead.criadoEm).toLocaleDateString("pt-BR", { day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit" })}
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="hidden md:flex flex-wrap gap-1.5 max-w-[220px]">
                        {lead.categorias.map(c => (
                          <span key={c} className="text-[10px] font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-300 px-2 py-0.5 rounded-md">
                            {c}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                          href={`https://wa.me/55${lead.telefone.replace(/\D/g, "")}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[12px] font-semibold text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/10 px-2.5 py-1.5 rounded-lg transition-all"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span className="hidden sm:block">WhatsApp</span>
                        </a>
                        <StatusSelect
                          id={lead.id}
                          current={lead.status}
                          token={token}
                          onChange={s => updateLeadStatus(lead.id, s)}
                        />
                        <button
                          onClick={() => setExpanded(isOpen ? null : lead.id)}
                          className="text-slate-500 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-all"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* Expanded details */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1 border-t border-white/5 grid sm:grid-cols-3 gap-5">
                            <div>
                              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Categorias</p>
                              <div className="flex flex-wrap gap-1">
                                {lead.categorias.map(c => (
                                  <span key={c} className="text-[12px] text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg">{c}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Disponibilidade</p>
                              <div className="flex flex-wrap gap-1">
                                {lead.disponibilidade.map(d => (
                                  <span key={d} className="text-[12px] text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">{d}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Mensagem</p>
                              <p className="text-[13px] text-slate-400 leading-relaxed">
                                {lead.mensagem || <span className="italic opacity-40">Sem mensagem adicional</span>}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}

/* ── Root ─────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("admin_token") : null
  );

  function login(t: string) { setToken(t); }
  function logout() { sessionStorage.removeItem("admin_token"); setToken(null); }

  if (!token) return <LoginScreen onLogin={login} />;
  return <Dashboard token={token} onLogout={logout} />;
}
