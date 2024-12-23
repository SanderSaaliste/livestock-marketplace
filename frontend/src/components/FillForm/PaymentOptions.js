import React from 'react';

import gcashImg from '../../assets/gcash icon appstore.webp';
import mayaImg from '../../assets/maya icon.webp';

const PaymentOptions = ({ selectedPayments, togglePaymentOption }) => {
  const paymentMethods = [
    {
      id: 'cash',
      label: 'Cash',
      icon: 'https://img.icons8.com/color/27/get-cash.png',
    },
    {
      id: 'gcash',
      label: 'GCash',
      icon: gcashImg,
    },
    { id: 'maya', label: 'Maya', icon: mayaImg },
    {
      id: 'creditCard',
      label: 'Credit Card',
      icon: 'https://img.icons8.com/color/48/visa.png',
    },
  ];

  return (
    <div className='mb-12'>
      <p className='text-sm font-bold text-gray-700 mb-2'>
        How would you like to receive your payments?
      </p>
      <div className='bg-[#F5F5F5] p-4 rounded-lg'>
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className='flex items-center mb-2 cursor-pointer'
          >
            <input
              type='checkbox'
              checked={selectedPayments.includes(method.id)}
              onChange={() => togglePaymentOption(method.id)}
              className='h-3 w-3 accent-green-600 mr-3'
            />
            <span className='flex items-center space-x-2'>
              <img src={method.icon} alt={method.label} className='h-5 w-5' />
              <span className='text-gray-400 font-semibold text-sm'>
                {method.label}
              </span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentOptions;
