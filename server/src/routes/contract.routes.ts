import express from "express";
import {
  createContract,
  getContracts,
  getContract,
  updateContract,
  deleteContract,
  signContract,
  getContractStats,
  generateContractContent,
  generateContractPdf,
  sendContractForSignature,
  cancelContract,
} from "../controllers/contract.controller";
import { protect } from "../middlewares/auth";

const router = express.Router();

// Rota pública para assinatura (não requer autenticação)
router.put("/:id/sign", signContract);

// Todas as demais rotas requerem autenticação
router.use(protect);

// Rota para estatísticas
router.get("/stats", getContractStats);

// Rotas para CRUD básico
router.route("/").get(getContracts).post(createContract);

router
  .route("/:id")
  .get(getContract)
  .put(updateContract)
  .delete(deleteContract);

// Rotas para manipulação de contratos
router.post("/:id/generate-content", generateContractContent);
router.get("/:id/pdf", generateContractPdf);
router.post("/:id/send", sendContractForSignature);
router.post("/:id/cancel", cancelContract);

export default router;
