import express from "express";
const userRouter = express.Router();

import {
  signUp,
  resetPassword,            // request password reset
  confirmPasswordReset,     // confirm with token
  verifyAccount,
  updateAccount,
  deleteAccount,
  getSingleUser,
  getAllUsers,
} from "../controllers/usercontroller.js";
import { isAdmin, isAuthenticated, } from "../middleware/authMiddleware.js";

// Auth
userRouter.post("/signup", signUp);

// Email verification
userRouter.get("/verify", verifyAccount); 
// OR use query: /verify?token=abc123

// Password reset
userRouter.post("/reset-password", resetPassword);         // request
userRouter.post("/reset-password/confirm", confirmPasswordReset); // confirm

// Account management
userRouter.put("/update/:id",isAuthenticated, updateAccount);
userRouter.delete("/delete/:id",isAuthenticated, deleteAccount);

// Users
userRouter.get("/",isAuthenticated, isAdmin, getAllUsers);
userRouter.get("/:id",isAuthenticated,isAdmin, getSingleUser);

export default userRouter;
