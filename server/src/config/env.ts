import dotenv from "dotenv";
import path from "path";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface EnvVars {
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRE: string;
  NODE_ENV: "development" | "production" | "test";
}

// Exporta as variáveis de ambiente
export const env: EnvVars = {
  PORT: parseInt(process.env.PORT || "3001", 10),
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/smart-contracts",
  JWT_SECRET:
    process.env.JWT_SECRET || "fallback_secret_key_do_not_use_in_production",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "30d",
  NODE_ENV: (process.env.NODE_ENV as EnvVars["NODE_ENV"]) || "development",
};
