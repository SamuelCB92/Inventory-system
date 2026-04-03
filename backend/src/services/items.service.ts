import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createItem = async (data: { name: string; quantity: number }) => {
  return await prisma.item.create({ data });
};

export const getItems = async () => {
  return await prisma.item.findMany({ orderBy: { createdAt: "desc" } });
};

export const getItemById = async (id: string) => {
  return await prisma.item.findUnique({ where: { id } });
};

export const updateItem = async (
  id: string,
  data: Partial<{ name: string; quantity: number }>,
) => {
  return await prisma.item.update({ where: { id }, data });
};

export const deleteItem = async (id: string) => {
  return await prisma.item.delete({ where: { id } });
};
