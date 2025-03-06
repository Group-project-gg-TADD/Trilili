import axios from "axios";

const instance = axios.create({
  baseURL: "https://server.timmytech.fun",
});

export default instance;
