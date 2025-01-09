import React from 'react';
import { FcMoneyTransfer } from 'react-icons/fc';

import gcashImg from '../../assets/gcash icon appstore.webp';
import mayaImg from '../../assets/maya icon.webp';

const PaymentOptions = ({ selectedPayments, togglePaymentOption }) => {
  const paymentMethods = [
    {
      id: 'cash',
      label: 'Cash',
      icon: <FcMoneyTransfer className='h-6 w-6' />,
    },
    {
      id: 'gcash',
      label: 'GCash',
      icon: <img src={gcashImg} alt='GCash' className='h-6 w-6' />,
    },
    {
      id: 'maya',
      label: 'Maya',
      icon: <img src={mayaImg} alt='Maya' className='h-6 w-6' />,
    },
    {
      id: 'creditCard',
      label: 'Credit Card',
      icon: (
        <img
          src='https://img.icons8.com/color/48/visa.png'
          alt='Credit Card'
          className='h-6 w-6'
        />
      ),
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
              {method.icon}
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
