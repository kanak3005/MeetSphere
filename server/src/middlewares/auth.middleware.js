import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { COOKIE_NAME, verifyToken } from "../utils/token.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    throw new ApiError(401, "Not authenticated");
  }

  // Invalid ya expired token par yahan error throw hota hai -> error middleware 401 deta hai
  const decoded = verifyToken(token);

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(401, "Account no longer exists");
  }

  req.user = user;
  next();
});