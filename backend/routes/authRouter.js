import express from "express";
import {signUp, logIn, refreshToken, logout, loginAdmin ,getCurrentUser } from "../controllers/authController.js";
import { isAdmin } from "../middleware/authMiddleware.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.post("/login", logIn);
authRouter.post("/admin/login", loginAdmin);
authRouter.post("/refresh-token", refreshToken);
authRouter.post("/logout", logout);
authRouter.get("/me", isAuthenticated, getCurrentUser);

export default authRouter;
