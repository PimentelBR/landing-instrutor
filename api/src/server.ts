import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
import instrutoresRoutes from "./routes/instrutores";
import agendamentosRoutes from "./routes/agendamentos";
import avaliacoesRoutes from "./routes/avaliacoes";
import leadsRoutes from "./routes/leads";
import adminRoutes from "./routes/admin";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL ?? "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", ts: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/instrutores", instrutoresRoutes);
app.use("/api/agendamentos", agendamentosRoutes);
app.use("/api/avaliacoes", avaliacoesRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/admin", adminRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

const PORT = Number(process.env.PORT ?? 4000);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API rodando em http://0.0.0.0:${PORT}`);
});
