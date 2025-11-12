import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // reference to Job model
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to User model
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending", // initial state
    },
    resume: {
      type: String, // store file path or cloud URL
      required: true,
    },
    coverLetter: {
      type: String, // optional text field
    },
  },
  { timestamps: true } // adds createdAt, updatedAt
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
