// routes/job.route.js
import express from "express";
import {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
} from "../controllers/job.controller.js";

import isAuthenticated from "../middlewares/auth.js";
import isRecruiter from "../middlewares/isRecruiter.js";

const router = express.Router();

// 🔹 Public routes
router.get("/", getAllJobs);         // GET all jobs

// 🔹 Recruiter-only routes
router.post("/", isAuthenticated, isRecruiter, postJob);   // POST new job
router.get("/admin/jobs", isAuthenticated, isRecruiter, getAdminJobs); // GET recruiter/admin jobs

//public routes 
router.get("/:id", getJobById);      // GET job by id


export default router;
