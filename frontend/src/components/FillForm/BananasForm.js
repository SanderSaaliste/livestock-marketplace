import React, { useState } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Dropdown from './Dropdown';
import { cleanNumber } from '../../utils/text';

const priceInputs = [
  {
    label: 'Price per / kg',
    placeholder: 'Example: 180PHP',
    helpingText:
      'This field is optional; you can directly enter the product price.',
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
    helpingText: 'This field is optional.',
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
    if (!onChange) return;

    onChange(field, value);

    const productWeight = cleanNumber(
      field === 'weight' ? value : formData?.weight
    );
    const pricePerKg = cleanNumber(
      field === 'pricePerKg' ? value : formData?.pricePerKg
    );
    const productPrice = cleanNumber(
      field === 'productPrice' ? value : formData?.productPrice
    );

    function updateProductPrice() {
      const totalPrice = productWeight * pricePerKg;
      onChange(
        'productPrice',
        isNaN(totalPrice) || totalPrice === 0
          ? ''
          : `${totalPrice.toLocaleString()} PHP`
      );
    }

    function updatePricePerKg() {
      const pricePerKg = productWeight > 0 ? productPrice / productWeight : 0;
      onChange(
        'pricePerKg',
        isNaN(pricePerKg) || pricePerKg === 0
          ? ''
          : `${pricePerKg.toLocaleString()}`
      );
    }

    if (field === 'weight') {
      updateProductPrice();
    }

    if (field === 'pricePerKg') {
      updateProductPrice();
    }

    if (field === 'productPrice') {
      updatePricePerKg();
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
        helpingText='For example, enter "10kg" for a banana box that weighs 10kg.'
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
            helpingText={input.helpingText}
            dropdownType={input.key}
            dropdownState={dropdownState}
            toggleDropdown={toggleDropdown}
            selectOption={(dropdownType, value) => {
              selectOption(dropdownType, value);
              handleInputChange(dropdownType, value);
            }}
          />
        ) : (
          <InputField
            key={index}
            label={input.label}
            placeholder={input.placeholder}
            helpingText={input.helpingText}
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
