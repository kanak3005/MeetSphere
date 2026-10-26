import asyncHandler from "../utils/asyncHandler.js";
import { registerUser, loginUser } from "../services/auth.services.js";
import { signToken, setAuthCookie, clearAuthCookie } from "../utils/token.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  // Register ke turant baad auto-login (better UX: dobara login form nahi)
  setAuthCookie(res, signToken(user._id));

  res.status(201).json({ success: true, message: "Account created", user });
});

export const login = asyncHandler(async (req, res) => {
  const user = await loginUser(req.body);

  setAuthCookie(res, signToken(user._id));

  res.json({ success: true, message: "Logged in", user });
});

export const logout = asyncHandler(async (req, res) => {
  clearAuthCookie(res);
  res.json({ success: true, message: "Logged out" });
});

export const me = asyncHandler(async (req, res) => {
  // req.user protect middleware ne set kiya hai
  res.json({ success: true, user: req.user });
});