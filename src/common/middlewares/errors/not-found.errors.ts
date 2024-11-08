import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export function notFound(req: Request, res: Response, next: NextFunction) {
  return next(createHttpError(404, `Route - ${req.originalUrl} not found.`));
}
