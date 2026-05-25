import { Router, Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

const include = {
  horarios: true,
  avaliacoes: { orderBy: { criadoEm: "desc" as const } },
};

function calcAvaliacao(notas: number[]) {
  if (!notas.length) return 0;
  return Math.round((notas.reduce((a, b) => a + b, 0) / notas.length) * 10) / 10;
}

// GET /api/instrutores — listagem com filtros
router.get("/", async (req: Request, res: Response) => {
  const { bairro, categoria, especialidade, disponivel, verificado, premium, ordem } = req.query;

  const where: Record<string, unknown> = {};
  if (bairro) where.bairro = bairro;
  if (disponivel !== undefined) where.disponivel = disponivel === "true";
  if (verificado !== undefined) where.verificado = verificado === "true";
  if (premium !== undefined) where.premium = premium === "true";
  if (categoria) where.categorias = { has: categoria as string };
  if (especialidade) where.especialidades = { has: especialidade as string };

  let orderBy: Record<string, string> = { premium: "desc" };
  if (ordem === "preco_asc") orderBy = { preco: "asc" };
  else if (ordem === "preco_desc") orderBy = { preco: "desc" };
  else if (ordem === "experiencia") orderBy = { experiencia: "desc" };

  const instrutores = await prisma.instrutor.findMany({
    where,
    orderBy,
    include: {
      avaliacoes: { select: { nota: true } },
      horarios: true,
    },
  });

  const result = instrutores.map(({ avaliacoes, senha: _s, ...i }) => ({
    ...i,
    avaliacao: calcAvaliacao(avaliacoes.map((a) => a.nota)),
    totalAvaliacoes: avaliacoes.length,
  }));

  if (ordem === "avaliacao") {
    result.sort((a, b) => b.avaliacao - a.avaliacao);
  }

  res.json(result);
});

// GET /api/instrutores/:slug — perfil completo
router.get("/:slug", async (req: Request, res: Response): Promise<void> => {
  const instrutor = await prisma.instrutor.findUnique({
    where: { slug: req.params.slug },
    include,
  });

  if (!instrutor) {
    res.status(404).json({ error: "Instrutor não encontrado" });
    return;
  }

  const { senha: _s, ...dados } = instrutor;
  const avaliacao = calcAvaliacao(instrutor.avaliacoes.map((a) => a.nota));
  res.json({ ...dados, avaliacao, totalAvaliacoes: instrutor.avaliacoes.length });
});

const updateSchema = z.object({
  preco: z.number().int().positive().optional(),
  categorias: z.array(z.string()).optional(),
  especialidades: z.array(z.string()).optional(),
  bio: z.string().optional(),
  sobre: z.string().optional(),
  telefone: z.string().optional(),
  disponivel: z.boolean().optional(),
  bairro: z.string().optional(),
  horarios: z
    .array(z.object({ dia: z.string(), slots: z.array(z.string()) }))
    .optional(),
});

// PUT /api/instrutores/me — atualiza o próprio perfil (requer auth)
router.put("/me", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { horarios, ...rest } = parsed.data;

  const updated = await prisma.instrutor.update({
    where: { id: req.instrutorId },
    data: {
      ...rest,
      ...(horarios && {
        horarios: {
          deleteMany: {},
          create: horarios.map((h) => ({ dia: h.dia, slots: h.slots })),
        },
      }),
    },
    include,
  });

  const { senha: _s, ...dados } = updated;
  res.json(dados);
});

// GET /api/instrutores/me — perfil do instrutor logado
router.get("/me/perfil", authMiddleware, async (req: AuthRequest, res: Response) => {
  const instrutor = await prisma.instrutor.findUnique({
    where: { id: req.instrutorId },
    include,
  });

  if (!instrutor) {
    res.status(404).json({ error: "Instrutor não encontrado" });
    return;
  }

  const { senha: _s, ...dados } = instrutor;
  res.json(dados);
});

export default router;
