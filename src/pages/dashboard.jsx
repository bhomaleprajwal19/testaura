import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import Hero from '../components/hero'
import '../../src/index.css'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
import { useAuth } from '../context/AuthContext';
import LogedHero from '../components/logedHero'

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) {
    navigate('/login');
    return null; // Prevent rendering the rest of the component if user is not logged in
  }

  return (
    <div className=" w-screen h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex-col">
      {/* Navbar */}
      <div className="sticky top-0 z-50 ">
        <Navbar />
      </div>

      {/* Main content */}
      <div className="flex flex-col h-full md:flex-row flex-1 justify-between  ">
        {/* Left: Hero */}
         <div className="w-full md:mt-6 md:w-1/2 md:flex  flex-col items-center gap-0 hidden  ">
          <Hero className="w-full h-full " />

        </div>

        {/* Right: Text + Button */}

        <LogedHero />
      </div>


    </div>
  )
}

export default Dashboard
