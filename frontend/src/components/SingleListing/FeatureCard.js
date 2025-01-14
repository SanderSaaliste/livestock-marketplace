import React from 'react';

const FeatureCard = ({ image, bgColor, iconBgColor, borderColor, text }) => {
  return (
    <div
      className={`flex items-center p-4 rounded-xl border`}
      style={{ backgroundColor: bgColor, borderColor: borderColor }}
    >
      <div
        className='w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-xl'
        style={{ backgroundColor: iconBgColor }}
      >
        <img src={image} alt={text} />
      </div>
      <span className='ml-5 text-lg font-bold text-black'>{text}</span>
    </div>
  );
};

export default FeatureCard;
