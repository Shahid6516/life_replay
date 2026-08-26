"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getDbUser } from "@/lib/currentUser";

export async function deleteMemory(memoryId: string) {
  try {
    const user = await getDbUser();
    if (!user) throw new Error("Unauthorized");

    await prisma.memory.deleteMany({
      where: {
        id: memoryId,
        userId: user.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Delete memory error:", error);
    return { success: false, error: error.message || "Failed to delete" };
  }
}