import {
  validateCreateItem,
  validateUpdateItem,
} from "../middleware/validation.middleware";
import { Router } from "express";
import { getMessage, getLang } from "../utils/i18n";
import { PrismaClient } from "@prisma/client";

const itemsRouter = Router();
const prisma = new PrismaClient();

// POST /items - Create inventory item
itemsRouter.post("/", validateCreateItem, async (req, res) => {
  const lang = getLang(req);
  const { name, quantity } = req.body ?? {};

  try {
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
itemsRouter.patch("/:id", validateUpdateItem, async (req, res) => {
  const lang = getLang(req);
  const { id } = req.params;
  const { name, quantity } = req.body ?? {};

  try {
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
