import axios from "../config/axiosInstance";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardBoardes from "../components/CardBoardes";
import CardBoardsMember from "../components/CardBoardsMember";
import BoardesContext from "../context1/TodoBoardes";


export default function Boardes() {

  const { boards, setBoards, fetchBoards } = useContext(BoardesContext)
  const { nameBoard, setNameBoard, handleAddBoard } = useContext(BoardesContext)
  const { boardsMember, setBoardsMember, fetchBoardsMember } = useContext(BoardesContext)

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
