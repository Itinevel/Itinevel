"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/utils/navbar";
import { ReactNode, useState } from 'react';
import { SessionWrapper } from "@/components/sessionwrapper";
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import Spinner from "@/components/utils/Spinner"; // Spinner component

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  session: any;
  children: ReactNode;
}

const RootLayout = ({ session, children }: RootLayoutProps) => {
  const [loading, setLoading] = useState(false); // Manage loading state
  const router = useRouter(); // Get router instance from next/navigation

  const handleNavigation = (path: string) => {
    setLoading(true);  // Show spinner
    router.push(path); // Navigate to the new page
    setTimeout(() => setLoading(false), 500); // Hide spinner after a short delay
  };

  return (
    <html lang="en">
  <body className={inter.className}>
    <SessionWrapper session={session}>
      <div className="flex flex-col h-screen">
        {/* Fixed Navbar */}
        <Navbar className="fixed top-0 left-0 w-full z-50" onNavigate={handleNavigation} />

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-100">
            <Spinner />
          </div>
        )}

        {/* Main content with padding and custom scrollbar */}
        <main className="flex-1 overflow-auto  ">
          {children}
        </main>
      </div>
    </SessionWrapper>
  </body>
</html>

  
  );
};

export default RootLayout;
