import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
  const token = localStorage.getItem("access_token");
  if (token) {
    return (
      <>
        <Outlet />
      </>
    );
  }
  return <Navigate to={"/login"} />;
}
