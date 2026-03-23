// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import logo from "../assets/Fin.jpg";
import { BiGroup } from "react-icons/bi";
import { useState } from "react";

const MAX_COUNT = 5;
export default function Home() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* HEADER (Matches Dashboard Style) */}
      <header className="bg-white shadow-md py-4 px-8 flex items-center justify-center relative">
        <div className="absolute left-8">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        <h1
          className="text-4xl md:text-5xl font-finaawu text-green-700 tracking-widest"
          onClick={() =>
            setCount((count) => count===MAX_COUNT?0:count+1)
          }
        >
          FINAAWU
        </h1>
      </header>

      {/* BODY */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-16 text-center">
          Welcome to the Union Portal
        </h2>

        <div className="flex flex-col md:flex-row gap-20 items-center">
          {/* USER CARD */}
          <div
            onClick={() => navigate("/dashboard")}
            className="w-64 h-64 bg-white rounded-full shadow-lg flex flex-col items-center justify-center 
            hover:shadow-2xl hover:-translate-y-2 hover:bg-green-50 
            transition-all duration-300 cursor-pointer"
          >
            <BiGroup size={50} />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">USER</h3>

            <p className="text-green-700 font-semibold text-center px-6">
              Access Member Dashboard
            </p>
          </div>

          {/* ADMIN CARD */}
          {count === MAX_COUNT && (
            <div
              onClick={() => navigate("/admin-login")}
              className="w-64 h-64 bg-white rounded-full shadow-lg flex flex-col items-center justify-center 
            hover:shadow-2xl hover:-translate-y-2 hover:bg-red-50 
            transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                ADMIN
              </h3>

              <p className="text-red-600 font-semibold text-center px-6">
                Access Admin Dashboard
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white shadow-inner py-4 text-center text-gray-600">
        © {new Date().getFullYear()} FINAAWU. All rights reserved.
      </footer>
    </div>
  );
}
