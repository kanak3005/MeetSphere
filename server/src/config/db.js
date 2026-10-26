import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {//MongoDB se connection establish karna.
  await mongoose.connect(env.mongoUri);
  console.log("MongoDB connected");
};