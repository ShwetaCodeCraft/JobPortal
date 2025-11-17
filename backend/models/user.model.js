import mongoose from "mongoose";

// Define the User schema  - a blueprint that describes how a User document should look in MongoDB
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,  //Removes extra spaces (e.g., " Shweta " → "Shweta").
    },
    email: {
      type: String, 
      required: true,
      unique: true,
      lowercase: true, //convert email to lowercase automatically
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],  //Regular expression ensures a valid email format. If invalid, shows error message.
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phoneNumber: {
      type: String,  // better than Number   --Stored as String (not Number) because phone numbers may start with 0 or +91.
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      default: "student",
    },
    profile: { //nested obj
      bio: { type: String },
      skills: [{ type: String }], //An array of strings (e.g., ["JavaScript", "React"]).
      resume: { type: String }, // url of resume file
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },  //References another MongoDB collection (Company) using its ObjectId. This is how you create relationships in MongoDB.
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }  //Automatically adds:  createdAt → when user was created.  updatedAt → when user was last updated.
);

// Create the model
const User = mongoose.model("User", userSchema);

export default User;
