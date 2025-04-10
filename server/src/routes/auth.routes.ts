import express from "express";
import { register, login, getMe } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth";

const router = express.Router();

// Rotas públicas
router.post("/register", register);
router.post("/login", login);

// Rotas protegidas
router.get("/me", protect, getMe);

export default router;
