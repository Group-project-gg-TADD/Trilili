import { useEffect, useState } from "react";
import socket from "../config/socket";
import loadGemini from '../config/geminiAi'

export default function Comment({ boardId }) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
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
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-5 right-5 bg-[#85C1E9] text-white p-3 rounded-full shadow-lg hover:bg-[#2C3E50] transition"
      >
        💬 Chat
      </button>

      {/* Floating Chat Box */}
      {showChat && (
        <div className="fixed right-5 bottom-16 w-96 bg-white rounded-lg shadow-lg border border-gray-300">
          {/* Header */}
          <div className="flex justify-between items-center bg-[#85C1E9] text-white px-4 py-3 rounded-t-lg">
            <h2 className="text-lg font-semibold">Chat Room</h2>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:text-gray-300 transition"
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatBoxRef}
            className="h-80 overflow-y-auto border p-3 rounded-md bg-gray-100"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`mb-2 p-2 rounded-lg text-sm max-w-xs ${
                  localStorage.getItem("username") === m.sender
                    ? "bg-[#85C1E9] text-white self-end ml-auto"
                    : "bg-white text-[#2C3E50] border self-start"
                }`}
              >
                <span className="block text-xs text-gray-500">{m.sender}</span>
                {m.message}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="flex p-2 border-t bg-white">
            <input
              type="text"
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-[#85C1E9]"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-[#85C1E9] text-white rounded-md hover:bg-[#2C3E50] transition"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );

  // return (
  //   <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg h-screen flex flex-col">
  //     <div className="flex h-full border rounded-lg overflow-hidden">
  //       {/* Sidebar Online Users */}
  //       <div className="w-1/3 bg-gray-100 border-r p-4 overflow-y-auto">
  //         <h2 className="text-lg font-semibold mb-4">Online Users</h2>
  //         <ul>
  //           {onlineUsers.map((ou) => (
  //             <li
  //               key={ou.socketId}
  //               className="flex items-center gap-2 py-2 border-b"
  //             >
  //               <span className="w-3 h-3 bg-green-500 rounded-full"></span>
  //               {ou.username}
  //             </li>
  //           ))}
  //         </ul>
  //       </div>

  //       {/* Chat Section */}
  //       <div className="w-2/3 flex flex-col">
  //         <div className="p-4 border-b bg-gray-200 text-lg font-semibold text-center">
  //           Chat Messages
  //         </div>
  //         <div className="flex-1 p-4 overflow-y-auto space-y-4">
  //           {messages.map((m, index) => (
  //             <div
  //               key={index}
  //               className={`flex ${
  //                 localStorage.getItem("username") === m.sender
  //                   ? "justify-end"
  //                   : "justify-start"
  //               }`}
  //             >
  //               <div
  //                 className={`p-3 rounded-lg text-sm max-w-xs sm:max-w-md ${
  //                   localStorage.getItem("username") === m.sender
  //                     ? "bg-blue-500 text-white"
  //                     : "bg-gray-200 text-gray-700"
  //                 }`}
  //               >
  //                 <span className="block font-semibold">{m.sender}</span>
  //                 {m.message}
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //         <form
  //           onSubmit={handleSubmit}
  //           className="p-4 border-t flex gap-2 bg-gray-100"
  //         >
  //           <input
  //             type="text"
  //             placeholder="Write your message..."
  //             className="flex-1 p-2 rounded-md border focus:outline-none"
  //             onChange={(e) => setNewMessage(e.target.value)}
  //             value={newMessage}
  //           />
  //           <button
  //             type="submit"
  //             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
  //           >
  //             Send
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
}
