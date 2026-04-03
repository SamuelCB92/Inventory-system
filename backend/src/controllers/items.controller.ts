import { Request, Response } from "express";
import { getLang, getMessage } from "../utils/i18n";
import { sendSuccess, sendError } from "../utils/apiResponse";
import * as itemsService from "../services/items.service";

export const createItem = async (req: Request, res: Response) => {
  const lang = getLang(req);
  const { name, quantity } = req.body;

  try {
    const item = await itemsService.createItem({ name, quantity });
    sendSuccess(res, getMessage("itemCreated", lang), item, 201);
  } catch (error) {
    console.error("Error creating item:", error);
    throw error; // Let error middleware handle
  }
};

export const getItems = async (req: Request, res: Response) => {
  const lang = getLang(req);

  try {
    const items = await itemsService.getItems();
    sendSuccess(res, getMessage("itemsListed", lang), {
      items,
      count: items.length,
    });
  } catch (error) {
    console.error("Error retrieving items:", error);
    throw error;
  }
};

export const getItemById = async (req: Request, res: Response) => {
  const lang = getLang(req);
  const { id } = req.params;

  try {
    const item = await itemsService.getItemById(id);
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
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const existingItem = await itemsService.getItemById(id);
    if (!existingItem) {
      return sendError(res, getMessage("itemNotFound", lang), 404);
    }

    const updateData: Partial<{ name: string; quantity: number }> = {};
    if (name !== undefined) updateData.name = name;
    if (quantity !== undefined) updateData.quantity = quantity;

    const item = await itemsService.updateItem(id, updateData);
    sendSuccess(res, getMessage("itemUpdated", lang), item);
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const lang = getLang(req);
  const { id } = req.params;

  try {
    const existingItem = await itemsService.getItemById(id);
    if (!existingItem) {
      return sendError(res, getMessage("itemNotFound", lang), 404);
    }

    await itemsService.deleteItem(id);
    sendSuccess(res, getMessage("itemDeleted", lang));
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
