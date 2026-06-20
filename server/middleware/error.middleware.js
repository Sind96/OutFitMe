const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    console.error("Global error handler:", error);
  }

  return res.status(statusCode).json({
    message: error.message || "Internal server error",
  });
};

module.exports = errorHandler;
