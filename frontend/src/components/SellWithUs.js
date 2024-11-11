import React from 'react';
import freeListingImg from '../assets/Group 39.png';
import buildClientImg from '../assets/Group 38.png';
import farmerImg from '../assets/Group 45.png';

const SellWithUs = () => (
  <section className='py-16 md:py-24 lg:py-32'>
    <h2 className='text-4xl md:text-5xl font-bold font-mochiy text-center mb-12 md:mb-16'>
      Sell With Us
    </h2>
    <div className='container mx-auto flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 px-6 md:px-10 lg:px-20 xl:px-40'>
      <div className='space-y-12 md:space-y-16 w-full lg:w-1/2'>
        <SellUsItem
          img={freeListingImg}
          title='List Your Pigs for Free'
          description='Enjoy the benefits of listing your pigs on our platform without any upfront cost. Maximize your sales potential, and connect with buyers effortlessly on our platform.'
        />
        <SellUsItem
          img={buildClientImg}
          title='Build Your Client Base & Track Your Sales'
          description='Expand your reach, attract more buyers, and keep track of your sales seamlessly. Use our tools to manage inventory, monitor transactions, and gain insights into buyer behavior.'
        />
      </div>
      <img
        src={farmerImg}
        alt='Farmer'
        className='w-full lg:w-1/2 max-w-lg rounded-lg'
      />
    </div>
    <div className='text-center mt-12'>
      <button className='bg-[#FF7162] hover:bg-[#e66051] text-white py-3 px-10 md:py-4 md:px-20 rounded-lg font-bold transition-colors duration-200'>
        GET STARTED
      </button>
    </div>
  </section>
);

const SellUsItem = ({ img, title, description }) => (
  <div className='flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6'>
    <img
      src={img}
      alt={title}
      className='w-24 h-24 md:w-32 md:h-32 rounded-lg'
    />
    <div className='text-center md:text-left'>
      <h4 className='text-xl md:text-2xl font-semibold font-mochiy mb-2 md:mb-4'>
        {title}
      </h4>
      <p className='text-gray-800 text-sm md:text-base'>{description}</p>
    </div>
  </div>
);

export default SellWithUs;
