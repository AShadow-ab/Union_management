import { useNavigate } from "react-router-dom";
import logo from "../assets/b14b7418d4b639256b5becdf79868978.jpg";
import formIcon from "../assets/b14b7418d4b639256b5becdf79868978.jpg";
import resignIcon from "../assets/b14b7418d4b639256b5becdf79868978.jpg";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      
      {/* HEADER */}
      <header className="bg-white shadow-md py-4 px-8 relative flex items-center">

        <div className="absolute left-8">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        <h1 className="mx-auto text-4xl md:text-5xl font-finaawu text-green-700 tracking-widest">
          FINAAWU
        </h1>

        <div className="absolute right-8">
          <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-all duration-300">
            Logout
          </button>
        </div>

      </header>

      {/* BODY */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">

        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          Welcome, atnegco@gmail.com
        </h2>

        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10">

          {/* FORM CARD */}
          <div
            onClick={() => navigate("/form")}
            className="bg-white rounded-2xl shadow-md p-10 flex flex-col items-center text-center 
            hover:shadow-2xl hover:-translate-y-2 hover:bg-green-50 
            transition-all duration-300 cursor-pointer"
          >
            <img src={formIcon} alt="Form Icon" className="w-28 mb-6" />

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              ADHERENCE FORM
            </h3>

            <p className="text-green-700 font-semibold underline decoration-2">
              Click here to fill adherence form
            </p>
          </div>

          {/* RESIGNATION CARD */}
          <div
            onClick={() => navigate("/resignation")}
            className="bg-white rounded-2xl shadow-md p-10 flex flex-col items-center text-center 
            hover:shadow-2xl hover:-translate-y-2 hover:bg-red-50 
            transition-all duration-300 cursor-pointer"
          >
            <img src={resignIcon} alt="Resignation Icon" className="w-28 mb-6" />

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              RESIGNATION LETTER
            </h3>

            <p className="text-red-600 font-semibold underline decoration-2">
              Click here to input information for resignation letter
            </p>
          </div>

        </div>
      </div>

      <footer className="bg-white shadow-inner py-4 text-center text-gray-600">
        © {new Date().getFullYear()} @FINAAWU. All rights reserved.
      </footer>
    </div>
  );
}