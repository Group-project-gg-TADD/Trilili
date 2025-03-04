import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

export default function Project() {
  const [boards, setBoards] = useState([]);

  const fetchBoards = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/board",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data);
      setBoards(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  console.log(boards);

  useEffect(() => {
    fetchBoards();
  }, []);
  return <></>;
}
