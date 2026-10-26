import bcrypt from "bcryptjs";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

// Jab email DB mein nahi milta tab bhi ek bcrypt compare chalate hain,
// taaki response time se attacker ko pata na chale ki email registered hai ya nahi
const DUMMY_HASH = bcrypt.hashSync("dummy-password-for-timing", 12);

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, "An account with this email already exists", {
      email: "This email is already registered",
    });
  }
  return User.create({ name, email, password });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  const isMatch = user
    ? await user.comparePassword(password)
    : await bcrypt.compare(password, DUMMY_HASH).then(() => false);

  // Dono cases (email galat / password galat) mein same message
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }
  return user;
};