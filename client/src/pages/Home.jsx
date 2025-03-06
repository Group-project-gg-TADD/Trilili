// import socket from "../config/socket";

import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { BoardContext } from "../context/BoardContext";
import { useState, useEffect } from "react";
import Main from "./Main";
import axios from "../config/axiosInstance";

function Home() {
  const [boards, setBoards] = useState([]);

  //   const fetchBoards = async () => {
  //     try {
  //       const { data } = await axios({
  //         method: "GET",
  //         url: "/board",
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //         },
  //       });
  //       console.log(data);
  //       setBoards(data);
  //     } catch (error) {
  //       toast.error(error.response.data.message);
  //     }
  //   };

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
      setBoards(data); // Menyimpan data ke state boards

      // Memasukkan data boards ke dalam allboard.boards
      setAllBoard((prev) => ({
        ...prev,
        boards: data.map((board) => ({
          name: board.name,
          bgcolor: board.bgcolor || "#069", // Jika tidak ada warna, gunakan default
          list: board.list || [], // Pastikan ada list kosong jika tidak tersedia
        })),
      }));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //   console.log(boards);

  useEffect(() => {
    fetchBoards();
  }, []);

  const boardData = {
    active: 0,
    boards: [
      {
        name: "My Trello Board",
        bgcolor: "#069",
        list: [
          //   {
          //     id: "1",
          //     title: "To do",
          //     items: [{ id: "cdrFt", title: "Project Description 1" }],
          //   },
          //   {
          //     id: "2",
          //     title: "In Progress",
          //     items: [{ id: "cdrFv", title: "Project Description 2" }],
          //   },
          //   {
          //     id: "3",
          //     title: "Done",
          //     items: [{ id: "cdrFb", title: "Project Description 3" }],
          //   },
        ],
      },
    ],
  };
  const [allboard, setAllBoard] = useState(boardData);

  return (
    <>
      {/* <Navbar /> */}

      <BoardContext.Provider value={{ allboard, setAllBoard }}>
        <div className="content flex">
          <Sidebar></Sidebar>
          <Main></Main>
        </div>
      </BoardContext.Provider>
    </>
  );
}

export default Home;
