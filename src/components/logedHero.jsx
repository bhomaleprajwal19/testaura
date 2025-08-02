import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const baseUrl = import.meta.env.VITE_API_URL;

const LogedHero = () => {
  const { user } = useAuth();
  const [aura, setaura] = useState();
  const [hotQuizes, setHotQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchaura = async (userId) => {
      const res = await fetch(`${baseUrl}/users/aura`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) {
        console.log('Cant update aura');
        return;
      }
      const data = await res.json();
      setaura(data.aura);
    };

    const fetchHotQuizzes = async () => {
      const res = await fetch(`${baseUrl}/quizes/gethotquiz`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) {
        console.log("Can't fetch hot quizzes");
        return;
      }
      const data = await res.json();
      setHotQuizzes(data);
    };

    fetchaura(user._id);
    fetchHotQuizzes();
  }, [user._id]);

  return (
    <div className="flex h-full p-6 md:p-10 flex-col md:ml-5 w-full md:w-1/2 rounded-none md:rounded-l-[8%] items-center bg-gradient-to-r from-[#0d154a] to-[#04040e] text-white">
      {/* Welcome */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-1">
        Welcome <span className="text-[#7816f7]">{user.name.split(' ')[0]}</span>!
      </h1>
      <p className="text-md md:text-lg text-gray-400 font-semibold flex justify-center items-center drop-shadow-[0_0_10px_rgba(0,255,255,1)] mb-4">
        Let’s build your Aura  <Rocket size={16} />
      </p>

      {/* Stats & Hot Quizzes */}
      <div className="flex flex-col gap-4 mt-5 w-full">
        {/* Streak & Aura */}
        <div className="w-full flex flex-col gap-2">
          <div className="border border-white rounded-lg p-3 text-center">
            <p className="border flex items-center gap-2 justify-center border-fuchsia-500 rounded-lg p-1 m-1 font-semibold">
              <img src="/fire.png" className='w-5  h-5 invert' alt="" /> Streak : <span className="text-[#7816f7]">{user.streak} {user.streak === 1 ? "day" : "days"}</span>
            </p>
            <p className="border border-fuchsia-500 rounded-lg flex justify-center items-center gap-2 p-1 m-1 font-semibold">
              <img src="aura.png" className='w-5  h-5 invert' alt="" /> Aura : <span className="text-[#7816f7]">+{aura}</span>
            </p>
          </div>
        </div>

        {/* Hot Quizzes */}
        <div className="w-full border border-white rounded-lg h-48 overflow-y-auto hide-scroll-bar">
          <h3 className="text-sm flex  items-center gap-2 font-semibold sticky top-0 bg-[#7816f7] z-10 p-2">
            <img src="fire1.png" className='w-5 h-5 invert' alt="" /> Hot Quizzes:
          </h3>
          <div className="flex flex-col gap-2 p-2">
            {hotQuizes.length > 0 ? (
              hotQuizes.map((quiz) => (
                <div
                  onClick={() => navigate(`/quiz/${quiz._id}`, { state: { quiz } })}
                  key={quiz._id}
                  className="border border-white rounded-lg p-2 hover:bg-white hover:text-black cursor-pointer transition"
                >
                  {quiz.subject}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No hot quizzes found.</p>
            )}
          </div>
        </div>
      </div>

      <div
        onClick={() => navigate('/leaderboard')}
        className="border mt-5 flex items-center justify-center gap-2 border-white bg-[#7816f7] hover:bg-[#6b05c9] transition rounded-lg p-3 text-center cursor-pointer font-semibold"
      >
        <img src="leaderboard.png" className='w-5 h-5 invert ' alt="" /> View Leaderboard
      </div>
      <button onClick={()=>navigate('/quizes')} className="w-full md:hidden mt-5 md:ml-5 relative inline-flex  h-12 items-center justify-center mb-7 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-[#142073] dark:text-[#142073] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="w-full text-center relative px-5 py-5 transition-all ease-in duration-75 bg-white text-white dark:bg-[#37375b] rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Explore All Quizes
            </span>
          </button>
    </div>
  );
};

export default LogedHero;
