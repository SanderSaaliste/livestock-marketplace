import React from 'react';

import InputField from './InputField';
import TextAreaField from './TextAreaField';

const priceInputs = [
  {
    label: 'Total price',
    placeholder: 'Example: 3,500,000PHP',
    key: 'totalPrice',
  },
];

const RealEstateForm = ({ onChange, formData }) => {
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
      <InputField
        label='How many bedrooms?'
        placeholder='Example: 3'
        helpingText='If you are selling a land plot, you can skip this field.'
        value={formData?.bedrooms || ''}
        onChange={(value) => handleInputChange('bedrooms', value)}
      />
      <InputField
        label='What is the interior size of the house in square meters?'
        placeholder='Example: 105 m2'
        helpingText='If you are selling a land plot, you can skip this field.'
        value={formData?.interiorSize || ''}
        onChange={(value) => handleInputChange('interiorSize', value)}
      />
      <InputField
        label='How many square meters is the land?'
        placeholder='Example: 1,000 m2'
        value={formData?.landSize || ''}
        onChange={(value) => handleInputChange('landSize', value)}
      />
      <InputField
        label='Does your property have a lot number?'
        placeholder='Example: 337'
        helpingText='This field is optional.'
        value={formData?.lotNumber || ''}
        onChange={(value) => handleInputChange('lotNumber', value)}
      />

      <h2 className='text-xl font-bold mb-12'>Price</h2>

      {priceInputs.map((input, index) => (
        <InputField
          key={index}
          label={input.label}
          placeholder={input.placeholder}
          value={formData?.totalPrice || ''}
          onChange={(value) => handleInputChange(input.key, value)}
        />
      ))}

      <TextAreaField
        label='Enter your property description here'
        placeholder='Enter the description'
        value={formData?.description || ''}
        onChange={(value) => handleInputChange('description', value)}
      />
    </div>
  );
};

export default RealEstateForm;
