import React from 'react';
import selectBestImg from '../../assets/Selectbest.png';
import deliveryImg from '../../assets/Delivery.png';
import gCashImg from '../../assets/GCash.png';
import productsImg from '../../assets/Products.png';

const ImageSection = () => (
  <div className='flex flex-wrap justify-center my-12 md:my-24 space-y-6 md:space-y-0 md:space-x-6'>
    <ImageCard
      img={selectBestImg}
      title='Select the Best'
      description='You can select the best pigs using our filters and tools to find top-quality options available in your nearest location. Make informed choices easily and quickly.'
      bgColor='#FFF0DD'
    />
    <ImageCard
      img={deliveryImg}
      title='Delivery Services'
      description='We offer a convenient delivery service to ensure your purchases arrive safely and on time. Enjoy the ease of having your pigs delivered directly to your location.'
      bgColor='#DFEDF5'
    />
    <ImageCard
      img={gCashImg}
      title='Secure Payments'
      description='Our platform provides secured transactions via GCash and credit card payments. Experience the convenience and safety of digital payments with our trusted and reliable service.'
      bgColor='#ECF7EC'
    />
    <ImageCard
      img={productsImg}
      title='Buy Biggery Products'
      description='Explore our wide range of piggery products, including feeds, cages, and health supplies. Everything you need to keep your pigs healthy and thriving is just a click away.'
      bgColor='#FFF1EF'
    />
  </div>
);

const ImageCard = ({ img, title, description, bgColor }) => (
  <div
    className={`flex flex-col items-center text-center rounded-3xl p-6 w-72`}
    style={{ backgroundColor: bgColor, height: '450px' }}
  >
    <img src={img} alt={title} className='h-32 mb-8' />
    <h3 className='text-xl font-extrabold mb-4'>{title}</h3>
    <p className='text-md text-gray-600'>{description}</p>
  </div>
);

export default ImageSection;
