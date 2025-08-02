

import React from 'react';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';


const blogPost = {
  id: 1,
  title: "How Technology Is Shaping the Future: Trends, Challenges, and Innovations",
  author: "Prajwal Bhomale",
  date: "July 18, 2025",
  category: "Technology",
  image: "https://source.unsplash.com/1600x900/?technology,future,ai",
  excerpt:
    "From AI and robotics to blockchain and quantum computing, technology is evolving at lightning speed. This blog explores how modern tech is reshaping our world, what challenges it brings, and what the future might look like.",
  content: `
    In an age where information moves faster than light, technology has become the backbone of modern civilization. It is no longer limited to science labs or tech companies — it is now embedded in our homes, workplaces, education systems, hospitals, transportation, and even our social lives.

    ## 1. Artificial Intelligence and Machine Learning

    AI is no longer a futuristic dream — it's already here. From personalized recommendations on Netflix to AI-powered tools like ChatGPT, we're surrounded by intelligent systems. In healthcare, AI helps doctors analyze scans and predict diseases. In agriculture, it helps farmers detect crop diseases early. In business, it automates repetitive tasks and enhances decision-making.

    Machine Learning (ML), a subfield of AI, allows systems to learn from data without being explicitly programmed. The more data it gets, the smarter it becomes. This is powering applications like fraud detection, self-driving cars, and advanced robotics.

    ## 2. The Rise of Quantum Computing

    Quantum computers have the potential to solve problems that are impossible for classical computers. Though still in their early stages, companies like Google, IBM, and Intel are making significant breakthroughs. If fully realized, quantum computing could revolutionize fields such as drug discovery, cryptography, and climate modeling.

    ## 3. The Blockchain Revolution

    Blockchain technology offers decentralized, secure, and transparent systems. It started with cryptocurrencies like Bitcoin and Ethereum but has now evolved into sectors like supply chain management, digital identity, and secure voting systems.

    Smart contracts — self-executing programs on the blockchain — are changing how agreements are made and enforced without needing intermediaries.

    ## 4. Internet of Things (IoT)

    IoT connects everyday objects to the internet — from smart fridges and wearable health monitors to industrial sensors and smart cities. These devices collect real-time data, allowing us to monitor and optimize everything from energy usage to manufacturing processes.

    Smart homes powered by IoT can automate lighting, temperature, and security, offering comfort and energy savings.

    ## 5. Augmented Reality (AR) and Virtual Reality (VR)

    AR overlays digital content on the real world (like filters on Instagram), while VR creates immersive virtual environments. Both are transforming education, training, gaming, and even therapy.

    In medicine, surgeons are using AR during operations to see inside the human body in real-time. In education, VR is used to simulate complex concepts for better understanding.

    ## 6. 5G and Connectivity

    5G networks offer ultra-fast internet, lower latency, and the ability to connect many devices simultaneously. This is crucial for the growth of IoT, real-time applications, remote surgery, and autonomous vehicles.

    As global 5G infrastructure expands, it will unlock new levels of productivity, entertainment, and remote collaboration.

    ## 7. Ethical and Societal Challenges

    With great power comes great responsibility. Technology also brings challenges:
    - **Privacy concerns**: How much data should companies be allowed to collect?
    - **Bias in AI**: If the data used to train AI is biased, the output will be too.
    - **Job displacement**: Automation might replace certain jobs, requiring upskilling and adaptation.
    - **Digital divide**: Not everyone has equal access to technology, which can widen inequality.

    Responsible tech development must focus on fairness, transparency, security, and inclusivity.

    ## 8. Sustainability Through Technology

    Green technology is helping us address environmental challenges. Solar panels, electric vehicles, and smart grids are reducing our carbon footprint. AI helps predict climate patterns, while drones monitor deforestation and wildlife.

    Technology is key to creating a sustainable future — but only if we use it wisely.

    ## Conclusion: The Future Is Now

    Technology is advancing faster than ever. What once seemed like science fiction — robots, AI assistants, immersive virtual worlds, and intelligent machines — is now part of our daily reality.

    As future developers, engineers, and innovators, it's our responsibility to not only build smart systems but also ethical ones. The goal is not just to make life easier, but better — for everyone.

    The future of technology is not something we wait for — it's something we create.
  `,
};
const recommendedPosts = [
  {
    id: 2,
    title: "AI in Healthcare: Saving Lives with Algorithms",
    date: "July 10, 2025",
    image: "https://source.unsplash.com/400x250/?ai,healthcare",
  },
  {
    id: 3,
    title: "The Blockchain Beyond Bitcoin: Real World Use Cases",
    date: "June 28, 2025",
    image: "https://source.unsplash.com/400x250/?blockchain,technology",
  },
  {
    id: 4,
    title: "Virtual Reality in Education: Changing the Way We Learn",
    date: "July 05, 2025",
    image: "https://source.unsplash.com/400x250/?virtualreality,education",
  },
];


const BlogPage = () => {
  return (
    <div className="relative h-screen w-screen  overflow-y-scroll hide-scroll-bar">
      {/* Grid background with radial mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] z-0"></div>

      {/* Foreground content */}
      <div className="relative z-10">
        <div className='w-full sticky top-0'><Navbar /></div>
        <h1
          className="text-4xl mx-10 font-extrabold text-black mt-10 mb-10 text-center"
          style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.5)' }}
        >
          {blogPost.title}
        </h1>

        <div className='flex gap-2 flex-row w-[85%] rounded-2xl text-white mx-auto '>
          <div className='content h-full w-[70%] p-5 border-2 border-black rounded-2xl overflow-y-scroll hide-scroll-bar bg-black/60'>
            <p>
              <span className='text-sm font-semibold'>{blogPost.date} by</span>{" "}
              <span className='text-xl text-black font-bold'>{blogPost.author}</span>
            </p>
            <img src={blogPost.image} alt="Tech Banner" className='my-4 rounded-lg' />
            <div className='text-xl' dangerouslySetInnerHTML={{ __html: blogPost.content }} />
          </div>
          <div className='recommendation h-full border-2 border-black rounded-2xl w-[30%] bg-black/60 p-4 '>
            <h2 className="text-2xl font-bold mb-4">Recommended</h2>
            {recommendedPosts.map((post) => (
              <div key={post.id} className="mb-6 border-b border-gray-500 pb-4">
                <img src={post.image} alt={post.title} className="w-full h-32 object-cover rounded-lg mb-2" />
                <p className="text-sm text-gray-400">{post.date}</p>
                <h3 className="text-lg font-semibold text-white">{post.title}</h3>
              </div>



            ))}

            <div className="mt-6 border-t border-gray-500 pt-4">
              <h2 className="text-xl font-semibold text-white mb-2">Connect with me</h2>
              <p className="text-sm text-gray-300 mb-2">Prajwal Bhomale</p>
              <div className="flex gap-4 text-white text-lg">
                <a href="https://github.com/bhomaleprajwal19" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  <i className="fab fa-github"></i> GitHub
                </a>
                <a href="https://linkedin.com/in/prajwalbhomale" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
                <a href="mailto:prajwalbhomale@example.com" className="hover:text-blue-400">
                  <i className="fas fa-envelope"></i> Email
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogPage;
