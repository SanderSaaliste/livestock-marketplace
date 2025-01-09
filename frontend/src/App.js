import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import EmailVerification from './pages/EmailVerification';
import EmailVerified from './pages/EmailVerified';
import AddListing from './pages/AddListing';
import FillInForm from './pages/FillForm';
import ListingConfirmation from './pages/ListingConfirmation';
import Listings from './pages/Listings';
import SingleListing from './pages/SingleListing';
import LeaveReview from './pages/LeaveReview';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/verifyEmail' element={<EmailVerification />} />
          <Route path='/emailVerified' element={<EmailVerified />} />
          <Route path='/addListing' element={<AddListing />} />
          <Route path='/fillForm' element={<FillInForm />} />
          <Route
            path='/listingConfirmation/:id'
            element={<ListingConfirmation />}
          />
          <Route path='/listings' element={<Listings />} />
          <Route path='/listing/:id' element={<SingleListing />} />
          <Route path='/listing/:id/leaveReview' element={<LeaveReview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
