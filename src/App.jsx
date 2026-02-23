
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import FormPage from './pages/FormPage';
import ResignationPage from './pages/Resignation';
import { useState } from 'react';


function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Home setUser={setUser} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard user={user} setUser={setUser} />} />
        <Route path="/form" element={<FormPage user={user} />} />
        <Route path="/resignation" element={<ResignationPage user={user} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;