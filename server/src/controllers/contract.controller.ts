import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Contract from "../models/Contract";
import { ContractService } from "../services/contract.service";
import { PdfService } from "../services/pdf.service";
import fs from "fs";
import path from "path";

// @desc    Criar um novo contrato
// @route   POST /api/contracts
// @access  Private
export const createContract = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Adicionar o usuário atual como criador do contrato
    req.body.createdBy = req.user?._id;

    const contract = await Contract.create(req.body);

    res.status(201).json({
      success: true,
      data: contract,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obter todos os contratos do usuário atual
// @route   GET /api/contracts
// @access  Private
export const getContracts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status, type, search } = req.query;

    // Construir a query
    const query: any = { createdBy: req.user?._id };

    // Filtrar por status se fornecido
    if (status) {
      query.status = status;
    }

    // Filtrar por tipo se fornecido
    if (type) {
      query.type = type;
    }

    // Busca por título se fornecido
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const contracts = await Contract.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contracts.length,
      data: contracts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obter um contrato específico
// @route   GET /api/contracts/:id
// @access  Private
export const getContract = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      res.status(404).json({
        success: false,
        message: "Contrato não encontrado",
      });
      return;
    }

    // Verificar se o usuário é o criador do contrato
    if (contract.createdBy.toString() !== req.user?._id.toString()) {
      res.status(403).json({
        success: false,
        message: "Usuário não autorizado a acessar este contrato",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: contract,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Atualizar um contrato
// @route   PUT /api/contracts/:id
// @access  Private
export const updateContract = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let contract = await Contract.findById(req.params.id);

    if (!contract) {
      res.status(404).json({
        success: false,
        message: "Contrato não encontrado",
      });
      return;
    }

    // Verificar se o usuário é o criador do contrato
    if (contract.createdBy.toString() !== req.user?._id.toString()) {
      res.status(403).json({
        success: false,
        message: "Usuário não autorizado a atualizar este contrato",
      });
      return;
    }

    contract = await Contract.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: contract,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Excluir um contrato
// @route   DELETE /api/contracts/:id
// @access  Private
export const deleteContract = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      res.status(404).json({
        success: false,
        message: "Contrato não encontrado",
      });
      return;
    }

    // Verificar se o usuário é o criador do contrato
    if (contract.createdBy.toString() !== req.user?._id.toString()) {
      res.status(403).json({
        success: false,
        message: "Usuário não autorizado a excluir este contrato",
      });
      return;
    }

    await contract.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Gerar conteúdo HTML do contrato
// @route   POST /api/contracts/:id/generate-content
// @access  Private
export const generateContractContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contract = await ContractService.generateContractContent(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: contract,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Gerar PDF do contrato
// @route   GET /api/contracts/:id/pdf
// @access  Private
export const generateContractPdf = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Verificar se o usuário pode acessar este contrato
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      res.status(404).json({
        success: false,
        message: "Contrato não encontrado",
      });
      return;
    }

    // Verificar se o usuário é o criador do contrato ou uma das partes (verificação pelo email)
    const userIsCreator =
      contract.createdBy.toString() === req.user?._id.toString();
    const userEmail = req.user?.email;
    const userIsParty = userEmail
      ? contract.parties.some((party) => party.email === userEmail)
      : false;

    if (!userIsCreator && !userIsParty) {
      res.status(403).json({
        success: false,
        message: "Usuário não autorizado a acessar este contrato",
      });
      return;
    }

    // Gerar o PDF
    const pdfPath = await ContractService.generateContractPdf(req.params.id);

    // Configurar o cabeçalho da resposta
    const filename = `contrato_${contract.title.replace(/\s+/g, "_")}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Length", fs.statSync(pdfPath).size);

    // Enviar o arquivo
    const filestream = fs.createReadStream(pdfPath);
    filestream.pipe(res);

    // Remover o arquivo temporário depois de enviado
    filestream.on("close", () => {
      PdfService.removeTempFile(pdfPath).catch((err) =>
        console.error("Erro ao remover arquivo temporário:", err)
      );
    });
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    next(error);
  }
};

// @desc    Enviar contrato para assinatura
// @route   POST /api/contracts/:id/send
// @access  Private
export const sendContractForSignature = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Verificar se o usuário pode acessar este contrato
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      res.status(404).json({
        success: false,
        message: "Contrato não encontrado",
      });
      return;
    }

    // Verificar se o usuário é o criador do contrato
    if (contract.createdBy.toString() !== req.user?._id.toString()) {
      res.status(403).json({
        success: false,
        message: "Usuário não autorizado a enviar este contrato",
      });
      return;
    }

    // Enviar o contrato para assinatura
    const updatedContract = await ContractService.sendContractForSignature(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: updatedContract,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancelar um contrato
// @route   POST /api/contracts/:id/cancel
// @access  Private
export const cancelContract = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Verificar se o usuário pode acessar este contrato
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      res.status(404).json({
        success: false,
        message: "Contrato não encontrado",
      });
      return;
    }

    // Verificar se o usuário é o criador do contrato
    if (contract.createdBy.toString() !== req.user?._id.toString()) {
      res.status(403).json({
        success: false,
        message: "Usuário não autorizado a cancelar este contrato",
      });
      return;
    }

    // Cancelar o contrato
    const updatedContract = await ContractService.cancelContract(req.params.id);

    res.status(200).json({
      success: true,
      data: updatedContract,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assinar um contrato (para uma parte específica)
// @route   PUT /api/contracts/:id/sign
// @access  Public
export const signContract = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email da parte é obrigatório",
      });
      return;
    }

    // Assinar o contrato
    const contract = await ContractService.signContract(req.params.id, email);

    res.status(200).json({
      success: true,
      data: contract,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obter estatísticas de contratos
// @route   GET /api/contracts/stats
// @access  Private
export const getContractStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Estatísticas por status
    const statusStats = await Contract.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user?._id) } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Estatísticas por tipo
    const typeStats = await Contract.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user?._id) } },
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]);

    // Total de contratos
    const totalContracts = await Contract.countDocuments({
      createdBy: req.user?._id,
    });

    // Contratos com vencimento próximo (próximos 30 dias)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const upcomingExpiration = await Contract.countDocuments({
      createdBy: req.user?._id,
      endDate: { $lte: thirtyDaysFromNow, $gte: new Date() },
    });

    res.status(200).json({
      success: true,
      data: {
        total: totalContracts,
        upcomingExpiration,
        byStatus: statusStats,
        byType: typeStats,
      },
    });
  } catch (error) {
    next(error);
  }
};
