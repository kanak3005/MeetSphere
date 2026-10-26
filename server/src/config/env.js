import dotenv from "dotenv";

dotenv.config(); // .env file ko read karta hai.

const required = ["MONGO_URI", "JWT_SECRET"]; //MONGO_URI mandatory hai.
for (const key of required) { //Har required variable ko check karo.
  if (!process.env[key]) { // agar .env mein MONGO_URI nhi mili then Server ko error de do.
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  nodeEnv: process.env.NODE_ENV || "development",
   jwtSecret: process.env.JWT_SECRET,
};