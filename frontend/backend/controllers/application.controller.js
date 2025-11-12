import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

// Apply for a Job
export const applyJob = async (req, res) => {
    try {
        const userId = req.user.id; // middleware should attach logged-in user id
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            });
        }

        // check if the user has already applied for this job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // create a new application with resume and cover letter.
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
            resume: req.body.resume,       // user must provide resume (URL/path)
            coverLetter: req.body.coverLetter || ""
        });

        // push application (applicant's id) to job's applications list
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true,
            application: newApplication
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get all jobs applied by a user
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 }) //sort the results in ecending order(newest first). -1=decending and 1=ascending.
            .populate({
                path: 'job', //replaces this ObjectId with the full Job document (title, description, salary, etc.).
                populate: { path: 'company' } //inside job → replaces the company ObjectId with full company details (like company name, location, etc.).
            });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            applications
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get all applicants for a job (Admin/Recruiter)
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: { path: 'applicant', select: "-password" }
        });

        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            applicants: job.applications
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Update Application Status (Admin/Recruiter)
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: 'Status is required',
                success: false
            });
        }

        // find the application by id
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true,
            application
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
