import React from 'react';

import secureCashImg from '../../assets/Securegcash.png';
import sellProductsImg from '../../assets/Sellproducts.png';
import trackSalesImg from '../../assets/Tracksales.png';
import prizeImg from '../../assets/Prize.png';

const ImageSection = () => (
  <div className='flex flex-wrap justify-center my-12 md:my-24 space-y-6 md:space-y-0 md:space-x-6'>
    <ImageCard
      img={secureCashImg}
      title='Secure transactions GCash and credit card'
      description='Our platform provides secured transactions via GCash and credit card payments. Experience the convenience and safety of digital payments with our trusted and reliable service.'
      bgColor='#ECF7EC'
    />
    <ImageCard
      img={sellProductsImg}
      title='Sell pig-related products'
      description='Discover the best platform to sell your pig-related products. Reach a wide audience and boost your sales with our easy-to-use, secure, and efficient marketplace.'
      bgColor='#FFF0DD'
    />
    <ImageCard
      img={trackSalesImg}
      title='Build your client base & track your sales'
      description='Expand your customer base and effortlessly track your sales with our platform. Optimize your marketing strategies, manage inventory, and increase revenue through efficient and reliable sales tracking tools.'
      bgColor='#DFEDF5'
    />
    <ImageCard
      img={prizeImg}
      title='Win a Prize!'
      description={`Make a transaction on our website via GCash, and automatically enter our monthly giveaway. Win amazing prizes like feedbags, cash, or a travel package. Don't miss your chance!`}
      bgColor='#E4EFFE'
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
