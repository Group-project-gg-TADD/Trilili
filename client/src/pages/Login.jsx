import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../config/axiosInstance";
import { Link, useNavigate } from "react-router";
import logo from "../assets/logo.png"

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "/login",
        data: {
          email,
          password,
        },
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2C3E50]">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
        <img src={logo} alt="Logo" className="w-20 mb-3" />
        <h2 className="text-xl font-bold text-center text-[#2C3E50] mb-3">
          Login
        </h2>
  
        <form onSubmit={handleLogin} className="w-full space-y-3">
          <div>
            <label className="block text-[#2C3E50] font-medium">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full p-2 mt-1 border border-[#BDC3C7] rounded bg-gray-100 text-[#2C3E50] focus:ring focus:ring-[#85C1E9] focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
  
          <div>
            <label className="block text-[#2C3E50] font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full p-2 mt-1 border border-[#BDC3C7] rounded bg-gray-100 text-[#2C3E50] focus:ring focus:ring-[#85C1E9] focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
  
          <button
            type="submit"
            className="w-full p-2 text-white bg-[#85C1E9] rounded-lg hover:bg-[#2C3E50] transition font-semibold"
          >
            Login
          </button>
        </form>
  
        <p className="mt-3 text-center text-[#2C3E50] text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#85C1E9] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
);

}
