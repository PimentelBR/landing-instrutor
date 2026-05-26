"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Para Instrutores", href: "#beneficios" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Planos", href: "#planos" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-display)' }} className="font-bold text-[17px] text-slate-900 tracking-tight">
              Polo<span className="text-blue-600">Instrutor</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13.5px] font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-3.5 py-2 rounded-lg transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            <a href="/buscar" className="text-[13.5px] font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 transition-colors">
              Encontrar Instrutor
            </a>
            <a href="/aluno" className="text-[13.5px] font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 transition-colors">
              Sou Aluno
            </a>
            <a
              href="/cadastro"
              className="bg-blue-600 hover:bg-blue-700 text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 glow shadow-sm"
            >
              Sou Instrutor
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white border-t border-slate-100 shadow-xl"
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2.5 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-slate-100 my-2" />
              <a
                href="/aluno"
                onClick={() => setOpen(false)}
                className="text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2.5 rounded-lg transition-all"
              >
                Quero encontrar instrutor
              </a>
              <a
                href="/cadastro"
                onClick={() => setOpen(false)}
                className="bg-blue-600 text-white text-sm font-semibold px-5 py-3.5 rounded-xl text-center glow"
              >
                Sou Instrutor
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
