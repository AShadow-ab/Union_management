import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function HomeButton() {

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="fixed top-4 right-4 text-gray-500 hover:text-gray-800 transition opacity-70 hover:opacity-100"
      title="Home"
    >
      <FaHome size={20} />
    </button>
  );
}