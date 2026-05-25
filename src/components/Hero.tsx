"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Star, Users, CheckCircle2, TrendingUp, CalendarDays, Bell } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Dashboard Mockup ─── */
function DashboardMockup() {
  const chartBars = [28, 42, 35, 58, 45, 72, 55, 80, 65, 88, 72, 100];

  return (
    <div className="relative">
      {/* ambient glow */}
      <div className="absolute -inset-6 bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-purple-500/5 blur-3xl rounded-[40px]" />

      <div className="relative bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.12)] border border-slate-200/80 overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 bg-[#1e2433] border-b border-slate-700/60">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex-1 max-w-xs">
            <div className="bg-[#2d3348] rounded-md px-3 py-1 text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
              <svg className="w-2.5 h-2.5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              poloinstrutor.com.br/dashboard
            </div>
          </div>
        </div>

        <div className="flex" style={{ height: 420 }}>
          {/* Sidebar */}
          <div className="w-[52px] xl:w-[200px] bg-[#1e2433] flex flex-col py-4">
            {/* Logo area */}
            <div className="hidden xl:flex items-center gap-2.5 px-4 mb-6">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex-shrink-0" />
              <span className="text-white font-bold text-sm">PoloInstrutor</span>
            </div>
            <div className="xl:hidden flex justify-center mb-6 mt-0.5">
              <div className="w-7 h-7 bg-blue-600 rounded-lg" />
            </div>

            {[
              { icon: "grid", active: true },
              { icon: "calendar", active: false },
              { icon: "users", active: false },
              { icon: "star", active: false },
              { icon: "bar-chart", active: false },
            ].map(({ icon, active }, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 mx-2 px-2 xl:px-3 py-2.5 rounded-lg mb-0.5 cursor-default ${
                  active ? "bg-blue-600" : "hover:bg-slate-700/50"
                }`}
              >
                <div className={`w-4 h-4 rounded-sm flex-shrink-0 ${active ? "bg-white/80" : "bg-slate-500"}`} />
                <span className={`hidden xl:block text-xs font-medium ${active ? "text-white" : "text-slate-400"}`}>
                  {["Dashboard","Agenda","Alunos","Avaliações","Relatórios"][i]}
                </span>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 bg-slate-50 p-4 overflow-hidden">
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[13px] font-bold text-slate-800">Bom dia, João! 👋</p>
                <p className="text-[11px] text-slate-400">Você tem 3 aulas hoje</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Bell className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">2</span>
                </div>
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">JM</div>
              </div>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: "Alunos ativos", value: "12", trend: "+3", color: "blue" },
                { label: "Aulas/mês", value: "47", trend: "+12", color: "emerald" },
                { label: "Avaliação", value: "4.9★", trend: "+0.2", color: "amber" },
              ].map(({ label, value, trend, color }) => (
                <div key={label} className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
                  <p className={`text-[10px] font-semibold mb-1 ${
                    color === "blue" ? "text-blue-500" : color === "emerald" ? "text-emerald-500" : "text-amber-500"
                  }`}>{label}</p>
                  <p className="text-[18px] font-extrabold text-slate-800 leading-none mb-1">{value}</p>
                  <p className="text-[9px] text-emerald-500 font-semibold flex items-center gap-0.5">
                    <TrendingUp className="w-2.5 h-2.5" />{trend} este mês
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom split */}
            <div className="grid grid-cols-5 gap-2">
              {/* Chart */}
              <div className="col-span-3 bg-white rounded-xl p-3 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-bold text-slate-700">Aulas por mês</p>
                  <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-full">+18%</span>
                </div>
                <div className="flex items-end gap-0.5" style={{ height: 56 }}>
                  {chartBars.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.03 * i }}
                      style={{ originY: 1 }}
                      className="flex-1"
                    >
                      <div
                        className={`w-full rounded-t-[2px] ${i === chartBars.length - 1 ? "bg-blue-600" : i > 8 ? "bg-blue-400" : "bg-blue-200"}`}
                        style={{ height: `${h}%` }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Next lessons */}
              <div className="col-span-2 bg-white rounded-xl p-3 shadow-sm border border-slate-100">
                <p className="text-[11px] font-bold text-slate-700 mb-2">Próximas aulas</p>
                <div className="flex flex-col gap-2">
                  {[
                    { name: "Lucas M.", time: "08:00" },
                    { name: "Carla S.", time: "10:30" },
                    { name: "Rafael O.", time: "14:00" },
                  ].map(({ name, time }) => (
                    <div key={name} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[8px] font-bold flex items-center justify-center">{name[0]}</div>
                        <span className="text-[10px] font-medium text-slate-700 truncate">{name}</span>
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-[68px] pb-16 xl:pb-24 overflow-hidden hero-bg">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-100 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />

      <div className="relative w-full max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] xl:grid-cols-[1fr_1.15fr] gap-10 xl:gap-20 items-center min-h-[calc(100vh-120px)]">

          {/* ── Left ── */}
          <div className="py-10 lg:py-0">
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Plataforma exclusiva · Vila Velha, ES
            </motion.div>

            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="text-[2.6rem] sm:text-5xl lg:text-[3.4rem] xl:text-[4rem] 2xl:text-[4.5rem] font-extrabold text-slate-900 leading-[1.1] tracking-[-0.025em] mb-6"
            >
              Consiga mais alunos e{" "}
              <span className="gradient-text">gerencie suas aulas</span>{" "}
              em um só lugar.
            </motion.h1>

            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-[17px] xl:text-[18px] text-slate-500 leading-[1.7] mb-8 max-w-[480px]"
            >
              A plataforma completa para instrutores autônomos de trânsito crescerem
              profissionalmente em Vila Velha — sem depender de indicação boca a boca.
            </motion.p>

            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-wrap gap-3 mb-5"
            >
              <a
                href="#planos"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 glow text-[15px]"
              >
                Começar Gratuitamente
                <ArrowRight className="w-4 h-4" />
              </a>
              <button className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200 text-[15px] shadow-sm hover:shadow-md">
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                </div>
                Ver Demonstração
              </button>
            </motion.div>

            <motion.p
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-slate-400 mb-10"
            >
              {["Gratuito para começar", "Sem cartão de crédito", "Cancele quando quiser"].map((t, i) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  {t}
                </span>
              ))}
            </motion.p>

            <motion.div
              custom={5} variants={fadeUp} initial="hidden" animate="visible"
              className="flex items-center gap-5 pt-5 border-t border-slate-100"
            >
              {[
                { icon: ShieldCheck, text: "Verificado e seguro" },
                { icon: Star, text: "4.9 avaliação" },
                { icon: Users, text: "+200 instrutores" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-[13px] text-slate-500 font-medium">
                  <Icon className="w-4 h-4 text-blue-500" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right ── */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:py-10"
          >
            <DashboardMockup />

            {/* floating badge */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute -bottom-4 -left-4 hidden lg:flex items-center gap-2.5 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3"
            >
              <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Novo agendamento!</p>
                <p className="text-[11px] text-slate-400">Ana P. — Amanhã às 09:00</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
