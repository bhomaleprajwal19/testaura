"use client"

import {
  motion,
  animate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  
} from "framer-motion"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"


const subjects = [
  {
    name: "Mathematics",
    topics: ["Algebra", "Geometry", "Calculus"],
    color: "#091235", // Royal Blue
  },
  {
    name: "Science",
    topics: ["Physics", "Chemistry", "Biology"],
    color: "#14202e", // Navy Blue
  },
  {
    name: "Java",
    topics: ["OOP", "Inheritance", "DSA"],
    color: "#2b4257", // Midnight Blue
  },
  {
    name: "DSA",
    topics: ["Arrays", "Trees", "Graphs"],
    color: "#88a9c3", // Blue Gray
  },
  {
    name: "HTML/CSS",
    topics: ["Flexbox", "Grid", "Box Model"],
    color: "#006466", // Next from earlier palette if needed
  },
  {
    name: "Python",
    topics: ["Loops", "Functions", "Classes"],
    color: "#065a60", // Continued (optional)
  },
];



export default function Hero({ className = "" }) {
  const ref = useRef(null)
  const { scrollXProgress } = useScroll({ container: ref })
  const maskImage = useScrollOverflowMask(scrollXProgress)
  const Navigate=useNavigate();

  return (
    <div className={`w-full overflow-x-hidden mt-20 ml-2 justify-between flex flex-col mb-10 mx-auto ${className}`}>
      <motion.ul
        ref={ref}
        style={{ maskImage }}
        className="flex flex-row gap-5 overflow-x-scroll snap-x snap-mandatory scrollbar-custom"
      >
        {subjects.map((subject, index) => (
          <li
            key={index}
            className="flex-none w-[250px] sm:w-[280px] md:w-[300px] lg:w-[320px] h-[300px] rounded-xl text-[#cccccc] shadow-xl p-5 flex flex-col justify-between snap-start"
            style={{ backgroundColor: subject.color }}
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3">{subject.name}</h2>
              <ul className="flex flex-wrap gap-2 sm:gap-3">
                {subject.topics.map((topic, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-300 text-black px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm  hover:border-black hover:border"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={()=>Navigate("/quizes")} className="bg-white text-sm sm:text-base px-3 py-2 rounded-3xl hover:cursor-pointer hover:border-black text-black hover:border-2 hover:bg-white hover:text-black transition">
              Explore
            </button>
          </li>
        ))}
      </motion.ul>

       <button onClick={() => Navigate('/quizes')} className="  ml-2 md:ml-5 relative inline-flex  h-12 items-center justify-center mb-7 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-[#142073] dark:text-[#142073] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="w-full text-center relative px-5 py-5 transition-all ease-in duration-75 bg-white text-white dark:bg-[#04040e] rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Explore All Quizes
            </span>
          </button>
    </div>
  )
}

const left = `0%`
const right = `100%`
const leftInset = `20%`
const rightInset = `80%`
const transparent = `#0000`
const opaque = `#000`

function useScrollOverflowMask(scrollXProgress) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  )

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      )
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      )
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      )
    }
  })

  return maskImage
}
