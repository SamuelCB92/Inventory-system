import { Router } from "express";

const itemsRouter = Router();

// POST /items - Create inventory item
itemsRouter.post("/", async (req, res) => {
  const { name, quantity } = req.body ?? {};

  if (!name || quantity === undefined) {
    return res.status(400).json({
      error: "Invalid input",
      message: "Name and quantity are required",
    });
  }

  if (typeof quantity !== "number" || quantity < 0) {
    return res.status(400).json({
      error: "Invalid quantity",
      message: "Quantity must be a non-negative number",
    });
  }

  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const item = await prisma.item.create({
      data: { name, quantity },
    });

    res.status(201).json({
      message: "Item created successfully",
      item,
    });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to create item",
    });
  }
});

// GET /items - List all items
itemsRouter.get("/", async (req, res) => {
  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const items = await prisma.item.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({
      message: "Items retrieved successfully",
      items,
      count: items.length,
    });
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to retrieve items",
    });
  }
});

// GET /items/:id - Get single item
itemsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const item = await prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      return res.status(404).json({
        error: "Not found",
        message: "Item not found",
      });
    }

    res.json({
      message: "Item retrieved successfully",
      item,
    });
  } catch (error) {
    console.error("Error retrieving item:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to retrieve item",
    });
  }
});

// PATCH /items/:id - Update item
itemsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body ?? {};

  if (
    quantity !== undefined &&
    (typeof quantity !== "number" || quantity < 0)
  ) {
    return res.status(400).json({
      error: "Invalid quantity",
      message: "Quantity must be a non-negative number",
    });
  }

  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const existingItem = await prisma.item.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return res.status(404).json({
        error: "Not found",
        message: "Item not found",
      });
    }

    const updateData: { name?: string; quantity?: number } = {};
    if (name !== undefined) updateData.name = name;
    if (quantity !== undefined) updateData.quantity = quantity;

    const item = await prisma.item.update({
      where: { id },
      data: updateData,
    });

    res.json({
      message: "Item updated successfully",
      item,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to update item",
    });
  }
});

// DELETE /items/:id - Delete item
itemsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const existingItem = await prisma.item.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return res.status(404).json({
        error: "Not found",
        message: "Item not found",
      });
    }

    await prisma.item.delete({
      where: { id },
    });

    res.json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to delete item",
    });
  }
});

export default itemsRouter;
