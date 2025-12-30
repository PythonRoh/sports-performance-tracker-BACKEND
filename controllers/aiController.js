import { analyzeWorkouts } from "../services/geminiService.js";

export const analyzePerformance = async (req, res) => {
  try {
    const { workouts } = req.body;

    // Proper validation
    if (!workouts || !Array.isArray(workouts) || workouts.length === 0) {
      return res.status(400).json({
        message: "No workout data provided for analysis",
      });
    }

    // Call Gemini service
    const insights = await analyzeWorkouts(workouts);

    res.status(200).json({
      success: true,
      insights,
    });
  } catch (error) {
    console.error("AI ANALYSIS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "AI analysis failed",
    });
  }
};
