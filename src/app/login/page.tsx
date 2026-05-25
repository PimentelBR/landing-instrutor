"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(typeof data.error === "string" ? data.error : "Credenciais inválidas.");
        return;
      }
      localStorage.setItem("token", data.token);
      router.push(`/instrutor/${data.instrutor.slug}`);
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[400px]"
      >
        <a href="/" className="inline-flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <span className="font-bold text-[17px] text-white" style={{ fontFamily: "var(--font-display)" }}>
            Polo<span className="text-blue-400">Instrutor</span>
          </span>
        </a>

        <h1 className="text-2xl font-extrabold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
          Entrar na conta
        </h1>
        <p className="text-slate-400 text-[14px] mb-8">
          Não tem conta?{" "}
          <a href="/cadastro" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
            Cadastre-se grátis
          </a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => { setEmail(e.target.value); setErro(""); }}
              placeholder="seu@email.com"
              className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Senha</label>
            <div className="relative">
              <input
                type={showSenha ? "text" : "password"}
                required
                value={senha}
                onChange={e => { setSenha(e.target.value); setErro(""); }}
                placeholder="Sua senha"
                className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 pr-11 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowSenha(s => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {erro && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-[13px] px-4 py-3 rounded-xl">
              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all duration-200 text-[15px] glow mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Entrando...
              </span>
            ) : (
              <>
                Entrar
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-400 text-[13px] transition-colors mt-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar ao início
        </a>
      </motion.div>
    </div>
  );
}
