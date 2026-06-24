const express = require("express");
const router = express.Router();

const clothingItem = require("../controllers/clothingItem.controller");
const validate = require("../middleware/validate.middleware");
const {
  createClothingItemSchema,
} = require("../validation/clothingItem.validation");

router.post(
  "/api/clothing-items",
  validate(createClothingItemSchema),
  clothingItem.postImage,
);

router.delete("/api/clothing-items/:id", clothingItem.deleteClothingItem);

router.get(
  "/api/clothing-items/random/:item/:tempToday/:rainToday",
  clothingItem.getRandomItem,
);

router.get("/api/clothing-items/:item", clothingItem.getAllItems);

router.get("/api/health", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
