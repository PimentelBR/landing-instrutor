import { Router, Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";

const router = Router();

const leadSchema = z.object({
  nome: z.string().min(3),
  telefone: z.string().min(10),
  email: z.string().email().optional().or(z.literal("")),
  bairro: z.string().min(2),
  categorias: z.array(z.string()).min(1),
  disponibilidade: z.array(z.string()).min(1),
  orcamento: z.number().int().min(60).max(500),
  mensagem: z.string().optional(),
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { email, ...rest } = parsed.data;
  const lead = await prisma.lead.create({
    data: {
      ...rest,
      email: email || null,
    },
  });

  res.status(201).json({ id: lead.id, mensagem: "Cadastro realizado! Instrutores entrarão em contato em breve." });
});

export default router;
