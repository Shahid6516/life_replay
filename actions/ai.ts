"use server";

import prisma from "@/lib/prisma";
import { getDbUser } from "@/lib/currentUser";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function generateLifeRecap() {
  try {
    const user = await getDbUser();
    if (!user) throw new Error("Unauthorized");

    const memories = await prisma.memory.findMany({
      where: { userId: user.id },
      orderBy: { eventDate: "asc" },
      select: {
        title: true,
        description: true,
        eventDate: true,
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
          `${idx + 1}. [${new Date(m.eventDate).toLocaleDateString()}] ${m.title} (${m.mood}) in ${
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
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    return { success: true, recap: response.text || "No recap generated." };
  } catch (err: any) {
    console.error("AI recap error:", err);
    return { success: false, error: err.message || "Failed to generate recap." };
  }
}