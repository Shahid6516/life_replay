"use server";

import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Mood, MediaType } from "@prisma/client";
import { generateMemoryReflection } from "@/actions/ai";

interface CreateMemoryInput {
  title: string;
  body: string;
  tag: string;
  mood: string;
  location?: string;
  base64Image?: string;
}

function parseMood(moodStr?: string): Mood {
  if (!moodStr) return Mood.HAPPY;
  const upper = moodStr.toUpperCase().trim();
  if (upper in Mood) {
    return upper as Mood;
  }
  return Mood.HAPPY;
}

export async function createMemoryAction(data: CreateMemoryInput) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    // 1. Ensure user exists in database
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      const clerkUser = await currentUser();
      const email =
        clerkUser?.emailAddresses?.[0]?.emailAddress || `${userId}@user.local`;
      const name =
        `${clerkUser?.firstName || ""} ${clerkUser?.lastName || ""}`.trim() ||
        "Chronicle User";

      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: email,
          name: name,
        },
      });
    }

    let hostedImageUrl: string | undefined = undefined;

    // 2. Upload photo to Cloudinary
    if (data.base64Image && data.base64Image.startsWith("data:image")) {
      const uploadResult = await cloudinary.uploader.upload(data.base64Image, {
        folder: "life_replay_memories",
        resource_type: "image",
      });
      hostedImageUrl = uploadResult.secure_url;
    }

    // 3. Generate dynamic AI Biographer reflection
    const dynamicAiReflection = await generateMemoryReflection({
      title: data.title,
      body: data.body,
      mood: data.mood,
      location: data.location,
      base64Image: data.base64Image,
    });

    // 4. Save memory to database
    const newMemory = await prisma.memory.create({
      data: {
        userId: user.id,
        title: data.title,
        description: data.body,
        mood: parseMood(data.mood),
        location: data.location || "Recorded Moment",
        tags: data.tag ? [data.tag] : ["Life"],
        aiSummary: `${data.title} — ${data.mood}`,
        aiReflection: dynamicAiReflection,
        ...(hostedImageUrl && {
          media: {
            create: [
              {
                url: hostedImageUrl,
                type: MediaType.IMAGE,
              },
            ],
          },
        }),
      },
      include: {
        media: true,
      },
    });

    revalidatePath("/");

    const formattedMood =
      (newMemory.mood || "HAPPY").charAt(0) +
      (newMemory.mood || "HAPPY").slice(1).toLowerCase();

    return {
      success: true,
      memory: {
        id: newMemory.id,
        title: newMemory.title,
        body: newMemory.description || "",
        date: new Date(newMemory.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        tag: newMemory.tags?.[0] || "Life",
        mood: formattedMood as any,
        location: newMemory.location || "Recorded Moment",
        imageUrl: newMemory.media?.[0]?.url || undefined,
        aiReflection: newMemory.aiReflection || undefined,
      },
    };
  } catch (error: any) {
    console.error("Failed to create memory:", error);
    return {
      success: false,
      error: error.message || "Failed to process memory upload.",
    };
  }
}