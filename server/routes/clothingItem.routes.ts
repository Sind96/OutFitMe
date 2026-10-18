import express from "express";

import * as clothingItem from "../controllers/clothingItem.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createClothingItemSchema } from "../validation/clothingItem.validation.js";

const router = express.Router();

router.post(
  "/api/clothing-items",
  verifyToken,
  validate(createClothingItemSchema),
  clothingItem.postImage,
);

router.get(
  "/api/clothing-items/random/:item/:tempToday/:rainToday",
  verifyToken,
  clothingItem.getRandomItem,
);

router.get("/api/clothing-items/:item", verifyToken, clothingItem.getAllItems);

router.delete(
  "/api/clothing-items/:id",
  verifyToken,
  clothingItem.deleteClothingItem,
);

router.get("/api/health", (_req, res) => {
  res.sendStatus(200);
});

export default router;
