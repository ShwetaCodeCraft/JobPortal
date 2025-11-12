import Job from "../models/job.model.js";
import Company from "../models/company.model.js"; // <-- missing import
import Application from "../models/application.model.js";


// Post a new Job
export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, experienceLevel, location, jobType, position, company } = req.body;

    if (!title || !description || !salary || !experienceLevel || !location) {
      return res.status(400).json({
        message: "Title, description, salary, experience level, and location are required",
      });
    }

    // check if company exists
    const existingCompany = await Company.findById(company);
    if (!existingCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    const job = new Job({
      ...req.body,
      requirements: Array.isArray(requirements)
        ? requirements
        : requirements?.split(",").map((r) => r.trim()),
      salary: Number(salary),
      experienceLevel: Number(experienceLevel),
      position: Number(position) || 1,
      created_by: req.user.id, // ✅ set from JWT
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Error posting job", error: error.message });
  }
};



// Get all Jobs
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("company", "name location")
      .populate("created_by", "name email")
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "Jobs not found", success: false });
    }

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
};


// Get Job by ID

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id)
      .populate("company", "name location")
      .populate("applications")
      .populate("created_by", "name email");

    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error: error.message });
  }
};


// Get Admin/Recruiter Jobs

export const getAdminJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ created_by: req.user.id })
      .populate("company", "name location")
      .populate("applications")
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin jobs", error: error.message });
  }
};
