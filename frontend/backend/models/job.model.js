import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,  // array of requirements ["JavaScript", "React"]
      }
    ],
    salary: {
      type: Number,
      required: true,
    },
    experienceLevel:{
        type:Number,
        required:true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"], // fixed choices
      default: "Full-time",
    },
    position: {
      type: Number,  // number of openings
      default: 1,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId, // link to company model
      ref: "Company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId, // link to recruiter (User model)
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId, // list of applications
        ref: "Application",
      }
    ]
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
