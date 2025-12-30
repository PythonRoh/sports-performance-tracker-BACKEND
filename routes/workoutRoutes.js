import express from "express";
import Workout from "../models/Workout.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET user-specific workouts */
router.get("/", authMiddleware, async (req, res) => {
  const workouts = await Workout.find({ user: req.user.id });
  res.json(workouts);
});

/* CREATE workout for logged-in user */
router.post("/", authMiddleware, async (req, res) => {
  const workout = await Workout.create({
    ...req.body,
    user: req.user.id,
  });
  res.json(workout);
});

export default router;
