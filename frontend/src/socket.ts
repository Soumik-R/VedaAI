import { io } from "socket.io-client";

// Ensure this points to the backend URL exactly as exposed by Docker over port 5000
export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000");
