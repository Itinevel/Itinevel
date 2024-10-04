"use client";

import React, { useEffect, useState } from 'react';
import FilterComponent from '@/components/market/filter';
import MarketCardsComponent from '@/components/market/market';
import { FaSort, FaFilter, FaTimes } from 'react-icons/fa';

const ItineraryMarketPage: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>('name');
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [plans, setPlans] = useState<any[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<any[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false); // Toggle filter visibility for mobile

  // Fetch plans where sell = true from backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/itinerary/plans?sell=true');
        const data = await response.json();
        setPlans(data);
        setFilteredPlans(data); // Set both plans and filtered plans to initial fetched data
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  // Function to toggle the sort order
  const toggleOrder = () => {
    setIsAscending((prev) => !prev);
  };

  // Function to handle sorting option change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Function to filter plans
  const handleFilterChange = (filteredPlans: any[]) => {
    setFilteredPlans(filteredPlans);
  };

  // Sorting the filtered plans
  const sortedFilteredPlans = [...filteredPlans].sort((a, b) => {
    if (sortOption === 'price') {
      return isAscending ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice;
    } else {
      return isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
  });

  // Function to toggle filter visibility on mobile
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-white to-blue-200 flex justify-center relative">
      <div className="max-w-full lg:max-w-7xl w-full flex relative">
        {/* Filter Container - Fixed on the left */}
        <aside
          className={`w-full md:w-1/5 p-4 bg-white shadow-lg fixed lg:static lg:mt-0 mt-16 left-0 z-40 md:z-auto transition-transform transform md:translate-x-0 ${
            isFilterVisible ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Close button for mobile */}
          <div className="md:hidden absolute top-4 right-4 z-50">
            <button
              onClick={toggleFilterVisibility}
              className="bg-red-500 text-white p-2 rounded-full shadow-lg"
            >
              <FaTimes />
            </button>
          </div>

          <div className="h-screen lg:h-full overflow-y-auto no-scrollbar lg:pt-12">
            <FilterComponent plans={plans} onFilterChange={handleFilterChange} />
          </div>
        </aside>

        {/* Market Cards - Scrollable content */}
        <div className="flex-1 w-full ml-auto md:w-4/5 h-full">
          <div className="pt-6">
            <h2 className="hidden md:block text-2xl lg:text-3xl font-bold text-center text-blue-600 pt-12 -mb-3">
              Discover Amazing Itineraries
            </h2>

            {/* Sorting Feature */}
            <div className="flex justify-end items-center space-x-2">
              <div
                onClick={toggleOrder}
                className="flex items-center justify-center p-2 border border-gray-300 rounded-full cursor-pointer shadow-sm hover:bg-gray-100 transition duration-200"
              >
                <FaSort
                  className={`text-lg transition-transform duration-300 ${
                    isAscending ? 'rotate-0' : 'rotate-180'
                  } text-blue-500`}
                />
              </div>
              <label htmlFor="sort" className="text-gray-600 text-sm font-medium">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="p-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
            </div>

            {/* Scrollable Market Cards */}
            <main className="h-full px-4">
              <MarketCardsComponent
                plans={sortedFilteredPlans} // Use sorted filtered plans
                sortOption={sortOption}
                isAscending={isAscending}
              />
            </main>
          </div>
        </div>
      </div>

      {/* Floating Filter Button for Mobile (visible on small screens only) */}
      {!isFilterVisible && (
        <button
          onClick={toggleFilterVisibility}
          className="md:hidden fixed top-[20%] left-4 bg-blue-500 text-white p-4 rounded-full shadow-lg z-50"
        >
          <FaFilter />
        </button>
      )}
    </div>
  );
};

export default ItineraryMarketPage;
