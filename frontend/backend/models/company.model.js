import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  // company must have a name
      trim: true,
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    logo: {
      type: String,  // store image URL
      default: "",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   // recruiter who created the company profile
      required: true,
    },
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",  // list of jobs this company has posted
      }
    ],
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
