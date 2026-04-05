import {
  validateCreateItem,
  validateUpdateItem,
} from "../middleware/validation.middleware";
import { Router } from "express";
import * as itemsController from "../controllers/items.controller";

const itemsRouter = Router();

// GET /items/low-stock - Items below threshold (must be before /:id)
itemsRouter.get("/low-stock", itemsController.getLowStockItems);

// GET /items/categories - Distinct category list
itemsRouter.get("/categories", itemsController.getCategories);

// POST /items - Create inventory item
itemsRouter.post("/", validateCreateItem, itemsController.createItem);

// GET /items - List items (paginated, filterable)
itemsRouter.get("/", itemsController.getItems);

// GET /items/:id - Get single item
itemsRouter.get("/:id", itemsController.getItemById);

// PATCH /items/:id - Update item
itemsRouter.patch("/:id", validateUpdateItem, itemsController.updateItem);

// DELETE /items/:id - Delete item
itemsRouter.delete("/:id", itemsController.deleteItem);

export default itemsRouter;
