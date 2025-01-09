import React, { useState } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Dropdown from './Dropdown';

const LivestockForm = ({ onChange, formData }) => {
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

    if (field === 'quantity' || field === 'estimatedWeight') {
      const quantity = parseFloat(
        field === 'quantity' ? value : formData?.quantity || 0
      );
      const estimatedWeight = parseFloat(
        field === 'estimatedWeight' ? value : formData?.estimatedWeight || 0
      );

      if (quantity > 0 && estimatedWeight > 0) {
        const totalWeight = `${estimatedWeight} kg`;
        const avgWeightPerHead = `${(estimatedWeight / quantity).toFixed(
          2
        )} kg`;
        onChange('totalWeight', totalWeight);
        onChange('avgWeightPerHead', avgWeightPerHead);
      } else {
        onChange('totalWeight', '');
        onChange('avgWeightPerHead', '');
      }
    }

    if (field === 'pricePerKg' || field === 'totalWeight') {
      const pricePerKg = parseFloat(
        field === 'pricePerKg' ? value : formData?.pricePerKg || 0
      );
      const totalWeight = parseFloat(
        field === 'totalWeight' ? value : formData?.totalWeight || 0
      );

      if (pricePerKg > 0 && totalWeight > 0) {
        const totalPrice = `${(pricePerKg * totalWeight).toFixed(2)} PHP`;
        onChange('totalPrice', totalPrice);

        if (formData?.quantity > 0) {
          const avgPricePerHead = `${(
            (pricePerKg * totalWeight) /
            formData.quantity
          ).toFixed(2)} PHP`;
          onChange('avgPricePerHead', avgPricePerHead);
        }
      } else {
        onChange('totalPrice', '');
        onChange('avgPricePerHead', '');
      }
    }

    if (field === 'totalPrice') {
      const totalPrice = parseFloat(value || 0);
      const totalWeight = parseFloat(formData?.totalWeight || 0);

      if (totalPrice > 0 && totalWeight > 0) {
        const pricePerKg = `${(totalPrice / totalWeight).toFixed(2)} PHP`;
        onChange('pricePerKg', pricePerKg);

        if (formData?.quantity > 0) {
          const avgPricePerHead = `${(totalPrice / formData.quantity).toFixed(
            2
          )} PHP`;
          onChange('avgPricePerHead', avgPricePerHead);
        }
      } else {
        onChange('pricePerKg', '');
        onChange('avgPricePerHead', '');
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
        label='How many livestock are you selling?'
        placeholder='Example: 6'
        value={formData?.quantity || ''}
        onChange={(value) => handleInputChange('quantity', value)}
      />
      <InputField
        label="What's the estimated weight altogether?"
        placeholder='Example: 480kg'
        value={formData?.estimatedWeight || ''}
        onChange={(value) => handleInputChange('estimatedWeight', value)}
      />

      <h2 className='text-xl font-bold mb-12'>
        Select how you would like to enter your price
      </h2>

      <InputField
        label='Price per / kg'
        placeholder='Example: 180PHP'
        value={formData?.pricePerKg || ''}
        onChange={(value) => handleInputChange('pricePerKg', value)}
      />
      <InputField
        label='Total price'
        placeholder='Example: 86,400PHP'
        value={formData?.totalPrice || ''}
        onChange={(value) => handleInputChange('totalPrice', value)}
      />

      <div className='grid grid-cols-2 items-center mb-12 w-full'>
        <h2 className='text-xl font-bold'>Display fields</h2>
        <p className='text-xs text-gray-500'>
          Info: In the display field, these are the details we show on your
          listings
        </p>
      </div>

      <InputField
        label='Average price per head'
        placeholder='Your average pig weight: 22,000PHP'
        disabled={true}
        value={formData?.avgPricePerHead || ''}
        onChange={(value) => handleInputChange('avgPricePerHead', value)}
      />
      <InputField
        label='Price per / kg'
        placeholder='Your price per kg: 180'
        disabled={true}
        value={formData?.pricePerKg || ''}
        onChange={(value) => handleInputChange('pricePerKg', value)}
      />
      <InputField
        label='Average weight per head'
        placeholder='Your average weight per head: 80kg'
        disabled={true}
        value={formData?.avgWeightPerHead || ''}
        onChange={(value) => handleInputChange('avgWeightPerHead', value)}
      />
      <InputField
        label='Total weight'
        placeholder='Total weight of livestock: 480kg'
        disabled={true}
        value={formData?.totalWeight || ''}
        onChange={(value) => handleInputChange('totalWeight', value)}
      />
      <TextAreaField
        label='Describe your product'
        placeholder='Enter the description'
        value={formData?.description || ''}
        onChange={(value) => handleInputChange('description', value)}
      />

      <div className='grid grid-cols-2 items-center mb-12 w-full'>
        <h2 className='text-xl font-bold'>Features</h2>
        <p className='text-xs text-gray-500'>
          Tips: Adding all the features increases the potentials of the sales
        </p>
      </div>

      <InputField
        label='Age'
        placeholder='Number of weeks'
        value={formData?.age || ''}
        onChange={(value) => handleInputChange('age', value)}
      />
      <Dropdown
        label='Gender'
        options={['Male', 'Female', 'Mixed']}
        dropdownType='gender'
        dropdownState={dropdownState}
        toggleDropdown={toggleDropdown}
        selectOption={(dropdownType, value) => {
          selectOption(dropdownType, value);
          handleInputChange(dropdownType, value);
        }}
      />
      <InputField
        label='Vitamins'
        placeholder='Which brand?'
        value={formData?.vitamins || ''}
        onChange={(value) => handleInputChange('vitamins', value)}
      />
      <InputField
        label='Have been vaccinated?'
        placeholder='Date & Time'
        value={formData?.vaccinationDate || ''}
        onChange={(value) => handleInputChange('vaccinationDate', value)}
      />
      <Dropdown
        label='Have often been sick?'
        options={['Mostly Healthy', 'Occasionally', 'Frequently']}
        dropdownType='sicknessFrequency'
        dropdownState={dropdownState}
        toggleDropdown={toggleDropdown}
        selectOption={(dropdownType, value) => {
          selectOption(dropdownType, value);
          handleInputChange(dropdownType, value);
        }}
      />
      <Dropdown
        label="How's their temperament?"
        options={['Easy to handle', 'Moderate', 'Challenging']}
        dropdownType='temperament'
        dropdownState={dropdownState}
        toggleDropdown={toggleDropdown}
        selectOption={(dropdownType, value) => {
          selectOption(dropdownType, value);
          handleInputChange(dropdownType, value);
        }}
      />
      <InputField
        label='Share details about their breeding history'
        placeholder='How many piglets?'
        value={formData?.breedingHistory || ''}
        onChange={(value) => handleInputChange('breedingHistory', value)}
      />
      <InputField
        label='Primary feeding brand consumed by pigs'
        placeholder='Please provide the brand name'
        value={formData?.feedingBrand || ''}
        onChange={(value) => handleInputChange('feedingBrand', value)}
      />
    </div>
  );
};

export default LivestockForm;
