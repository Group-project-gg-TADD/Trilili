import { Navigate, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";

export default function AuthLayout() {
  const token = localStorage.getItem("access_token");
  if (token) {
    return (
      <>
        <Outlet />
        <ToastContainer />
      </>
    );
  }
  return <Navigate to={"/login"} />;
}
