// import socket from "../config/socket";

import Sidebar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { BoardContext } from "../context/BoardContext";
import { useState } from "react";
import Main from "./Main";

function Home() {
  const boardData = {
    active: 0,
    boards: [
      {
        name: 'My Trello Board',
        bgcolor: '#069',
        list: [
          { id: "1", title: "To do", items: [{ id: "cdrFt", title: "Project Description 1" }] },
          { id: "2", title: "In Progress", items: [{ id: "cdrFv", title: "Project Description 2" }] },
          { id: "3", title: "Done", items: [{ id: "cdrFb", title: "Project Description 3" }] }
        ]
      }
    ]
  }
  const [allboard, setAllBoard] = useState(boardData);

  return (
    <>
      <Navbar />

      <BoardContext.Provider value={{ allboard, setAllBoard }}>
        <div className='content flex'>
          <Sidebar></Sidebar>
          <Main></Main>
        </div>

      </BoardContext.Provider>
    </>
  )
}

export default Home;

