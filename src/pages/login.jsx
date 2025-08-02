import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Login = () => {
  const navigate = useNavigate();  // ✅ Use lowercase `navigate`, not `Navigate`
  const { user, setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async () => {
    try {
      const response = await fetch(`${baseURL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      setUser(data.user); // ✅ Set user in context
      navigate('/home');      // ✅ Navigate after login

    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Check email/password.');
    }
  };

  useEffect(() => {
    if (user && user._id) navigate('/home');
  }, [user, navigate]);

  return (
    <div className="flex bg-gradient-to-br from-blue-50 to-blue-100 flex-col md:flex-row w-screen h-screen">
      {/* Left Section */}
      <div className="hidden md:block md:w-[50%] h-full bg-[#04040e] text-white relative rounded-r-[20%]">
        <img src="grad.png" className="w-full h-full object-cover absolute top-0 left-0 z-0" alt="Background" />
      </div>

      {/* Right Section */}
      <div className=" w-full md:w-[50%] flex flex-col items-center justify-center">
        <img src="./logo.png" onClick={() => navigate("/")} alt="Logo" className="w-16 h-16 m-4 cursor-pointer" />

        <div className="flex flex-col items-center w-full max-w-md px-4 mt-6 md:mt-0">
          <h1 className="text-3xl font-extrabold text-center">Welcome Back</h1>
          <p className="text-center text-gray-500 font-semibold mt-2">Log in with your email</p>

          <form
            className="flex flex-col gap-4 w-full mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="border-[#04040e] border-2 p-2 rounded-md w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="border-[#04040e] border-2 p-2 rounded-md w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-[#04040e] text-white p-2 rounded-md w-full hover:cursor-pointer hover:bg-[#292945]"
            >
              Log In
            </button>
            <p className="text-center text-gray-500 mt-4">
              Don't have an account?{' '}
              <span
                className="text-[#04040e] cursor-pointer hover:underline"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
