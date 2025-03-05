import axios from "../config/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardBoardes from "../components/CardBoardes";

export default function Boardes() {
  const [boards, setBoards] = useState([]);
  const [nameBoard, setNameBoard] = useState("");

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

  const handleAddBoard = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "/board",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: {
          name: nameBoard,
        },
      });
      console.log(data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap w-full justify-center p-4">
        <form
          onSubmit={handleAddBoard}
          className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4"
        >
          <label
            htmlFor="boardName"
            className="block text-lg font-medium text-gray-700"
          >
            Create Board
          </label>
          <input
            onChange={(e) => setNameBoard(e.target.value)}
            type="text"
            id="boardName"
            placeholder="Name board"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Create Board
          </button>
        </form>
      </div>
      <div className="container mx-auto px-4 gap-6 p-4">
        <div className="flex flex-wrap justify-center gap-6">
          {boards.map((board) => (
            <CardBoardes board={board} key={board.id} />
          ))}
        </div>
      </div>
    </>
  );
}
