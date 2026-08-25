import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export interface MemoryAiResult {
  aiSummary: string;
  aiReflection: string;
  suggestedTags: string[];
}

export async function generateMemoryReflection(
  title: string,
  description?: string,
  location?: string,
  mood?: string
): Promise<MemoryAiResult | null> {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }

  try {
    const prompt = `
You are an empathetic, reflective AI biographer helping a person preserve life memories in an app called "Life Replay".

Given these memory details:
- Title: "${title}"
- Mood: "${mood || "Unknown"}"
- Location: "${location || "Unspecified"}"
- Story/Description: "${description || "No description provided"}"

Generate a JSON object with:
1. "aiSummary": A clean 1-2 sentence concise summary capturing the essence.
2. "aiReflection": A thoughtful, warm, nostalgic 1-3 sentence reflection on why this moment matters.
3. "suggestedTags": An array of 3 to 5 lowercase keyword tags (e.g. ["travel", "friendship", "celebration"]).

Return ONLY valid JSON without markdown fences.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const rawText = response.text?.trim() || "{}";
    const cleanedText = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanedText);

    return {
      aiSummary: parsed.aiSummary || "",
      aiReflection: parsed.aiReflection || "",
      suggestedTags: Array.isArray(parsed.suggestedTags) ? parsed.suggestedTags : [],
    };
  } catch (error) {
    console.error("Gemini reflection generation error:", error);
    return null;
  }
}