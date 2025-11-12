import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {  //req = incoming request, res = response, next = function to pass control to the next middleware or controller.
  try {
    const token = req.cookies.token;  //Gets the JWT token from cookies (you set it in your login controller with .cookie("token", token, {...})) in auth controller file.
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //If the token is valid, it decodes and returns the payload you set in login, e.g.: { id: ..., role: ... }
    next();  //Passes control to the next middleware or controller.If this line is not called, the request stops here.
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default isAuthenticated;
