import fs from "fs";
import csv from "csv-parser";

export function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const workouts = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        workouts.push({
          type: row.type || "Workout",
          duration: Number(row.duration) || 0,
          distance: Number(row.distance) || 0,
          calories: Number(row.calories) || 0,
          notes: row.notes || "",
          date: row.date ? new Date(row.date) : new Date(),
        });
      })
      .on("end", () => resolve(workouts))
      .on("error", reject);
  });
}
