import express from "express";

import * as auth from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  addFavouriteSchema,
} from "../validation/auth.validation.js";

const router = express.Router();

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

export default router;
