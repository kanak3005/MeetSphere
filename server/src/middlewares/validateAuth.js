import ApiError from "../utils/ApiError.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isEmail = (value) =>
  typeof value === "string" && EMAIL_REGEX.test(value.trim());

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body ?? {};
  const errors = {};

  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 50) {
    errors.name = "Name must be 2 to 50 characters";
  }
  if (!isEmail(email)) {
    errors.email = "Enter a valid email address";
  }
  // bcrypt sirf pehle 72 bytes use karta hai, isliye max 72
  if (typeof password !== "string" || password.length < 8 || password.length > 72) {
    errors.password = "Password must be 8 to 72 characters";
  }

  if (Object.keys(errors).length > 0) {
    return next(new ApiError(400, "Please fix the highlighted fields", errors));
  }

  // typeof string check ki wajah se { "$gt": "" } jaisa object yahan tak nahi aa sakta
  req.body = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
  };
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body ?? {};
  const errors = {};

  if (!isEmail(email)) errors.email = "Enter a valid email address";
  if (typeof password !== "string" || password.length === 0) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    return next(new ApiError(400, "Please fix the highlighted fields", errors));
  }

  req.body = { email: email.trim().toLowerCase(), password };
  next();
};