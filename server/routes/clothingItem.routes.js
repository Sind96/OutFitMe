const express = require("express");
const router = express.Router();

const clothingItem = require("../controllers/clothingItem.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  createClothingItemSchema,
} = require("../validation/clothingItem.validation");

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

router.get("/api/health", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
