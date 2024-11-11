import React from 'react';
import NavbarHero from '../components/NavbarHero';
import ImageSection from '../components/ImageSection';
import Listings from '../components/Listings';
import FeedSection from '../components/FeedSection';
import SellWithUs from '../components/SellWithUs';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className='Home'>
      <NavbarHero />
      <ImageSection />
      <Listings />
      <FeedSection />
      <SellWithUs />
      <Footer />
    </div>
  );
};

export default Home;
