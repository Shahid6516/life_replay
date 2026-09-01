"use server";

import prisma from "@/lib/prisma";
import { getDbUser } from "@/lib/currentUser";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

// Generates an introspective 1-2 sentence reflection for a single memory
export async function generateMemoryReflection({
  title,
  body,
  mood,
  location,
  base64Image,
}: {
  title: string;
  body: string;
  mood: string;
  location?: string;
  base64Image?: string;
}) {
  try {
    const prompt = `You are a thoughtful, poetic, and observant personal biographer.
Write a 1-2 sentence introspective reflection on this memory for the user's personal chronicle.
Title: "${title}"
Story: "${body}"
Mood: "${mood}"
Location: "${location || "Unspecified"}"
Reflect on the deeper emotion, meaning, or growth in this moment. Keep it concise, warm, and poetic. Do not include quotes.`;

    const contents: any[] = [{ text: prompt }];

    // Attach image for multimodal vision analysis if present
    if (base64Image && base64Image.startsWith("data:image")) {
      const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
      if (matches) {
        contents.push({
          inlineData: {
            mimeType: matches[1],
            data: matches[2],
          },
        });
      }
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    return response.text?.trim() || "A meaningful milestone etched into your chronicle.";
  } catch (err) {
    console.error("Single memory AI reflection error:", err);
    return "A meaningful milestone etched into your chronicle.";
  }
}

// Generates an overall multi-paragraph recap of all recorded memories
export async function generateLifeRecap() {
  try {
    const user = await getDbUser();
    if (!user) throw new Error("Unauthorized");

    const memories = await prisma.memory.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
      select: {
        title: true,
        description: true,
        createdAt: true,
        mood: true,
        location: true,
      },
    });

    if (memories.length === 0) {
      return { success: false, error: "Please add at least one memory first." };
    }

    const memoryDigest = memories
      .map(
        (m, idx) =>
          `${idx + 1}. [${new Date(m.createdAt).toLocaleDateString()}] ${m.title} (${m.mood}) in ${
            m.location || "Unknown"
          }: ${m.description || "No notes"}`
      )
      .join("\n");

    const prompt = `
You are a warm, poetic life biographer reviewing a person's recorded timeline:

${memoryDigest}

Write a short, inspiring "Life Story Chapter Recap" (3-4 paragraphs max). Highlight the growth, meaningful themes, emotional patterns, and standout moments in a personal and uplifting voice.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return { success: true, recap: response.text || "No recap generated." };
  } catch (err: any) {
    console.error("AI recap error:", err);
    return { success: false, error: err.message || "Failed to generate recap." };
  }
}