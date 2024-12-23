import React, { useState } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Dropdown from './Dropdown';

const LivestockForm = ({ onChange, formData }) => {
  const [dropdownState, setDropdownState] = useState({});

  const toggleDropdown = (dropdownType) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [dropdownType]: !prevState[dropdownType],
    }));
  };

  const selectOption = (dropdownType, text) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [`${dropdownType}Selected`]: text,
      [dropdownType]: false,
    }));
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
        label='How many livestock are you selling?'
        placeholder='Example: 6'
        value={formData?.quantity || ''}
        onChange={(value) => handleInputChange('quantity', value)}
      />
      <InputField
        label="What's the estimated weight altogether?"
        placeholder='Example: 480kg'
        value={formData?.totalWeight || ''}
        onChange={(value) => handleInputChange('totalWeight', value)}
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
        value={formData?.avgPricePerHead || ''}
        onChange={(value) => handleInputChange('avgPricePerHead', value)}
      />
      <InputField
        label='Average weight per head'
        placeholder='Your average weight per head: 80kg'
        value={formData?.avgWeightPerHead || ''}
        onChange={(value) => handleInputChange('avgWeightPerHead', value)}
      />
      <InputField
        label='Total weight'
        placeholder='Total weight of livestock: 480kg'
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
