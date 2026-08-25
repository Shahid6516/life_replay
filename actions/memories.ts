"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getDbUser } from "@/lib/currentUser";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { generateMemoryReflection } from "@/lib/gemini";
import { Mood, MediaType } from "@prisma/client";

export async function createMemoryWithImage(formData: FormData) {
  try {
    const user = await getDbUser();
    if (!user) {
      return { success: false, error: "Unauthorized: Please sign in first." };
    }

    const title = formData.get("title") as string;
    const eventDate = formData.get("eventDate") as string;
    const description = (formData.get("description") as string) || undefined;
    const location = (formData.get("location") as string) || undefined;
    const mood = (formData.get("mood") as Mood) || "HAPPY";
    const tagsRaw = formData.get("tags") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !eventDate) {
      return { success: false, error: "Title and event date are required." };
    }

    // 1. Upload to Cloudinary ONLY if a real file with content exists
    let uploadedImageUrl: string | undefined = undefined;
    if (imageFile && typeof imageFile !== "string" && imageFile.size > 0 && imageFile.name !== "undefined") {
      try {
        uploadedImageUrl = await uploadImageToCloudinary(imageFile);
      } catch (uploadErr) {
        console.error("Cloudinary upload failed, continuing without image:", uploadErr);
      }
    }

    // 2. Safely generate AI Reflection (Won't hang if Gemini fails)
    let aiData = null;
    try {
      aiData = await generateMemoryReflection(title, description, location, mood);
    } catch (aiErr) {
      console.error("Gemini failed, proceeding without AI reflection:", aiErr);
    }

    // 3. Combine user tags + AI tags
    const userTags = tagsRaw
      ? tagsRaw.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
      : [];
    const combinedTags = Array.from(
      new Set([...userTags, ...(aiData?.suggestedTags || [])])
    );

    // 4. Save to Neon Database
    const newMemory = await prisma.memory.create({
      data: {
        title,
        description,
        eventDate: new Date(eventDate),
        location,
        mood,
        tags: combinedTags,
        aiSummary: aiData?.aiSummary || null,
        aiReflection: aiData?.aiReflection || null,
        userId: user.id,
        media: uploadedImageUrl
          ? {
              create: [
                {
                  url: uploadedImageUrl,
                  type: MediaType.IMAGE,
                },
              ],
            }
          : undefined,
      },
      include: {
        media: true,
      },
    });

    revalidatePath("/");
    return { success: true, memory: newMemory };
  } catch (error: any) {
    console.error("Error creating memory:", error);
    return { success: false, error: error.message || "Failed to create memory" };
  }
}