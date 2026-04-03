import { Response } from "express";

export const sendSuccess = (
  res: Response,
  message: string,
  data?: any,
  status: number = 200,
) => {
  res.status(status).json({ success: true, message, data });
};

export const sendError = (
  res: Response,
  message: string,
  status: number = 400,
) => {
  res.status(status).json({ success: false, message });
};

export const sendInternalError = (res: Response, message: string) => {
  res.status(500).json({ success: false, message });
};
