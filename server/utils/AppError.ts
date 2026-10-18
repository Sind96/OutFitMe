class AppError extends Error {
  readonly statusCode: number;
  readonly status: "fail" | "error";

  constructor(message: string, statusCode: number) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

    if ("captureStackTrace" in Error) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
