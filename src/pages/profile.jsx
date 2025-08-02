import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/progressbar';

const Profile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [showModal, setShowModal] = useState(false);
  const [progressMap, setProgressMap] = useState();
  useEffect(() => {
    if (!user?._id) navigate('/');
  }, [user, navigate]);

  const handleSave = () => {
    // ✨ Add update logic here (API call)
    alert('Profile updated!');
    setShowModal(false);
  };


  useEffect(() => {
    const progressMap = {};

    const fetchProgress = (scores) => {
      for (const subject in scores) {
        const subjectData = scores[subject];

        const progress = subjectData.totalQuizzes > 0
          ? (subjectData.totalScore / (subjectData.totalQuizzes * 10)) * 100
          : 0;

        progressMap[subject] = progress;
      }

    };
    setProgressMap(progressMap);

    if (user?.scores) {
      fetchProgress(user.scores);
    }
  }, []);

  return (
    <div className="relative w-screen min-h-screen  pb-20">
      <div className="sticky top-0 w-full z-20">
        <Navbar />
        <hr className="bg-gray-700" />
      </div>

      {/* Profile Tabs */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center mb-6 gap-3">
          {['account', 'quizzes', 'stats'].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md hover:cursor-pointer text-sm font-semibold transition ${activeTab === tab
                ? 'bg-[#04040e] text-white'
                : 'bg-white text-[#04040e] border border-[#142073]'
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Account Tab */}
        {activeTab === 'account' && (
          <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col md:flex-row gap-10">
            <img
              className="w-40 h-40 rounded-full border-4 border-[#142073]"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name)}&background=04040e&color=fff&size=256`}
              alt="Profile"
            />
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#04040e]">{user.username}</h2>
              <p className="text-gray-600 text-lg">{user.name}</p>
              <p className="text-gray-600 text-lg">{user.email}</p>
              <p className="text-sm text-gray-500">Mobile: <span className="font-medium">{user.mobile}</span></p>
              <p className="text-sm text-gray-500">Joined: <span className="font-medium">{user.createdAt.split('T')[0]}</span></p>
              <button
                className="mt-4 bg-[#04040e] text-white px-5 py-2 rounded-md hover:bg-[#1a2a80]"
                onClick={() => setShowModal(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === 'quizzes' && (
          <div className="bg-white rounded-xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-[#142073] mb-3">Attempted Quizzes</h3>
            {user.quizHistory?.length ? (
              <ul className="space-y-2">
                {user.quizHistory.map((quiz, index) => (
                  <li onClick={() => navigate('/quizes')} key={index} className="border p-3 rounded-lg text-sm text-gray-700 flex  items-center">
                  <img src="past.png" className='w-5 h-5 mx-2' alt="" /> <b>{quiz.subject}</b> — <b>Score: </b> {quiz.score} — <b>Date: </b> {new Date(quiz.createdAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No quizzes attempted yet.</p>
            )}
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="bg-white rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-semibold text-[#142073] mb-3">Progress Overview</h3>

          {progressMap &&
          Object.entries(progressMap).map(([subject, progress]) => (
            <div
              key={subject}
              className="flex justify-between items-center gap-2 m-2 border bg-white p-2 rounded-md hover:bg-gray-100"
            >
              <span className="font-semibold w-[20%]">{subject}</span>
              <div className="w-[80%] flex items-center gap-2">
                <ProgressBar progress={progress} />
                <span>{progress.toFixed(0)}%</span>
              </div>
            </div>
          ))}
          </div>

        )}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
            <h3 className="text-xl font-bold text-[#142073] mb-4">Edit Profile</h3>
            <div className="flex flex-col gap-3">
              <input className="border p-2 rounded-md" defaultValue={user.name} />
              <input className="border p-2 rounded-md" defaultValue={user.email} />
              <input className="border p-2 rounded-md" defaultValue={user.mobile} />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#142073] text-white rounded-md hover:bg-[#1a2a80]"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
