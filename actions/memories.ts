"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getDbUser } from "@/lib/currentUser";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { Mood, MediaType } from "@prisma/client";

export async function createMemoryWithImage(formData: FormData) {
  try {
    const user = await getDbUser();
    if (!user) {
      throw new Error("Unauthorized: You must be logged in to create a memory.");
    }

    const title = formData.get("title") as string;
    const eventDate = formData.get("eventDate") as string;
    const description = (formData.get("description") as string) || undefined;
    const location = (formData.get("location") as string) || undefined;
    const mood = (formData.get("mood") as Mood) || "HAPPY";
    const tagsRaw = formData.get("tags") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !eventDate) {
      throw new Error("Title and event date are required.");
    }

    // 1. Upload image to Cloudinary if a file was selected
    let uploadedImageUrl: string | undefined = undefined;
    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
      uploadedImageUrl = await uploadImageToCloudinary(imageFile);
    }

    // 2. Parse tags
    const tags = tagsRaw
      ? tagsRaw.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
      : [];

    // 3. Save to Neon PostgreSQL
    const newMemory = await prisma.memory.create({
      data: {
        title,
        description,
        eventDate: new Date(eventDate),
        location,
        mood,
        tags,
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
    console.error("Error creating memory with image:", error);
    return { success: false, error: error.message || "Failed to create memory" };
  }
}