import { Router } from "express";
import { register, login, logout, me } from "../controllers/auth.controller.js";
import { validateRegister, validateLogin } from "../middlewares/validateAuth.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);
router.get("/me", protect, me);

export default router;