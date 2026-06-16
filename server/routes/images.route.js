const express = require("express");
const router = express.Router();

const image = require("../controllers/image.controllers");

// MVP routes
router.post("/upload", image.postImage);
router.get("/getRandomItem/:item/:tempToday/:rainToday", image.getRandomItem);
router.get("/getAllItems/:item", image.getAllItems);

router.get("/test", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
