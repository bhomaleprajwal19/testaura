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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submitHandler = async () => {
    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      alert('Mobile number must be 10 digits and contain only numbers.');
      return;
    } else if (name.trim().length < 3) {
      alert('Name must be at least 3 characters long.');
      return;
    } else if (username.trim().length < 3) {
      alert('Username must be at least 3 characters long.');
      return;
    } else if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    } else if (!validateEmail(email)) {
      alert('Enter a valid email address.');
      return;
    }

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
      } else {
        console.error('Registration failed:', data);
        if (Array.isArray(data)) {
          const errorMessages = data.map((err) => err.msg).join('\n');
          alert(errorMessages);
        } else {
          alert(data?.message || 'Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    if (user && user._id) navigate('/home');
  }, [user, navigate]);

  const inputClass = 'border-[#04040e] border-2 p-2 rounded-md w-full';

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
              className={inputClass}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              className={inputClass}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Mobile"
              autoComplete="tel"
              className={inputClass}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              className={inputClass}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className={inputClass}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
