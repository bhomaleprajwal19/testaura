import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import quizImg from '/quiz.png';
import statsImg from '/statistics.png';
import learnImg from '/learning.png';

const Home = () => {
  const { user } = useAuth();
  const typedRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: [
        "Master DSA, DBMS, AI & CS Concepts",
        "Practice Interview-Ready Quizzes",
        "Track Your Progress & Improve"
      ],
      typeSpeed: 40,
      backSpeed: 30,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  useEffect(() => {
    if (user && user._id) navigate('/home');
  }, [user, navigate]);

  // Optional: Prevent rendering if user is being redirected
  if (user && user._id) return null;

return (
  <div className="flex flex-col min-h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
    {/* Main Content */}
    <main className="flex-grow px-4">
      {/* Hero Section */}
      <div className="text-center mt-20">
        <h1 className="text-4xl md:text-6xl font-bold text-[#04040e] mb-4">
          Welcome to <span className="text-[#142073]">TestAura</span>
        </h1>

        <span
          ref={typedRef}
          className="block h-[40px] text-lg md:text-xl font-medium text-[#142073]"
        ></span>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link to="/signup" aria-label="Sign up">
            <button className="bg-[#04040e] hover:bg-[#142073] text-white px-6 py-2 rounded-lg text-sm font-semibold shadow">
              Get Started
            </button>
          </Link>
          <Link to="/login" aria-label="Login">
            <button className="bg-gray-200 hover:bg-gray-300 text-[#04040e] px-6 py-2 rounded-lg text-sm font-semibold shadow">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-6xl w-full px-4 mx-auto">
        <FeatureCard
          image={quizImg}
          title="Quiz Based Learning"
          desc="Engage with interactive quizzes to master core Computer Science concepts."
        />
        <FeatureCard
          image={statsImg}
          title="Track Your Progress"
          desc="Monitor your performance over time and focus on improving weak areas."
        />
        <FeatureCard
          image={learnImg}
          title="DSA, DBMS, AI and more"
          desc="Covers most important computer subjects to crack tech interviews."
        />
      </div>
    </main>

    {/* Footer */}
    <footer className="py-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} TestAura — Built with ❤️ by Prajwal Bhomale
    </footer>
  </div>
);}


const FeatureCard = ({ image, title, desc }) => (
  <div className="bg-white shadow-md p-6 rounded-2xl text-center hover:shadow-xl transition duration-300">
    <img src={image} alt={title} loading="lazy" className="w-20 h-20 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-[#142073]">{title}</h3>
    <p className="text-sm text-gray-600 mt-2">{desc}</p>
  </div>
);

export default Home;
