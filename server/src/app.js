import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { env } from "./config/env.js";

const app = express();

// credentials: true => browser cookies bhej/le sakta hai (Phase 3 mein JWT cookie ke liye zaroori)
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  // readyState 1 = connected
  const dbConnected = mongoose.connection.readyState === 1;
  res.json({ status: "ok", db: dbConnected ? "connected" : "disconnected" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

// Central error handler (4 arguments hone chahiye, tabhi Express ise error handler maanta hai)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong",
  });
});

export default app;