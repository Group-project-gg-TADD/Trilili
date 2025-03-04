import { Navigate, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

export default function NoAuthLayout() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return (
      <>
        <Outlet />
        <ToastContainer />
      </>
    );
  }
  return <Navigate to={"/"} />;
}
