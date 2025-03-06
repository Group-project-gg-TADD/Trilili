import { useEffect, useState } from "react";
import socket from "../config/socket";
import loadGemini from '../config/geminiAi'

export default function Comment({ boardId }) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  console.log(onlineUsers);

  useEffect(() => {
    //1. component dibuka, langsung request join socket comment
    socket.emit("board/join", { boardId });

    socket.on("users/online", (args) => {
      setOnlineUsers(args);
    });

    socket.on("board/update_message", (msgObj) => {
      setMessages((lastMessages) => [...lastMessages, msgObj]);
    });

    // 5. nanti kalo ada yg emit event ini, dari room comment
    // bakalo dimunculin alert
    // socket.on("chat/new_message", (msgObj) => {
    //   alert("msg: " + msgObj);
    //   console.log(msgObj);
    // });

    return () => {
      socket.off("users/online");
      socket.off("board/update_message");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
  
    const gemini = await loadGemini();
    
    const prompt = `Below is a text in either Bahasa Indonesia or Indonesian Slang. Please transform it to be more corporate-friendly and constructive. Return the result in one sentence in Bahasa Indonesia. If there is no clear meaning, return the original text. If it's highly offensive, return 'Saya ingin berkata kasar'.
  
  Text: "${newMessage}"`;
  
    try {
      const result = await gemini.generateContent(prompt);
  
      console.log("Gemini Full Response:", result);
  
      const transformedMessage =
        result.response?.candidates?.[0]?.content?.parts?.[0]?.text || newMessage;
  
      console.log("Transformed Message:", transformedMessage);
  
      socket.emit("board/new_message", {
        boardId,
        newMessage: transformedMessage,
      });
  
      setTimeout(() => {
        setNewMessage("");
      }, 100);
    } catch (error) {
      console.error("Error generating content with Gemini:", error);
    }
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
                className={`flex ${localStorage.getItem("username") === m.sender
                    ? "justify-end"
                    : "justify-start"
                  }`}
              >
                <div
                  className={`p-3 rounded-lg text-sm max-w-xs sm:max-w-md ${localStorage.getItem("username") === m.sender
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
