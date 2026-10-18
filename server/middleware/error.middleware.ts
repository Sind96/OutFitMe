import type { ErrorRequestHandler } from "express";
import AppError from "../utils/AppError.js";

const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  _next,
) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  ) {
    res.status(409).json({
      message: "A user with those details already exists",
    });
    return;
  }

  const statusCode = error instanceof AppError ? error.statusCode : 500;

  if (statusCode >= 500) {
    console.error("Global error handler:", error);
  }

  res.status(statusCode).json({
    message:
      statusCode >= 500
        ? "Internal server error"
        : error instanceof Error
          ? error.message
          : "Request failed",
  });
};

export default errorHandler;
