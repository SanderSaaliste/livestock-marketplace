import React, { useState } from 'react';
import { BiSearch, BiMap, BiChevronDown } from 'react-icons/bi';

import gcashImg from '../../assets/gcash icon appstore.webp';
import mayaImg from '../../assets/maya icon.webp';
import CustomDropdown from '../Listings/CustomDropdown';
import { categories } from '../../constants';

const Filters = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  return (
    <div className='p-4 rounded-lg max-w-sm w-full'>
      <h2 className='text-lg font-bold'>Filter & Refine</h2>
      <hr className='mt-4 mb-4' />

      <div className='mb-4'>
        <div
          className='flex justify-between items-center cursor-pointer'
          onClick={() => setCategoriesOpen(!categoriesOpen)}
        >
          <span className='font-bold'>Categories</span>
          <BiChevronDown
            className={`transition-transform ${
              categoriesOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
        {categoriesOpen && (
          <div className='mt-4'>
            <CustomDropdown options={categories} placeholder='All Categories' />
          </div>
        )}
        <hr className='mt-4' />
      </div>

      <div className='mb-4'>
        <div
          className='flex justify-between items-center cursor-pointer'
          onClick={() => setLocationOpen(!locationOpen)}
        >
          <span className='font-bold'>Location</span>
          <BiChevronDown
            className={`transition-transform ${
              locationOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
        {locationOpen && (
          <div className='mt-2 flex items-center border rounded-md px-3 py-2 bg-white focus-within:border-[#2F855A]'>
            <BiMap className='text-gray-400 mr-2' />
            <input
              type='text'
              placeholder='Location'
              className='w-full outline-none text-gray-600'
            />
          </div>
        )}
        <hr className='mt-4' />
      </div>

      <div className='mb-4'>
        <div
          className='flex justify-between items-center cursor-pointer'
          onClick={() => setPriceOpen(!priceOpen)}
        >
          <span className='font-bold'>Price</span>
          <BiChevronDown
            className={`transition-transform ${priceOpen ? 'rotate-180' : ''}`}
          />
        </div>
        {priceOpen && (
          <div className='mt-2'>
            <div className='flex items-center space-x-2'>
              <div className='flex items-center border rounded-md px-3 py-2 bg-white focus-within:border-[#2F855A]'>
                <input
                  type='number'
                  placeholder='Min'
                  className='w-full outline-none text-gray-600'
                />
              </div>
              <div className='flex items-center border rounded-md px-3 py-2 bg-white focus-within:border-[#2F855A]'>
                <input
                  type='number'
                  placeholder='Max'
                  className='w-full outline-none text-gray-600'
                />
              </div>
              <button className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500'>
                Go
              </button>
            </div>

            <div className='mt-4'>
              <span className='font-bold'>Price type</span>
              <div className='mt-2 flex flex-col space-y-2'>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='priceType'
                    className='mr-2 focus:ring-[#2F855A]'
                  />
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='mr-2 h-5 w-5'
                  />
                  Per/kg
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='priceType'
                    className='mr-2 focus:ring-[#2F855A]'
                  />
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='mr-2 h-5 w-5'
                  />
                  Total
                </label>
              </div>
            </div>
          </div>
        )}
        <hr className='mt-4' />
      </div>

      <div className='mb-4'>
        <div
          className='flex justify-between items-center cursor-pointer'
          onClick={() => setPaymentOpen(!paymentOpen)}
        >
          <span className='font-bold'>Payment Acceptance</span>
          <BiChevronDown
            className={`transition-transform ${
              paymentOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
        {paymentOpen && (
          <div className='mt-2 flex flex-col space-y-2'>
            <label className='flex items-center'>
              <input
                type='radio'
                name='paymentType'
                className='mr-2 focus:ring-[#2F855A]'
              />
              <img
                src='https://img.icons8.com/color/27/get-cash.png'
                alt='Cash'
                className='mr-2 h-5 w-5'
              />
              Cash
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='paymentType'
                className='mr-2 focus:ring-[#2F855A]'
              />
              <img src={gcashImg} alt='GCash' className='mr-2 h-5 w-5' />
              GCash
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='paymentType'
                className='mr-2 focus:ring-[#2F855A]'
              />
              <img src={mayaImg} alt='Maya' className='mr-2 h-5 w-5' />
              Maya
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='paymentType'
                className='mr-2 focus:ring-[#2F855A]'
              />
              <img
                src='https://img.icons8.com/color/48/visa.png'
                alt='Credit Card'
                className='mr-2 h-5 w-5'
              />
              Credit Card
            </label>
          </div>
        )}
        <hr className='mt-4' />
      </div>

      <div className='mb-4'>
        <label className='font-bold block mb-2'>Search Bar</label>
        <div className='flex items-center border rounded-md px-3 py-2 bg-white focus-within:border-[#2F855A]'>
          <BiSearch className='text-gray-400 mr-2' />
          <input
            type='text'
            placeholder='Search...'
            className='w-full outline-none text-gray-600'
          />
        </div>
        <hr className='mt-4' />
      </div>

      <button className='w-full bg-[#53AE66] text-white py-3 rounded-md hover:bg-[#4C905A]'>
        Filter
      </button>
    </div>
  );
};

export default Filters;
