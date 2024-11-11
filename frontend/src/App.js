import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import EmailVerification from './pages/EmailVerification';
import EmailVerified from './pages/EmailVerified';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/verifyEmail' element={<EmailVerification />} />
          <Route path='/emailVerified' element={<EmailVerified />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
