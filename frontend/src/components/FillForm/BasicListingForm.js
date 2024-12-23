import React from 'react';

import InputField from './InputField';
import TextAreaField from './TextAreaField';

const priceInputs = [
  {
    label: 'Total Price',
    placeholder: 'Example: 86,400PHP',
    key: 'totalPrice',
  },
];

const BasicListingForm = ({ onChange, formData }) => {
  const handleInputChange = (field, value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  return (
    <div>
      <InputField
        label='Please choose a title'
        placeholder='Min 9 characters'
        value={formData?.title || ''}
        onChange={(value) => handleInputChange('title', value)}
      />
      <InputField
        label='Location'
        placeholder='Enter your location'
        value={formData?.location || ''}
        onChange={(value) => handleInputChange('location', value)}
      />

      <h2 className='text-xl font-bold mb-12'>Price</h2>

      {priceInputs.map((input) => (
        <InputField
          key={input.key}
          label={input.label}
          placeholder={input.placeholder}
          value={formData?.[input.key] || ''}
          onChange={(value) => handleInputChange(input.key, value)}
        />
      ))}

      <TextAreaField
        label='Describe your product'
        placeholder='Enter the description'
        value={formData?.description || ''}
        onChange={(value) => handleInputChange('description', value)}
      />
    </div>
  );
};

export default BasicListingForm;
