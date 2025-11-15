"use client";

import { io } from "socket.io-client";

// Socket.IO client configuration
export const socket = io({
  path: "/api/socket",
  autoConnect: true,
  transports: ["websocket", "polling"],
});
