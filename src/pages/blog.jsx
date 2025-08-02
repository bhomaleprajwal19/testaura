import React from 'react';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';

const blogs = [
  {
    id: 1,
    title: "How to Crack DSA Interviews",
    description: "Master core patterns and common questions asked in top companies.",
    date: "July 11, 2025",
    author: "Prajwal Bhomale",
  },
  {
    id: 2,
    title: "Top 10 DBMS Questions for Product-Based Companies",
    description: "Ace your interviews with these frequently asked DBMS problems.",
    date: "July 8, 2025",
    author: "TestAura Team",
  },
  {
    id: 3,
    title: "How I Landed My First Internship with Good Projects",
    description: "A student’s guide to building a solid portfolio and resume.",
    date: "July 5, 2025",
    author: "Anonymous Student",
  },
];

const Blog = () => {
      const Navigate=useNavigate();
  
  return (
    <div className=' w-screen relative'>
    <div className='w-full sticky top-0'>
      <Navbar />
      <hr className='border-slate-700' />
    </div>
    <div className="min-h-screen  text-gray-800 p-6 md:p-12">
      <h1 className="text-4xl font-extrabold text-[#142073] mb-10 text-center">TestAura Blog</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div onClick={()=>Navigate('/blogpage')}  key={blog.id} className="bg-[#f9f9f9] rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <h2 className="text-2xl font-semibold text-[#142073] mb-2">{blog.title}</h2>
            <p className="text-gray-700 mb-4">{blog.description}</p>
            <div className="text-sm text-gray-500">
              <span>{blog.author}</span> • <span>{blog.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Blog;
