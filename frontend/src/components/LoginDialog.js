import React, { useState } from 'react';
import { BiEnvelope, BiShield } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { signInWithPopup } from 'firebase/auth';

import { auth, googleProvider, facebookProvider } from '../firebase/config';
import logo from '../assets/farmifylogo.png';
import authService from '../services/auth-service';

const LoginDialog = ({ isOpen, onClose, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.login(email, password);

      if (response.error) {
        setError(response.error || 'Invalid email or password');
        return;
      }

      toast.success('Login successful!');
      setUser(response.user);
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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

  const handleFacebookLogin = async () => {
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

        {/* Display error message */}
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

        <div className='space-y-4'>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-3'>
            <BiEnvelope className='text-gray-500 mr-3' />
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
          <div className='flex items-center bg-gray-200 rounded-lg px-4 py-3'>
            <BiShield className='text-gray-500 mr-3' />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none'
            />
          </div>
        </div>

        <div className='flex items-center mt-4'>
          <input type='checkbox' className='mr-2' />
          <label className='text-gray-600'>Remember me</label>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full bg-[#FF7162] hover:bg-[#e66051] text-white py-3 rounded-lg font-bold mt-6 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className='text-center text-gray-500 my-6'>or login with</p>

        <div className='flex justify-center space-x-8'>
          <button
            onClick={handleFacebookLogin}
            className='flex items-center space-x-2 text-[#1877F2] font-bold'
          >
            <FaFacebook className='w-6 h-6' />
            <span>Facebook</span>
          </button>
          <button
            onClick={handleGoogleLogin}
            className='flex items-center space-x-2 text-gray-700 font-bold'
          >
            <FcGoogle className='w-6 h-6' />
            <span>Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginDialog;
