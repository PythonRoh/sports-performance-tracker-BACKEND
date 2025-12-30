import express from "express";
import cors from "cors";
import workoutRoutes from "./routes/workoutRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/workouts", workoutRoutes);
app.use("/api/auth", authRoutes);

export default app;
