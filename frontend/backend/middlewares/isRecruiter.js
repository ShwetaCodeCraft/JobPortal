const isRecruiter = (req, res, next) => {
  if (req.user && req.user.role === "recruiter") {
    return next();
  }
  return res.status(403).json({ message: "Access denied: Recruiter only" });
};


export default isRecruiter;