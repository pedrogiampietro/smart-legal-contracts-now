import mongoose from "mongoose";
import { env } from "./env";

// Função para conectar ao MongoDB
export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${error}`);
    process.exit(1);
  }
};

// Eventos de conexão
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB desconectado");
});

mongoose.connection.on("error", (err) => {
  console.error(`Erro de conexão MongoDB: ${err}`);
});
