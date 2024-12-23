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

import logo from '../../assets/farmifyLogoWhite.png';
import headerImage from '../../assets/listingHeader.png';
import CustomDropdown from '../Home/CustomDropdown';
import SignUpDialog from '../SignUpDialog';
import LoginDialog from '../LoginDialog';
import authService from '../../services/auth-service';
import { categories, groups } from '../../constants';

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
            <Link to='/' className='text-white font-semibold'>
              Home
            </Link>
            <Link to='/listings' className='text-white font-semibold'>
              Listings
            </Link>
            <Link to='/addListing' className='text-white font-semibold'>
              Add Listing
            </Link>
            <a href='#' className='text-white font-semibold'>
              About us
            </a>
            <a href='#' className='text-white font-semibold'>
              Contact us
            </a>
          </div>
        </div>

        <div className='hidden lg:flex items-center space-x-4 lg:space-x-12'>
          <div className='flex space-x-3'>
            <BiHeart className='text-white text-xl lg:text-2xl' />
            <BiBell className='text-white text-xl lg:text-2xl' />
            <BiEnvelope className='text-white text-xl lg:text-2xl' />
          </div>
          {user ? (
            <div className='flex items-center space-x-3'>
              <BiUser className='text-white text-xl lg:text-2xl' />
              <span className='text-white font-semibold'>{`${user.firstName} ${user.lastName}`}</span>
              <BiLogOut
                onClick={handleLogout}
                className='text-white text-xl lg:text-2xl'
              />
            </div>
          ) : (
            <>
              <button
                onClick={handleLoginClick}
                className='text-white font-semibold px-3 py-1 lg:py-1 lg:px-4 hover:bg-[#FE7051] hover:text-white rounded-full transition duration-200 ease-in-out'
              >
                Login
              </button>
              <button
                onClick={handleSignupClick}
                className='bg-white text-black py-1 px-3 lg:py-1 lg:px-4 rounded-full font-semibold text-sm lg:text-base hover:bg-[#FE7051] hover:transition duration-200 ease-in-out'
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
                <BiUser className='text-white text-lg lg:text-2xl' />
                <span className='text-white font-semibold text-sm lg:text-lg'>{`${user.firstName} ${user.lastName}`}</span>
                <BiLogOut
                  onClick={handleLogout}
                  className='text-white text-lg lg:text-2xl'
                />
              </div>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className='text-white font-semibold px-3 py-1 lg:py-1 lg:px-4 hover:bg-[#FE7051] hover:text-white rounded-full transition duration-200 ease-in-out'
                >
                  Login
                </button>
                <button
                  onClick={handleSignupClick}
                  className='bg-white text-black py-1 px-3 lg:py-1 lg:px-4 rounded-full font-semibold text-sm lg:text-base hover:bg-[#FE7051] hover:transition duration-200 ease-in-out'
                >
                  Sign up
                </button>
              </>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='text-2xl text-white'
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
              <Link to='/listings' className='text-green-900 font-semibold'>
                Listings
              </Link>
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

      <div className='container mx-auto px-4 lg:px-40 py-32 flex items-center justify-center text-center'>
        <h1 className='text-white text-2xl lg:text-5xl font-bold mb-4 font-mochiy leading-snug lg:leading-normal'>
          Find Your Perfect Product
        </h1>
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
