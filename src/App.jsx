import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import FormPage from "./pages/FormPage";
import Resignation from "./pages/Resignation";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/resignation" element={<Resignation />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Protected Route */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;