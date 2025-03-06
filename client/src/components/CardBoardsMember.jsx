import { Link } from "react-router";

export default function CardBoardsMember({ boardMember, board }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-[#BDC3C7] text-[#2C3E50] transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="p-6">
        <h2 className="text-xl font-semibold">{board.name}</h2> 
        <Link
          to={`/board/${boardMember.boardId}`}
          className="mt-4 inline-block px-4 py-2 bg-[#85C1E9] text-[#2C3E50] font-semibold rounded-lg shadow-md hover:bg-[#2C3E50] hover:text-white transition"
        >
          Join Board
        </Link>
      </div>
    </div>
  );
}
