import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { env } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// credentials: true => browser cookies bhej/le sakta hai
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  res.json({ status: "ok", db: dbConnected ? "connected" : "disconnected" });
});

app.use("/api/auth", authRoutes);

// Order important hai: routes ke baad notFound, sabse last mein errorHandler
app.use(notFound);
app.use(errorHandler);

export default app;

// app.js → Express application configure karta hai:
// - middlewares
// - routes
// - 404 handler
// - error handler

// server.js → application ko actually run karta hai:
// - HTTP server create
// - Socket.IO attach
// - MongoDB connect
// - listen() se server start