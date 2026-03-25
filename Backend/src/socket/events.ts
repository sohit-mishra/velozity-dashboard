import { Server, Socket } from "socket.io";
import { SOCKET_EVENTS, ROLES } from "../utils/constants.js";

export const registerEvents = (io: Server, socket: Socket) => {
  const user = socket.data.user;

  socket.on(SOCKET_EVENTS.TASK_UPDATED, (data) => {
    const { taskId, projectId, fromStatus, toStatus } = data;

    const payload = {
      taskId,
      projectId,
      userId: user.id,
      role: user.role,
      fromStatus,
      toStatus,
      timestamp: new Date(),
    };

    io.to(`project:${projectId}`).emit(SOCKET_EVENTS.ACTIVITY, payload);

    if (user.role === ROLES.ADMIN) {
      io.emit("admin:activity", payload);
    }
  });

  
  socket.on(SOCKET_EVENTS.NOTIFICATION, ({ userId, message }) => {
    io.to(`user:${userId}`).emit(SOCKET_EVENTS.NOTIFICATION, {
      message,
      timestamp: new Date(),
    });
  });
};