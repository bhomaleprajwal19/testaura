import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Signup = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState([]);

  // Helper to get error message for a field
  const getError = (field) => {
    const error = errors.find((err) => err.param === field);
    return error ? error.msg : '';
  };

  const submitHandler = async () => {
    setErrors([]); // Clear previous errors
    try {
      const response = await fetch(`${baseURL}/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, mobile, username }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user); 
        navigate('/home');
      } else if (data.errors && Array.isArray(data.errors)) {
        setErrors(data.errors); // Set validation errors
      } else {
        alert(data.message || 'Please enter correct information');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    if (user && user._id) navigate('/home');
  }, [user, navigate]);

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen">
      {/* Left Section */}
      <div className="w-full md:w-[50%] flex flex-col items-center justify-center">
        <img
          src="./logo.png"
          onClick={() => navigate('/')}
          alt="Logo"
          className="hover:cursor-pointer w-16 h-16 m-4"
        />

        <div className="flex flex-col items-center w-full max-w-md px-4 mt-6 md:mt-0">
          <h1 className="text-3xl font-extrabold text-center">Welcome to TestAura</h1>
          <p className="text-center text-gray-500 font-semibold mt-2">
            Your journey to smarter learning starts here.
          </p>

          <form
            className="flex flex-col gap-3 w-full mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            <input
              type="text"
              placeholder="Username"
              className="border-[#04040e] border-2 p-2 rounded-md w-full"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {getError('username') && (
              <p className="text-red-500 text-sm">{getError('username')}</p>
            )}

            <input
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              className="border-[#04040e] border-2 p-2 rounded-md w-full"
              onChange={(e) => setName(e.target.value)}
              required
            />
            {getError('name') && (
              <p className="text-red-500 text-sm">{getError('name')}</p>
            )}

            <input
              type="tel"
              placeholder="Mobile"
              autoComplete="tel"
              className="border-[#04040e] border-2 p-2 rounded-md w-full"
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            {getError('mobile') && (
              <p className="text-red-500 text-sm">{getError('mobile')}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="border-[#04040e] border-2 p-2 rounded-md w-full"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {getError('email') && (
              <p className="text-red-500 text-sm">{getError('email')}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="border-[#04040e] border-2 p-2 rounded-md w-full"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {getError('password') && (
              <p className="text-red-500 text-sm">{getError('password')}</p>
            )}

            <button
              type="submit"
              className="bg-[#04040e] text-white p-2 rounded-md w-full hover:cursor-pointer hover:bg-[#292945]"
            >
              Sign Up
            </button>

            <p className="text-center text-gray-500 mt-4">
              Already have an account?{' '}
              <span
                className="text-[#04040e] cursor-pointer hover:underline"
                onClick={() => navigate('/login')}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:block md:w-[50%] h-full bg-[#04040e] text-white relative rounded-l-[20%]">
        <img
          src="grad.png"
          className="w-full h-full object-cover absolute top-0 left-0 z-0"
          alt="Background"
        />
      </div>
    </div>
  );
};

export default Signup;
