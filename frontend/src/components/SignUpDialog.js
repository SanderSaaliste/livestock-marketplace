import React from 'react';
import { BiUser, BiEnvelope, BiShield } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import logo from '../assets/farmifylogo.png';

const SignUpDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 md:p-8 rounded-lg w-full max-w-md relative shadow-lg mx-4'>
        <button
          className='absolute top-3 right-3 text-gray-500 hover:text-[#FF7162] text-3xl'
          onClick={onClose}
        >
          &times;
        </button>

        <img src={logo} alt='Farmify Logo' className='h-10 mb-6 mx-auto' />

        <h4 className='text-center text-xl font-extrabold mb-6 md:mb-8'>
          SIGN UP
        </h4>
        <div className='space-y-3 md:space-y-4'>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-2 md:py-3'>
            <BiUser className='text-gray-500 mr-3' />
            <input
              type='text'
              placeholder='First Name'
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-2 md:py-3'>
            <BiUser className='text-gray-500 mr-3' />
            <input
              type='text'
              placeholder='Last Name'
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-2 md:py-3'>
            <BiUser className='text-gray-500 mr-3' />
            <input
              type='text'
              placeholder='Username'
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-2 md:py-3'>
            <BiEnvelope className='text-gray-500 mr-3' />
            <input
              type='email'
              placeholder='Email'
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-2 md:py-3'>
            <BiShield className='text-gray-500 mr-3' />
            <input
              type='password'
              placeholder='Password'
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-2 md:py-3'>
            <BiShield className='text-gray-500 mr-3' />
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
        </div>

        <button className='w-full bg-[#FF7162] hover:bg-[#e66051] text-white py-2 md:py-3 rounded-lg font-bold mt-6'>
          Sign up
        </button>

        <div className='flex items-center mt-4'>
          <input type='checkbox' className='mr-2' />
          <p className='text-sm text-gray-600'>
            I accept the{' '}
            <a href='#' className='underline'>
              Terms and Conditions
            </a>{' '}
            and{' '}
            <a href='#' className='underline'>
              Privacy Policy
            </a>
          </p>
        </div>

        <p className='text-center text-gray-500 my-6'>or sign up with</p>

        <div className='flex justify-center space-x-8'>
          <button className='flex items-center space-x-2 px-4 py-2 text-[#1877F2] font-bold'>
            <FaFacebook className='w-6 h-6' />
            <span>Facebook</span>
          </button>
          <button className='flex items-center space-x-2 px-4 py-2 text-gray-700 font-bold'>
            <FcGoogle className='w-6 h-6' />
            <span>Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpDialog;
