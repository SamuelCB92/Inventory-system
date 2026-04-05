import { Request, Response } from "express";
import { getLang, getMessage } from "../utils/i18n";
import { sendSuccess, sendError } from "../utils/apiResponse";
import * as itemsService from "../services/items.service";

export const createItem = async (req: Request, res: Response) => {
  const lang = getLang(req);
  const {
    name,
    namePT,
    quantity,
    sku,
    category,
    categoryPT,
    description,
    descriptionPT,
    lowStockThreshold,
  } = req.body;

  try {
    const item = await itemsService.createItem({
      name,
      namePT,
      quantity,
      sku,
      category,
      categoryPT,
      description,
      descriptionPT,
      lowStockThreshold,
    });
    sendSuccess(res, getMessage("itemCreated", lang), item, 201);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return sendError(res, getMessage("skuAlreadyExists", lang), 409);
    }
    console.error("Error creating item:", error);
    throw error;
  }
};

export const getItems = async (req: Request, res: Response) => {
  const lang = getLang(req);

  const page = parseInt(String(req.query["page"] ?? "1"), 10);
  const limit = Math.min(
    parseInt(String(req.query["limit"] ?? "10"), 10),
    100,
  );
  const search = req.query["search"] ? String(req.query["search"]) : undefined;
  const category = req.query["category"]
    ? String(req.query["category"])
    : undefined;
  const rawSortBy = String(req.query["sortBy"] ?? "createdAt");
  const sortBy: "name" | "quantity" | "createdAt" = (
    ["name", "quantity", "createdAt"].includes(rawSortBy)
      ? rawSortBy
      : "createdAt"
  ) as "name" | "quantity" | "createdAt";
  const sortOrder: "asc" | "desc" =
    req.query["sortOrder"] === "asc" ? "asc" : "desc";

  try {
    const result = await itemsService.getItems({
      page: isNaN(page) ? 1 : page,
      limit: isNaN(limit) ? 10 : limit,
      search,
      category,
      sortBy,
      sortOrder,
    });
    sendSuccess(res, getMessage("itemsListed", lang), result);
  } catch (error) {
    console.error("Error retrieving items:", error);
    throw error;
  }
};

export const getItemById = async (req: Request, res: Response) => {
  const lang = getLang(req);
  const id = req.params["id"] as string;

  try {
    const item = await itemsService.getItemById(id!);
    if (!item) {
      return sendError(res, getMessage("itemNotFound", lang), 404);
    }
    sendSuccess(res, getMessage("itemRetrieved", lang), item);
  } catch (error) {
    console.error("Error retrieving item:", error);
    throw error;
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const lang = getLang(req);
  const id = req.params["id"] as string;
  const {
    name,
    namePT,
    quantity,
    sku,
    category,
    categoryPT,
    description,
    descriptionPT,
    lowStockThreshold,
  } = req.body;

  try {
    const existingItem = await itemsService.getItemById(id!);
    if (!existingItem) {
      return sendError(res, getMessage("itemNotFound", lang), 404);
    }

    const updateData: itemsService.UpdateItemData = {};
    if (name !== undefined) updateData.name = name;
    if (namePT !== undefined) updateData.namePT = namePT;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (sku !== undefined) updateData.sku = sku;
    if (category !== undefined) updateData.category = category;
    if (categoryPT !== undefined) updateData.categoryPT = categoryPT;
    if (description !== undefined) updateData.description = description;
    if (descriptionPT !== undefined) updateData.descriptionPT = descriptionPT;
    if (lowStockThreshold !== undefined)
      updateData.lowStockThreshold = lowStockThreshold;

    const item = await itemsService.updateItem(id!, updateData);
    sendSuccess(res, getMessage("itemUpdated", lang), item);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return sendError(res, getMessage("skuAlreadyExists", lang), 409);
    }
    console.error("Error updating item:", error);
    throw error;
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const lang = getLang(req);
  const id = req.params["id"] as string;

  try {
    const existingItem = await itemsService.getItemById(id!);
    if (!existingItem) {
      return sendError(res, getMessage("itemNotFound", lang), 404);
    }

    await itemsService.deleteItem(id!);
    sendSuccess(res, getMessage("itemDeleted", lang));
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

export const getLowStockItems = async (req: Request, res: Response) => {
  const lang = getLang(req);
  try {
    const items = await itemsService.getLowStockItems();
    sendSuccess(res, getMessage("itemsListed", lang), {
      items,
      count: items.length,
    });
  } catch (error) {
    console.error("Error retrieving low stock items:", error);
    throw error;
  }
};

export const getCategories = async (req: Request, res: Response) => {
  const lang = getLang(req);
  try {
    const categories = await itemsService.getCategories();
    sendSuccess(res, getMessage("itemsListed", lang), { categories });
  } catch (error) {
    console.error("Error retrieving categories:", error);
    throw error;
  }
};
