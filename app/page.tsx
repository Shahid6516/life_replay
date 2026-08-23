import prisma from "@/lib/prisma";
import dotenv from "dotenv"

export default async function HomePage() {
  // 1. Fetch data directly from Neon via Prisma
  const users = await prisma.user.findMany();

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Database Records</h1>

      {users.length === 0 ? (
        <p className="">No records found. Insert one via Prisma Studio!</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="p-4 border rounded-lg shadow-sm ">
              <h2 className="font-semibold text-lg">{user.name ?? "Unnamed"}</h2>
              <p className=" text-sm">{user.email}</p>
              <span className="text-xs text-gray-400">
                Created: {new Date().toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}