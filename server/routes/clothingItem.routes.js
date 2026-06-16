const express = require("express");
const router = express.Router();

const clothingItem = require("../controllers/clothingItem.controller");

// MVP routes
router.post("/upload", clothingItem.postImage);
router.get("/getRandomItem/:item/:tempToday/:rainToday", clothingItem.getRandomItem);
router.get("/getAllItems/:item", clothingItem.getAllItems);

router.get("/test", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
