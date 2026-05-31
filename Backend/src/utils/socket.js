// ==========================================
// SOCKET.IO INITIALIZATION
//
// Creates a Socket.IO server and
// enables real-time communication
// between connected users.
// ==========================================

const initializeSocket = (server) => {
  const socketIO = require("socket.io");

  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  // ==========================================
  // CONNECTION EVENT
  //
  // Runs whenever a user establishes
  // a socket connection with the server.
  // ==========================================

  io.on("connection", (socket) => {
    console.log("User Connected");

    // ==========================================
    // JOIN CHAT EVENT
    //
    // Creates a unique room for two users.
    // Both users join the same room so they
    // can exchange messages privately.
    // ==========================================

    socket.on(
      "joinChat",
      ({ firstName, userId, targetUserId }) => {

        // Create a unique room id.
        // Sorting ensures:
        //
        // A_B === B_A
        //
        // Both users always get the
        // same room id.
        const roomId = [userId, targetUserId]
          .sort()
          .join("_");

        console.log("JOIN =>", {
          firstName,
          userId,
          targetUserId,
          roomId,
        });

        // Add current socket to room
        socket.join(roomId);
      }
    );

    // ==========================================
    // SEND MESSAGE EVENT
    //
    // Receives a message from one user
    // and broadcasts it to everyone
    // inside the same chat room.
    // ==========================================

    socket.on(
      "sendMessage",
      ({ firstName, userId, targetUserId, text }) => {

        // Generate the same room id
        // used during joinChat.
        const roomId = [userId, targetUserId]
          .sort()
          .join("_");

        console.log("MESSAGE =>", {
          firstName,
          userId,
          targetUserId,
          roomId,
          text,
        });

        // Send message to all users
        // present in the room.
        io.to(roomId).emit("messageReceived", {
          firstName,
          text,
        });
      }
    );

    // ==========================================
    // DISCONNECT EVENT
    //
    // Runs when a user closes the tab
    // or loses connection.
    // ==========================================

    socket.on("disconnect", () => {
      console.log("User Disconnected");
    });
  });
};

module.exports = initializeSocket;


/*
==========================================
SOCKET FLOW

1. User connects to server

2. Socket connection is established

3. User joins a chat room

4. Room ID is generated using:
   userId + targetUserId

5. User sends a message

6. Server emits message to room

7. All users in room receive message

8. User disconnects

==========================================
*/