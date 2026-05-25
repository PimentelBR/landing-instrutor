"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Zap, Eye, EyeOff, ArrowLeft, Star, Users, Shield } from "lucide-react";

const CATEGORIAS = ["A – Motocicletas", "B – Carros", "C – Caminhões", "D – Ônibus", "E – Combinados"];
const ESPECIALIDADES_SUGESTOES = ["Primeira habilitação", "Reciclagem", "Mudança de categoria", "EAR", "Legislação", "Direção defensiva", "Autoescola parceira"];

function CadastroForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plano = searchParams.get("plano") ?? "free";
  const isPremium = plano === "premium";

  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [slugCriado, setSlugCriado] = useState("");

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    bairro: "",
    preco: "",
    experiencia: "",
    bio: "",
    sobre: "",
    categorias: [] as string[],
    especialidadesTexto: "",
  });

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    setErro("");
  }

  function toggleCategoria(cat: string) {
    setForm(prev => ({
      ...prev,
      categorias: prev.categorias.includes(cat)
        ? prev.categorias.filter(c => c !== cat)
        : [...prev.categorias, cat],
    }));
    setErro("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (form.categorias.length === 0) {
      setErro("Selecione ao menos uma categoria de habilitação.");
      return;
    }

    const especialidades = form.especialidadesTexto
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    if (especialidades.length === 0) {
      setErro("Informe ao menos uma especialidade.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          senha: form.senha,
          telefone: form.telefone,
          bairro: form.bairro,
          preco: parseInt(form.preco, 10),
          experiencia: parseInt(form.experiencia, 10),
          bio: form.bio,
          sobre: form.sobre,
          categorias: form.categorias,
          especialidades,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (typeof data.error === "string") {
          setErro(data.error);
        } else {
          setErro("Verifique os campos e tente novamente.");
        }
        return;
      }

      localStorage.setItem("token", data.token);
      setSlugCriado(data.instrutor.slug);
      setSucesso(true);
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (sucesso) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Cadastro realizado!
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Bem-vindo ao PoloInstrutor. Seu perfil já está no ar e visível para alunos em Vila Velha.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push(`/instrutor/${slugCriado}`)}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all"
            >
              Ver meu perfil
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => router.push("/buscar")}
              className="text-slate-400 hover:text-white text-sm transition-colors py-2"
            >
              Ver todos os instrutores
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row">

      {/* Left panel */}
      <div className="lg:w-[420px] xl:w-[480px] shrink-0 bg-gradient-to-b from-blue-700 to-[#0f2460] relative overflow-hidden flex flex-col justify-between p-10 xl:p-14">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}
        />
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />

        <div className="relative">
          <a href="/" className="inline-flex items-center gap-2.5 mb-12">
            <div className="w-9 h-9 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <span className="font-bold text-[17px] text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              Polo<span className="text-blue-200">Instrutor</span>
            </span>
          </a>

          <div className="mb-2">
            {isPremium && (
              <span className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full mb-5">
                <Zap className="w-3 h-3" />
                Plano Premium selecionado
              </span>
            )}
          </div>

          <h1 className="text-3xl xl:text-[2.2rem] font-extrabold text-white leading-[1.15] mb-4" style={{ fontFamily: "var(--font-display)" }}>
            {isPremium ? "Comece com tudo." : "Crie sua conta gratuita."}
          </h1>
          <p className="text-blue-100 text-[15px] leading-relaxed mb-10">
            {isPremium
              ? "Destaque prioritário nas buscas, agenda ilimitada e selo verificado."
              : "Tenha seu perfil no ar em minutos. Sem cartão de crédito."}
          </p>

          <div className="space-y-5">
            {[
              { icon: Star, text: "Perfil público visível para alunos da região" },
              { icon: Users, text: "Receba agendamentos direto pelo seu perfil" },
              { icon: Shield, text: "Avaliações verificadas que constroem reputação" },
              { icon: CheckCircle2, text: "Cancele quando quiser, sem burocracia" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-blue-200" />
                </div>
                <span className="text-[14px] text-blue-100">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-[12px] text-blue-300 mt-10">
          © {new Date().getFullYear()} PoloInstrutor · Vila Velha, ES
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-start justify-center overflow-y-auto py-10 px-5 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-[580px]"
        >
          <div className="mb-8">
            <a href="/" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-[13px] transition-colors mb-6 lg:hidden">
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar
            </a>
            <h2 className="text-2xl font-extrabold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
              Dados da sua conta
            </h2>
            <p className="text-slate-400 text-[14px]">
              Já tem conta?{" "}
              <a href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Entrar
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Nome + Telefone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Nome completo *</label>
                <input
                  type="text"
                  required
                  value={form.nome}
                  onChange={e => set("nome", e.target.value)}
                  placeholder="João da Silva"
                  className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Telefone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={form.telefone}
                  onChange={e => set("telefone", e.target.value)}
                  placeholder="(27) 9 9999-0000"
                  className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">E-mail *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => set("email", e.target.value)}
                placeholder="joao@email.com"
                className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Senha *</label>
              <div className="relative">
                <input
                  type={showSenha ? "text" : "password"}
                  required
                  minLength={6}
                  value={form.senha}
                  onChange={e => set("senha", e.target.value)}
                  placeholder="Mínimo 6 caracteres"
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

            {/* Bairro + Preço + Experiência */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Bairro *</label>
                <input
                  type="text"
                  required
                  value={form.bairro}
                  onChange={e => set("bairro", e.target.value)}
                  placeholder="Itaparica"
                  className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Valor/aula (R$) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={form.preco}
                  onChange={e => set("preco", e.target.value)}
                  placeholder="120"
                  className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Anos de exp. *</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={form.experiencia}
                  onChange={e => set("experiencia", e.target.value)}
                  placeholder="5"
                  className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
                />
              </div>
            </div>

            {/* Categorias */}
            <div>
              <label className="block text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Categorias que leciona *</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIAS.map(cat => {
                  const ativo = form.categorias.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategoria(cat)}
                      className={`text-[13px] font-semibold px-4 py-2 rounded-lg border transition-all duration-150 ${
                        ativo
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Especialidades */}
            <div>
              <label className="block text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Especialidades * <span className="normal-case font-normal">(separadas por vírgula)</span>
              </label>
              <input
                type="text"
                required
                value={form.especialidadesTexto}
                onChange={e => set("especialidadesTexto", e.target.value)}
                placeholder="Ex: Primeira habilitação, Reciclagem, EAR"
                className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {ESPECIALIDADES_SUGESTOES.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      const atual = form.especialidadesTexto.trim();
                      const lista = atual ? atual + ", " + s : s;
                      set("especialidadesTexto", lista);
                    }}
                    className="text-[11px] text-slate-500 hover:text-blue-400 border border-slate-800 hover:border-blue-700 px-2.5 py-1 rounded-lg transition-all"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Bio curta * <span className="normal-case font-normal">(aparece na busca)</span></label>
              <textarea
                required
                minLength={10}
                value={form.bio}
                onChange={e => set("bio", e.target.value)}
                placeholder="Ex: Instrutor com 8 anos de experiência, especialista em primeira habilitação e alunos com dificuldade."
                rows={2}
                className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all resize-none"
              />
            </div>

            {/* Sobre */}
            <div>
              <label className="block text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Sobre você * <span className="normal-case font-normal">(aparece no seu perfil)</span></label>
              <textarea
                required
                minLength={20}
                value={form.sobre}
                onChange={e => set("sobre", e.target.value)}
                placeholder="Conte sua trajetória, diferenciais e por que os alunos deveriam escolher você..."
                rows={4}
                className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all resize-none"
              />
            </div>

            {/* Error */}
            {erro && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-[13px] px-4 py-3 rounded-xl">
                {erro}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 text-[15px] glow"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Criando conta...
                </span>
              ) : (
                <>
                  {isPremium ? "Criar conta e ativar Premium" : "Criar conta gratuita"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-[12px] text-slate-600 pb-4">
              Ao criar sua conta você concorda com os{" "}
              <a href="#" className="text-slate-500 hover:text-slate-300 underline">Termos de Uso</a>
              {" "}e a{" "}
              <a href="#" className="text-slate-500 hover:text-slate-300 underline">Política de Privacidade</a>.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default function CadastroPage() {
  return (
    <Suspense>
      <CadastroForm />
    </Suspense>
  );
}
