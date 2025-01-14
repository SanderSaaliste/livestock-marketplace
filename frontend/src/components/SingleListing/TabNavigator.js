import React, { useState } from 'react';

const TabNavbar = ({ onTabClick }) => {
  const [activeTab, setActiveTab] = useState('Features');

  const tabs = ['Features', 'Descriptions', 'Reviews'];

  return (
    <div className='border-b border-black max-w-7xl mx-auto px-4 py-8'>
      <div className='flex justify-center space-x-8 py-4'>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-gray-600 text-xl ${
              activeTab === tab ? 'text-black font-semibold' : ''
            }`}
            onClick={() => {
              setActiveTab(tab);
              onTabClick(tab);
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavbar;
