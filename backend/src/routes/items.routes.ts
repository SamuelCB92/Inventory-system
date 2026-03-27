import { Router } from "express";
import { getMessage, getLang } from "../utils/i18n";

const itemsRouter = Router();

// POST /items - Create inventory item
itemsRouter.post("/", async (req, res) => {
  const lang = getLang(req);
  const { name, quantity } = req.body ?? {};

  if (!name) {
    return res.status(400).json({
      success: false,
      message: getMessage("nameRequired", lang),
    });
  }

  if (quantity === undefined) {
    return res.status(400).json({
      success: false,
      message: getMessage("quantityRequired", lang),
    });
  }

  if (typeof name !== "string") {
    return res.status(400).json({
      success: false,
      message: getMessage("nameMustBeString", lang),
    });
  }

  if (!Number.isInteger(quantity) || quantity < 0) {
    return res.status(400).json({
      success: false,
      message: getMessage("quantityMustBeNonNegative", lang),
    });
  }

  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const item = await prisma.item.create({
      data: { name, quantity },
    });

    res.status(201).json({
      success: true,
      message: getMessage("itemCreated", lang),
      data: item,
    });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET /items - List all items
itemsRouter.get("/", async (req, res) => {
  const lang = getLang(req);

  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const items = await prisma.item.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      message: getMessage("itemsListed", lang),
      data: { items, count: items.length },
    });
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET /items/:id - Get single item
itemsRouter.get("/:id", async (req, res) => {
  const lang = getLang(req);
  const { id } = req.params;

  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const item = await prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: getMessage("itemNotFound", lang),
      });
    }

    res.json({
      success: true,
      message: getMessage("itemRetrieved", lang),
      data: item,
    });
  } catch (error) {
    console.error("Error retrieving item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// PATCH /items/:id - Update item
itemsRouter.patch("/:id", async (req, res) => {
  const lang = getLang(req);
  const { id } = req.params;
  const { name, quantity } = req.body ?? {};

  if (name !== undefined && typeof name !== "string") {
    return res.status(400).json({
      success: false,
      message: getMessage("nameMustBeString", lang),
    });
  }

  if (quantity !== undefined && (!Number.isInteger(quantity) || quantity < 0)) {
    return res.status(400).json({
      success: false,
      message: getMessage("quantityMustBeNonNegative", lang),
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
        success: false,
        message: getMessage("itemNotFound", lang),
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
      success: true,
      message: getMessage("itemUpdated", lang),
      data: item,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// DELETE /items/:id - Delete item
itemsRouter.delete("/:id", async (req, res) => {
  const lang = getLang(req);
  const { id } = req.params;

  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const existingItem = await prisma.item.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: getMessage("itemNotFound", lang),
      });
    }

    await prisma.item.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: getMessage("itemDeleted", lang),
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default itemsRouter;
