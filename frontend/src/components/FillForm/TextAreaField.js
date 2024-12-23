import React from 'react';

const TextAreaField = ({ label, placeholder, value, onChange }) => {
  const handleInputChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className='mb-12'>
      <p className='text-sm font-bold text-gray-700 mb-2'>{label}</p>
      <textarea
        className='w-full bg-[#F5F5F5] rounded-md px-4 py-2 border-2 border-[#F5F5F5] focus:border-[#5EA91E] focus:outline-none placeholder:text-sm placeholder:font-bold placeholder:text-gray-400'
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        rows={5}
      ></textarea>
    </div>
  );
};

export default TextAreaField;
