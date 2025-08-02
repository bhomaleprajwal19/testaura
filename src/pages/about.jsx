import React from 'react';
import Navbar from '../components/navbar';

const About = () => {
  return (<div className='w-screen relative'>
   
    <div className='w-full sticky top-0' ><Navbar /><hr className='border-slate-700' /></div>
    <div className="min-h-screen   text-[#142073] p-6 md:p-16">
        
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#142073] mb-6">About TestAura</h1>
        <p className="text-lg leading-relaxed mb-6">
          <span className="font-semibold">TestAura</span> is your intelligent quiz companion designed to help you master technical concepts through topic-wise quizzes tailored for interviews — not just exams. Whether you're preparing for coding rounds, core subject evaluations, or brushing up your skills, TestAura gives you focused content on DSA, DBMS, AI, and more.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#142073]">Our Mission</h2>
        <p className="text-base leading-relaxed mb-6">
          We aim to bridge the gap between academic learning and real-world technical interviews by offering curated, challenging, and up-to-date quizzes built with guidance from industry professionals and top learners.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#142073]">Terms and Conditions</h2>
        <ul className="list-disc list-inside text-base space-y-2">
          <li>You must register with accurate information and keep your credentials secure.</li>
          <li>The platform is for educational purposes only. Any misuse will result in access termination.</li>
          <li>Content is copyrighted and may not be copied or redistributed without permission.</li>
          <li>We reserve the right to modify or discontinue services at any time without notice.</li>
        </ul>

        <p className="mt-8 text-sm text-[#142073]">
          For support, feedback, or collaboration, feel free to contact us. Your growth is our mission.
        </p>
      </div>
    </div></div>
  );
};

export default About;
