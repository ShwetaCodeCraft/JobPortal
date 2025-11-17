import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import isRecruiter from "../middlewares/isRecruiter.js";
import { singleUpload } from "../middlewares/multer.js";
import { 
  applyJob, 
  getApplicants, 
  getAppliedJobs, 
  updateStatus 
} from "../controllers/application.controller.js";

const router = express.Router();

// Apply for a job (Candidate)
router.post("/apply/:id", isAuthenticated,singleUpload, applyJob);

// Get all jobs applied by the logged-in user (Candidate)
router.get("/me", isAuthenticated, getAppliedJobs);

// Get all applicants for a specific job (Recruiter/Admin)
router.get("/:id/applicants", isAuthenticated, isRecruiter, getApplicants);

// Update application status (Recruiter/Admin)
router.put("/:id/status", isAuthenticated,isRecruiter, updateStatus);

export default router;
