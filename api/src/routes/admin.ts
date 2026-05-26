import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";

const router = Router();

/* ── Admin auth middleware ─────────────────────────── */
function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7).trim() : null;
  if (!token || token !== (process.env.ADMIN_TOKEN ?? "").trim()) {
    res.status(401).json({ error: "Não autorizado" });
    return;
  }
  next();
}

/* ── POST /api/admin/auth ──────────────────────────── */
router.post("/auth", (req: Request, res: Response): void => {
  const { token } = req.body as { token?: string };
  if (!token || token.trim() !== (process.env.ADMIN_TOKEN ?? "").trim()) {
    res.status(401).json({ error: "Token inválido" });
    return;
  }
  res.json({ ok: true });
});

/* ── GET /api/admin/leads ──────────────────────────── */
router.get("/leads", adminAuth, async (_req: Request, res: Response): Promise<void> => {
  const leads = await prisma.lead.findMany({
    orderBy: { criadoEm: "desc" },
  });
  res.json(leads);
});

/* ── PATCH /api/admin/leads/:id ────────────────────── */
const patchSchema = z.object({
  status: z.enum(["novo", "em_contato", "convertido", "descartado"]),
});

router.patch("/leads/:id", adminAuth, async (req: Request, res: Response): Promise<void> => {
  const parsed = patchSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Status inválido" });
    return;
  }
  const lead = await prisma.lead.update({
    where: { id: req.params.id },
    data: { status: parsed.data.status },
  });
  res.json(lead);
});

/* ── GET /api/admin/stats ──────────────────────────── */
router.get("/stats", adminAuth, async (_req: Request, res: Response): Promise<void> => {
  const [total, novo, em_contato, convertido, descartado] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "novo" } }),
    prisma.lead.count({ where: { status: "em_contato" } }),
    prisma.lead.count({ where: { status: "convertido" } }),
    prisma.lead.count({ where: { status: "descartado" } }),
  ]);
  res.json({ total, novo, em_contato, convertido, descartado });
});

export default router;
