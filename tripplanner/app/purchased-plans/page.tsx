"use client"
import React, { useEffect, useState } from 'react';
import MarketCardsComponent from '@/components/market/market';

const PurchasedPlansPage: React.FC = () => {
  const [purchasedPlans, setPurchasedPlans] = useState<any[]>([]);

  // Fetch purchased plans from the backend
  useEffect(() => {
    const fetchPurchasedPlans = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user/purchased-plans'); // Update with your API route
        const data = await response.json();
        setPurchasedPlans(data);
      } catch (error) {
        console.error('Error fetching purchased plans:', error);
      }
    };

    fetchPurchasedPlans();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Your Purchased Plans</h2>
        {purchasedPlans.length > 0 ? (
          <MarketCardsComponent plans={purchasedPlans} sortOption="name" isAscending={true} />
        ) : (
          <p className="text-center">You have not purchased any plans yet.</p>
        )}
      </div>
    </div>
  );
};

export default PurchasedPlansPage;
