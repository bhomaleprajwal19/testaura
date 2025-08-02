import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const res = await fetch(`${baseURL}/leaderboard/board`, {
                method: 'GET',
                credentials: 'include',
            });

            if (res.ok) {
                const data = await res.json();
                setLeaderboard(data);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <div className="relative w-screen min-h-screen bg-gradient-to-r from-[#0c0c32] via-[#0b113e] to-[#0c0c32] overflow-hidden">

            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0"></div>

            {/* Navbar */}
            <div className="relative z-10">
                <Navbar />
            </div>

            {/* Content */}
            <div className="relative z-10 text-white text-center pt-6">
                <h1 className="text-5xl font-extrabold tracking-widest drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
                    Leaderboard
                </h1>
                <p className="text-blue-200 mt-2 italic">
                    Fueled by brilliance. Defined by aura.
                </p>

                <div className="max-w-5xl mx-auto mt-10 px-4">
                    <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        <div className="bg-[#121a36] bg-opacity-80 rounded-[inherit] shadow-xl ring-1 ring-white/10 backdrop-blur-md p-2 space-y-2">

                            {/* Header */}
                            <div className="grid grid-cols-3 text-center py-3 text-base font-semibold text-blue-200 border-b border-white/10 sticky top-0 bg-[#121a36] bg-opacity-90 backdrop-blur-md z-20 transition-all duration-300 ease-in-out">
                                <div>Rank</div>
                                <div>Name</div>
                                <div>Aura</div>
                            </div>

                            {/* Scrollable Students List */}
                            <div className="overflow-y-auto max-h-[50vh] hide-scroll-bar px-1">
                                {leaderboard.map((user, index) => (
                                    <div
                                        key={user._id}
                                        className={`grid grid-cols-3 text-center py-3 text-white text-base rounded-lg transition-transform duration-300 hover:scale-[1.01] ${index === 0
                                            ? "bg-[#2c3e50] font-semibold"
                                            : index === 1
                                                ? "bg-[#34495e] font-semibold"
                                                : index === 2
                                                    ? "bg-[#3d566e] font-semibold"
                                                    : "hover:bg-white/10"
                                            }`}
                                    >
                                        <div>
                                            #{user.rank} {index === 0 ? "🏆" : index === 1 ? "🥈" : index === 2 ? "🥉" : ""}
                                        </div>
                                        <div>{user.username}</div>
                                        <div>+{user.aura}</div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
