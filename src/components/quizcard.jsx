import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuizCard = ({ quiz, color = '#38B6FF' }) => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);
  const handleNavigate = () => navigate(`/quiz/${quiz._id}`, { state: { quiz } });

  const score = parseInt(quiz.score || 0);
  const maxScore = 10; // change to 100 if needed
  const percentage = Math.min((score / maxScore) * 100, 100);

  return (
    <div
      className="w-full sm:w-64 h-64 perspective m-2"
      onMouseEnter={handleFlip}
      onMouseLeave={handleFlip}
    >
      <div className="relative w-full cursor-pointer h-full transition-transform duration-500 transform-style preserve-3d" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'none' }}>
        {/* Front Side */}
        <motion.div
          className="absolute w-full h-full backface-hidden rounded-2xl shadow-md"
          style={{ backgroundColor: color }}
        >
          <div className="p-5 flex flex-col justify-between h-full">
            <div>
              <h2 className="font-bold text-xl text-[#142073] line-clamp-2 mb-2">
                {quiz.quizTitle || "Untitled Quiz"}
              </h2>
              <p className="text-sm text-gray-900 mb-1">
                <span className="font-medium">Difficulty:</span>{" "}
                <span className="capitalize">{quiz.difficulty}</span>
              </p>
            </div>

            <button
              className="mt-auto bg-[#04040e] hover:bg-[#0d154a] text-white px-4 py-2 rounded-xl text-sm font-medium transition"
            >
              {quiz.isSolved ? "Reattempt →" : "Start Quiz →"}
            </button>
          </div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute  w-full h-full backface-hidden rounded-2xl shadow-md rotate-y-180"
          style={{ backgroundColor: "#f9fafb" }}
          onClick={handleNavigate}
        >
          <div className="p-5 flex flex-col justify-between h-full">
            <div>
              <h2 className="font-bold text-md text-[#142073] mb-2">
                Quiz Info
              </h2>
              {quiz.isSolved ? (
                < >
                  <p className="text-sm text-gray-800 mb-1 py-2">
                    Previous Score: <strong>{score}/{maxScore}</strong>
                  </p>
                  <div className="w-full  h-2 bg-gray-300 rounded-full mt-1">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-800  mt-2">
                    Attempted: {new Date(quiz.attemptedAt).toLocaleDateString()}

                  </p>
                  <p className="text-sm text-gray-800 mb-1 ">
                    Subject:{quiz.subject}

                  </p>
                </>
              ) : (<>
                <p className="text-sm font-bold text-gray-800 mb-1">Take a quiz and build your Aura.</p>
                <p className="text-sm text-gray-800 mb-1"> Subject:{quiz.subject}
                </p>

              </>
              )}
            </div>

            <p className="mt-auto rounded-xl text-center bg-[#04040e] w-full p-2 px-4 hover:bg-[#0d154a] text-white text-sm  ">Click to open quiz →</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizCard;
