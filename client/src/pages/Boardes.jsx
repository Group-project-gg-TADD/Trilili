import axios from "../config/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardBoardes from "../components/CardBoardes";
import CardBoardsMember from "../components/CardBoardsMember";

export default function Boardes() {
  const [boards, setBoards] = useState([]);
  const [boardsMember, setBoardsMember] = useState([]);

  const fetchBoards = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/board",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setBoards(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchBoardsMember = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/boardMembers",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setBoardsMember(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBoards();
    fetchBoardsMember();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#2C3E50] text-center mb-6">My Boards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {boards.map((board) => (
          <CardBoardes board={board} key={board.id} />
        ))}
      </div>

      <h1 className="text-2xl font-bold text-[#2C3E50] text-center mt-10 mb-6">Joined Boards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {boardsMember.map((boardMember) => {
          const board = boards.find((b) => b.id === boardMember.boardId); 
          return board ? <CardBoardsMember boardMember={boardMember} board={board} key={boardMember.boardId} /> : null;
        })}
      </div>
    </div>
  );
}
