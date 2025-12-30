import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import workoutRoutes from "./routes/workouts.js";
import aiRoutes from "./routes/ai.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
