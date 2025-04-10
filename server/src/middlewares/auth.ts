import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";
import User, { IUser } from "../models/User";

// Estende o tipo Request para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

interface TokenPayload extends JwtPayload {
  id: string;
  role: string;
}

// Middleware de autenticação
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token;

    // Verificar se o token existe no header Authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extrair o token
      token = req.headers.authorization.split(" ")[1];
    }

    // Verificar se o token existe
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Não autorizado para acessar esta rota",
      });
      return;
    }

    try {
      // Verificar o token
      const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;

      // Buscar o usuário pelo ID
      const user = await User.findById(decoded.id);

      if (!user) {
        res.status(401).json({
          success: false,
          message: "O usuário associado a este token não existe mais",
        });
        return;
      }

      // Adicionar o usuário ao request
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Token inválido ou expirado",
      });
      return;
    }
  } catch (error) {
    next(error);
  }
};

// Middleware para restringir acesso baseado no role
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Não autorizado para acessar esta rota",
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `O role ${req.user.role} não tem permissão para acessar esta rota`,
      });
      return;
    }

    next();
  };
};
