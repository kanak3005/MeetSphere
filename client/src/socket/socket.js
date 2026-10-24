import { io } from "socket.io-client";

// autoConnect: false => hum khud decide karenge kab connect karna hai (login ke baad)
export const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});