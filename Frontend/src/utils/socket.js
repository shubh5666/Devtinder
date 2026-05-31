import { io } from "socket.io-client";
import { BASE_URL } from "./constants";


// ==========================================
// SOCKET CONNECTION UTILITY
//
// Creates and returns a Socket.IO
// connection to the backend server.
// ==========================================

export const createSocketConnection = () => {

     // Establish socket connection
     // with cookie-based authentication
     return io(BASE_URL, {
        withCredentials: true,
     });

};