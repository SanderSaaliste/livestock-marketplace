import React from 'react';
import { BiSearch, BiMap, BiChevronDown } from 'react-icons/bi';
import { GiWeight } from 'react-icons/gi';
import { FcMoneyTransfer } from 'react-icons/fc';

import gcashImg from '../../assets/gcash icon appstore.webp';
import mayaImg from '../../assets/maya icon.webp';
import CustomDropdown from '../Listings/CustomDropdown';
import { categories } from '../../constants';

const Filters = ({
  onSearch,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  categoriesOpen,
  setCategoriesOpen,
  locationOpen,
  setLocationOpen,
  priceOpen,
  setPriceOpen,
  weightOpen,
  setWeightOpen,
  paymentOpen,
  setPaymentOpen,
  searchText,
  setSearchText,
  locationText,
  setLocationText,
  priceOptions,
  setPriceOptions,
  weightOptions,
  setWeightOptions,
  paymentOptions,
  setPaymentOptions,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minWeight,
  setMinWeight,
  maxWeight,
  setMaxWeight,
}) => {
  const handleCheckboxChange = (optionOrArray, setState, state) => {
    const updatedState = new Set(state);
    const options = Array.isArray(optionOrArray)
      ? optionOrArray
      : [optionOrArray];

    options.forEach((option) => {
      if (updatedState.has(option)) {
        updatedState.delete(option);
      } else {
        updatedState.add(option);
      }
    });

    setState([...updatedState]);
  };

  const handleRadioChange = (optionOrArray, setState, state) => {
    const options = Array.isArray(optionOrArray)
      ? optionOrArray
      : [optionOrArray];

    setState((prevState) => {
      const allExist = options.every((opt) => prevState.includes(opt));

      if (allExist) {
        return prevState.filter((opt) => !options.includes(opt));
      }

      return [...options];
    });
  };

  const handleSearch = () => {
    const searchParams = {
      category: selectedCategory,
      subcategory: selectedSubCategory,
      searchText,
      location: locationText,
      priceOptions,
      weightOptions,
      paymentOptions,
      minPrice,
      maxPrice,
      minWeight,
      maxWeight,
    };
    if (onSearch) {
      onSearch(searchParams);
    }
  };

  const handleResetFilters = () => {
    window.location.reload();
  };

  return (
    <div className='p-4 rounded-lg max-w-sm w-full'>
      <h2 className='text-lg font-bold'>Filter & Refine</h2>
      <hr className='mt-4 mb-4' />

      <div className='mb-4'>
        <div
          className='flex justify-between items-center cursor-pointer'
          onClick={() => setCategoriesOpen(!categoriesOpen)}
        >
          <span className='font-bold'>Categories</span>
          <BiChevronDown
            className={`transition-transform ${
              categoriesOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
        {categoriesOpen && (
          <div className='mt-4'>
            <CustomDropdown
              options={categories}
              placeholder='All Categories'
              setSelectedCategory={setSelectedCategory}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
            />
          </div>
        )}
        <hr className='mt-4' />
      </div>

      <div className='mb-4'>
        <div
          className='flex justify-between items-center cursor-pointer'
          onClick={() => setLocationOpen(!locationOpen)}
        >
          <span className='font-bold'>Location</span>
          <BiChevronDown
            className={`transition-transform ${
              locationOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
        {locationOpen && (
          <div className='mt-2 flex items-center border rounded-md px-3 py-2 bg-white focus-within:border-[#2F855A]'>
            <BiMap className='text-gray-400 mr-2' />
            <input
              type='text'
              placeholder='Location'
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              className='w-full outline-none text-gray-600'
            />
          </div>
        )}
        <hr className='mt-4' />
      </div>

      <div className='mb-4'>
        <div
          className='flex justify-between items-center cursor-pointer'
          onClick={() => setPriceOpen(!priceOpen)}
        >
          <span className='font-bold'>Price</span>
          <BiChevronDown
            className={`transition-transform ${priceOpen ? 'rotate-180' : ''}`}
          />
        </div>
        {priceOpen && (
          <div className='mt-2'>
            <div className='flex items-center space-x-2'>
              <div className='flex items-center border rounded-md px-3 py-2 bg-white focus-within:border-[#2F855A]'>
                <input
                  type='number'
                  placeholder='Min'
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className='w-full outline-none text-gray-600'
                />
              </div>
              <div className='flex items-center border rounded-md px-3 py-2 bg-white focus-within:border-[#2F855A]'>
                <input
                  type='number'
                  placeholder='Max'
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className='w-full outline-none text-gray-600'
                />
              </div>
              <button
                onClick={handleSearch}
                className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500'
              >
                Go
              </button>
            </div>

            <div className='mt-4'>
              <span className='font-bold'>Price type</span>
              <div className='mt-4 flex flex-col space-y-4 text-gray-400 font-semibold'>
                {selectedSubCategory === 'Eggs' && (
                  <>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={priceOptions.includes('pwPrice')}
                        onChange={() =>
                          handleRadioChange(
                            'pwPrice',
                            setPriceOptions,
                            priceOptions
                          )
                        }
                        className='mr-2 focus:ring-[#2F855A]'
                      />
                      <img
                        src='https://img.icons8.com/color/96/peso-symbol.png'
                        alt='Price'
                        className='mr-2 h-5 w-5'
                      />
                      PW Price
                    </label>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={priceOptions.includes('xsPrice')}
                        onChange={() =>
                          handleRadioChange(
                            'xsPrice',
                            setPriceOptions,
                            priceOptions
                          )
                        }
                        className='mr-2 focus:ring-[#2F855A]'
                      />
                      <img
                        src='https://img.icons8.com/color/96/peso-symbol.png'
                        alt='Price'
                        className='mr-2 h-5 w-5'
                      />
                      XS Price
                    </label>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={priceOptions.includes('sPrice')}
                        onChange={() =>
                          handleRadioChange(
                            'sPrice',
                            setPriceOptions,
                            priceOptions
                          )
                        }
                        className='mr-2 focus:ring-[#2F855A]'
                      />
                      <img
                        src='https://img.icons8.com/color/96/peso-symbol.png'
                        alt='Price'
                        className='mr-2 h-5 w-5'
                      />
                      S Price
                    </label>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={priceOptions.includes('mPrice')}
                        onChange={() =>
                          handleRadioChange(
                            'mPrice',
                            setPriceOptions,
                            priceOptions
                          )
                        }
                        className='mr-2 focus:ring-[#2F855A]'
                      />
                      <img
                        src='https://img.icons8.com/color/96/peso-symbol.png'
                        alt='Price'
                        className='mr-2 h-5 w-5'
                      />
                      M Price
                    </label>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={priceOptions.includes('lPrice')}
                        onChange={() =>
                          handleRadioChange(
                            'lPrice',
                            setPriceOptions,
                            priceOptions
                          )
                        }
                        className='mr-2 focus:ring-[#2F855A]'
                      />
                      <img
                        src='https://img.icons8.com/color/96/peso-symbol.png'
                        alt='Price'
                        className='mr-2 h-5 w-5'
                      />
                      L Price
                    </label>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={priceOptions.includes('xlPrice')}
                        onChange={() =>
                          handleRadioChange(
                            'xlPrice',
                            setPriceOptions,
                            priceOptions
                          )
                        }
                        className='mr-2 focus:ring-[#2F855A]'
                      />
                      <img
                        src='https://img.icons8.com/color/96/peso-symbol.png'
                        alt='Price'
                        className='mr-2 h-5 w-5'
                      />
                      XL Price
                    </label>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={priceOptions.includes('jumboPrice')}
                        onChange={() =>
                          handleRadioChange(
                            'jumboPrice',
                            setPriceOptions,
                            priceOptions
                          )
                        }
                        className='mr-2 focus:ring-[#2F855A]'
                      />
                      <img
                        src='https://img.icons8.com/color/96/peso-symbol.png'
                        alt='Price'
                        className='mr-2 h-5 w-5'
                      />
                      Jumbo Price
                    </label>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={priceOptions.includes('dirtyPrice')}
                        onChange={() =>
                          handleRadioChange(
                            'dirtyPrice',
                            setPriceOptions,
                            priceOptions
                          )
                        }
                        className='mr-2 focus:ring-[#2F855A]'
                      />
                      <img
                        src='https://img.icons8.com/color/96/peso-symbol.png'
                        alt='Price'
                        className='mr-2 h-5 w-5'
                      />
                      Dirty Price
                    </label>
                  </>
                )}

                {selectedSubCategory !== 'Eggs' && (
                  <>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={priceOptions.includes('pricePerKg')}
                        onChange={() => {
                          handleRadioChange(
                            'pricePerKg',
                            setPriceOptions,
                            priceOptions
                          );
                        }}
                        className='mr-2 focus:ring-[#2F855A]'
                      />
                      <img
                        src='https://img.icons8.com/color/96/peso-symbol.png'
                        alt='Price'
                        className='mr-2 h-5 w-5'
                      />
                      Per/kg
                    </label>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={priceOptions.includes('avgPricePerHead')}
                        onChange={() => {
                          handleRadioChange(
                            [
                              'avgPricePerHead',
                              'totalPrice',
                              'productPrice',
                              'pricePerBag',
                              'preferredHourlyRate',
                              'hourlyRate',
                            ],
                            setPriceOptions,
                            priceOptions
                          );
                        }}
                        className='mr-2 focus:ring-[#2F855A]'
                      />
                      <img
                        src='https://img.icons8.com/color/96/peso-symbol.png'
                        alt='Price'
                        className='mr-2 h-5 w-5'
                      />
                      Total
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        <hr className='mt-4' />
      </div>

      {((selectedCategory === 'Livestock' && selectedSubCategory !== 'Eggs') ||
        selectedCategory === 'Animal Feed' ||
        selectedCategory === 'Seeds' ||
        selectedCategory === 'Fruits, Vegetables & Growables' ||
        selectedCategory === 'Fertilizers') && (
        <div className='mb-4'>
          <div
            className='flex justify-between items-center cursor-pointer'
            onClick={() => setWeightOpen(!weightOpen)}
          >
            <span className='font-bold'>Weight</span>
            <BiChevronDown
              className={`transition-transform ${
                weightOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
          {weightOpen && (
            <div className='mt-2'>
              <div className='flex items-center space-x-2'>
                <div className='flex items-center border rounded-md px-3 py-2 bg-white focus-within:border-[#2F855A]'>
                  <input
                    type='number'
                    placeholder='Min'
                    value={minWeight}
                    onChange={(e) => setMinWeight(e.target.value)}
                    className='w-full outline-none text-gray-600'
                  />
                </div>
                <div className='flex items-center border rounded-md px-3 py-2 bg-white focus-within:border-[#2F855A]'>
                  <input
                    type='number'
                    placeholder='Max'
                    value={maxWeight}
                    onChange={(e) => setMaxWeight(e.target.value)}
                    className='w-full outline-none text-gray-600'
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500'
                >
                  Go
                </button>
              </div>

              <div className='mt-4'>
                <span className='font-bold'>Weight type</span>
                <div className='mt-4 flex flex-col space-y-4 text-gray-400 font-semibold'>
                  <label className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={weightOptions.includes('avgWeightPerHead')}
                      onChange={() => {
                        handleRadioChange(
                          'avgWeightPerHead',
                          setWeightOptions,
                          weightOptions
                        );
                      }}
                      className='mr-2 focus:ring-[#2F855A]'
                    />
                    <GiWeight className='mr-2 text-lg text-gray-400' />
                    Avg head
                  </label>
                  <label className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={weightOptions.includes('totalWeight')}
                      onChange={() => {
                        handleRadioChange(
                          ['totalWeight'],
                          setWeightOptions,
                          weightOptions
                        );
                      }}
                      className='mr-2 focus:ring-[#2F855A]'
                    />
                    <GiWeight className='mr-2 text-lg text-gray-400' />
                    Total
                  </label>
                  <label className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={weightOptions.includes('weight')}
                      onChange={() => {
                        handleRadioChange(
                          [
                            'weight',
                            'productWeight',
                            'minOrder',
                            'feedBagWeight',
                          ],
                          setWeightOptions,
                          weightOptions
                        );
                      }}
                      className='mr-2 focus:ring-[#2F855A]'
                    />
                    <GiWeight className='mr-2 text-lg text-gray-400' />
                    MOQ Weight
                  </label>
                </div>
              </div>
            </div>
          )}
          <hr className='mt-4' />
        </div>
      )}

      <div className='mb-4'>
        <div
          className='flex justify-between items-center cursor-pointer'
          onClick={() => setPaymentOpen(!paymentOpen)}
        >
          <span className='font-bold'>Payment Acceptance</span>
          <BiChevronDown
            className={`transition-transform ${
              paymentOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
        {paymentOpen && (
          <div className='mt-4 flex flex-col space-y-4 text-gray-400 font-semibold'>
            <label className='flex items-center'>
              <input
                type='checkbox'
                checked={paymentOptions.includes('cash')}
                onChange={() =>
                  handleCheckboxChange(
                    'cash',
                    setPaymentOptions,
                    paymentOptions
                  )
                }
                className='mr-2 focus:ring-[#2F855A]'
              />
              <FcMoneyTransfer className='mr-2 h-5 w-5' />
              Cash
            </label>
            <label className='flex items-center'>
              <input
                type='checkbox'
                checked={paymentOptions.includes('gcash')}
                onChange={() =>
                  handleCheckboxChange(
                    'gcash',
                    setPaymentOptions,
                    paymentOptions
                  )
                }
                className='mr-2 focus:ring-[#2F855A]'
              />
              <img src={gcashImg} alt='GCash' className='mr-2 h-5 w-5' />
              GCash
            </label>
            <label className='flex items-center'>
              <input
                type='checkbox'
                checked={paymentOptions.includes('maya')}
                onChange={() =>
                  handleCheckboxChange(
                    'maya',
                    setPaymentOptions,
                    paymentOptions
                  )
                }
                className='mr-2 focus:ring-[#2F855A]'
              />
              <img src={mayaImg} alt='Maya' className='mr-2 h-5 w-5' />
              Maya
            </label>
            <label className='flex items-center'>
              <input
                type='checkbox'
                checked={paymentOptions.includes('creditCard')}
                onChange={() =>
                  handleCheckboxChange(
                    'creditCard',
                    setPaymentOptions,
                    paymentOptions
                  )
                }
                className='mr-2 focus:ring-[#2F855A]'
              />
              <img
                src='https://img.icons8.com/color/48/visa.png'
                alt='Credit Card'
                className='h-5 w-5'
              />
              <img
                src='https://img.icons8.com/color/48/mastercard.png'
                alt='Credit Card'
                className='mr-2 h-5 w-5'
              />
              Credit Card
            </label>
          </div>
        )}
        <hr className='mt-4' />
      </div>

      <div className='mb-4'>
        <label className='font-bold block mb-2'>Search Bar</label>
        <div className='flex items-center border rounded-md px-3 py-2 bg-white focus-within:border-[#2F855A]'>
          <BiSearch className='text-gray-400 mr-2' />
          <input
            type='text'
            placeholder='Search...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='w-full outline-none text-gray-600'
          />
        </div>
        <hr className='mt-4' />
      </div>

      <div className='flex flex-col items-center mt-4'>
        <button
          onClick={handleSearch}
          className='w-full bg-[#53AE66] text-white py-3 rounded-md hover:bg-[#4C905A]'
        >
          Filter
        </button>
        <span
          onClick={handleResetFilters}
          className='mt-2 text-sm text-gray-500 cursor-pointer hover:underline'
        >
          Reset Filters
        </span>
      </div>
    </div>
  );
};

export default Filters;
