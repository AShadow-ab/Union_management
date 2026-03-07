import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Attempting login with:", email);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login success:", userCredential.user);

      navigate("/admin-dashboard");
    } catch (error) {
      console.log("Login error:", error);
      alert("Invalid login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow rounded w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700 mb-3"
        >
          Login
        </button>

        {/* Back to Home Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-4 py-2 w-full rounded hover:bg-gray-600"
        >
          Back to Home
        </button>

      </form>

    </div>
  );
}