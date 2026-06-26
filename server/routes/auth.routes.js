const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  registerSchema,
  loginSchema,
} = require("../validation/auth.validation");

router.post("/register", validate(registerSchema), auth.register);
router.post("/login", validate(loginSchema), auth.login);
router.get("/profile", verifyToken, auth.profile);
router.delete("/profile/delete/:id", auth.deleteProfile);
router.put("/profile/update/:id", auth.updateProfile);
router.get("/favourites/:id", auth.getFavourites);
router.put("/favourites/add/:id", auth.addFavourite);
router.delete("/favourites/remove/:userId/:favouriteId", auth.removeFavourite);
router.get("/logout", auth.logout);

module.exports = router;
