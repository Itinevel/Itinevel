  "use client"; 
  import React, { useState, useEffect } from 'react';
  import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; 
  import travelImage from '@/public/images/bali.webp';
  import Popup from '@/components/utils/popmailconfirm';
  import { useSearchParams, useRouter } from 'next/navigation'; 
  import { useSession } from 'next-auth/react';

  const RegisterPage = () => {
    const searchParams = useSearchParams(); 
    const [name, setName] = useState('');  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [nameTouched, setNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false); 
    const [roles, setRoles] = useState(['USER']); 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'authenticated') {
        // If user is logged in, redirect to the home page (or another page)
        router.replace('/');
      }
    }, [status, router]);

    if (status === 'authenticated') {
      return null; // Render nothing while redirecting
    }

    useEffect(() => {
      const role = searchParams?.get('role'); 
      if (role) {
        setRoles(role.split(',')); 
      }
    }, [searchParams]);

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      const confirmValue = e.target.value;
      setConfirmPassword(confirmValue);

      if (password !== '' && confirmValue !== '') {
        setPasswordMatch(confirmValue === password);
      }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); 

      if (name.length < 2 || !emailPattern.test(email) || password.length < 8 || !passwordMatch) {
        setError('Please ensure all fields are correctly filled.');
        return;
      }

      try {
        const response = await fetch('https://3c05-41-226-167-93.ngrok-free.app/api/register', {  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nom: name, 
            email: email,
            password: password,
            roles, 
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 400 && data.error === 'User with this email already exists') {
            setError('An account with this email already exists. Please log in.');
          } else {
            throw new Error(data.error || 'Registration failed');
          }
          return;
        }

        setSuccess(true);  
        setError('');  
        setPopupVisible(true); 

      } catch (err: any) {
        setError(err.message);  
      }
    };

    return (
      <div className="h-screen pt-6 flex flex-col md:flex-row">
        {/* Popup Component */}
        <Popup
          message="Registration successful! Please check your email to confirm your account."
          show={popupVisible}
          onClose={() => setPopupVisible(false)} 
        />

        {/* Image Section */}
        <div className="lg:w-2/3 relative hidden lg:block h-screen lg:h-auto">
          <img
            src={travelImage.src}
            alt="Register Image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white"></div>
        </div>

        {/* Data Fields Section */}
        <div className="w-full h-full  lg:w-1/3 bg-white flex flex-col justify-center items-center p-6 lg:p-12">
          <h1 className="mt-2 text-2xl lg:text-3xl font-bold text-black mb-2 font-amifer">Register</h1>
          <p className="text-black mb-6 font-amifer">Create your account to get started</p>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Registration successful!</p>}

          <form className="w-full" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4 relative">
              <label className="block text-black text-sm font-bold mb-2 font-amifer" htmlFor="name">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-10 py-2 text-sm rounded-md border-2 border-gray-300 focus:outline-none focus:border-indigo-500 shadow-sm text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setNameTouched(true)}
                  onBlur={() => setNameTouched(true)}
                  required
                />
              </div>
              {nameTouched && name.length < 2 && (
                <p className="text-xs text-gray-500 mt-1 font-amifer">
                  <FaExclamationTriangle className="inline mr-1 text-yellow-500" />
                  Please enter at least 2 characters.
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4 relative">
              <label className="block text-black text-sm font-bold mb-2 font-amifer" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-10 py-2 text-sm rounded-md border-2 border-gray-300 focus:outline-none focus:border-indigo-500 shadow-sm text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailTouched(true)}
                  onBlur={() => setEmailTouched(true)}
                  required
                />
              </div>
              {emailTouched && !emailPattern.test(email) && (
                <p className="text-xs text-gray-500 mt-1 font-amifer">
                  <FaExclamationTriangle className="inline mr-1 text-yellow-500" />
                  Please enter a valid email address.
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-6 relative">
              <label className="block text-black text-sm font-bold mb-2 font-amifer" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  placeholder="Your Password"
                  className="w-full px-10 py-2 text-sm rounded-md border-2 border-gray-300 focus:outline-none focus:border-indigo-500 shadow-sm text-black"
                  value={password}
                  onFocus={() => setPasswordTouched(true)}
                  onBlur={() => setPasswordTouched(true)}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {passwordTouched && password.length < 8 && (
                <p className="text-xs text-gray-500 mt-1 font-amifer">
                  <FaExclamationTriangle className="inline mr-1 text-yellow-500" />
                  Password must be at least 8 characters long.
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6 relative">
              <label className="block text-black text-sm font-bold mb-2 font-amifer" htmlFor="confirm-password">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm Your Password"
                  className={`w-full px-10 py-2 text-sm rounded-md border-2 ${passwordMatch ? 'border-gray-300' : 'border-red-500'} focus:outline-none focus:border-indigo-500 shadow-sm text-black`}
                  value={confirmPassword}
                  onFocus={() => setConfirmPasswordTouched(true)}
                  onBlur={() => setConfirmPasswordTouched(true)}
                  onChange={handleConfirmPassword}
                  required
                />
              </div>
              {confirmPasswordTouched && password !== '' && confirmPassword !== '' && (
                <p className={`text-xs mt-1 ${passwordMatch ? 'text-green-500 font-amifer' : 'text-red-500 font-amifer'}`}>
                  {passwordMatch ? (
                    <>
                      <FaCheckCircle className="inline mr-1" />
                      Passwords match!
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="inline mr-1" />
                      Passwords do not match!
                    </>
                  )}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-black font-amifer">
              Already have an account?{' '}
              <a href="/login" className="text-indigo-500 hover:text-indigo-600">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default RegisterPage;
