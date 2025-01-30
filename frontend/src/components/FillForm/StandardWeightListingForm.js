import React from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
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
    label: 'Product price',
    placeholder: 'Example: 86,400PHP',
    key: 'productPrice',
  },
];

const StandardWeightListingForm = ({ onChange, formData }) => {
  const handleInputChange = (field, value) => {
    if (!onChange) return;

    onChange(field, value);

    const productWeight = cleanNumber(
      field === 'productWeight' ? value : formData?.productWeight
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
        isNaN(pricePerKg) || pricePerKg === 0 ? '' : `${pricePerKg.toFixed(3)}`
      );
    }

    if (field === 'productWeight') {
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
        placeholder='Example: 25kg'
        helpingText='For example, enter "25kg" for a rice bag weighing 25kg.'
        value={formData?.productWeight || ''}
        onChange={(value) => handleInputChange('productWeight', value)}
      />

      <h2 className='text-xl font-bold mb-12'>
        Select how you would like to enter your price
      </h2>

      {priceInputs.map((input) => (
        <InputField
          key={input.key}
          label={input.label}
          placeholder={input.placeholder}
          helpingText={input.helpingText}
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

export default StandardWeightListingForm;
