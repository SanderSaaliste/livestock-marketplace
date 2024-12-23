import React from 'react';
import { FaGlobeAmericas } from 'react-icons/fa';

const Footer = () => (
  <footer className='py-4 lg:mx-48 border-t border-gray-300'>
    <div className='container mx-auto flex items-center justify-center mt-4'>
      <button className='flex items-center space-x-2 px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition'>
        <FaGlobeAmericas className='text-black text-lg' />
        <span className='text-black text-sm font-medium'>English</span>
      </button>
    </div>
  </footer>
);

export default Footer;
