import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  updateProfile
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/auth.js";  //Imports the middleware to check if the user is logged in (valid token).
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Public routes
router.post("/register", singleUpload , registerUser); // User signup
router.post("/login", loginUser);       // User login

// Protected routes (need login)
router.get("/profile", isAuthenticated, getUserProfile); // Get profile
router.post("/logout", isAuthenticated, logoutUser);     // Logout
// auth first -> then file parser -> then controller
router.patch("/profile/update", isAuthenticated,singleUpload, updateProfile); // Update profile

export default router;
