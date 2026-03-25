import { Server, Socket } from "socket.io";
import { SOCKET_EVENTS } from "../utils/constants.js";

const onlineUsers = new Set<string>();

export const handlePresence = (io: Server, socket: Socket) => {
  const userId = socket.data.user.id;

  onlineUsers.add(userId);

  io.emit(SOCKET_EVENTS.PRESENCE, {
    count: onlineUsers.size,
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);

    io.emit(SOCKET_EVENTS.PRESENCE, {
      count: onlineUsers.size,
    });
  });
};