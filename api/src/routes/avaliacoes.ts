import { Router, Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";

const router = Router();

const createSchema = z.object({
  instrutorId: z.string(),
  nome: z.string().min(2),
  nota: z.number().int().min(1).max(5),
  texto: z.string().min(10),
});

// GET /api/avaliacoes?instrutorId=xxx
router.get("/", async (req: Request, res: Response): Promise<void> => {
  const { instrutorId, slug } = req.query;

  if (!instrutorId && !slug) {
    res.status(400).json({ error: "Informe instrutorId ou slug" });
    return;
  }

  let id = instrutorId as string | undefined;

  if (slug) {
    const instrutor = await prisma.instrutor.findUnique({
      where: { slug: slug as string },
      select: { id: true },
    });
    if (!instrutor) {
      res.status(404).json({ error: "Instrutor não encontrado" });
      return;
    }
    id = instrutor.id;
  }

  const avaliacoes = await prisma.avaliacao.findMany({
    where: { instrutorId: id },
    orderBy: { criadoEm: "desc" },
  });

  res.json(avaliacoes);
});

// POST /api/avaliacoes — aluno avalia instrutor (público)
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const instrutor = await prisma.instrutor.findUnique({ where: { id: parsed.data.instrutorId } });
  if (!instrutor) {
    res.status(404).json({ error: "Instrutor não encontrado" });
    return;
  }

  const iniciais = parsed.data.nome
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const now = new Date();
  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const data = `${meses[now.getMonth()]} ${now.getFullYear()}`;

  const avaliacao = await prisma.avaliacao.create({
    data: { ...parsed.data, iniciais, data },
  });

  res.status(201).json(avaliacao);
});

export default router;
