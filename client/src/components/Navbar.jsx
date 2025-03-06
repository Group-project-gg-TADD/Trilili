import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import axios from "../config/axiosInstance";
import logo from "../assets/logo.png";
import profileIcon from "../assets/profile.png";
import { toast } from "react-toastify";
import BoardesContext from "../context1/TodoBoardes";

export default function Navbar() {  // ✅ Ensure fetchBoards is received as a prop
  const navigate = useNavigate();
  const { boards, setBoards, fetchBoards } = useContext(BoardesContext)
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [nameBoard, setNameBoard] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleAddBoard = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "POST",
        url: "/board",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: {
          name: nameBoard,
        },
      });

      // if (typeof fetchBoards === "function") {
      fetchBoards(); // ✅ Ensure fetchBoards is called only if it exists
      // }

      setShowModal(false);
      setNameBoard("");
    } catch (error) {
      console.error("Error creating board: ", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-[#2C3E50] py-3 shadow-md z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-auto h-10" />
          </div>

          <div className="flex space-x-6">
            <NavLink to="/" className="text-white text-lg font-semibold hover:text-[#BDC3C7] transition">
              Board
            </NavLink>
            <button
              onClick={() => setShowModal(true)}
              className="text-white text-lg font-semibold hover:text-[#BDC3C7] transition"
            >
              Add Board
            </button>
          </div>

          <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)} className="focus:outline-none">
              <img src={profileIcon} alt="Profile" className="w-10 h-10 rounded-full cursor-pointer" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-[#2C3E50] hover:bg-[#BDC3C7] rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Add Padding so Content is Not Hidden Behind Navbar */}
      <div className="pt-16"></div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 z-50">
            <h2 className="text-lg font-bold text-[#2C3E50] mb-4">Create Board</h2>
            <form onSubmit={handleAddBoard} className="space-y-4">
              <input
                type="text"
                placeholder="Board Name"
                className="w-full px-3 py-2 border border-[#BDC3C7] rounded-lg focus:ring-2 focus:ring-[#85C1E9] focus:outline-none"
                value={nameBoard}
                onChange={(e) => setNameBoard(e.target.value)}
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#BDC3C7] text-white rounded-lg hover:bg-[#2C3E50] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#85C1E9] text-white rounded-lg hover:bg-[#2C3E50] transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
