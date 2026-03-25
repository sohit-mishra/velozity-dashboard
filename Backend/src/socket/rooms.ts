import { Socket } from "socket.io";
import { SOCKET_EVENTS } from "../utils/constants.js";

export const handleJoinRoom = (socket: Socket) => {
  socket.on(SOCKET_EVENTS.JOIN_PROJECT, (projectId: string) => {
    socket.join(`project:${projectId}`);
  });

  socket.on(SOCKET_EVENTS.LEAVE_PROJECT, (projectId: string) => {
    socket.leave(`project:${projectId}`);
  });
};