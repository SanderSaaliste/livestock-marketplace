import React from 'react';
import feedImage from '../assets/Grower.png';

const FeedSection = () => (
  <section className='bg-[#F0FDC8] py-16 pb-40'>
    <h2 className='text-5xl font-bold font-mochiy text-center mb-16'>
      Buy Pig Feed
    </h2>
    <div className='container mx-auto flex flex-col md:flex-row items-center space-y-12 md:space-y-0 md:space-x-12 py-4 px-10 lg:px-40'>
      <img
        src={feedImage}
        alt='Pig Feed'
        className='w-full md:w-[400px] lg:w-[450px] xl:w-[500px] rounded-2xl border border-gray-300 shadow-md'
      />
      <div className='text-center md:text-left'>
        <h3 className='text-xl md:text-2xl font-semibold font-mochiy mb-4'>
          VIEPro Premium Fattening Pig Feed
        </h3>
        <div className='flex justify-center md:justify-start mb-8'>
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              src='https://img.icons8.com/fluency/32/star--v1.png'
              alt='Star Icon'
              className='mx-1'
            />
          ))}
        </div>
        <p className='text-gray-700 md:text-md leading-relaxed'>
          VIEPro Premium Fattening Pig Feed – Grower is a complete feed for pigs
          starting at 100 days old, ensuring healthier and leaner hogs. Achieve
          110-117kg live weight in 6 months with improved immunity and nutrient
          absorption. Use with VIEPro Starter and Finisher for optimal results
          and maximum performance.
        </p>
        <h4 className='text-xl md:text-2xl font-bold flex items-center justify-center md:justify-start mt-12'>
          <img
            width='32'
            height='32'
            src='https://img.icons8.com/color/96/peso-symbol.png'
            alt='Peso symbol'
            className='mr-2'
          />
          Price: 2,100
        </h4>
        <button className='bg-[#FF7162] hover:bg-[#e66051] text-white font-bold py-4 px-8 rounded-lg mt-8'>
          PLACE ORDER
        </button>
      </div>
    </div>
  </section>
);

export default FeedSection;
