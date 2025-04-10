import { Request, Response, NextFunction } from "express";
import ContractTemplate from "../models/ContractTemplate";

// @desc    Obter todos os templates públicos
// @route   GET /api/templates
// @access  Public
export const getTemplates = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, type, search } = req.query;

    // Construir a query
    const query: any = { isPublic: true };

    // Filtrar por categoria se fornecida
    if (category) {
      query.category = category;
    }

    // Filtrar por tipo se fornecido
    if (type) {
      query.type = type;
    }

    // Busca por título ou descrição se fornecido
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const templates = await ContractTemplate.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: templates.length,
      data: templates,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obter um template específico
// @route   GET /api/templates/:id
// @access  Public
export const getTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const template = await ContractTemplate.findById(req.params.id);

    if (!template) {
      res.status(404).json({
        success: false,
        message: "Template não encontrado",
      });
      return;
    }

    // Verificar se o template é público
    if (!template.isPublic) {
      res.status(403).json({
        success: false,
        message: "Este template não está disponível publicamente",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: template,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Criar um novo template (apenas admin)
// @route   POST /api/templates
// @access  Private (Admin)
export const createTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const template = await ContractTemplate.create(req.body);

    res.status(201).json({
      success: true,
      data: template,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Atualizar um template (apenas admin)
// @route   PUT /api/templates/:id
// @access  Private (Admin)
export const updateTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const template = await ContractTemplate.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!template) {
      res.status(404).json({
        success: false,
        message: "Template não encontrado",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: template,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Excluir um template (apenas admin)
// @route   DELETE /api/templates/:id
// @access  Private (Admin)
export const deleteTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const template = await ContractTemplate.findById(req.params.id);

    if (!template) {
      res.status(404).json({
        success: false,
        message: "Template não encontrado",
      });
      return;
    }

    await template.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obter categorias e tipos únicos de templates
// @route   GET /api/templates/metadata
// @access  Public
export const getTemplateMetadata = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Buscar categorias únicas
    const categories = await ContractTemplate.distinct("category", {
      isPublic: true,
    });

    // Buscar tipos únicos
    const types = await ContractTemplate.distinct("type", { isPublic: true });

    res.status(200).json({
      success: true,
      data: {
        categories,
        types,
      },
    });
  } catch (error) {
    next(error);
  }
};
