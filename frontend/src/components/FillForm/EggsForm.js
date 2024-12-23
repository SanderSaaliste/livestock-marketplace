import React from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';

const priceInputs = [
  { label: 'PW price', placeholder: 'Example: 80PHP', key: 'pwPrice' },
  { label: 'XS price', placeholder: 'Example: 100PHP', key: 'xsPrice' },
  { label: 'S price', placeholder: 'Example: 120PHP', key: 'sPrice' },
  { label: 'M price', placeholder: 'Example: 140PHP', key: 'mPrice' },
  { label: 'L price', placeholder: 'Example: 160PHP', key: 'lPrice' },
  { label: 'XL price', placeholder: 'Example: 180PHP', key: 'xlPrice' },
  { label: 'Jumbo price', placeholder: 'Example: 200PHP', key: 'jumboPrice' },
  { label: 'Dirty price', placeholder: 'Example: 90PHP', key: 'dirtyPrice' },
];

const EggsForm = ({ onChange, formData }) => {
  const handleInputChange = (key, value) => {
    if (onChange) {
      onChange(key, value);
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
        label='What is the minimum order for your egg trays?'
        placeholder='Example: 1 tray'
        value={formData?.minOrder || ''}
        onChange={(value) => handleInputChange('minOrder', value)}
      />

      <h2 className='text-xl font-bold mb-12'>
        Select only the options that you are selling
      </h2>

      {priceInputs.map((input, index) => (
        <InputField
          key={index}
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

export default EggsForm;
