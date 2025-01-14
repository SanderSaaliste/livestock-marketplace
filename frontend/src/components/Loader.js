import React from 'react';
import Lottie from 'lottie-react';

import loaderAnimation from '../assets/animations/loader.json';

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Lottie
        animationData={loaderAnimation}
        loop={true}
        autoplay={true}
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
};

export default Loader;
