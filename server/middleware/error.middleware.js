const errorHandler = (error, req, res, next) => {
  if (error.code === 11000) {
    return res.status(409).json({
      message: "A user with those details already exists",
    });
  }

  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    console.error("Global error handler:", error);
  }

  return res.status(statusCode).json({
    message:
      statusCode >= 500
        ? "Internal server error"
        : error.message || "Request failed",
  });
};

module.exports = errorHandler;
