import React, { useState } from 'react';
import { BiMenu, BiHeart, BiBell, BiEnvelope, BiSearch } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';

import logo from '../assets/farmifylogo.png';
import headerImage from '../assets/header.png';
import CustomDropdown from './CustomDropdown';
import SignUpDialog from './SignUpDialog';
import LoginDialog from './LoginDialog';

const categories = [
  {
    group: 'Livestock',
    options: [
      {
        label: 'Livestock',
        icon: 'https://img.icons8.com/ios/50/cattle-sign.png',
      },
      { label: 'Cattle' },
      { label: 'Pigs' },
      { label: 'Piglets' },
      { label: 'Poultry' },
      { label: 'Goats' },
      { label: 'Carabaos' },
      { label: 'Sheep' },
      { label: 'Horses' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Vehicles',
    options: [
      { label: 'Vehicles', icon: 'https://img.icons8.com/ios/50/tractor.png' },
      { label: 'Cars' },
      { label: 'Motorcycles and Scooters' },
      { label: 'Trucks' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Services / Jobs',
    options: [
      {
        label: 'Services / Jobs',
        icon: 'https://img.icons8.com/ios/50/work.png',
      },
      { label: 'Mechanic' },
      { label: 'Plumber' },
      { label: 'Farm Hand' },
      { label: 'Electrician' },
      { label: 'Builder' },
      { label: 'Veterinarian' },
    ],
  },
  {
    group: 'Real Estate',
    options: [
      {
        label: 'Real Estate',
        icon: 'https://img.icons8.com/ios/20/real-estate.png',
      },
      { label: 'Land Plots' },
      { label: 'Ranches' },
      { label: 'Vineyards' },
      { label: 'Farmland' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Heavy Equipment',
    options: [
      {
        label: 'Heavy Equipment',
        icon: 'https://img.icons8.com/ios/20/digger.png',
      },
      { label: 'Tractors' },
      { label: 'Plows' },
      { label: 'Seeders/Planters' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Aquaculture',
    options: [
      {
        label: 'Aquaculture',
        icon: 'https://img.icons8.com/ios/20/fish-food.png',
      },
      { label: 'Nets (Pukot/Net)' },
      { label: 'Lines (Lambat)' },
      { label: 'Aggregating Devices (Payao)' },
      { label: 'Traps (Bubo/Trap)' },
      { label: 'Spears and Harpoons (Pana/Hasa)' },
      { label: 'Boats (Bangka/Banca)' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Tools',
    options: [
      {
        label: 'Tools',
        icon: 'https://img.icons8.com/dotty/20/maintenance.png',
      },
      { label: 'Hand Tools' },
      { label: 'Power Tools' },
    ],
  },
  {
    group: 'Home & Garden',
    options: [
      {
        label: 'Home & Garden',
        icon: 'https://img.icons8.com/ios/20/house-with-a-garden.png',
      },
      { label: 'Plants' },
      { label: 'Furniture' },
      { label: 'Gardening Tools' },
      { label: 'Cleaning Supplies' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Animal Feed',
    options: [
      {
        label: 'Animal Feed',
        icon: 'https://img.icons8.com/ios/20/pig-food.png',
      },
      { label: 'Hay and Silage' },
      { label: 'Pellets' },
      { label: 'Grains' },
      { label: 'Pig Feed' },
      { label: 'Chicken Feed' },
      { label: 'Cattle Feed' },
      { label: 'Poultry Feed' },
      { label: 'Horse Feed' },
      { label: 'Aquafeeds' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Fertilizers',
    options: [
      {
        label: 'Fertilizers',
        icon: 'https://img.icons8.com/external-wanicon-lineal-wanicon/20/external-fertilizer-farming-and-agriculture-wanicon-lineal-wanicon.png',
      },
      { label: 'Organic Fertilisers' },
      { label: 'Chemical Fertilisers' },
    ],
  },
  {
    group: 'Fruits, Vegetables & Growables',
    options: [
      {
        label: 'Fruits, Vegetables & Growables',
        icon: 'https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/20/external-vegetables-health-vitaliy-gorbachev-lineal-vitaly-gorbachev.png',
      },
      { label: 'Mango' },
      { label: 'Banana' },
      { label: 'Pineapple' },
      { label: 'Papaya' },
      { label: 'Coconut' },
      { label: 'Eggplant' },
      { label: 'Tomato' },
      { label: 'Squash' },
      { label: 'Bitter Melon' },
      { label: 'String Beans' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Building Materials',
    options: [
      {
        label: 'Building Materials',
        icon: 'https://img.icons8.com/wired/20/construction-materials.png',
      },
      { label: 'Steel' },
      { label: 'Wood' },
      { label: 'Bamboo' },
      { label: 'Glass' },
      { label: 'Roofing Materials' },
      { label: 'Sand & Gravel' },
      { label: 'Bricks' },
      { label: 'Cement' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Seeds',
    options: [
      {
        label: 'Seeds',
        icon: 'https://img.icons8.com/ios/20/paper-bag-with-seeds.png',
      },
      { label: 'Rice Seeds' },
      { label: 'Corn Seeds' },
      { label: 'Mung Bean Seeds (Munggo)' },
      { label: 'Coconut Seeds (Niyog)' },
      { label: 'Peanut Seeds' },
      { label: 'Okra Seeds' },
      { label: 'Ampalaya (Bitter Melon) Seeds' },
      { label: 'Tomato Seeds (Kamatis)' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Other',
    options: [
      {
        label: 'Other',
        icon: 'https://img.icons8.com/ios/20/connection-status-off.png',
      },
    ],
  },
];

const NavbarHero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const handleSignupClick = () => setSignupOpen(true);
  const handleSignupClose = () => setSignupOpen(false);

  const handleLoginClick = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  return (
    <div
      className='min-h-screen bg-cover bg-center'
      style={{ backgroundImage: `url(${headerImage})` }}
    >
      <nav className='container mx-auto px-4 lg:px-40 py-6 lg:py-10 flex justify-between items-center'>
        <div className='flex items-center space-x-4 lg:space-x-10'>
          <img src={logo} alt='Farmify Logo' className='h-10 lg:h-12' />
          <div className='hidden lg:flex space-x-6'>
            <a href='#' className='text-green-900 font-semibold'>
              Home
            </a>
            <a href='#' className='text-green-900 font-semibold'>
              Pigs for Sale
            </a>
            <a href='#' className='text-green-900 font-semibold'>
              Sell your Pig
            </a>
            <a href='#' className='text-green-900 font-semibold'>
              About us
            </a>
            <a href='#' className='text-green-900 font-semibold'>
              Contact us
            </a>
          </div>
        </div>

        <div className='hidden lg:flex items-center space-x-4 lg:space-x-12'>
          <div className='flex space-x-3'>
            <BiHeart className='text-black text-xl lg:text-2xl' />
            <BiBell className='text-black text-xl lg:text-2xl' />
            <BiEnvelope className='text-black text-xl lg:text-2xl' />
          </div>
          <button
            onClick={handleLoginClick}
            className='text-black font-semibold px-3 py-1 lg:py-1 lg:px-4 hover:bg-[#FE7051] hover:text-white rounded-full transition duration-200 ease-in-out'
          >
            Login
          </button>
          <button
            onClick={handleSignupClick}
            className='bg-black text-white py-1 px-3 lg:py-1 lg:px-4 rounded-full font-semibold text-sm lg:text-base hover:bg-[#FE7051] hover:transition duration-200 ease-in-out'
          >
            Sign up
          </button>
        </div>

        <div className='lg:hidden flex items-center'>
          <div className='flex items-center space-x-4 lg:space-x-12'>
            <button
              onClick={handleLoginClick}
              className='text-black font-semibold px-3 py-1 lg:py-1 lg:px-4 hover:bg-[#FE7051] hover:text-white rounded-full transition duration-200 ease-in-out'
            >
              Login
            </button>
            <button
              onClick={handleSignupClick}
              className='bg-black text-white py-1 px-3 lg:py-1 lg:px-4 rounded-full font-semibold text-sm lg:text-base hover:bg-[#FE7051] hover:transition duration-200 ease-in-out'
            >
              Sign up
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='text-2xl'
            >
              {mobileMenuOpen ? <FaTimes /> : <BiMenu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className='lg:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-20'>
            <div className='flex flex-col items-start p-4 space-y-3'>
              <a href='#' className='text-green-900 font-semibold'>
                Home
              </a>
              <a href='#' className='text-green-900 font-semibold'>
                Pigs for Sale
              </a>
              <a href='#' className='text-green-900 font-semibold'>
                Sell your Pig
              </a>
              <a href='#' className='text-green-900 font-semibold'>
                About us
              </a>
              <a href='#' className='text-green-900 font-semibold'>
                Contact us
              </a>
              <div className='flex space-x-3 mt-4'>
                <BiHeart className='text-black text-xl' />
                <BiBell className='text-black text-xl' />
                <BiEnvelope className='text-black text-xl' />
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className='container mx-auto px-4 lg:px-40 py-20 grid grid-cols-1 lg:grid-cols-2 items-center'>
        <div className='col-span-1'>
          <h1 className='text-black text-2xl lg:text-5xl font-bold mb-4 font-mochiy leading-snug lg:leading-normal'>
            Connecting Pig Farmers with Buyers
          </h1>
          <h4 className='text-gray-600 font-semibold text-base lg:text-xl mb-8'>
            Maximize your profits and minimize hassle with Farmify's intuitive
            marketplace solutions
          </h4>

          <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-4'>
            <CustomDropdown options={categories} placeholder='All Categories' />

            <input
              type='text'
              placeholder='Location'
              className='p-4 rounded-lg border text-gray-600 font-semibold w-full lg:w-[40%] shadow-md'
            />
          </div>

          <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4'>
            <div className='flex items-center p-4 rounded-lg border bg-white shadow-md w-full lg:w-[61%]'>
              <BiSearch className='mr-4 text-lg lg:text-xl' />
              <input
                type='text'
                placeholder="I'm looking for..."
                className='w-full outline-none text-gray-600 font-semibold'
              />
            </div>

            <button className='bg-[#FE7051] hover:bg-[#e66051] text-white font-bold px-6 py-2 rounded-lg shadow-lg w-full lg:w-auto'>
              SEARCH
            </button>
          </div>
        </div>

        <div className='hidden lg:block'></div>
      </div>

      <SignUpDialog isOpen={isSignupOpen} onClose={handleSignupClose} />
      <LoginDialog isOpen={isLoginOpen} onClose={handleLoginClose} />
    </div>
  );
};

export default NavbarHero;
