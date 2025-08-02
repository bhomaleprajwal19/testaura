import React, { useRef, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/quizcard';
import SkeletonLoader from '../components/SkeletonLoader';
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Quizes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subjectQuizzes, setSubjectQuizzes] = useState({});
  const [matchedQuizzes, setMatchedQuizzes] = useState([]);
  const [hotQuizzes, setHotQuizzes] = useState([]);
  const subjectRefs = useRef({});

  useEffect(() => {
    if (!user || !user._id) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${baseURL}/quizes/allquizes`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setSubjectQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    const fetchHotQuizzes = async () => {
      try {
        const response = await fetch(`${baseURL}/quizes/gethotquiz`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setHotQuizzes(data);
      } catch (error) {
        console.error('Error fetching hot quizzes:', error);
      }
    };

    fetchQuizzes();
    fetchHotQuizzes();
  }, []);

  useEffect(() => {
    const quizHistory = (user, subjectQuizzes, hotQuizzes) => {
      const matchedMap = new Map();

      user?.quizHistory?.forEach((quizH) => {
        const subject = quizH.subject;
        const quizId = quizH.quizId;

        const quizzesInSubject = subjectQuizzes[subject]?.quizzes || [];
        const matchedSubjectQuiz = quizzesInSubject.find((quiz) => quiz._id === quizId);
        const matchedHotQuiz = hotQuizzes.find((quiz) => quiz._id === quizId);
        const finalQuiz = matchedSubjectQuiz || matchedHotQuiz;

        if (finalQuiz && !matchedMap.has(quizId)) {
          finalQuiz.isSolved = true;
          finalQuiz.score = quizH.score;
          finalQuiz.attemptedAt = quizH.createdAt;

          matchedMap.set(quizId, {
            ...finalQuiz,
            userScore: quizH.score,
            attemptedAt: quizH.createdAt,
          });
        }
      });

      const matched = Array.from(matchedMap.values());
      matched.sort((a, b) => new Date(b.attemptedAt) - new Date(a.attemptedAt));
      setMatchedQuizzes(matched);
    };

    if (user && Object.keys(subjectQuizzes).length > 0) {
      quizHistory(user, subjectQuizzes, hotQuizzes);
    }
  }, [user, subjectQuizzes, hotQuizzes]);

  useEffect(() => {
    Object.keys(subjectQuizzes).forEach((subject) => {
      if (!subjectRefs.current[subject]) {
        subjectRefs.current[subject] = React.createRef();
      }
    });
  }, [subjectQuizzes]);

  return (
    <div className="relative w-screen">
      {/* Navbar */}
      <div className="sticky w-full top-0 z-20 bg-[#7816f7]">
        <Navbar />
        <hr className="border-slate-700" />
      </div>

      {/* Subject Tabs */}
      <div className="subjects m-2 w-full overflow-x-auto whitespace-nowrap flex gap-3 py-2 px-4 hide-scroll-bar">
        {Object.entries(subjectQuizzes).map(([subject]) => (
          <button
            key={subject}
            onClick={() =>
              subjectRefs.current[subject]?.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }
            className="border hover:cursor-pointer hover:text-white border-black px-4 py-1 rounded-full text-sm font-medium bg-white hover:bg-gray-800 transition"
          >
            {subject}
          </button>
        ))}
      </div>

      {/* History Section */}
      <div className="flex flex-col mx-auto scroll-mt-20">
        <h1 className="mb-4 lg:px-20 md:px-10 px-5 font-bold text-2xl text-[#142073] flex items-center gap-2"><img src="history.png" className='w-6 h-6  ' alt="" />History </h1>
        <div className="overflow-x-auto scroll-smooth px-6 py-2 hide-scroll-bar">
          <div className="flex gap-4">
            {matchedQuizzes.length === 0 ? (
              <div className="text-gray-500 mb-4 lg:px-20 md:px-10 px-5">No attempted quizzes yet.</div>
            ) : (
              matchedQuizzes.map((quiz) => (
                <div key={quiz._id} className="flex-shrink-0 w-64">
                  <div className="transition-transform duration-300 hover:scale-105">
                    <QuizCard quiz={quiz} color="#43d87a" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Hot Quizzes */}
      {hotQuizzes.length === 0 ? (
        <SkeletonLoader />
      ) : (
        <div className="flex flex-col mx-auto scroll-mt-20">
          <h1 className="mb-4 flex items-center gap-2  lg:px-20 md:px-10 px-5 font-bold text-2xl text-[#142073]"><img src="fire1.png" className='w-7 h-7  ' alt="" />Hot Quizzes </h1>
          <div className="overflow-x-auto scroll-smooth px-6 py-2 hide-scroll-bar">
            <div className="flex gap-4">
              {hotQuizzes.map((quiz) => (
                <div key={quiz._id} className="flex-shrink-0 w-64">
                  <div className="transition-transform duration-300 hover:scale-105">
                    <QuizCard quiz={quiz} color={quiz.isSolved ? '#43d87a' : '#FF6B6B'} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subject-wise Quizzes */}
      {Object.keys(subjectQuizzes).length === 0 ? (
        <SkeletonLoader />
      ) : (
        Object.entries(subjectQuizzes).map(([subject, { quizzes, color }]) => {
          if (!quizzes || quizzes.length === 0) return null;

          return (
            <div
              key={subject}
              ref={subjectRefs.current[subject]}
              className="flex flex-col mx-auto scroll-mt-20"
            >
              <h1 className="mb-2 lg:px-20 md:px-10 px-5 font-bold text-2xl text-[#142073]">
                {subject}
              </h1>
              <div className="overflow-x-auto scroll-smooth px-6 py-2 hide-scroll-bar">
                <div className="flex gap-4">
                  {[...quizzes]
                    .sort((a, b) => (a.isSolved === b.isSolved ? 0 : a.isSolved ? 1 : -1))
                    .map((quiz) => (
                      <div key={quiz._id} className="flex-shrink-0 w-64">
                        <div className="transition-transform duration-300 hover:scale-105">
                          <QuizCard
                            quiz={quiz}
                            color={quiz.isSolved ? '#43d87a' : color || '#38B6FF'}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Quizes;
