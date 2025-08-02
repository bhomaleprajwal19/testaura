import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-[#d1c1e7] rounded-full h-4 overflow-hidden">
      <div
        className="bg-[#7612f9] rounded-r-2xl h-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
