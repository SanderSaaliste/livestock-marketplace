import React, { useState } from 'react';
import { BiEnvelope, BiRightArrowAlt } from 'react-icons/bi';
import { FaGlobeAmericas } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

import logo from '../assets/farmifylogo.png';
import authService from '../services/auth-service';

const EmailVerification = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleResend = async () => {
    if (!email) {
      setError('Email parameter is missing.');
      return;
    }

    try {
      const response = await authService.resendVerificationEmail({ email });
      if (response && !response.error) {
        setSuccessMessage('Verification email has been resent successfully.');
      } else {
        setError(response.error || 'Failed to resend verification email.');
      }
    } catch (err) {
      setError('An error occurred while resending verification email.');
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center'>
      <header className='w-full max-w-7xl mx-auto p-4 text-center border-b border-gray-200'>
        <img src={logo} alt='Farmify Logo' className='mx-auto w-48' />
      </header>

      <main className='flex-grow w-full max-w-5xl mx-auto flex flex-col items-center p-4'>
        <section className='flex justify-center space-x-2 my-6'>
          <span className='h-1 w-14 bg-gray-300 rounded-full'></span>
          <span className='h-1 w-14 bg-gray-300 rounded-full'></span>
          <span className='h-1 w-14 bg-[#5EA91E] rounded-full'></span>
        </section>

        <section className='bg-white rounded-2xl p-8 text-center max-w-lg w-full'>
          <div className='flex flex-col items-center'>
            <div className='flex items-center justify-center bg-[#DEECD3] rounded-full w-28 h-28 mb-4'>
              <BiEnvelope className='text-[#5EA91E] text-6xl' />
            </div>
            <h3 className='text-2xl font-extrabold text-black my-4'>
              Verify your email address
            </h3>
          </div>
          <p className='text-gray-600 font-semibold text-sm mb-6 mt-6'>
            You are almost there! We have sent a verification link to
          </p>
          <span className='text-gray-800 font-bold my-4'>
            {email || 'Email not provided'}
          </span>
          <p className='text-gray-600 font-semibold text-sm mt-6'>
            In order to verify, please log in to your email account and click on
            the link you received. The link will expire in 24 hours.
          </p>
          {error && <p className='text-red-600 font-semibold mt-4'>{error}</p>}
          {successMessage && (
            <p className='text-green-600 font-semibold mt-4'>
              {successMessage}
            </p>
          )}
        </section>

        <div className='flex space-x-8 mt-2'>
          <button
            onClick={handleResend}
            className='px-10 py-3 bg-[#5EA91E] text-white font-bold rounded-full hover:bg-[#4E911B] transition duration-200'
          >
            Resend
          </button>
          <button className='px-6 py-2 bg-white text-[#5EA91E] font-bold flex items-center transition duration-200 transform hover:scale-105'>
            Return to Site <BiRightArrowAlt className='ml-2 text-2xl' />
          </button>
        </div>
      </main>

      <div className='w-full max-w-7xl mx-auto p-4 text-center border-t border-gray-200'>
        <div className='flex justify-center'>
          <button className='mt-2 flex items-center px-4 py-2 border border-gray-200 bg-gray-100 rounded-full text-gray-700 font-bold hover:bg-gray-200 transition duration-200'>
            <FaGlobeAmericas className='mr-2' /> English
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
