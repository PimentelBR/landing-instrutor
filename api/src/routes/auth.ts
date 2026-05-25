import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import prisma from "../lib/prisma";

const router = Router();

const registerSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  senha: z.string().min(6),
  telefone: z.string().min(10),
  bairro: z.string().min(2),
  preco: z.number().int().positive(),
  categorias: z.array(z.string()).min(1),
  especialidades: z.array(z.string()).min(1),
  experiencia: z.number().int().min(0),
  bio: z.string().min(10),
  sobre: z.string().min(20),
});

const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string(),
});

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { nome, email, senha, ...rest } = parsed.data;

  const existe = await prisma.instrutor.findUnique({ where: { email } });
  if (existe) {
    res.status(409).json({ error: "E-mail já cadastrado" });
    return;
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const slug = nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const slugUnico = `${slug}-${Date.now().toString(36)}`;
  const iniciais = nome
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const instrutor = await prisma.instrutor.create({
    data: {
      nome,
      email,
      senha: senhaHash,
      slug: slugUnico,
      iniciais,
      cidade: "Vila Velha",
      ...rest,
    },
    select: { id: true, nome: true, email: true, slug: true },
  });

  const token = jwt.sign({ id: instrutor.id }, process.env.JWT_SECRET!, { expiresIn: "30d" });
  res.status(201).json({ token, instrutor });
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { email, senha } = parsed.data;
  const instrutor = await prisma.instrutor.findUnique({ where: { email } });
  if (!instrutor?.senha) {
    res.status(401).json({ error: "Credenciais inválidas" });
    return;
  }

  const ok = await bcrypt.compare(senha, instrutor.senha);
  if (!ok) {
    res.status(401).json({ error: "Credenciais inválidas" });
    return;
  }

  const token = jwt.sign({ id: instrutor.id }, process.env.JWT_SECRET!, { expiresIn: "30d" });
  res.json({
    token,
    instrutor: { id: instrutor.id, nome: instrutor.nome, email: instrutor.email, slug: instrutor.slug },
  });
});

export default router;
