import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Toaster } from 'react-hot-toast';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster
      position={'top-right'}
      toastOptions={{
        style: {
          margin: '15px',
          background: '#828282',
          color: '#fff',
          fontSize: '15px',
          width: '340px',
        },
        className: 'text-base',
        duration: 3000,
      }}
    />
    <App />
  </React.StrictMode>
);

reportWebVitals();
