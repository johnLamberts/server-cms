import { HttpStatusCodes } from "@/constants";
import { ResponseT } from "@/interfaces";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

interface ErrorResponse extends ResponseT {
  stack?: string;
}

export const errorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;

  res?.status(statusCode).send({
    data: null,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    status: "[ServerError]: Internal Server Error.",
    message: error.message || "An unexpected error occured",
    stack: process.env.NODE_ENV === "production" ? "" : error.stack,
  })
}
