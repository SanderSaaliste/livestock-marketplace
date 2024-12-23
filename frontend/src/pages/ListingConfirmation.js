import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { FaGlobeAmericas } from 'react-icons/fa';

import logo from '../assets/farmifylogo.png';

const ListingConfirmation = () => {
  return (
    <div className='min-h-screen flex flex-col items-center'>
      <header className='w-full max-w-7xl mx-auto p-4 text-center border-b border-gray-200'>
        <img src={logo} alt='Farmify Logo' className='mx-auto w-48' />
      </header>

      <main className='flex-grow w-full max-w-5xl mx-auto flex flex-col items-center p-4'>
        <section className='flex justify-center space-x-2 my-6'>
          <span className='h-1 w-14 bg-gray-300 rounded-full'></span>
          <span className='h-1 w-14 bg-[#5EA91E] rounded-full'></span>
        </section>

        <section className='bg-white rounded-2xl p-8 text-center max-w-lg w-full'>
          <div className='flex flex-col items-center'>
            <div className='flex items-center justify-center bg-[#DEECD3] border-8 border-[#5EA91E] rounded-full w-28 h-28 mb-4'>
              <BiCheck className='text-[#5EA91E] text-8xl' />
            </div>
            <h3 className='text-2xl font-extrabold text-black my-4'>
              Congratulations!
            </h3>
          </div>
          <p className='text-gray-600 font-semibold text-sm mb-6 mt-6'>
            You've successfully created your listing! To review it, click the
            button below. Let's welcome clients to our listings!
          </p>
        </section>

        <div className='flex space-x-8 mt-2'>
          <button className='px-10 py-3 bg-[#EEEEEE] text-black font-bold rounded-full hover:bg-[#E1E1E1] transition duration-200'>
            Review
          </button>
          <button className='px-10 py-3 bg-[#5EA91E] text-white font-bold rounded-full hover:bg-[#4E911B] transition duration-200'>
            My Profile
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

export default ListingConfirmation;
