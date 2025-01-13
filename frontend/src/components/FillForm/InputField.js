import React, { useState } from 'react';

const InputField = ({
  label,
  placeholder,
  helpingText,
  disabled = false,
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className='mb-12'>
      <p className='text-sm font-bold text-gray-700 mb-2'>{label}</p>
      <input
        type='text'
        className='w-full rounded-md px-4 py-2 bg-[#F5F5F5] border-2 border-[#F5F5F5] focus:border-[#5EA91E] focus:outline-none placeholder:text-sm placeholder:font-bold placeholder:text-gray-400'
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {helpingText && isFocused && (
        <p className='text-xs font-semibold text-[#00b800]'>{helpingText}</p>
      )}
    </div>
  );
};

export default InputField;
