const errorHandler = (error, req, res, next) => {
  console.error("Global error handler:", error);

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    message: error.message || "Internal server error",
  });
};

module.exports = errorHandler;
