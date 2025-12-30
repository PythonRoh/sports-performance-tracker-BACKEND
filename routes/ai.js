import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { analyzePerformance } from "../controllers/aiController.js";

const router = express.Router();

router.post("/analyze", authMiddleware, analyzePerformance);

export default router;
