import {
  validateCreateItem,
  validateUpdateItem,
} from "../middleware/validation.middleware";
import { Router } from "express";
import * as itemsController from "../controllers/items.controller";

const itemsRouter = Router();

// POST /items - Create inventory item
itemsRouter.post("/", validateCreateItem, itemsController.createItem);

// GET /items - List all items
itemsRouter.get("/", itemsController.getItems);

// GET /items/:id - Get single item
itemsRouter.get("/:id", itemsController.getItemById);

// PATCH /items/:id - Update item
itemsRouter.patch("/:id", validateUpdateItem, itemsController.updateItem);

// DELETE /items/:id - Delete item
itemsRouter.delete("/:id", itemsController.deleteItem);

export default itemsRouter;
