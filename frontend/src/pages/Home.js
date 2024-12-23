import React from 'react';
import NavbarHero from '../components/NavbarHero';
import ImageSection from '../components/Home/ImageSection';
import Listings from '../components/Home/Listings';
import FeedSection from '../components/Home/FeedSection';
import SellWithUs from '../components/Home/SellWithUs';
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
