import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";

const httpServer = http.createServer(app);

const io = new Server(httpServer, { //Socket.IO ko existing HTTP server ke saath attach kar diya. - Same server/port.
  cors: { origin: env.clientUrl, credentials: true }, // Socket.IO connection allow frontend origin - localhost:5173
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", socket.id, reason);
  });
});

const start = async () => { //Server start karne ka main function.
  try {
    await connectDB();
    httpServer.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

start();