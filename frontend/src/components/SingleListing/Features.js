import React from 'react';
import { BiMap } from 'react-icons/bi';
import { GiWeight } from 'react-icons/gi';
import { MdCategory } from 'react-icons/md';
import { TbCurrencyPeso } from 'react-icons/tb';

const Features = ({ listing }) => {
  return (
    <div className='max-w-7xl mx-auto px-4 pt-12 pb-24 border-b border-black'>
      <h1 className='text-3xl font-bold mb-12 font-mochiy'>Features</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-700'>
        <div className='flex items-center space-x-4'>
          <BiMap className='text-2xl text-gray-600' />
          <span className='font-medium'>Location</span>
          <span className='font-bold'>{listing.formData.location}</span>
        </div>

        <div className='flex items-center space-x-4'>
          <MdCategory className='text-2xl text-gray-600' />
          <span className='font-medium'>Type</span>
          <span className='font-bold'>{listing.formData.type}</span>
        </div>

        <div className='flex items-center space-x-4'>
          <GiWeight className='text-2xl text-gray-600' />
          <span className='font-medium'>Bag</span>
          <span className='font-bold'>{listing.formData.bag}</span>
        </div>

        <div className='flex items-center space-x-4'>
          <TbCurrencyPeso className='text-2xl text-gray-600' />
          <span className='font-medium'>Per bag</span>
          <span className='font-bold'>{listing.formData.perBag}</span>
        </div>
      </div>
    </div>
  );
};

export default Features;
