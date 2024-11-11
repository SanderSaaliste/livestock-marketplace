import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BiCheckCircle } from 'react-icons/bi';
import { FaGlobeAmericas } from 'react-icons/fa';
import { CircularProgress } from '@mui/material';

import logo from '../assets/farmifylogo.png';
import authService from '../services/auth-service';

const EmailVerified = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (token) {
        try {
          const response = await authService.verifyEmail({ token });
          if (response && !response.error) {
            setSuccess(true);
          } else {
            setError(
              response.error || 'Failed to verify email. Please try again.'
            );
          }
        } catch (err) {
          setError(
            'An error occurred while verifying your email. Please try again later.'
          );
        } finally {
          setLoading(false);
        }
      } else {
        setError('Verification token is missing.');
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className='min-h-screen flex flex-col items-center'>
      <header className='w-full max-w-7xl mx-auto p-4 text-center border-b border-gray-200'>
        <img src={logo} alt='Farmify Logo' className='mx-auto w-48' />
      </header>

      <main className='flex-grow w-full max-w-5xl mx-auto flex flex-col items-center p-4'>
        {loading ? (
          <CircularProgress color='success' size={60} className='my-10' />
        ) : success ? (
          <>
            <section className='flex justify-center space-x-2 my-6'>
              <span className='h-1 w-14 bg-gray-300 rounded-full'></span>
              <span className='h-1 w-14 bg-gray-300 rounded-full'></span>
              <span className='h-1 w-14 bg-[#5EA91E] rounded-full'></span>
            </section>

            <section className='bg-white rounded-2xl p-8 text-center max-w-lg w-full'>
              <div className='flex flex-col items-center'>
                <div className='flex items-center justify-center bg-[#DEECD3] rounded-full w-28 h-28 mb-4'>
                  <BiCheckCircle className='text-[#5EA91E] text-6xl' />
                </div>
                <h3 className='text-2xl font-extrabold text-black my-4'>
                  Email Verified
                </h3>
              </div>
              <p className='text-gray-600 font-semibold text-sm mb-6 mt-6'>
                Great! Your email address has been successfully verified. You
                can now return to the site and start exploring all its features.
              </p>
            </section>
          </>
        ) : (
          <section className='bg-white rounded-2xl p-8 text-center max-w-lg w-full'>
            <div className='flex flex-col items-center'>
              <div className='flex items-center justify-center bg-red-100 rounded-full w-28 h-28 mb-4'>
                <BiCheckCircle className='text-red-500 text-6xl' />
              </div>
              <h3 className='text-2xl font-extrabold text-red-600 my-4'>
                Verification Failed
              </h3>
              <p className='text-gray-600 font-semibold text-sm mb-6 mt-6'>
                {error}
              </p>
            </div>
          </section>
        )}

        <div className='flex justify-center mt-2'>
          <button className='px-10 py-3 bg-[#5EA91E] text-white font-bold rounded-full hover:bg-green-600 transition duration-200'>
            Return to Site
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

export default EmailVerified;
