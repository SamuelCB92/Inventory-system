import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CreateItemData {
  name: string;
  namePT?: string;
  quantity: number;
  sku?: string;
  category?: string;
  categoryPT?: string;
  description?: string;
  descriptionPT?: string;
  lowStockThreshold?: number;
}

export interface UpdateItemData {
  name?: string;
  namePT?: string | null;
  quantity?: number;
  sku?: string | null;
  category?: string | null;
  categoryPT?: string | null;
  description?: string | null;
  descriptionPT?: string | null;
  lowStockThreshold?: number;
}

export interface GetItemsOptions {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: "name" | "quantity" | "createdAt";
  sortOrder?: "asc" | "desc";
}

// ─── Service functions ────────────────────────────────────────────────────────

export const createItem = async (data: CreateItemData) => {
  return await prisma.item.create({ data });
};

export const getItems = async (options: GetItemsOptions = {}) => {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = options;

  const where: Prisma.ItemWhereInput = {};

  if (search) {
    where.name = { contains: search, mode: "insensitive" };
  }

  if (category) {
    where.category = { equals: category, mode: "insensitive" };
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.item.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    }),
    prisma.item.count({ where }),
  ]);

  return {
    items,
    total,
    count: items.length,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const getItemById = async (id: string) => {
  return await prisma.item.findUnique({ where: { id } });
};

export const updateItem = async (id: string, data: UpdateItemData) => {
  return await prisma.item.update({ where: { id }, data });
};

export const deleteItem = async (id: string) => {
  return await prisma.item.delete({ where: { id } });
};

export const getLowStockItems = async () => {
  // Prisma cannot compare two columns natively — use raw SQL
  return await prisma.$queryRaw<
    Array<{
      id: string;
      name: string;
      namePT: string | null;
      sku: string | null;
      category: string | null;
      categoryPT: string | null;
      description: string | null;
      descriptionPT: string | null;
      quantity: number;
      lowStockThreshold: number;
      createdAt: Date;
      updatedAt: Date;
    }>
  >`
    SELECT * FROM items
    WHERE "lowStockThreshold" > 0
      AND quantity <= "lowStockThreshold"
    ORDER BY quantity ASC
  `;
};

export const getCategories = async (): Promise<string[]> => {
  const result = await prisma.item.groupBy({
    by: ["category"],
    where: { category: { not: null } },
  });
  return result.map((r) => r.category as string);
};
