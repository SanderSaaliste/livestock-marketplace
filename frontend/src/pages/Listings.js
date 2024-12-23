import React from 'react';

import NavbarHero from '../components/Listings/NavbarHero';
import SearchBar from '../components/Listings/SearchBar';
import Footer from '../components/Footer';
import Header from '../components/Listings/Header';
import ListingsGrid from '../components/Listings/ListingGrid';

const Listings = () => {
  return (
    <div className='Home bg-[#F0F6F2]'>
      <NavbarHero />
      <SearchBar />
      <Header />
      <ListingsGrid />
      <Footer />
    </div>
  );
};

export default Listings;
