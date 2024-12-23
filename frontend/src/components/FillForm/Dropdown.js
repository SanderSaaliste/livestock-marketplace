import React from 'react';
import { BiCaretDown } from 'react-icons/bi';

const Dropdown = ({
  label,
  options,
  dropdownType,
  dropdownState,
  toggleDropdown,
  selectOption,
}) => {
  const isOpen = dropdownState[dropdownType];

  return (
    <div className='mb-12'>
      <p className='text-sm font-bold text-gray-700 mb-2'>{label}</p>
      <div
        className={`relative rounded-md px-4 py-2 cursor-pointer ${
          isOpen ? 'border-2 border-[#5EA91E] bg-[#F5F5F5]' : 'bg-[#F5F5F5]'
        }`}
        onClick={() => toggleDropdown(dropdownType)}
      >
        <span className={`text-sm font-bold text-gray-400`}>
          {dropdownState[`${dropdownType}Selected`] ||
            'Please select an option'}
        </span>
        <BiCaretDown
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600`}
        />
        {isOpen && (
          <div className='absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg mt-2 z-10 max-h-48 sm:max-h-60 overflow-y-auto'>
            {options.map((option, index) => (
              <div
                key={index}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                onClick={() => selectOption(dropdownType, option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
