import axios from "../config/axiosInstance";
import { useEffect, useState } from "react";

export default function Boardes() {
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
    } catch (error) {
      //   toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return <div>Board</div>;
}
