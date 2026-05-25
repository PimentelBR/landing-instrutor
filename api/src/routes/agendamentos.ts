import { Router, Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

const createSchema = z.object({
  instrutorId: z.string(),
  nomeAluno: z.string().min(3),
  telefoneAluno: z.string().min(10),
  emailAluno: z.string().email().optional(),
  dia: z.string(),
  horario: z.string(),
  observacoes: z.string().optional(),
});

// POST /api/agendamentos — aluno solicita agendamento (público)
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

  const agendamento = await prisma.agendamento.create({ data: parsed.data });
  res.status(201).json(agendamento);
});

// GET /api/agendamentos — agendamentos do instrutor logado
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  const { status } = req.query;
  const where: Record<string, unknown> = { instrutorId: req.instrutorId };
  if (status) where.status = status;

  const agendamentos = await prisma.agendamento.findMany({
    where,
    orderBy: { criadoEm: "desc" },
  });

  res.json(agendamentos);
});

const statusSchema = z.object({
  status: z.enum(["confirmado", "cancelado", "concluido"]),
});

// PATCH /api/agendamentos/:id/status — instrutor confirma/cancela/conclui
router.patch("/:id/status", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const agendamento = await prisma.agendamento.findUnique({ where: { id: req.params.id } });
  if (!agendamento || agendamento.instrutorId !== req.instrutorId) {
    res.status(404).json({ error: "Agendamento não encontrado" });
    return;
  }

  const updated = await prisma.agendamento.update({
    where: { id: req.params.id },
    data: { status: parsed.data.status },
  });

  res.json(updated);
});

export default router;
