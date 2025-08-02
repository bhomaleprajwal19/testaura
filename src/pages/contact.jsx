import React, { useState } from 'react';
import Navbar from '../components/navbar';
const baseURl=import.meta.env.VITE_API_URL;

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const submittoBackend = async (form) => {
  try {
    const response = await fetch(`${baseURl}/admin/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to submit');
    
    alert(result.message || 'Message sent successfully!');
  } catch (error) {
    console.error(error);
    alert('An error occurred while submitting the form');
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    submittoBackend(form);  
     alert('Thanks for contacting TestAura! We’ll reach out soon.');

    setForm({ name: '', email: '', subject: '', message: '' });
    

  };

  return (
    <div className='w-screen relative '>
        <div className='w-full sticky top-0'>
            <Navbar/>
            <hr className='bg-gray-700'/>
        </div>
    <div className="min-h-screen py-12 px-6 md:px-20 text-[#142073]">
      <h1 className="text-5xl font-extrabold text-center mb-4 tracking-wide">Get in Touch</h1>
      <p className="text-center text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
        Whether you have a question, suggestion, or just want to say hello — we’d love to hear from you.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-[#d1d5db] backdrop-blur-md"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block font-semibold mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Brief subject"
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
          />
        </div>

        <div className="mt-6">
          <label className="block font-semibold mb-2">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            placeholder="Type your message here..."
            required
            className="w-full p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
          ></textarea>
        </div>

        <div className="mt-8 text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#4f46e5] to-[#6366f1] flex items-center justify-center gap-2 text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transform transition duration-300"
          >
            Send Message <img src="msg.png" className='h-5 w-5 invert ' alt="" />
          </button>
        </div>
      </form>
    </div></div>
  );
};

export default Contact;
