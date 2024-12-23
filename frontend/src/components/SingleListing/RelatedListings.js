import React from 'react';
import exampleImage1 from '../../assets/Rectangle 23.png';
import exampleImage2 from '../../assets/Rectangle 33.png';
import exampleImage3 from '../../assets/Rectangle 22.png';

const RelatedListings = () => (
  <section className='py-12 pb-32'>
    <h2 className='text-3xl lg:text-4xl font-bold text-center lg:text-left lg:ml-56 mb-10 lg:mb-14 font-mochiy'>
      Related sales and products
    </h2>
    <div className='flex flex-wrap justify-center gap-6 lg:gap-10'>
      <ListingCard
        img={exampleImage1}
        location='Cebu'
        weight='80kg'
        price='20,000'
      />
      <ListingCard
        img={exampleImage2}
        location='Cebu'
        weight='80kg'
        price='20,000'
      />
      <ListingCard
        img={exampleImage3}
        location='Cebu'
        weight='80kg'
        price='20,000'
      />
    </div>
  </section>
);

const ListingCard = ({ img, location, weight, price }) => (
  <div
    className='bg-white border border-gray-300 rounded-2xl shadow-xl mx-4 md:mx-0 p-6 w-full sm:w-80 md:w-96 text-center hover:bg-gray-100'
    style={{ minHeight: '600px' }}
  >
    <img src={img} alt='Listing' className='rounded-lg mb-8' />
    <h4 className='text-xl font-semibold font-mochiy mb-4'>
      Pig for Sale in {location}
    </h4>
    <ul className='text-center space-y-4'>
      <li className='flex items-center justify-center'>
        <img
          width='20'
          height='20'
          src='https://img.icons8.com/color/96/marker--v1.png'
          alt='Location icon'
          className='mr-2'
        />
        Location: {location}
      </li>
      <li className='flex items-center justify-center'>
        <img
          width='20'
          height='20'
          src='https://img.icons8.com/color/96/weight-kg.png'
          alt='Weight icon'
          className='mr-2'
        />
        Weight: {weight}
      </li>
      <li className='flex items-center justify-center'>
        <img
          width='20'
          height='20'
          src='https://img.icons8.com/color/96/peso-symbol.png'
          alt='Peso symbol'
          className='mr-2'
        />
        <strong>Price: {price}</strong>
      </li>
    </ul>
    <button className='bg-[#FF7162] hover:bg-[#e66051] text-white font-bold py-3 px-6 rounded-lg mt-6'>
      More Details
    </button>
  </div>
);

export default RelatedListings;
