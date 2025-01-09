import React from 'react';

import InputField from './InputField';
import TextAreaField from './TextAreaField';

const priceInputs = [
  {
    label: 'Total Price',
    placeholder: 'Example: 150,000PHP',
    key: 'totalPrice',
  },
];

const HeavyEquipmentForm = ({ onChange, formData }) => {
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
        label='What is the manufacturing year of the heavy equipment?'
        placeholder='Example: 2020'
        value={formData?.manufacturingYear || ''}
        onChange={(value) => handleInputChange('manufacturingYear', value)}
      />
      <InputField
        label='How many working hours has the heavy equipment completed?'
        placeholder='Example: 4,950h'
        value={formData?.workingHours || ''}
        onChange={(value) => handleInputChange('workingHours', value)}
      />
      <InputField
        label='What is the horsepower of the equipment?'
        placeholder='Example: 140 HP'
        value={formData?.horsepower || ''}
        onChange={(value) => handleInputChange('horsepower', value)}
      />
      <InputField
        label='What is the fuel consumption rate of this heavy equipment?'
        placeholder='Example: 7.5 L/hr'
        value={formData?.fuelConsumption || ''}
        onChange={(value) => handleInputChange('fuelConsumption', value)}
      />

      <h2 className='text-xl font-bold mb-12'>Price</h2>

      {priceInputs.map((input, index) => (
        <InputField
          key={index}
          label={input.label}
          placeholder={input.placeholder}
          value={formData?.pricePerBag || ''}
          onChange={(value) => handleInputChange(input.key, value)}
        />
      ))}

      <TextAreaField
        label='Provide a description here'
        placeholder='Enter the description'
        value={formData?.description || ''}
        onChange={(value) => handleInputChange('description', value)}
      />
    </div>
  );
};

export default HeavyEquipmentForm;
