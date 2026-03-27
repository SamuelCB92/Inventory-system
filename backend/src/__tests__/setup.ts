import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function cleanupDatabase() {
  await prisma.item.deleteMany();
}

export async function closeDatabase() {
  await prisma.$disconnect();
}
