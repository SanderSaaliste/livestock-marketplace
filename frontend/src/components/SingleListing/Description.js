import React from 'react';
import {
  MdOutlineHealthAndSafety,
  MdAttachMoney,
  MdPhone,
} from 'react-icons/md';
import { FaCalendarCheck } from 'react-icons/fa';
import { BsChatDots } from 'react-icons/bs';

import rectangle22 from '../../assets/Rectangle 22.png';
import { apiHost } from '../../constants';

const Description = ({ listing }) => {
  return (
    <div className='max-w-7xl mx-auto px-4 pt-12 pb-24 border-b border-black'>
      <h1 className='text-3xl font-bold mb-12 font-mochiy'>Description</h1>
      <div className='flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8'>
        <div className='w-full lg:w-1/3'>
          {listing.formData.media && listing.formData.media.length > 0 && (
            <img
              src={`${apiHost}${listing.formData.media[0]}`}
              alt={listing.formData.title}
              className='w-full h-auto object-cover rounded-lg shadow-md'
            />
          )}
        </div>

        <div className='w-full lg:w-2/3'>
          <h2 className='text-2xl font-bold mb-6 font-mochiy'>
            {listing.formData.title}
          </h2>
          {listing.formData.description && (
            <p className='text-gray-700 mb-4 text-md'>
              Hello everyone! We have 10 robust and well-raised pigs available
              for sale, each weighing between 70-80kg. These pigs are perfect
              for various needs such as lechon, business stock, or personal
              needs. Our pigs are raised in a clean and caring environment to
              ensure the highest quality and health.
            </p>
          )}

          <ul className='space-y-2 text-gray-700 mb-6'>
            <li className='flex items-center space-x-2'>
              <MdOutlineHealthAndSafety className='text-[#5EA91E] text-lg' />
              <span>Health Care: {listing.formData.healthCare}</span>
            </li>
            <li className='flex items-center space-x-2'>
              <MdAttachMoney className='text-[#5EA91E] text-lg' />
              <span>Price: {listing.formData.price}</span>
            </li>
            <li className='flex items-center space-x-2'>
              <FaCalendarCheck className='text-[#5EA91E] text-lg' />
              <span>Available: {listing.formData.availability}</span>
            </li>
          </ul>
          <p className='text-gray-700 mb-6'>
            For more details or to schedule a visit, please PM me or contact me
            at <span className='font-bold'>9105761963</span> 🙏
          </p>

          <div className='flex space-x-4'>
            <button className='flex items-center bg-[#5EA91E] text-white py-3 px-6 rounded-md font-semibold hover:bg-[#639E3B] transition'>
              <BsChatDots className='mr-2 text-lg' />
              Contact Seller
            </button>
            <button className='flex items-center bg-[#5EA91E] text-white py-3 px-6 rounded-md font-semibold hover:bg-[#639E3B] transition'>
              <MdPhone className='mr-2 text-lg' />
              Call Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
