import express from "express";
import {
  createWorkout,
  getWorkouts,
} from "../controllers/workoutController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// PROTECTED ROUTES
router.post("/", authMiddleware, createWorkout);
router.get("/", authMiddleware, getWorkouts);

export default router;
