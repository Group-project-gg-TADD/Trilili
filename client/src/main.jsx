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

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<NoAuthLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/" element={<Boardes />} />
        <Route path="/project" element={<Project />} />
        <Route path="/comment" element={<Comment />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
