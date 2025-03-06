// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import NoAuthLayout from "./pages/NoAuthLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthLayout from "./pages/AuthLayout";
import Home from "./pages/Home";
import Comment from "./pages/Comment";
import Project from "./pages/Project";
import Boardes from "./pages/Boardes";
import Board from "./pages/Board";
import { ListCardProvider } from "./context1/ListCard1";
import { BoardesProvider } from "./context1/TodoBoardes";
import { UserProvider } from "./context1/user";

createRoot(document.getElementById("root")).render(
  <BoardesProvider>
    <UserProvider>
      <ListCardProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<NoAuthLayout />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/" element={<Boardes />} />
              <Route path="/project" element={<Project />} />
              <Route path="/comment/:id" element={<Comment />} />
              <Route path="/board/:id" element={<Board />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ListCardProvider>
    </UserProvider>
  </BoardesProvider>
);
