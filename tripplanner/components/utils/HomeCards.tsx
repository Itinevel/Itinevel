"use client";
import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import testImage2 from '../../public/images/img2.jpg';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import '../../public/styles/homestyle.css';
interface Plan {
  image: string;
  title: string;
  description: string;
  price: number;
}

interface HomeCardsProps {
  title: string; // Section title, like "Top Rated"
  plans: Plan[]; // List of plans
}

const HomeCards: React.FC<HomeCardsProps> = ({ title, plans }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 5;
  const totalCards = plans.length;

  // Function to handle previous click
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - cardsPerPage, 0));
  };

  // Function to handle next click
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + cardsPerPage, totalCards - cardsPerPage)
    );
  };

  // Slice the plans array to show only cardsPerPage number of cards at a time
  const visiblePlans = plans.slice(currentIndex, currentIndex + cardsPerPage);

  return (
    <div className="w-full mt-4">
      <div className="relative flex justify-between space-x-2 items-center">
        {/* Left Arrow */}
        <button
  onClick={goToPrevious}
  className="p-2 -mr-1 lg:-mx-8 z-50  rounded-full  hover:scale-105 transition"
  disabled={currentIndex === 0} // Disable if at the first set of cards
>
  <IoIosArrowDropleftCircle className="text-blue-500 w-6 h-6 lg:w-9 lg:h-9" /> {/* Left Arrow */}
</button>

        {/* Cards Container - Displays 5 cards at a time */}
        <div className="flex  space-x-2 pb-2 overflow-x-auto lg:overflow-x-visible    ">
          {visiblePlans.map((plan, index) => (
            <div
              key={index}
              className="w-4/5  lg:ml-0  md:w-1/3 lg:w-1/5 p-1 bg-gray-50 rounded-lg   flex-shrink-0 transition-all transform hover:scale-105 hover:shadow-lg"
            >
              <img
                src={testImage2.src} // Replace this with plan.image when you have real images
                alt={plan.title}
                className="w-full h-1/2 object-cover rounded-t-lg"
              />
              <div className="p-3 space-y-1">
                <h3 className="text-sm md:text-l lg:text-[16px] font-semibold text-gray-800">{plan.title}</h3>
                <p className="text-gray-600 text-xs lg:text-sm w-full lg:w-44 two-line-truncate">{plan.description}</p>
                <p className="text-md font-bold text-blue-600 mt-2">${plan.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
  onClick={goToNext}
  className="p-2  rounded-full  hover:scale-105 transition z-50"
  disabled={currentIndex + cardsPerPage >= totalCards} // Disable if at the last set of cards
>
  <IoIosArrowDroprightCircle className="text-blue-500 w-6 h-6 lg:w-9 lg:h-9" /> {/* Right Arrow */}
</button>
      </div>
    </div>
  );
};

export default HomeCards;
