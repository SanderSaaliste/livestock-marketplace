import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/farmifylogo.png';

const Header = () => (
  <header className='py-4 lg:mx-48 border-b border-gray-300'>
    <div className='container mx-auto flex items-center justify-center px-4 sm:px-6'>
      <Link to='/'>
        <img src={logo} alt='Farmify Logo' className='h-8 sm:h-10 lg:h-12' />
      </Link>
    </div>
  </header>
);

export default Header;
