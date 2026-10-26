import api from "./axios";

// Har function response ka data (body) return karta hai

export const registerRequest = async (payload) =>
  (await api.post("/auth/register", payload)).data;

export const loginRequest = async (payload) =>
  (await api.post("/auth/login", payload)).data;

export const logoutRequest = async () => (await api.post("/auth/logout")).data;

export const getMeRequest = async () => (await api.get("/auth/me")).data;