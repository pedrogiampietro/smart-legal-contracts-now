import { Request, Response, NextFunction } from "express";
import User from "../models/User";

// @desc    Registrar usuário
// @route   POST /api/auth/register
// @access  Public
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Verificar se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        success: false,
        message: "Email já está em uso",
      });
      return;
    }

    // Criar o usuário
    const user = await User.create({
      name,
      email,
      password,
    });

    // Gerar token
    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login de usuário
// @route   POST /api/auth/login
// @access  Public
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validar email e senha
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Por favor, informe email e senha",
      });
      return;
    }

    // Buscar o usuário com a senha (por padrão a senha é excluída nas consultas)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
      return;
    }

    // Verificar se a senha está correta
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
      return;
    }

    // Gerar token
    const token = user.generateAuthToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obter usuário atual
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // O middleware de autenticação já adiciona o usuário ao request
    res.status(200).json({
      success: true,
      user: {
        id: req.user?._id,
        name: req.user?.name,
        email: req.user?.email,
        role: req.user?.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
