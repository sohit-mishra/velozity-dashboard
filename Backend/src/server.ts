import http from "http";
import app from "./app.js";
import env from "./config/env.js";
import { initSocket } from "./socket/socket.js";
import { startOverdueJob } from "./jobs/overdue.job.js";

const server = http.createServer(app);

initSocket(server);

startOverdueJob();

const PORT = Number(env.PORT) || 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});