import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface ErrorResponse extends Error {
  statusCode?: number;
  code?: number;
  value?: string;
  errors?: any;
  path?: string;
  keyValue?: any;
}

export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", err);

  let error = { ...err };
  error.message = err.message;

  // Erro de ID inválido do Mongoose
  if (err instanceof mongoose.Error.CastError) {
    const message = `Recurso não encontrado`;
    res.status(404).json({
      success: false,
      message,
    });
    return;
  }

  // Erro de validação do Mongoose
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map((val) => val.message);
    res.status(400).json({
      success: false,
      message: messages.join(", "),
    });
    return;
  }

  // Erro de campo duplicado
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    const message = `Valor duplicado para o campo '${field}'`;
    res.status(400).json({
      success: false,
      message,
    });
    return;
  }

  // Resposta padrão para outros erros
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Erro interno do servidor",
  });
};
