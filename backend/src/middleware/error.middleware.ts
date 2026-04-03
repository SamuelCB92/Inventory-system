import { Request, Response, NextFunction } from "express";
import { getLang, getMessage } from "../utils/i18n";
import { sendInternalError } from "../utils/apiResponse";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const lang = getLang(req);
  const message = getMessage("internalServerError", lang);
  console.error("Unhandled error:", err);
  sendInternalError(res, message);
};
