import React from 'react';
import { BiEnvelope, BiShield } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import logo from '../assets/farmifylogo.png';

const LoginDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-8 rounded-lg w-full max-w-md relative shadow-lg'>
        <button
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl'
          onClick={onClose}
        >
          &times;
        </button>

        <div className='text-center'>
          <img src={logo} alt='Farmify Logo' className='h-10 mb-6 mx-auto' />
          <h4 className='text-xl font-extrabold mb-6'>LOGIN</h4>
          <p className='text-gray-600 mb-6'>
            Time to dive into the club! Drop your details to join the party!
          </p>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-3'>
            <BiEnvelope className='text-gray-500 mr-3' />
            <input
              type='email'
              placeholder='Email'
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-3'>
            <BiShield className='text-gray-500 mr-3' />
            <input
              type='password'
              placeholder='Password'
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
        </div>

        <div className='flex items-center mt-4'>
          <input type='checkbox' className='mr-2' />
          <label className='text-gray-600'>Remember me</label>
        </div>

        <button className='w-full bg-[#FF7162] hover:bg-[#e66051] text-white py-3 rounded-lg font-bold mt-6'>
          Login
        </button>

        <p className='text-center text-gray-500 my-6'>or login with</p>

        <div className='flex justify-center space-x-8'>
          <button className='flex items-center space-x-2 text-[#1877F2] font-bold'>
            <FaFacebook className='w-6 h-6' />
            <span>Facebook</span>
          </button>
          <button className='flex items-center space-x-2 text-gray-700 font-bold'>
            <FcGoogle className='w-6 h-6' />
            <span>Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginDialog;
