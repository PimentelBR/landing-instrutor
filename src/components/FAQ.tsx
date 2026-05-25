"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  { q: "Como funciona a plataforma para instrutores?", a: "Você cria seu perfil, define seus horários e valores, e fica visível para alunos que buscam instrutores em Vila Velha. Os alunos agendam diretamente e você recebe notificação de cada solicitação." },
  { q: "O plano Free tem alguma limitação que prejudica minha operação?", a: "O Free é ideal para começar. Você pode ter até 5 alunos ativos e 20 agendamentos por mês. Para crescer além disso, o Premium foi feito para você — sem limites e com destaque nas buscas." },
  { q: "Como recebo novos alunos pela plataforma?", a: "Seu perfil aparece nas buscas de alunos que procuram instrutores em Vila Velha. No Premium, seu perfil tem destaque prioritário. Quanto mais completo seu perfil e melhores suas avaliações, mais alunos você atrai." },
  { q: "Preciso abandonar meu WhatsApp ou agenda atual?", a: "Não. Você pode usar as duas coisas ao mesmo tempo. A plataforma complementa o que você já faz — organiza o que chegou por indicação e traz novos alunos por busca orgânica." },
  { q: "Posso cancelar quando quiser?", a: "Sim, sem multa e sem burocracia. No plano mensal, o cancelamento é imediato. No plano anual, você continua com acesso até o fim do período pago. Seus dados sempre permanecem seus." },
  { q: "Como funciona o agendamento online?", a: "Você cadastra seus horários disponíveis. O aluno escolhe, solicita o agendamento e você confirma com um clique. Notificações automáticas são enviadas para os dois. Sem ligação, sem idas e vindas de mensagem." },
  { q: "As avaliações são reais?", a: "Sim. Somente alunos que realizaram aulas confirmadas pela plataforma podem avaliar. Não é possível pedir para amigos avaliarem — isso garante que a reputação reflete o trabalho real." },
  { q: "Quanto tempo leva para aparecer nas buscas?", a: "Seu perfil fica ativo e visível imediatamente após o cadastro. O destaque nas buscas é imediato para assinantes Premium." },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-slate-100 rounded-2xl overflow-hidden transition-all duration-200 ${open ? "bg-blue-50/50 border-blue-100" : "bg-white hover:border-slate-200"}`}>
      <button
        className="w-full flex items-center justify-between p-5 xl:p-6 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className={`font-semibold text-[14.5px] xl:text-[15px] transition-colors ${open ? "text-blue-700" : "text-slate-800"}`}>
          {q}
        </span>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${open ? "bg-blue-600 text-white rotate-45" : "bg-slate-100 text-slate-500"}`}>
          <Plus className="w-4 h-4" />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="text-slate-500 text-[14px] leading-relaxed px-5 xl:px-6 pb-5 xl:pb-6 -mt-1">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 xl:py-32 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">

        <div className="grid lg:grid-cols-[1fr_1.8fr] xl:grid-cols-[360px_1fr] gap-12 xl:gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-[0.12em] mb-4">FAQ</span>
            <h2 className="text-3xl sm:text-4xl xl:text-[2.8rem] font-extrabold text-slate-900 mb-5 leading-[1.15]">
              Perguntas frequentes
            </h2>
            <p className="text-slate-500 text-[15px] xl:text-[16px] leading-relaxed mb-6">
              Dúvidas dos instrutores que nos perguntam antes de cadastrar.
            </p>
            <a href="mailto:contato@poloinstrutor.com.br" className="inline-flex items-center gap-2 text-[14px] text-blue-600 font-semibold hover:underline">
              Ainda tem dúvidas? Fale com a gente →
            </a>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            {faqs.map(({ q, a }) => (
              <Item key={q} q={q} a={a} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
