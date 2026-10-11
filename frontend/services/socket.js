import { io } from "socket.io-client";

const SOCKET_URL = "https://chatwave-backend-f6s6.onrender.com";

export const socket = io(SOCKET_URL, {
transports: ["websocket"]
});
