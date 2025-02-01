import React, { useState } from 'react';
import { BiSearch, BiMap } from 'react-icons/bi';
import { categories } from '../../constants';
import CustomDropdown from './CustomDropdown';

const SearchBar = ({
  onSearch,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
}) => {
  const [searchText, setSearchText] = useState('');
  const [locationText, setLocationText] = useState('');

  const handleSearch = () => {
    const searchParams = {
      category: selectedCategory,
      subcategory: selectedSubCategory,
      searchText,
      location: locationText,
    };
    if (onSearch) {
      onSearch(searchParams);
    }
  };

  return (
    <section className='py-4 md:py-8 lg:py-12'>
      <div className='bg-[#D0DED1] p-4 shadow-md max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row items-center justify-between bg-white shadow-sm'>
          {/* Category Dropdown */}
          <div className='flex items-center w-full lg:w-[40%] px-4 border-b lg:border-b-0 lg:border-r h-full flex-grow'>
            <CustomDropdown
              options={categories}
              placeholder='All categories'
              setSelectedCategory={setSelectedCategory}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
            />
          </div>

          {/* Search Input */}
          <div className='flex items-center w-full lg:flex-grow px-4 py-2 lg:py-6 border-b lg:border-b-0 lg:border-r h-full flex-grow'>
            <BiSearch className='mr-4 text-xl text-gray-500' />
            <input
              type='text'
              placeholder="I'm looking for..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className='w-full outline-none text-gray-600 font-semibold h-full'
            />
          </div>

          {/* Location Input */}
          <div className='flex items-center w-full lg:w-[40%] px-4 py-2 lg:py-6 border-b lg:border-b-0 lg:border-r h-full flex-grow'>
            <BiMap className='text-gray-500 text-xl mr-2' />
            <input
              type='text'
              placeholder='Location'
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              className='w-full outline-none text-gray-600 font-semibold h-full'
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className='w-full lg:w-auto bg-[#53AE66] text-white font-semibold px-10 py-4 lg:py-6 hover:bg-[#4D955B] transition h-full flex-grow'
          >
            SEARCH
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
