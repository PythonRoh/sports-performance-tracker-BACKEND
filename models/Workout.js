import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: String,
    duration: Number,
    distance: Number,
    calories: Number,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Workout", workoutSchema);
