import express from "express"; //Framework for building APIs and web apps with Node.js.
import cookieParser from "cookie-parser";  //Middleware that parses cookies attached to client requests (useful for authentication, sessions).
import cors from "cors"; //Middleware that enables CORS (Cross-Origin Resource Sharing) → allows your frontend (running on another origin like http://localhost:5173) to call this backend.
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";



dotenv.config();  //Loads all variables from the .env file into process.env.

const app = express();

// Middlewares    -middleware is just a function that runs between the request (req) coming from the client and the response (res) sent by the server.
app.use(express.json()); // This middleware automatically parses incoming requests that contain JSON data.
app.use(express.urlencoded({ extended: true }));  //Parses data from HTML forms (application/x-www-form-urlencoded).
app.use(cookieParser());  //Parses cookies in incoming requests, attaches them to req.cookies.

const corsOptions = {
  origin: "http://localhost:5173", // frontend origin
  credentials: true, // credentials: true is important when you use cookies for authentication — otherwise cookies won’t be sent across domains.
};
app.use(cors(corsOptions)); 

const PORT = process.env.PORT || 3000;


//apis  //Mounts different route files
app.use("/api/v1/user", userRoute);  //in Express, route paths must start with a slash.
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);



// Connect DB first, then run server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
