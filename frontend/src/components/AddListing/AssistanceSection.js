import React from 'react';

import group249 from '../../assets/Group 249.png';
import group250 from '../../assets/Group 250.png';

const AssistanceSection = () => (
  <section className='bg-[#F9FFE2] py-16 pb-40'>
    <div className='container mx-auto flex flex-col md:flex-row items-center space-y-12 md:space-y-0 md:space-x-12 py-6 px-10 lg:px-40'>
      <img
        src={group249}
        alt='Pig Feed'
        className='w-full md:w-[500px] lg:w-[550px] xl:w-[600px] rounded-2xl'
      />
      <div className='text-center md:text-center'>
        <div className='flex justify-center items-center mb-8'>
          <img src={group250} alt='Assistance' />
        </div>
        <h3 className='text-2xl md:text-3xl font-semibold font-mochiy mb-8'>
          Need assistance
        </h3>
        <p className='md:text-md leading-relaxed mb-6'>
          Our customer service and help assistance team is dedicated to
          providing you with the best support possible. We are here to answer
          your questions, resolve issues, and ensure you have a seamless
          experience. Our knowledgeable and friendly staff is available around
          the clock to assist you with any inquiries or concerns. We strive to
          respond promptly and efficiently, making your satisfaction our top
          priority. Trust us to be there whenever you need help.
        </p>
        <h3 className='text-gray-600 text-md md:text-lg font-bold mb-8'>
          Click below to reach our customer support
        </h3>
        <button className='bg-[#5EA91E] hover:bg-[#4CAF50] text-white py-2 px-14 md:py-3 md:px-24 rounded-full font-bold transition-colors duration-200'>
          Contact us
        </button>
      </div>
    </div>
  </section>
);

export default AssistanceSection;
