import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadWorkoutFile } from "../controllers/uploadController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv" || file.originalname.endsWith(".gpx")) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV or GPX files allowed"));
    }
  },
});

router.post("/", authMiddleware, upload.single("file"), uploadWorkoutFile);

export default router;
