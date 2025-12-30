import axios from "axios";

export async function analyzeWorkouts(workouts) {
  const apiKey = process.env.GEMINI_API_KEY;

  const workoutSummary = workouts
    .map(
      (w, i) =>
        `${i + 1}. ${w.type || "Workout"} for ${
          w.duration || 0
        } minutes, calories burned ${w.calories || 0}`
    )
    .join("\n");

  const prompt = `
You are a professional fitness coach.

Analyze the following workout history and provide:
1. Performance trends
2. Strengths
3. Weak areas
4. Training improvement suggestions
5. A short weekly plan

Workout history:
${workoutSummary}
`;

  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent",
    {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
    }
  );

  return response.data.candidates[0].content.parts[0].text;
}
