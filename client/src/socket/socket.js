import { io } from "socket.io-client"; //Client-side Socket.IO library.

// autoConnect: false => hum khud decide karenge kab connect karna hai (login ke baad)
export const socket = io(import.meta.env.VITE_SOCKET_URL, { //if VITE_SOCKET_URL=http://localhost:5000 so frontend knows Socket.IO server kahan hai.
  autoConnect: false, // normally React app starts -> Socket automatically connects
  // but we wants -Automatically connect mat karo.Later authentication ke baad manually: socket.connect();
  withCredentials: true,
});