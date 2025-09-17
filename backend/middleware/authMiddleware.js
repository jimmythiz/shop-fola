import jwt from "jsonwebtoken";
import User from "../schema/UserSchema.js";

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized." });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden." });
    }
    req.user = user;
    next();
  });
};

export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });
    if (user.role !== "Admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
