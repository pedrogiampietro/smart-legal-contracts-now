import express from "express";
import {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplateMetadata,
} from "../controllers/template.controller";
import { protect, authorize } from "../middlewares/auth";

const router = express.Router();

// Rotas públicas
router.get("/", getTemplates);
router.get("/metadata", getTemplateMetadata);
router.get("/:id", getTemplate);

// Rotas protegidas (apenas admin)
router.use(protect);
router.use(authorize("admin"));

router.post("/", createTemplate);
router.put("/:id", updateTemplate);
router.delete("/:id", deleteTemplate);

export default router;
