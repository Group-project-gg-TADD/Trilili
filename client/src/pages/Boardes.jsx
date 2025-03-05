import axios from "../config/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardBoardes from "../components/CardBoardes";

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
      setBoards(data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="container mx-auto px-4 gap-6 p-4">
      <div className="flex flex-wrap justify-center gap-6">
        {boards.map((board) => (
          <CardBoardes board={board} key={board.id} />
        ))}
      </div>
    </div>
  );
}
