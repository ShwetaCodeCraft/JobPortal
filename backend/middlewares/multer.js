// Multer is a middleware for handling file uploads.
// memoryStorage() stores the uploaded file in RAM (in req.file.buffer).
// single("file") means the upload field name must be "file".
// This setup is ideal when uploading files to external services (Cloudinary/S3).
// For security and performance, always validate file types and set size limits.
import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");