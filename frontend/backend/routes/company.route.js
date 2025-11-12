import express from "express";
import {
  registerCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/auth.js";
import isRecruiter from "../middlewares/isRecruiter.js"; // new middleware

const router = express.Router();

// Recruiter-only routes
router.post("/", isAuthenticated, isRecruiter, registerCompany);
router.put("/:id", isAuthenticated, isRecruiter, updateCompany);

// Public routes
router.get("/", getCompanies);
router.get("/:id", getCompanyById);

export default router;
