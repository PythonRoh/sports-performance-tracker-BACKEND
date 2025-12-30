import Workout from "../models/Workout.js";

export const createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({
      ...req.body,
      user: req.user.id, // IMPORTANT
    });

    res.status(201).json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create workout" });
  }
};

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch workouts" });
  }
};
