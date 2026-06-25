const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  registerSchema,
  loginSchema,
} = require("../validation/auth.validation");

// User routes
router.post("/register", validate(registerSchema), auth.register);
router.post("/login", validate(loginSchema), auth.login);
router.get("/profile", verifyToken, auth.profile);
router.delete("/profile/delete/:id", auth.deleteProfile);
router.put("/profile/update/:id", auth.updateProfile);
router.get("/favorites/:id", auth.getFavorites);
router.put("/favorites/add/:id", auth.addFavorite);
router.delete("/favorites/remove/:userId/:favoriteId", auth.removeFavorite);
router.get("/logout", auth.logout);

module.exports = router;
