"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { FaCrown, FaTag, FaSearch } from "react-icons/fa"; // Add the FaSearch icon
import ImageSlider from "@/components/utils/imgslider"; // Adjust the path as necessary
import HomeCards from "@/components/utils/HomeCards"; // Import the HomeCards component
import { itineraries } from "@/extra/staticit"; // Import your static itineraries from staticit
import testimg7 from "@/public/images/img7.jpg";
import bgImage from '@/public/images/imgx.jpg';
import exploreImg from '@/public/images/imgy.jpg';
const HomePage = () => {
  const topRatedItineraries = itineraries; // Top itineraries for Top Rated Section
  const weeklyDeals = itineraries; // Itineraries for Weekly Deals Section
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode<{ exp: number }>(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          sessionStorage.removeItem("token");
          console.log("Token expired. Please log in again.");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        sessionStorage.removeItem("token");
      }
    }
  }, [router]);

  // Static data for the Explore More section
  const exploreMoreData = [
    {
      title: "Adventure Destinations",
      description: "Explore thrilling destinations for an adrenaline rush.",
      image: "/images/adventure.jpg",
    },
    {
      title: "Cultural Journeys",
      description: "Dive deep into the rich culture and heritage of the world.",
      image: "/images/culture.jpg",
    },
    {
      title: "Luxury Escapes",
      description: "Relax in the most luxurious destinations across the globe.",
      image: "/images/luxury.jpg",
    },
  ];

  return (
    <div className="w-full scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-blue-500 scrollbar-track-gray-200 h-screen bg-gray-100 flex flex-col items-center font-amifer overflow-x-hidden">
    
      <div className="w-full relative  pb-6 lg:pt-32 lg:pb-12 flex flex-col items-center justify-start shadow-lg">
        {/* Background Image */}
        <img src={bgImage.src} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0 " style={{ filter: 'grayscale(20%)' }} />
      
        {/* Left side shadow gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-12 lg:w-64 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
      
        {/* Right side shadow gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-12 lg:w-64  bg-gradient-to-l from-black/50 to-transparent z-10"></div>
      
        {/* Content */}
        <div className="relative z-20 w-full flex flex-col mt-20  items-center">
        <h1 className="text-xl lg:text-4xl font-bold  mb-20 lg:mb-28   text-white max-w-screen-2xl w-full text-left px-4 lg:px-12">
            Plan your trip with ease
          </h1>
          <h2 className="text-xl lg:text-4xl font-semibold   text-white text-center">
            Where are we headed?
          </h2>
        </div>
      </div>

      {/* Wrapper for sections that should have the background image */}
      <div className="relative w-full z-0">
        {/* Background Image for this section only */}
      
        {/* Search Bar positioned half inside and half outside */}
        <div className="w-full max-w-screen-2xl mx-auto px-12 lg:px-24 relative z-10">
          <div className="relative w-full flex justify-center -mt-5 lg:-mt-7 ">
            <div className="w-full md:w-9/12 lg:w-7/12 flex bg-white rounded shadow-xl overflow-hidden">
              <div className="px-3 lg:px-4 flex items-center justify-center text-gray-400">
                <FaSearch className="w-4 h-4 lg:h-6 lg:w-5" />
              </div>
              <input
                type="text"
                className="flex-grow py-2 lg:py-4  lg:px-2  text-xs lg:text-sm lg-text-xl text-black outline-none font-amifer"
                placeholder="Search destinations..."
              />
              <button className="px-4 lg:px-6 text-xs lg:text-lg bg-blue-500 text-white font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105">
                Search
              </button>
            </div>
          </div>

         

        </div>

         {/* Image Slider */}
         <div className="relative lg:mt-8  w-full max-w-screen-lg mx-auto sm:max-w-md md:max-w-lg lg:max-w-7xl xl:max-w-7xl z-10 p-6  transform transition-all hover:scale-105">
          
          <ImageSlider />
        </div>

        {/* Top Rated Itineraries Section */}
        <div className="lg:mt-2 lg:mx-24 relative z-10 lg:p-8  p-5 2xl:px-56  transition-transform transform hover:scale-105">
<h2 className="text-l lg:text-xl ml-2 lg:ml-8 text-black font-bold text-left flex items-center">
  <FaCrown className="mr-2 text-yellow-500 animate-bounce" />
  Top Rated Itineraries
</h2>
<div className="lg:ml-8 mt-4">
  <HomeCards title="Top Rated Itineraries" plans={topRatedItineraries} />
</div>
</div>


        {/* Weekly Deals Section */}
        <div className=" lg:mx-24  relative z-10 p-6 2xl:px-56  transition-transform transform hover:scale-105">
<h2 className="text-l lg:text-xl ml-2 lg:ml-8 text-black font-bold text-left flex items-center">
  <FaTag className="mr-2 text-green-500 animate-pulse" />
  Weekly Deals
</h2>
<div className="lg:ml-8 mt-4  ">
  <HomeCards title="Weekly Deals" plans={weeklyDeals} />
</div>
</div>

        {/* Explore More Section */}
        <div className="relative w-full bg-gradient-to-b from-blue-500/100 via-blue-100  to-white py-6 lg:pb-10 mt-10 lg:mt-8 shadow-lg ">
        <img 
          src={exploreImg.src} 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-10 filter grayscale"
          style={{ filter: 'grayscale(20%)' }}
        />
          <h2 className="text-xl lg:text-3xl font-bold text-center mb-6 z-50 lg:mb-8 text-white">
            Explore More
          </h2>
          <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6 px-6 lg:px-12">
            {exploreMoreData.map((item, index) => (
              <div
                key={index}
                className="relative w-full md:w-1/3 bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs lg-text:sm font-bold px-3 py-1 rounded-bl-lg">
                  Coming Soon
                </div>
                <img
                  src={testimg7.src}
                  alt={item.title}
                  className="w-full h-48 object-cover hover:opacity-90"
                />
                <div className="p-3">
                  <h3 className="text-l lg:text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-xs lg:text-sm text-gray-700 mt-1 lg:mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full relative m z-20">
        <div className="absolute top-0 w-full h-0.5 shadow-md bg-gray-300"></div>
        <footer className="w-full bg-gradient-to-r from-white to-blue-200 text-blue-800 lg:py-4 shadow-2xl">
          <div className="max-w-screen">
            <div className="flex pt-4 lg:pt-0 flex-row justify-between px-6 lg:px-16  ">
              <div className="mb-2">
                <h3 className="font-semibold text-[13px] lg:text-[16px] hover:text-blue-600">
                  About
                </h3>
                <ul className="space-y-[1px]">
                  <li><a href="#" className="hover:underline hover:text-blue-600 text-xs lg:text-[14px]">Our Story</a></li>
                  <li><a href="#" className="hover:underline hover:text-blue-600 text-xs lg:text-[14px]">Team</a></li>
                  <li><a href="#" className="hover:underline hover:text-blue-600 text-xs lg:text-[14px]">Careers</a></li>
                </ul>
              </div>
              <div className=" md:mb-0">
                <h3 className="font-semibold text-[13px] lg:text-[16px] hover:text-blue-600">
                  Contact
                </h3>
                <ul className="space-y-[1px]">
                  <li><a href="#" className="hover:underline hover:text-blue-600 text-xs lg:text-[14px]">Support</a></li>
                  <li><a href="#" className="hover:underline hover:text-blue-600 text-xs lg:text-[14px]">FAQ</a></li>
                  <li><a href="#" className="hover:underline hover:text-blue-600 text-xs lg:text-[14px]">Feedback</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[13px] lg:text-[16px] hover:text-blue-600">
                  Follow Us
                </h3>
                <ul className="space-y-[1px]">
                  <li><a href="#" className="hover:underline hover:text-blue-600 text-xs lg:text-[14px]">Twitter</a></li>
                  <li><a href="#" className="hover:underline hover:text-blue-600 text-xs lg:text-[14px]">Instagram</a></li>
                  <li><a href="#" className="hover:underline hover:text-blue-600 text-xs lg:text-[14px]">Facebook</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;



