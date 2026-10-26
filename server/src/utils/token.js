import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const COOKIE_NAME = "token";

// JWT expiry aur cookie expiry same rakhne ke liye ek hi constant
const SESSION_DAYS = 7;

const cookieOptions = {
  httpOnly: true, // JS cookie padh nahi sakta (XSS se bachav)
  secure: env.nodeEnv === "production", // production mein sirf HTTPS
  // "lax": cross-site POST pe cookie nahi jaati (CSRF bachav).
  // Agar client aur server alag domains par deploy karo toh "none" + secure lagega.
  sameSite: "lax",
  maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000,
};

export const signToken = (userId) =>
  jwt.sign({ id: String(userId) }, env.jwtSecret, {
    expiresIn: `${SESSION_DAYS}d`,
  });

// Invalid/expired token par ye error throw karta hai (error middleware 401 bana dega)
export const verifyToken = (token) => jwt.verify(token, env.jwtSecret);

export const setAuthCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, cookieOptions);
};

export const clearAuthCookie = (res) => {
  // clear karte waqt wahi options chahiye jo set karte waqt the (maxAge ko chhod kar)
  const { maxAge, ...clearOptions } = cookieOptions;
  res.clearCookie(COOKIE_NAME, clearOptions);
};