const express = require("express");
const router = express.Router();

const clothingItem = require("../controllers/clothingItem.controller");

router.post("/api/clothing-items", clothingItem.postImage);

router.get(
  "/api/clothing-items/random/:item/:tempToday/:rainToday",
  clothingItem.getRandomItem,
);

router.get("/api/clothing-items/:item", clothingItem.getAllItems);

router.get("/api/health", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
