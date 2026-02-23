// src/pages/Home.jsx
import { useState } from 'react';


export default function Home({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = () => {
    if (!email || !password) return alert('Please enter email and password');
    setUser({ email });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-green-400 to-blue-500 text-white px-4">
      <h1 className="text-5xl font-bold mb-8">Union Portal</h1>
      <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 mb-3 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 mb-3 border rounded-lg"
        />
        <button
          onClick={handleAuth}
          className="w-full bg-green-500 hover:bg-blue-500 text-white py-3 rounded-lg transition"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span className="text-blue-500 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}