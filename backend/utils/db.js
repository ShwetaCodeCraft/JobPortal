import mongoose from "mongoose";

// Connect MongoDB
const connectDB = async () => { //Since connecting to a database is a time-consuming (network) operation, we use async so we can await the connection process.
  try {
    await mongoose.connect(process.env.MONGO_URI); //await waits until the connection is established before moving on.
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // stop the app if DB fails.    Immediately stops the Node.js application with exit code 1 (indicates failure).
  }
};

export default connectDB;
