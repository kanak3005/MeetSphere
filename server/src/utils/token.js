import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

// User Login
//    ↓
// JWT token generate
//    ↓
// Token ko HTTP-only cookie mein store
//    ↓
// Har protected request mein cookie automatically server ko jaati hai
//    ↓
// Server token verify karta hai
//    ↓
// User authenticated hai ya nahi decide hota hai

export const COOKIE_NAME = "token";//Hum browser mein JWT ko kis cookie ke naam se store karenge?

// JWT expiry aur cookie expiry same rakhne ke liye ek hi constant
const SESSION_DAYS = 7;//User ka authentication session 7 days ka hai.

const cookieOptions = {
  httpOnly: true, // Browser ki JavaScript directly is cookie ko read nahi kar sakti.
  secure: env.nodeEnv === "production", // production mein sirf HTTPS
//  Agar production hai -> secure = true - https://myapp.com allow ( bcoz https hai)
// Agar development hai -> secure = false - http://myapp.com not allow ( plain http )

  sameSite: "lax", //Browser ko batata hai ki cookie cross-site request(Ek website/domain se doosri website/domain par request jaana.) ke saath kab bhejni allowed hai.
// lax ek relatively restrictive setting hai aur common authentication setup mein useful hai.
  maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000, //7 days × 24 hours × 60 minutes × 60 seconds × 1000 milliseconds
  //Because JavaScript maxAge milliseconds mein leta hai.
};

//Now actual JWT creation:
export const signToken = (userId) =>
  jwt.sign({ id: String(userId) }, env.jwtSecret, { //HEADER.PAYLOAD.SIGNATURE
    expiresIn: `${SESSION_DAYS}d`,
  });

// Invalid/expired token par ye error throw karta hai (error middleware 401 bana dega)
export const verifyToken = (token) => jwt.verify(token, env.jwtSecret);

export const setAuthCookie = (res, token) => { // Ye function JWT ko browser cookie mein store karne ke liye hai.
  res.cookie(COOKIE_NAME, token, cookieOptions);
};

export const clearAuthCookie = (res) => {
  // clear karte waqt wahi options chahiye jo set karte waqt the (maxAge ko chhod kar) islye maxAge ko alag nikal liya baaki options se
  const { maxAge, ...clearOptions } = cookieOptions;
  res.clearCookie(COOKIE_NAME, clearOptions);
};