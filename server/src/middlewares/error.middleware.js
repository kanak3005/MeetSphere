import { env } from "../config/env.js";

export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

// 4 arguments zaroori hain, tabhi Express ise error handler maanta hai
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
  let errors = err.errors || null;

  // Mongo duplicate key (unique index)
  if (err.code === 11000) {
    statusCode = 409;
    message = "An account with this email already exists";
    errors = { email: "This email is already registered" };
  }

  // Mongoose schema validation fail
  if (err.name === "ValidationError" && err.errors) {
    statusCode = 400;
    message = "Please fix the highlighted fields";
    errors = Object.fromEntries(
      Object.entries(err.errors).map(([field, e]) => [field, e.message])
    );
  }

  // JWT invalid / expired
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Session expired. Please log in again.";
  }

  // Unexpected errors: log karo, user ko internal details mat dikhao
  if (statusCode === 500) {
    console.error(err);
    if (env.nodeEnv === "production") message = "Internal server error";
  }

  res.status(statusCode).json({ success: false, message, errors });
};