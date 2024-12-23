import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BiUser,
  BiLogOut,
  BiMenu,
  BiHeart,
  BiBell,
  BiEnvelope,
  BiSearch,
} from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';

import logo from '../assets/farmifylogo.png';
import headerImage from '../assets/header.png';
import CustomDropdown from './CustomDropdown';
import SignUpDialog from './SignUpDialog';
import LoginDialog from './LoginDialog';
import authService from '../services/auth-service';

import image23 from '../assets/image 23.png';
import image24 from '../assets/image 24.png';
import image25 from '../assets/image 25.png';
import image26 from '../assets/image 26.png';
import image27 from '../assets/image 27.png';
import image28 from '../assets/image 28.png';
import image29 from '../assets/image 29.png';
import image30 from '../assets/image 30.png';
import image32 from '../assets/image 32.png';
import image35 from '../assets/image 35.png';
import image36 from '../assets/image 36.png';
import image38 from '../assets/image 38.png';
import image39 from '../assets/image 39.png';
import image40 from '../assets/image 40.png';

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

const groups = [
  { title: 'Livestock', icon: image23 },
  { title: 'Vehicles', icon: image24 },
  { title: 'Services / Jobs', icon: image25 },
  { title: 'Real Estate', icon: image26 },
  { title: 'Heavy Equipment', icon: image27 },
  { title: 'Aquaculture', icon: image28 },
  { title: 'Tools', icon: image29 },
  { title: 'Home & Garden', icon: image30 },
  { title: 'Animal Feed', icon: image40 },
  { title: 'Fertilizers', icon: image32 },
  { title: 'Fruits, Vegetables & Growable', icon: image39 },
  { title: 'Building Materials', icon: image38 },
  { title: 'Seeds', icon: image35 },
  { title: 'Other', icon: image36 },
];

const NavbarHero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleSignupClick = () => setSignupOpen(true);
  const handleSignupClose = () => setSignupOpen(false);

  const handleLoginClick = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <div
      className='min-h-screen bg-cover bg-center'
      style={{ backgroundImage: `url(${headerImage})` }}
    >
      <nav className='container mx-auto px-4 lg:px-40 py-6 lg:py-10 flex justify-between items-center'>
        <div className='flex items-center space-x-4 lg:space-x-10'>
          <img src={logo} alt='Farmify Logo' className='h-10 lg:h-12' />
          <div className='hidden lg:flex space-x-6'>
            <Link to='/' className='text-green-900 font-semibold'>
              Home
            </Link>
            <a href='#' className='text-green-900 font-semibold'>
              Listings
            </a>
            <Link to='/addListing' className='text-green-900 font-semibold'>
              Add Listing
            </Link>
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
          {user ? (
            <div className='flex items-center space-x-3'>
              <BiUser className='text-black text-xl lg:text-2xl' />
              <span className='text-black font-semibold'>{`${user.firstName} ${user.lastName}`}</span>
              <BiLogOut
                onClick={handleLogout}
                className='text-black text-xl lg:text-2xl'
              />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        <div className='lg:hidden flex items-center'>
          <div className='flex items-center space-x-4 lg:space-x-12'>
            {user ? (
              <div className='flex items-center space-x-2 lg:space-x-3'>
                <BiUser className='text-black text-lg lg:text-2xl' />
                <span className='text-black font-semibold text-sm lg:text-lg'>{`${user.firstName} ${user.lastName}`}</span>
                <BiLogOut
                  onClick={handleLogout}
                  className='text-black text-lg lg:text-2xl'
                />
              </div>
            ) : (
              <>
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
              </>
            )}
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
              <Link to='/' className='text-green-900 font-semibold'>
                Home
              </Link>
              <a href='#' className='text-green-900 font-semibold'>
                Listings
              </a>
              <Link href='/addListing' className='text-green-900 font-semibold'>
                Add Listing
              </Link>
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

      <div className='container mx-auto px-4 lg:px-40 py-10 grid grid-cols-1 lg:grid-cols-2 items-center'>
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

          <div className='container w-[85%] pt-10 grid grid-cols-4 lg:grid-cols-7 items-start'>
            {groups.map((group, index) => (
              <div
                key={index}
                className='flex flex-col items-center text-center group'
              >
                <div className='p-2 border-2 border-[#b5dd8f] rounded-xl bg-[#FEFFF9] transition-transform transform shadow-lg hover:scale-105'>
                  <img src={group.icon} alt={group.title} />
                </div>
                <span className='text-[#7D8A81] text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  {group.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='hidden lg:block'></div>
      </div>

      <SignUpDialog
        isOpen={isSignupOpen}
        onClose={handleSignupClose}
        setUser={setUser}
      />
      <LoginDialog
        isOpen={isLoginOpen}
        onClose={handleLoginClose}
        setUser={setUser}
      />
    </div>
  );
};

export default NavbarHero;
