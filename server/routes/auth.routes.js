const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  addFavouriteSchema,
} = require("../validation/auth.validation");

router.post("/register", validate(registerSchema), auth.register);
router.post("/login", validate(loginSchema), auth.login);

router.get("/profile", verifyToken, auth.profile);

router.put(
  "/profile/update",
  verifyToken,
  validate(updateProfileSchema),
  auth.updateProfile,
);

router.delete("/profile/delete", verifyToken, auth.deleteProfile);

router.get("/favourites", verifyToken, auth.getFavourites);

router.post(
  "/favourites",
  verifyToken,
  validate(addFavouriteSchema),
  auth.addFavourite,
);

router.delete("/favourites/:favouriteId", verifyToken, auth.removeFavourite);

module.exports = router;

