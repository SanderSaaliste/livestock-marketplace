import React from 'react';
import ImageSection from '../components/AddListing/ImageSection';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import GetStartedSteps from '../components/AddListing/GetStartedSteps';
import AssistanceSection from '../components/AddListing/AssistanceSection';

const AddListing = () => {
  return (
    <div className='Home'>
      <Navbar />
      <GetStartedSteps />
      <ImageSection />
      <AssistanceSection />
      <Footer />
    </div>
  );
};

export default AddListing;
