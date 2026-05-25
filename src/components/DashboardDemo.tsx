"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, CalendarDays, Users, Star, BarChart2, Bell, Settings, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

const sidebar = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: CalendarDays,    label: "Agenda",    active: false },
  { icon: Users,           label: "Alunos",    active: false },
  { icon: Star,            label: "Avaliações",active: false },
  { icon: BarChart2,       label: "Relatórios",active: false },
  { icon: Bell,            label: "Notificações", active: false },
  { icon: Settings,        label: "Configurações",active: false },
];

const chartBars = [30, 50, 38, 65, 52, 78, 60, 88, 70, 94, 80, 100];
const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

function BarChart() {
  return (
    <div>
      <div className="flex items-end gap-1 h-[80px] xl:h-[96px]">
        {chartBars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.04 * i }}
            style={{ originY: 1 }}
            className="flex-1"
          >
            <div
              className={`w-full rounded-t transition-all ${
                i === chartBars.length - 1 ? "bg-blue-600" :
                i >= 9 ? "bg-blue-400" :
                i >= 6 ? "bg-blue-300" : "bg-blue-200"
              }`}
              style={{ height: `${h}%` }}
            />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between mt-1.5">
        {months.map(m => (
          <span key={m} className="text-[9px] xl:text-[10px] text-slate-300 font-medium">{m}</span>
        ))}
      </div>
    </div>
  );
}

export default function DashboardDemo() {
  return (
    <section id="dashboard" className="py-24 xl:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">

        <div className="grid lg:grid-cols-[1fr_1.6fr] xl:grid-cols-[360px_1fr] gap-12 xl:gap-20 items-center mb-12 xl:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-[0.12em] mb-4">Plataforma</span>
            <h2 className="text-3xl sm:text-4xl xl:text-[2.8rem] font-extrabold text-slate-900 mb-5 leading-[1.15]">
              Um ERP desenhado para instrutores
            </h2>
            <p className="text-slate-500 text-[15px] xl:text-[16px] leading-relaxed mb-6">
              Painel moderno com tudo que você precisa para gerenciar sua carreira como instrutor autônomo — sem complexidade desnecessária.
            </p>
            <ul className="flex flex-col gap-3">
              {["Calendário e agenda integrados", "Métricas de alunos em tempo real", "Histórico completo de aulas", "Gráficos de crescimento profissional"].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-[14px] text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* dummy spacer for alignment on desktop */}
          <div className="hidden lg:block" />
        </div>

        {/* Full-width dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glow */}
          <div className="absolute -inset-4 bg-gradient-to-b from-blue-500/8 to-indigo-500/5 blur-3xl rounded-3xl" />

          <div className="relative bg-white rounded-2xl shadow-[0_32px_96px_rgba(0,0,0,0.10)] border border-slate-200 overflow-hidden">
            {/* Browser bar */}
            <div className="flex items-center gap-1.5 px-5 py-3.5 bg-[#1e2433] border-b border-slate-700/50">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <div className="ml-4">
                <div className="flex items-center gap-1.5 bg-[#2d3348] rounded-md px-3 py-1">
                  <svg className="w-2.5 h-2.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[11px] text-slate-400 font-mono">poloinstrutor.com.br/dashboard</span>
                </div>
              </div>
            </div>

            <div className="flex" style={{ minHeight: 580 }}>
              {/* Sidebar */}
              <div className="w-[56px] xl:w-[220px] bg-[#1e2433] flex flex-col py-5 flex-shrink-0">
                {/* Logo */}
                <div className="hidden xl:flex items-center gap-2.5 px-5 mb-7">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex-shrink-0" />
                  <span className="text-white font-extrabold text-sm">PoloInstrutor</span>
                </div>
                <div className="xl:hidden flex justify-center mb-7">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg" />
                </div>

                <div className="px-2 xl:px-3 flex flex-col gap-0.5">
                  {sidebar.map(({ icon: Icon, label, active }) => (
                    <div
                      key={label}
                      className={`flex items-center gap-3 px-2.5 xl:px-3.5 py-2.5 rounded-xl cursor-default transition-colors ${
                        active ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="hidden xl:block text-[13px] font-medium">{label}</span>
                    </div>
                  ))}
                </div>

                {/* User pill */}
                <div className="mt-auto mx-2 xl:mx-3">
                  <div className="hidden xl:flex items-center gap-2.5 bg-slate-800/50 rounded-xl px-3 py-2.5">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">JM</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-white font-semibold truncate">João Mendes</p>
                      <p className="text-[10px] text-slate-400 truncate">Premium ★</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content area */}
              <div className="flex-1 bg-[#f8fafc] p-5 xl:p-7 overflow-auto">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-[16px] xl:text-[18px] font-extrabold text-slate-800">Bom dia, João! 👋</h3>
                    <p className="text-[12px] xl:text-[13px] text-slate-500 mt-0.5">Você tem 3 aulas hoje · Maio 2026</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="w-9 h-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
                        <Bell className="w-4 h-4 text-slate-500" />
                      </div>
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">2</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">JM</div>
                      <span className="text-[12px] font-semibold text-slate-700 hidden sm:block">João Mendes</span>
                    </div>
                  </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-4 mb-5">
                  {[
                    { label: "Alunos ativos",   value: "12",   icon: Users,        trend: "+3 este mês",       up: true  },
                    { label: "Aulas realizadas", value: "47",   icon: CalendarDays, trend: "+12 vs mês ant.",   up: true  },
                    { label: "Avaliação média",  value: "4.9",  icon: Star,         trend: "★★★★★",            up: null  },
                    { label: "Próxima aula",     value: "08:00",icon: Clock,        trend: "Lucas M.",         up: null  },
                  ].map(({ label, value, icon: Icon, trend, up }) => (
                    <div key={label} className="bg-white rounded-xl xl:rounded-2xl p-4 xl:p-5 shadow-sm border border-slate-100">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] xl:text-[12px] text-slate-400 font-medium">{label}</span>
                        <div className="w-8 h-8 bg-blue-50 rounded-lg xl:rounded-xl flex items-center justify-center">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="text-[24px] xl:text-[28px] font-extrabold text-slate-800 leading-none mb-1.5">{value}</div>
                      <div className={`text-[11px] font-semibold flex items-center gap-1 ${up === true ? "text-emerald-500" : "text-slate-400"}`}>
                        {up === true && <TrendingUp className="w-3 h-3" />}
                        {trend}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Lower grid */}
                <div className="grid xl:grid-cols-3 gap-4">
                  {/* Chart */}
                  <div className="xl:col-span-2 bg-white rounded-xl xl:rounded-2xl p-5 xl:p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-slate-700 text-[13px] xl:text-[14px]">Aulas por mês</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">Crescimento contínuo nos últimos 12 meses</p>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                        +18% este ano
                      </span>
                    </div>
                    <BarChart />
                  </div>

                  {/* Upcoming */}
                  <div className="bg-white rounded-xl xl:rounded-2xl p-5 xl:p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-slate-700 text-[13px] xl:text-[14px]">Próximas aulas</h4>
                      <span className="text-[11px] text-blue-600 font-semibold">Ver todas →</span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {[
                        { name: "Lucas M.",  time: "08:00", tag: "Hoje",    color: "bg-blue-600" },
                        { name: "Carla S.",  time: "10:30", tag: "Hoje",    color: "bg-violet-600" },
                        { name: "Rafael O.", time: "14:00", tag: "Hoje",    color: "bg-emerald-600" },
                        { name: "Ana P.",    time: "09:00", tag: "Amanhã",  color: "bg-amber-600" },
                      ].map(({ name, time, tag, color }) => (
                        <div key={name} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-full ${color} text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0`}>
                              {name[0]}
                            </div>
                            <div>
                              <p className="text-[12px] font-semibold text-slate-700">{name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{time}</p>
                            </div>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                            tag === "Hoje" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"
                          }`}>
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
