const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth.controllers");
const { verifyToken } = require("../middleware/auth.middleware");

// User routes
router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/profile", verifyToken, auth.profile);
router.delete("/profile/delete/:id", auth.deleteProfile);
router.put("/profile/update/:id", auth.updateProfile);
router.get("/favorites", auth.getFavorites);
router.put("/favorites/add/:id", auth.addFavorite);
router.put("/favorites/remove/:id", auth.removeFavorite);
router.get("/logout", auth.logout);

module.exports = router;
