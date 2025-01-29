import React, { useState } from 'react';

import NavbarHero from '../components/Listings/NavbarHero';
import SearchBar from '../components/Listings/SearchBar';
import Footer from '../components/Footer';
import Header from '../components/Listings/Header';
import ListingsGrid from '../components/Listings/ListingGrid';

const Listings = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [weightOpen, setWeightOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [locationText, setLocationText] = useState('');
  const [priceOptions, setPriceOptions] = useState([]);
  const [weightOptions, setWeightOptions] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');

  const [sortOption, setSortOption] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchLength, setSearchLength] = useState(0);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className='Home bg-[#F0F6F2]'>
      <NavbarHero />
      <SearchBar
        onSearch={handleSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
      />
      <Header searchLength={searchLength} />
      <ListingsGrid
        searchParams={searchQuery}
        setSearchLength={setSearchLength}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        categoriesOpen={categoriesOpen}
        setCategoriesOpen={setCategoriesOpen}
        locationOpen={locationOpen}
        setLocationOpen={setLocationOpen}
        priceOpen={priceOpen}
        setPriceOpen={setPriceOpen}
        weightOpen={weightOpen}
        setWeightOpen={setWeightOpen}
        paymentOpen={paymentOpen}
        setPaymentOpen={setPaymentOpen}
        searchText={searchText}
        setSearchText={setSearchText}
        locationText={locationText}
        setLocationText={setLocationText}
        priceOptions={priceOptions}
        setPriceOptions={setPriceOptions}
        weightOptions={weightOptions}
        setWeightOptions={setWeightOptions}
        paymentOptions={paymentOptions}
        setPaymentOptions={setPaymentOptions}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minWeight={minWeight}
        setMinWeight={setMinWeight}
        maxWeight={maxWeight}
        setMaxWeight={setMaxWeight}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <Footer />
    </div>
  );
};

export default Listings;
