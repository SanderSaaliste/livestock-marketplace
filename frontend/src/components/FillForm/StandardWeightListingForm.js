import React from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';

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

    if (field === 'pricePerKg' || field === 'productWeight') {
      const pricePerKg = parseFloat(
        field === 'pricePerKg' ? value : formData?.pricePerKg || 0
      );
      const productWeight = parseFloat(
        field === 'productWeight' ? value : formData?.productWeight || 0
      );

      if (pricePerKg > 0 && productWeight > 0) {
        const productPrice = `${(pricePerKg * productWeight).toFixed(2)} PHP`;
        onChange('productPrice', productPrice);
      } else {
        onChange('productPrice', '');
      }
    }

    if (field === 'productPrice' || field === 'productWeight') {
      const productPrice = parseFloat(
        field === 'productPrice' ? value : formData?.productPrice || 0
      );
      const productWeight = parseFloat(
        field === 'productWeight' ? value : formData?.productWeight || 0
      );

      if (productPrice > 0 && productWeight > 0) {
        const pricePerKg = `${(productPrice / productWeight).toFixed(2)} PHP`;
        onChange('pricePerKg', pricePerKg);
      } else {
        onChange('pricePerKg', '');
      }
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
