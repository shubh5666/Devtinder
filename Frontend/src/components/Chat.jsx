import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Chat = () => {

  // Get target user's id from URL
  // Example: /chat/12345
  const { targetUserId } = useParams();

  // Store chat messages
  const [messages, setMessages] = useState([]);

  // Store current input message
  const [newMessage, setNewMessage] = useState("");

  // Store socket connection instance
  const [socket, setSocket] = useState(null);

  // Get logged-in user from Redux store
  const user = useSelector((store) => store.user);

  const userId = user?._id;

  useEffect(() => {

    // Wait until user data is available
    if (!userId) return;

    // Create socket connection
    const socketConnection = createSocketConnection();

    setSocket(socketConnection);

    // Join private chat room
    socketConnection.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    // Listen for incoming messages
    socketConnection.on(
      "messageReceived",
      ({ firstName, text }) => {
        console.log("RECEIVED =>", firstName, text);

        // Add received message to chat
        setMessages((messages) => [
          ...messages,
          { firstName, text },
        ]);
      }
    );

    // Cleanup socket connection
    return () => {
      socketConnection.disconnect();
    };

  }, [userId, targetUserId]);

  // Send message to socket server
  const sendMessage = () => {

    if (!socket) return;

    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    // Clear input field
    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[78vh] flex flex-col">

      {/* Chat Header */}
      <h1 className="p-5 border-b border-gray-600 text-xl font-bold">
        Chat
      </h1>

      {/* Messages Section */}
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => (
          <div key={index} className="chat chat-start">

            <div className="chat-header">
              {msg.firstName}
            </div>

            <div className="chat-bubble">
              {msg.text}
            </div>

          </div>
        ))}
      </div>

      {/* Message Input Section */}
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">

        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-500 rounded p-2"
        />

        <button
          onClick={sendMessage}
          className="btn btn-secondary"
        >
          Send
        </button>

      </div>

    </div>
  );
};

export default Chat;


/*
==========================================
CHAT FLOW

1. User opens chat page

2. Socket connection is created

3. User joins a private room

4. User sends a message

5. Backend receives message

6. Backend emits message to room

7. All users in room receive message

8. Message is added to UI

9. Socket disconnects on unmount

==========================================
*/