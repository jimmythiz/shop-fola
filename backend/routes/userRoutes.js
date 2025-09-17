import express from "express";
const userRouter = express.Router();

import {
  signUp,
  logIn,
  resetPassword,            // request password reset
  confirmPasswordReset,     // confirm with token
  verifyAccount,
  updateAccount,
  deleteAccount,
  getSingleUser,
  getAllUsers
} from "../controllers/usercontroller.js";

// Auth
userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);

// Email verification
userRouter.get("/verify", verifyAccount); 
// OR use query: /verify?token=abc123

// Password reset
userRouter.post("/reset-password", resetPassword);         // request
userRouter.post("/reset-password/confirm", confirmPasswordReset); // confirm

// Account management
userRouter.put("/update/:id", updateAccount);
userRouter.delete("/delete/:id", deleteAccount);

// Users
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getSingleUser);

export default userRouter;
