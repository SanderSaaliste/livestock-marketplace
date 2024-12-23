import React from 'react';
import { useNavigate } from 'react-router-dom';

import group242 from '../../assets/Group 242.png';
import group243 from '../../assets/Group 243.png';
import group244 from '../../assets/Group 244.png';

const GetStartedSteps = () => {
  const navigate = useNavigate();

  return (
    <section className='py-16 md:py-24 lg:py-32'>
      <div className='container mx-auto flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 px-6 md:px-10 lg:px-20 xl:px-40'>
        <div className='space-y-6 md:space-y-10 w-full lg:w-1/2'>
          <h2 className='text-2xl md:text-3xl font-bold font-mochiy text-center mb-10 md:mb-14'>
            Get started in two steps
          </h2>
          <GetStartedItem
            img={group242}
            step='Step 1'
            title='Add photos of your pig or a product'
            description={`Simply add up to 5 images of your pigs on our next page. High-quality photos attract buyers, showcasing your pigs' best qualities and boosting interest.`}
          />
          <GetStartedItem
            img={group243}
            step='Step 2'
            title='Add a few details'
            description='Add a few details about your pig. Providing more information increases the chances of a sale. Make your listing informative and appealing. And voila, your listing is ready!'
          />
          <div className='text-center'>
            <button
              className='bg-[#5EA91E] hover:bg-[#4CAF50] text-white py-2 px-14 md:py-3 md:px-24 rounded-full font-bold transition-colors duration-200'
              onClick={() => navigate('/fillForm')}
            >
              Get Started
            </button>
          </div>
        </div>
        <div className='w-full lg:w-1/2 h-full flex justify-center items-center'>
          <img
            src={group244}
            alt='Illustration'
            className='w-full h-full max-w-lg object-contain'
          />
        </div>
      </div>
    </section>
  );
};

const GetStartedItem = ({ img, step, title, description }) => (
  <div className='flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6'>
    <img
      src={img}
      alt={title}
      className='w-24 h-24 md:w-32 md:h-32 rounded-lg'
    />
    <div className='text-center md:text-left'>
      <h4 className='text-[#c74243] text-xs md:text-sm font-semibold font-mochiy mb-1 md:mb-2'>
        {step}
      </h4>
      <h4 className='text-lg md:text-xl font-semibold font-mochiy mb-2 md:mb-4'>
        {title}
      </h4>
      <p className='text-gray-800 text-xs md:text-sm'>{description}</p>
    </div>
  </div>
);

export default GetStartedSteps;
