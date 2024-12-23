import React, { useState } from 'react';
import { FaGlobeAmericas } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import logo from '../assets/farmifylogo.png';
import { useNavigate } from 'react-router-dom';

const LeaveReview = () => {
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleStarHover = (value) => {
    setHoverRating(value);
  };

  const handleStarHoverLeave = () => {
    setHoverRating(0);
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
            <h3 className='text-2xl font-extrabold text-black my-4'>
              Please leave a review!
            </h3>
          </div>

          <div className='flex justify-center items-center mb-6'>
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleStarClick(value)}
                onMouseEnter={() => handleStarHover(value)}
                onMouseLeave={handleStarHoverLeave}
                className='text-4xl text-[#42B572]'
              >
                {value <= (hoverRating || rating) ? (
                  <AiFillStar />
                ) : (
                  <AiOutlineStar />
                )}
              </button>
            ))}
          </div>

          <p className='text-gray-600 font-semibold text-sm mb-10 mt-6'>
            Your review matters! By sharing your experience, you help us and our
            sellers improve and grow. Take a moment to review the seller—it’s a
            small gesture that makes a big difference in supporting our
            community and helping future buyers. Thank you!
          </p>

          <textarea
            className='w-full bg-[#F5F5F5] rounded-md px-4 py-2 border-2 border-[#F5F5F5] focus:border-[#5EA91E] focus:outline-none placeholder:text-sm placeholder:font-bold placeholder:text-gray-400'
            placeholder='Write your review here...'
            rows={5}
          ></textarea>
        </section>

        <div className='flex mt-6'>
          <button
            className='px-10 py-3 bg-[#5EA91E] text-white font-bold rounded-full hover:bg-[#4E911B] transition duration-200'
            onClick={() => navigate('/listings')}
          >
            Submit
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

export default LeaveReview;
