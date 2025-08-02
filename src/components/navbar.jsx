import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user,setUser } = useAuth();

  const menuItems = [
    { name: "Home", path: "/home" },
    { name: "Quizes", path: "/quizes" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const logout = async () => {
    const res = await fetch(`${baseUrl}/users/logout`, { method: 'GET', credentials: 'include' });
    if (res.ok) {
      setUser(null);
      alert('Logged out successfully');
      navigate('/')
    } else {
      alert('Error logging out');
    }
  };

  return (
    <nav className="bg-gradient-to-r  z-50 from-[#0d154a] to-[#04040e] md:from-[#04040e] md:via-[#0d154a] md:to-[#04040e] text-white px-4 py-2 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src="/logo.png" alt="Logo" className="w-12 h-12 hover:scale-110 transition" />
          <h1 className="text-2xl font-bold ">TestAura</h1>
        </div>

        {/* Desktop Menu */}
       {user && <ul className="hidden md:flex gap-4 text-lg font-medium">
          {menuItems.map((item) => (
            <li
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer px-4 py-1 rounded-2xl transition font-semibold 
                ${location.pathname === item.path
                  ? 'bg-white text-[#04040e]'
                  : 'hover:bg-slate-500/30'}`}
            >
              {item.name}
            </li>
          ))}
        </ul>}

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="hover:bg-slate-500/30 px-4 py-1 rounded-2xl transition font-semibold"
              >
                Log In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-white text-[#04040e] px-6 py-1 text-lg font-semibold rounded-2xl border-2 border-white hover:bg-[#04040e] hover:text-white transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <img
                src="/person.png"
                onClick={() => navigate('/profile')}
                className="h-9 w-9 invert rounded-full hover:scale-105 transition cursor-pointer border-2 border-white p-1"
                alt="profile"
              />
              <button
                onClick={logout}
                className="border px-4 py-1 rounded-lg hover:bg-white hover:text-[#142073] transition font-medium"
              >
                Log out
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div ref={menuRef} className="md:hidden relative">
          <div
            className="cursor-pointer text-2xl"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
          >
            ☰
          </div>

          {/* Mobile Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 flex flex-col gap-2 bg-[#1f2a44] rounded-xl p-4 text-white shadow-xl z-50">
              {menuItems.map((item) => (
                <p
                  key={item.path}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate(item.path);
                  }}
                  className={`cursor-pointer rounded-md px-2 py-1 hover:text-cyan-400 transition 
                    ${location.pathname === item.path ? 'bg-white text-[#142073]' : ''}`}
                >
                  {item.name}
                </p>
              ))}
              <hr className="border-slate-600 my-2" />
              {!user ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/login');
                    }}
                    className="border px-4 py-1 rounded-lg hover:bg-white hover:text-[#142073] transition"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/signup');
                    }}
                    className="border px-4 py-1 rounded-lg hover:bg-white hover:text-[#142073] transition"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (<>
                 <button
                  onClick={() => {
                    navigate('/profile')
                  }}
                  className="border px-4 py-1 rounded-lg hover:bg-white hover:text-[#142073] transition"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="border px-4 py-1 rounded-lg hover:bg-white hover:text-[#142073] transition"
                >
                  Log out
                </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
