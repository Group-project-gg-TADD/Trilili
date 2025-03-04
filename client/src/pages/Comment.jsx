import { useEffect, useState } from "react";
import socket from "../config/socket";

export default function Comment() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("users/online", (args) => {
      setOnlineUsers(args);
    });

    socket.on("chat/update_message", (msgObj) => {
      setMessages((lastMessages) => [...lastMessages, msgObj]);
    });

    return () => {
      socket.off("users/online");
      socket.off("chat/update_message");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    socket.emit("chat/new_message", newMessage);
    setNewMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg h-screen flex flex-col">
      <div className="flex h-full border rounded-lg overflow-hidden">
        {/* Sidebar Online Users */}
        <div className="w-1/3 bg-gray-100 border-r p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Online Users</h2>
          <ul>
            {onlineUsers.map((ou) => (
              <li
                key={ou.socketId}
                className="flex items-center gap-2 py-2 border-b"
              >
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                {ou.username}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Section */}
        <div className="w-2/3 flex flex-col">
          <div className="p-4 border-b bg-gray-200 text-lg font-semibold text-center">
            Chat Messages
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`flex ${
                  localStorage.getItem("username") === m.sender
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg text-sm max-w-xs sm:max-w-md ${
                    localStorage.getItem("username") === m.sender
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <span className="block font-semibold">{m.sender}</span>
                  {m.message}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t flex gap-2 bg-gray-100"
          >
            <input
              type="text"
              placeholder="Write your message..."
              className="flex-1 p-2 rounded-md border focus:outline-none"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
