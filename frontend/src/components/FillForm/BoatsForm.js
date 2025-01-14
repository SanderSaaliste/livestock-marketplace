import React, { useState } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Dropdown from './Dropdown';

const priceInputs = [
  {
    label: 'Total price',
    placeholder: 'Example: 150,000PHP',
    key: 'totalPrice',
  },
];

const BoatsForm = ({ onChange, formData }) => {
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
        label='What is the manufacturing year of the boat?'
        placeholder='Example: 2020'
        value={formData?.manufacturingYear || ''}
        onChange={(value) => handleInputChange('manufacturingYear', value)}
      />
      <InputField
        label='What is the length of the boat?'
        placeholder='Example: 47ft'
        value={formData?.boatLength || ''}
        onChange={(value) => handleInputChange('boatLength', value)}
      />
      <InputField
        label="What is the boat's horsepower?"
        placeholder='Example: 140 HP'
        helpingText='If the boat does not have an engine, type "None."'
        value={formData?.horsepower || ''}
        onChange={(value) => handleInputChange('horsepower', value)}
      />

      <Dropdown
        label='What type of fuel does the boat use?'
        options={['Gasoline', 'Diesel', 'None']}
        dropdownType='boatFuel'
        dropdownState={dropdownState}
        toggleDropdown={toggleDropdown}
        selectOption={(dropdownType, value) => {
          selectOption(dropdownType, value);
          handleInputChange(dropdownType, value);
        }}
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

export default BoatsForm;
