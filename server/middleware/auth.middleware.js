const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authorization = req.get("Authorization");

  if (!authorization) {
    return res.status(401).json({
      message: "Authorisation token required",
    });
  }

  const match = /^Bearer ([^\s]+)$/.exec(authorization);

  if (!match) {
    return res.status(401).json({
      message: "Invalid authorisation format",
    });
  }

  if (!process.env.JWT_SECRET) {
    return next(new Error("JWT_SECRET is not configured"));
  }

  try {
    const decoded = jwt.verify(match[1], process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (
      !decoded ||
      typeof decoded !== "object" ||
      typeof decoded.userId !== "string"
    ) {
      return res.status(401).json({
        message: "Invalid token payload",
      });
    }

    req.user = decoded;
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Token expired",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    return next(error);
  }
};

module.exports = { verifyToken };
