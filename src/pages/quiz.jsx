import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { useLocation } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
const baseUrl=import.meta.env.VITE_API_URL
// userId, score, subject, quizId
const Quiz = () => {

  const { state } = useLocation();
  const{user,setUser}=useAuth();
const quizData = state?.quiz;

  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
    
  // 🔧 Hardcoded demo quiz object for UI testing
 

  const currentQuestion = quizData.questions[currentQuestionIndex];

  const handleAnswerSelect = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    quizData.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) score++;
    });
    return score;
  };


useEffect(() => {
  if (!showResult || !user || !quizData) return;

  const score = calculateScore();
  const subject = quizData.subject;

  const updateScore = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/updatescore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: user._id,
          score,
          subject,
          quizId: quizData._id
        }),
      });

      if (!response.ok) throw new Error('Score update failed');

      const data = await response.json();
      setUser(data.user); 
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  updateScore(); // ✅ call it inside the effect
}, [showResult]); // Only when result is shown






  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#c7d2fe] text-black">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 mt-4 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-2">{quizData.quizTitle}</h2>
        <p className="text-sm text-gray-600 mb-4">
          Subject: {quizData.subject} | Difficulty: {quizData.difficulty}
        </p>

        {/* ✅ Final Result Section */}
        {showResult ? (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-center">Quiz Completed!</h3>
            <p className="mt-2 text-lg text-center">
              Your Score: {calculateScore()} / {quizData.questions.length}
            </p>

            <div className="mt-6 space-y-6">
              {quizData.questions.map((q, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === q.correctAnswer;

                return (
                  <div
                    key={index}
                    className="border rounded-lg p-4 bg-white shadow-sm"
                  >
                    <p className="font-semibold mb-2">
                      {index + 1}. {q.questionText}
                    </p>

                    <div className="grid gap-2">
                      {q.options.map((option, optIdx) => {
                        const isUserAnswer = userAnswer === option;
                        const isCorrectAnswer = q.correctAnswer === option;

                        let bgColor = 'bg-white';
                        if (isCorrectAnswer) bgColor = 'bg-green-200';
                        if (isUserAnswer && !isCorrectAnswer) bgColor = 'bg-red-300';

                        return (
                          <div
                            key={optIdx}
                            className={`px-4 py-2 rounded-lg border ${bgColor}`}
                          >
                            {option}
                            {isCorrectAnswer && (
                              <span className="ml-2 text-green-700 font-semibold">
                                ← Correct Answer
                              </span>
                            )}
                            {isUserAnswer && !isCorrectAnswer && (
                              <span className="ml-2 text-red-700 font-semibold">
                                ← Your Answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <button
                onClick={() => navigate('/quizes')}
                className="px-6 py-2 bg-[#0a0e29] text-white rounded-md"
              >
                Go Back to Quizzes
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* 👇 Quiz UI */}
            <div className="mb-6">
              <p className="text-lg font-semibold">
                Question {currentQuestionIndex + 1} of {quizData.questions.length}
              </p>
              <p className="mt-4">{currentQuestion.questionText}</p>
              <div className="mt-4 grid gap-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(option)}
                    className={`border px-4 py-2 rounded-lg text-left transition-all ${
                      selectedAnswers[currentQuestionIndex] === option
                        ? 'bg-[#0a0e29] text-white'
                        : 'bg-white hover:bg-[#0a0e29] hover:text-white hover:cursor-pointer'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="bg-gray-300 hover:cursor-pointer px-4 py-2 disabled:cursor-not-allowed rounded-md disabled:opacity-50"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!selectedAnswers.hasOwnProperty(currentQuestionIndex)}
                className={`px-6 py-2 rounded-md transition ${
                  !selectedAnswers.hasOwnProperty(currentQuestionIndex)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#0a0e29] text-white hover:bg-[#2a2c37] hover:cursor-pointer'
                }`}
              >
                {currentQuestionIndex === quizData.questions.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
