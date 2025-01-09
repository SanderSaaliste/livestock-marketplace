import React, { useState } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Dropdown from './Dropdown';

const priceInputs = [
  {
    label: 'Total price',
    placeholder: 'Example: 75,000PHP',
    key: 'totalPrice',
  },
];

const MotoForm = ({ onChange, formData }) => {
  const [dropdownState, setDropdownState] = useState({});

  const toggleDropdown = (dropdownType, forceClose = false) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [dropdownType]: forceClose ? false : !prevState[dropdownType],
    }));
  };

  const selectOption = (dropdownType, text) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [`${dropdownType}Selected`]: text,
      [dropdownType]: false,
    }));

    toggleDropdown(dropdownType, false);
  };

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
        label='What is the year of your vehicle?'
        placeholder='Example: 2020'
        value={formData?.year || ''}
        onChange={(value) => handleInputChange('year', value)}
      />
      <InputField
        label='What is the mileage (in kilometers)?'
        placeholder='Example: 50,000km'
        value={formData?.mileage || ''}
        onChange={(value) => handleInputChange('mileage', value)}
      />
      <InputField
        label='What type of engine does the vehicle have?'
        placeholder='Example: 150cc'
        value={formData?.engineType || ''}
        onChange={(value) => handleInputChange('engineType', value)}
      />

      <Dropdown
        label='What type of transmission?'
        options={['Automatic', 'Manual', 'Semi-Automatic']}
        dropdownType='transmission'
        dropdownState={dropdownState}
        toggleDropdown={toggleDropdown}
        selectOption={(dropdownType, value) => {
          selectOption(dropdownType, value);
          handleInputChange(dropdownType, value);
        }}
        selectedOption={formData?.transmission || ''}
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
        label='Provide a description of your vehicle here'
        placeholder='Enter the description'
        value={formData?.description || ''}
        onChange={(value) => handleInputChange('description', value)}
      />
    </div>
  );
};

export default MotoForm;
