import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../config/axiosInstance";
import { Link, useNavigate } from "react-router";
import logo from "../assets/logo.png"

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "/register",
        data: {
          name,
          email,
          password,
        },
      });
      console.log(data);
      toast.success("Success register !");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2C3E50]">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
        <img src={logo} alt="Logo" className="w-20 mb-1" />
        <h2 className="text-xl font-bold text-center text-[#2C3E50] mb-3">
          Register
        </h2>
  
        <form onSubmit={handleRegister} className="w-full space-y-3">
          <div>
            <label className="block text-[#2C3E50] font-medium">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full p-2 mt-1 border border-[#BDC3C7] rounded bg-gray-100 text-[#2C3E50] focus:ring focus:ring-[#85C1E9] focus:outline-none"
              placeholder="Enter your name"
            />
          </div>
  
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
            Register
          </button>
        </form>
  
        <p className="text-center text-[#2C3E50] text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#85C1E9] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
);
}
