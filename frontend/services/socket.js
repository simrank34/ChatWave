import { io } from "socket.io-client";

const SOCKET_URL = "http://10.252.176.119:5000";

export const socket = io(SOCKET_URL, {
transports: ["websocket"]
});
