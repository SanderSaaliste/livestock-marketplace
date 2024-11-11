import React, { useState } from 'react';
import { BiUser, BiEnvelope, BiShield } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { signInWithPopup } from 'firebase/auth';

import { auth, googleProvider, facebookProvider } from '../firebase/config';
import logo from '../assets/farmifylogo.png';
import userService from '../services/user-service';
import authService from '../services/auth-service';

const SignUpDialog = ({ isOpen, onClose, setUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { firstName, lastName, username, email, password, confirmPassword } =
      formData;
    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return 'All fields are required';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  const handleSignUp = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await userService.registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.error) {
        setError(response.error);
        return;
      }

      toast.success('Registration successful!');
      onClose();
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred during registration. Please try again.');
      toast.error('An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;

      const response = await authService.registerOrLogin({
        email: user.email,
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1],
        provider: 'google',
      });

      toast.success('Successfully signed up with Google!');
      setUser(response.user);
      onClose();
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        setError(
          'An account with this email already exists. Please use the provider associated with this email.'
        );
      } else {
        console.error('Google sign-in error:', error);
        setError('An error occurred with Google sign-in.');
      }
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const { user } = result;

      const response = await authService.registerOrLogin({
        email: user.email,
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1],
        provider: 'facebook',
      });

      toast.success('Successfully signed up with Facebook!');
      setUser(response.user);
      onClose();
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        setError(
          'An account with this email already exists. Please use the provider associated with this email.'
        );
      } else {
        console.error('Facebook sign-in error:', error);
        setError('An error occurred with Facebook sign-in.');
      }
    }
  };

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

        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

        <div className='space-y-3 md:space-y-4'>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-2 md:py-3'>
            <BiUser className='text-gray-500 mr-3' />
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleChange}
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-2 md:py-3'>
            <BiUser className='text-gray-500 mr-3' />
            <input
              type='text'
              name='lastName'
              placeholder='Last Name'
              value={formData.lastName}
              onChange={handleChange}
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-2 md:py-3'>
            <BiUser className='text-gray-500 mr-3' />
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={formData.username}
              onChange={handleChange}
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-2 md:py-3'>
            <BiEnvelope className='text-gray-500 mr-3' />
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-2 md:py-3'>
            <BiShield className='text-gray-500 mr-3' />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-2 md:py-3'>
            <BiShield className='text-gray-500 mr-3' />
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
        </div>

        <button
          onClick={handleSignUp}
          disabled={loading}
          className={`w-full bg-[#FF7162] hover:bg-[#e66051] text-white py-2 md:py-3 rounded-lg font-bold mt-6 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Signing up...' : 'Sign up'}
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
          <button
            onClick={handleFacebookSignUp}
            className='flex items-center space-x-2 px-4 py-2 text-[#1877F2] font-bold'
          >
            <FaFacebook className='w-6 h-6' />
            <span>Facebook</span>
          </button>
          <button
            onClick={handleGoogleSignUp}
            className='flex items-center space-x-2 px-4 py-2 text-gray-700 font-bold'
          >
            <FcGoogle className='w-6 h-6' />
            <span>Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpDialog;
