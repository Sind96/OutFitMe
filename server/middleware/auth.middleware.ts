import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";

const verifyToken: RequestHandler = (req, res, next) => {
  const authorization = req.get("Authorization");

  if (!authorization) {
    res.status(401).json({
      message: "Authorisation token required",
    });
    return;
  }

  const match = /^Bearer ([^\s]+)$/.exec(authorization);

  if (!match) {
    res.status(401).json({
      message: "Invalid authorisation format",
    });
    return;
  }

  if (!process.env.JWT_SECRET) {
    next(new Error("JWT_SECRET is not configured"));
    return;
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
      res.status(401).json({
        message: "Invalid token payload",
      });
      return;
    }

    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    next(error);
  }
};

export { verifyToken };
