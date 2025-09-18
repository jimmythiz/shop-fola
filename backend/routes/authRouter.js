import express from "express";
import { logIn, refreshToken, logout, loginAdmin  } from "../controllers/authController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/login", logIn);
authRouter.post("/admin/login", loginAdmin);
authRouter.post("/refresh-token", refreshToken);
authRouter.post("/logout", logout);

export default authRouter;
