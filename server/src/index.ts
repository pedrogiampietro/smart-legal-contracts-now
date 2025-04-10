import express, { Application, Request, Response } from "express";
import cors from "cors";
import { env } from "./config/env";
import { connectDB } from "./config/database";
import { errorHandler } from "./middlewares/error";

// Importar rotas
import authRoutes from "./routes/auth.routes";
import contractRoutes from "./routes/contract.routes";
import templateRoutes from "./routes/template.routes";

// Inicializar o express
const app: Application = express();

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/templates", templateRoutes);

// Rota básica para verificar se a API está funcionando
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API de Contratos Legais Inteligentes funcionando!",
    version: "1.0.0",
  });
});

// Middleware de tratamento de erros
app.use(errorHandler);

// Iniciar o servidor
const server = app.listen(env.PORT, () => {
  console.log(`Servidor rodando no modo ${env.NODE_ENV} na porta ${env.PORT}`);
});

// Lidar com rejeições não tratadas
process.on("unhandledRejection", (err: Error) => {
  console.error(`Erro: ${err.message}`);
  // Fechar o servidor e sair do processo
  server.close(() => process.exit(1));
});

export default app;
