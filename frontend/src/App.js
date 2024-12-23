import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import EmailVerification from './pages/EmailVerification';
import EmailVerified from './pages/EmailVerified';
import AddListing from './pages/AddListing';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/verifyEmail' element={<EmailVerification />} />
          <Route path='/emailVerified' element={<EmailVerified />} />
          <Route path='/addListing' element={<AddListing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
