// Empty BASE: browser calls /api/* which Next.js rewrites to the internal API container
const BASE = "";

export interface Avaliacao {
  id: string;
  nome: string;
  iniciais: string;
  nota: number;
  texto: string;
  data: string;
}

export interface HorarioInstrutor {
  dia: string;
  slots: string[];
}

export interface Instrutor {
  id: string;
  slug: string;
  nome: string;
  iniciais: string;
  avatarColor: string;
  bairro: string;
  cidade: string;
  avaliacao: number;
  totalAvaliacoes: number;
  preco: number;
  categorias: string[];
  especialidades: string[];
  experiencia: number;
  premium: boolean;
  verificado: boolean;
  disponivel: boolean;
  bio: string;
  sobre: string;
  telefone: string;
  alunosFormados: number;
  aulasRealizadas: number;
  tempoResposta: string;
  taxaAprovacao: number;
  horarios: HorarioInstrutor[];
  avaliacoes: Avaliacao[];
}

export async function getInstrutores(params: Record<string, string> = {}): Promise<Instrutor[]> {
  const url = new URL(`${BASE}/api/instrutores`);
  Object.entries(params).forEach(([k, v]) => v && url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar instrutores");
  return res.json();
}

export async function getInstrutorBySlug(slug: string): Promise<Instrutor | null> {
  const res = await fetch(`${BASE}/api/instrutores/${slug}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Erro ao buscar instrutor");
  return res.json();
}

export async function criarAgendamento(data: {
  instrutorId: string;
  nomeAluno: string;
  telefoneAluno: string;
  dia: string;
  horario: string;
}) {
  const res = await fetch(`${BASE}/api/agendamentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Erro ao criar agendamento");
  }
  return res.json();
}
