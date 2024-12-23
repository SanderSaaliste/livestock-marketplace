import React from 'react';
import { MdOutlineReviews } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Reviews = () => {
  const navigate = useNavigate();

  return (
    <div className='max-w-7xl mx-auto px-4 pt-12 pb-24 border-b border-black'>
      <h1 className='text-3xl font-bold mb-12 font-mochiy'>Reviews</h1>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <p className='text-gray-700 text-md'>
          This user doesn&apos;t have any reviews yet.
        </p>

        <button
          className='flex items-center bg-[#5EA91E] text-white py-3 px-6 rounded-md font-semibold hover:bg-[#639E3B] transition'
          onClick={() => navigate('leaveReview')}
        >
          <MdOutlineReviews className='mr-2 text-lg' />
          Leave/Add a Review
        </button>
      </div>
    </div>
  );
};

export default Reviews;
