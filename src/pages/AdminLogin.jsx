import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Enter credentials");
      return;
    }

    // TEMP static admin login (until backend)
    if (email === "admin@finaawu.com" && password === "admin123") {
      navigate("/admin-dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100 px-4">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full p-3 mb-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}