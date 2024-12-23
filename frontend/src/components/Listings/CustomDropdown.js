import React, { useState } from 'react';
import { BiFilter } from 'react-icons/bi';
import { FaCaretDown } from 'react-icons/fa';

const CustomDropdown = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);

  const handleOptionClick = (option) => {
    if (!option.icon) {
      setSelectedOption(option.label);
      setIsOpen(false);
    }
  };

  return (
    <div className='relative w-full'>
      <div
        className='flex items-center justify-between p-3 sm:p-4 bg-white text-gray-700 cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='flex items-center'>
          <BiFilter className='text-gray-500 text-xl mr-2' />
          <span className='text-gray-400 font-semibold text-sm sm:text-base'>
            {selectedOption}
          </span>
        </div>
        <div className='flex items-center'>
          <div className='border-l h-4 sm:h-5 mx-2 border-gray-300'></div>
          <FaCaretDown />
        </div>
      </div>

      {isOpen && (
        <div className='absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg mt-2 z-10 max-h-48 sm:max-h-60 overflow-y-auto'>
          {options.map((group, groupIndex) => (
            <div key={groupIndex} className='py-2'>
              {group.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  onClick={() => handleOptionClick(option)}
                  className={`px-4 py-2 text-sm sm:text-base ${
                    option.icon
                      ? 'font-bold text-gray-700 cursor-default flex items-center'
                      : 'hover:bg-gray-100 cursor-pointer text-gray-500 flex items-center'
                  }`}
                >
                  {option.icon && (
                    <img
                      src={option.icon}
                      alt=''
                      className='w-4 h-4 sm:w-5 sm:h-5 mr-2'
                    />
                  )}
                  {option.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
