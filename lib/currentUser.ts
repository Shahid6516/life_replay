import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function getDbUser() {
  // 1. Get logged-in user from Clerk
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  // 2. Extract primary email safely
  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) {
    return null;
  }

  // 3. Upsert user in database (Find or Create)
  const dbUser = await prisma.user.upsert({
    where: {
      clerkId: clerkUser.id,
    },
    update: {
      email,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      imageUrl: clerkUser.imageUrl,
    },
    create: {
      clerkId: clerkUser.id,
      email,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      imageUrl: clerkUser.imageUrl,
    },
  });

  return dbUser;
}