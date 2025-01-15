import React, { useState } from 'react';

import NavbarHero from '../components/Listings/NavbarHero';
import SearchBar from '../components/Listings/SearchBar';
import Footer from '../components/Footer';
import Header from '../components/Listings/Header';
import ListingsGrid from '../components/Listings/ListingGrid';

const Listings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLength, setSearchLength] = useState(0);

  const handleSearch = (query) => {
    console.log(query);
    setSearchQuery(query);
  };

  return (
    <div className='Home bg-[#F0F6F2]'>
      <NavbarHero />
      <SearchBar onSearch={handleSearch} />
      <Header searchLength={searchLength} />
      <ListingsGrid
        searchParams={searchQuery}
        setSearchLength={setSearchLength}
      />
      <Footer />
    </div>
  );
};

export default Listings;
