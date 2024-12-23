import React from 'react';
import logo from '../assets/Group 193.png';
import instagramLogo from '../assets/Group 147.png';
import twitterLogo from '../assets/Group 148.png';
import facebookLogo from '../assets/Group 149.png';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className='bg-[#43662E] text-white pt-10 pb-4 px-4 md:px-8 lg:px-32'>
    <div className='container mx-auto flex flex-col items-center'>
      {/* Logo Centered at the Top */}
      <img
        src={logo}
        alt='Farmify Logo'
        className='w-40 md:w-60 lg:w-80 mb-10 md:mb-20'
      />

      {/* Main Content Sections */}
      <div className='w-full flex flex-col md:flex-row justify-between space-y-12 md:space-y-0 md:space-x-8 lg:space-x-12 mb-12 md:mb-20'>
        {/* Our Mission Section */}
        <div className='md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left'>
          <h4 className='text-lg md:text-2xl font-bold mb-4'>Our Mission</h4>
          <p className='text-gray-300 font-semibold text-sm md:text-base'>
            Farmify piggery marketplace aims to revolutionize pig farming by
            providing a reliable and user-friendly platform where farmers and
            buyers can connect, trade, and thrive together.
          </p>
        </div>

        {/* Navigation Section */}
        <div className='md:w-1/4 text-center md:text-left'>
          <h4 className='text-lg md:text-2xl font-bold mb-4'>Navigation</h4>
          <nav className='space-y-2'>
            <a
              href='#'
              className='text-gray-300 font-semibold hover:text-gray-100 block'
            >
              Home
            </a>
            <a
              href='#'
              className='text-gray-300 font-semibold hover:text-gray-100 block'
            >
              Listings
            </a>
            <Link
              to='/addListing'
              className='text-gray-300 font-semibold hover:text-gray-100 block'
            >
              Add Listing
            </Link>
            <a
              href='#'
              className='text-gray-300 font-semibold hover:text-gray-100 block'
            >
              About us
            </a>
            <a
              href='#'
              className='text-gray-300 font-semibold hover:text-gray-100 block'
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Contact Section */}
        <div className='md:w-1/4 text-center md:text-left'>
          <h4 className='text-lg md:text-2xl font-bold mb-4'>Contact</h4>
          <p className='text-gray-300 font-semibold text-sm md:text-base mb-2'>
            Phone: (123) 456-7890
          </p>
          <p className='text-gray-300 font-semibold text-sm md:text-base mb-2'>
            FAX: (123) 456-7891
          </p>
          <p className='text-gray-300 font-semibold text-sm md:text-base'>
            123 Example Address, City, Country
          </p>
        </div>

        {/* Stay Connected Section */}
        <div className='md:w-1/4 text-center md:text-left'>
          <h4 className='text-lg md:text-2xl font-bold mb-4'>Stay Connected</h4>
          <p className='text-gray-300 font-semibold text-sm md:text-base mb-4'>
            Stay connected with our latest news and price alerts to never miss a
            great deal.
          </p>
          <div className='relative'>
            <input
              type='email'
              placeholder='Email address'
              className='bg-transparent border-b border-gray-200 focus:outline-none text-white placeholder-gray-400 w-full py-2 pr-10'
            />
            <button className='absolute right-0 top-0 mt-2'>➔</button>
          </div>
          <div className='flex space-x-4 mt-6'>
            <img
              src={facebookLogo}
              alt='Facebook'
              className='w-6 h-6 md:w-8 md:h-8'
            />
            <img
              src={twitterLogo}
              alt='Twitter'
              className='w-6 h-6 md:w-8 md:h-8'
            />
            <img
              src={instagramLogo}
              alt='Instagram'
              className='w-6 h-6 md:w-8 md:h-8'
            />
          </div>
        </div>
      </div>

      {/* Bottom Section with Terms and Privacy */}
      <div className='w-full border-t border-white pt-4 flex flex-col md:flex-row justify-between items-center text-white text-xs md:text-sm'>
        <p>&copy; 2024 All rights reserved.</p>
        <nav className='flex space-x-4 mt-2 md:mt-0'>
          <a href='#' className='hover:underline'>
            Terms & Conditions
          </a>
          <a href='#' className='hover:underline'>
            Privacy Policy
          </a>
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
