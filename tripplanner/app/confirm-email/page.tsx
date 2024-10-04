"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Updated import for useRouter in Next.js 13+ app directory

const ConfirmEmail = () => {
  const [message, setMessage] = useState('Verifying your email...');
  const [error, setError] = useState(false);
  const router = useRouter();  // Updated useRouter hook

  // Get the token from the URL query parameter
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      // Call the backend to confirm the email
      fetch(`http://localhost:3001/api/confirm-email?token=${token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(true);
            setMessage(data.error);
          } else {
            setMessage('Your email has been confirmed successfully!');
            
            // Redirect user after successful confirmation
            setTimeout(() => {
              router.push('/login'); // Redirect to login page after 3 seconds
            }, 3000);  // 3-second delay
          }
        })
        .catch(() => {
          setError(true);
          setMessage('An error occurred. Please try again later.');
        });
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className={`text-2xl font-bold ${error ? 'text-red-500' : 'text-green-500'}`}>
        {message}
      </h1>
    </div>
  );
};

export default ConfirmEmail;
