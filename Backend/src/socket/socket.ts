import { Server } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

import { handleJoinRoom } from "./rooms.js";
import { handlePresence } from "./presence.js";
import { registerEvents } from "./events.js";

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization?.split(" ")[1];

      if (!token) return next(new Error("Unauthorized"));

      const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET!) as any;

      socket.data.user = decoded;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    handlePresence(io, socket);
    handleJoinRoom(socket);
    registerEvents(io, socket);
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};