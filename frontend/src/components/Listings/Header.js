import React from 'react';
import group222 from '../../assets/Group 222.png';

const Header = () => (
  <section className='py-4 md:py-8 lg:py-12'>
    <h2 className='text-2xl md:text-4xl font-bold font-mochiy text-center mb-8 md:mb-12'>
      Available Listings
    </h2>

    <div className='flex flex-col lg:flex-row justify-between items-center max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-4 lg:space-y-0'>
      {/* Results Text */}
      <div className='text-lg md:text-xl font-semibold text-gray-700'>
        Showing "360" Results
      </div>

      <div className='relative w-full md:w-auto'>
        <img
          src={group222}
          alt='Megaphone'
          className='object-contain mx-auto md:mx-0'
        />
        <div className='absolute inset-0 flex items-center justify-center md:justify-end px-4 lg:px-8'>
          <div className='flex items-center w-full lg:w-auto max-w-xs md:max-w-xl space-x-4'>
            <span className='font-mochiy text-black text-md md:text-lg font-bold'>
              Never Miss a Good Price
            </span>

            <div className='flex justify-end w-full'>
              <input
                type='email'
                placeholder='Enter your email'
                className='w-[60%] md:w-full py-2 px-2 md:py-3 md:px-4 border border-gray-300 border-r-0 rounded-l-lg focus:outline-none text-xs md:text-base'
              />
              <button className='bg-[#FC6A67] text-white px-2 md:px-6 py-2 md:py-3 rounded-r-lg hover:bg-[#FB504F] transition text-xs md:text-base'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Header;
