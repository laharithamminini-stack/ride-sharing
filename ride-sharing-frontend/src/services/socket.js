
import { io } from "socket.io-client";

const socket = io("https://ride-sharing-backend-r310.onrender.com");

export default socket;