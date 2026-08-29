import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

export async function getDbUser() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) return null;

    const email = clerkUser.emailAddresses[0]?.emailAddress || "";
    const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim();

    const dbUser = await prisma.user.upsert({
      where: {
        clerkId: clerkUser.id,
      },
      update: {
        email,
        name: name || undefined,
        imageUrl: clerkUser.imageUrl,
      },
      create: {
        clerkId: clerkUser.id,
        email,
        name: name || "User",
        imageUrl: clerkUser.imageUrl,
      },
    });

    return dbUser;
  } catch (error) {
    console.error("Error in getDbUser:", error);
    return null;
  }
}