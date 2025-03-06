import { io } from "socket.io-client";

const socket = io("https://server.timmytech.fun", {
  auth: (cb) => {
    cb({
      token: localStorage.getItem("access_token"),
    });
  },
});
console.log(socket);

export default socket;
