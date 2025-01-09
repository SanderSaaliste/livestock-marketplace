import React, { useState } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Dropdown from './Dropdown';

const priceInputs = [
  {
    label: 'Price per / kg',
    placeholder: 'Example: 180PHP',
    key: 'pricePerKg',
  },
  {
    label: 'Product Price',
    placeholder: 'Example: 86,400PHP',
    key: 'productPrice',
  },
  {
    label: 'What quality level of bananas are you selling?',
    options: ['Class A', 'Class B', 'Class C'],
    type: 'dropdown',
    key: 'qualityLevel',
  },
];

const BananasForm = ({ onChange, formData }) => {
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
        label='How much does your product weigh?'
        placeholder='Example: 10kg'
        value={formData?.weight || ''}
        onChange={(value) => handleInputChange('weight', value)}
      />

      <h2 className='text-xl font-bold mb-12'>
        Select how you would like to enter your price
      </h2>

      {priceInputs.map((input, index) =>
        input.type === 'dropdown' ? (
          <Dropdown
            key={index}
            label={input.label}
            options={input.options}
            dropdownType={`dropdown-${input.key}`}
            dropdownState={dropdownState}
            toggleDropdown={toggleDropdown}
            selectOption={selectOption}
            selectedOption={formData?.[input.key] || ''}
          />
        ) : (
          <InputField
            key={index}
            label={input.label}
            placeholder={input.placeholder}
            value={formData?.[input.key] || ''}
            onChange={(value) => handleInputChange(input.key, value)}
          />
        )
      )}

      <TextAreaField
        label='Describe your product'
        placeholder='Enter the description'
        value={formData?.description || ''}
        onChange={(value) => handleInputChange('description', value)}
      />
    </div>
  );
};

export default BananasForm;
