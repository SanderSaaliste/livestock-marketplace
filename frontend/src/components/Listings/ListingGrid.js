import React, { useEffect, useState } from 'react';
import { BiListUl, BiSolidGridAlt } from 'react-icons/bi';

import ListingCard from './ListingCard';
import Filters from './Filters';
import listingService from '../../services/listing-service';
import toast from 'react-hot-toast';

const ListingsGrid = () => {
  const [layout, setLayout] = useState('grid');
  const [listings, setListings] = useState([]);

  const fetchListings = async () => {
    try {
      const response = await listingService.getAllListings();
      setListings(response);
    } catch (err) {
      console.error('Failed to fetch listings:', err);
      toast.error('Failed to load listings. Please try again.');
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className='py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-end items-center mb-6 px-4'>
          <div className='flex space-x-6'>
            <button
              className={`flex items-center space-x-2 font-medium ${
                layout === 'list' ? 'text-green-600 font-bold' : 'text-gray-600'
              }`}
              onClick={() => setLayout('list')}
            >
              <BiListUl />
              <span>List</span>
            </button>
            <button
              className={`flex items-center space-x-2 font-medium ${
                layout === 'grid' ? 'text-green-600 font-bold' : 'text-gray-600'
              }`}
              onClick={() => setLayout('grid')}
            >
              <BiSolidGridAlt />
              <span>Grid</span>
            </button>
            <div className='text-sm font-bold text-gray-600'>
              <select className='ml-2 rounded-md py-1 px-3 focus:outline-none bg-[#F0F6F2]'>
                <option value='price-asc'>Sort by</option>
                <option value='price-asc'>Price: Low to High</option>
                <option value='price-desc'>Price: High to Low</option>
                <option value='newest'>Newest Listings</option>
                <option value='oldest'>Oldest Listings</option>
              </select>
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row'>
          <div className='w-full lg:w-[30%] p-4 mb-6 lg:mb-0 lg:mr-6 flex justify-center lg:justify-start'>
            <Filters />
          </div>

          <div className='w-full lg:w-[70%]'>
            {layout === 'grid' ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {listings.map((listing) => (
                  <div className='mx-auto' key={listing.id}>
                    <ListingCard listing={listing} />
                  </div>
                ))}
              </div>
            ) : (
              <div className='space-y-6'>
                {listings.map((listing) => (
                  <div className='flex justify-center' key={listing.id}>
                    <ListingCard listing={listing} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsGrid;
