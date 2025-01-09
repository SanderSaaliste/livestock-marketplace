import React, { useState } from 'react';

import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Dropdown from './Dropdown';

const priceInputs = [
  {
    label: 'What is the price per bag?',
    placeholder: 'Example: 2,000PHP',
    key: 'pricePerBag',
  },
];

const AnimalFeedForm = ({ onChange, formData }) => {
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
        label='How much does your feed bag weigh?'
        placeholder='Example: 50kg'
        value={formData?.feedBagWeight || ''}
        onChange={(value) => handleInputChange('feedBagWeight', value)}
      />

      <Dropdown
        label='Select the type of animal feed'
        options={[
          'Creep Feed',
          'Weaner Feed',
          'Grower Feed',
          'Finisher Feed',
          'Layer Feed',
          'Broiler Feed',
          'Gestation Feed',
          'Lactation Feed',
          'Forage',
          'Concentrates',
          'Supplements',
        ]}
        dropdownType='animalFeedType'
        dropdownState={dropdownState}
        toggleDropdown={toggleDropdown}
        selectOption={selectOption}
        selectedOption={formData?.animalFeedType || ''}
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

export default AnimalFeedForm;
