import fs from "fs";
import Workout from "../models/Workout.js";
import { parseCSV } from "../utils/parseCSV.js";
import { parseGPX } from "../utils/parseGPX.js";

export const uploadWorkoutFile = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user.id;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let workouts = [];

    if (file.mimetype === "text/csv") {
      workouts = await parseCSV(file.path);
    } else if (file.originalname.endsWith(".gpx")) {
      workouts = await parseGPX(file.path);
    }

    // Attach user ID
    workouts = workouts.map((w) => ({
      ...w,
      user: userId,
    }));

    await Workout.insertMany(workouts);

    fs.unlinkSync(file.path); // cleanup uploaded file

    res.json({
      message: "File uploaded successfully",
      workoutsAdded: workouts.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};
