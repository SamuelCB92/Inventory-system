import { Request, Response, NextFunction } from 'express';
   import { getLang, getMessage } from '../utils/i18n';
   import { sendError } from '../utils/apiResponse';

   export function validateCreateItem(req: Request, res: Response, next: NextFunction) {
     const lang = getLang(req);
     const { name, quantity } = req.body ?? {};

     if (!name) {
       return sendError(res, getMessage('nameRequired', lang), 400);
     }

     if (typeof name !== 'string') {
       return sendError(res, getMessage('nameMustBeString', lang), 400);
     }

     if (quantity === undefined) {
       return sendError(res, getMessage('quantityRequired', lang), 400);
     }

     if (!Number.isInteger(quantity) || quantity < 0) {
       return sendError(res, getMessage('quantityMustBeNonNegative', lang), 400);
     }

     next();
   };

   export function validateUpdateItem(req: Request, res: Response, next: NextFunction) {
     const lang = getLang(req);
     const { name, quantity } = req.body ?? {};

     if (name !== undefined && typeof name !== 'string') {
       return sendError(res, getMessage('nameMustBeString', lang), 400);
     }

     if (quantity !== undefined && (!Number.isInteger(quantity) || quantity < 0)) {
       return sendError(res, getMessage('quantityMustBeNonNegative', lang), 400);
     }

     next();
   };