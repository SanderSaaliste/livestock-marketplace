import React, { useEffect, useState } from 'react';
import {
  BiListUl,
  BiSolidGridAlt,
  BiChevronLeft,
  BiChevronRight,
} from 'react-icons/bi';

import ListingCard from './ListingCard';
import Filters from './Filters';
import listingService from '../../services/listing-service';
import toast from 'react-hot-toast';

const ListingsGrid = () => {
  const [layout, setLayout] = useState('grid');
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listingsPerPage] = useState(6);

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

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(listings.length / listingsPerPage);

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
                {currentListings.map((listing) => (
                  <div className='mx-auto' key={listing.id}>
                    <ListingCard listing={listing} />
                  </div>
                ))}
              </div>
            ) : (
              <div className='space-y-6'>
                {currentListings.map((listing) => (
                  <div className='flex justify-center' key={listing.id}>
                    <ListingCard listing={listing} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='flex justify-center items-center mt-8'>
          <nav className='flex space-x-4'>
            <button
              className={`px-3 py-1 border rounded bg-white hover:bg-gray-100 flex items-center ${
                currentPage === 1 ? 'cursor-not-allowed' : ''
              }`}
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <BiChevronLeft
                className={`${currentPage === 1 ? 'text-gray-400' : ''}`}
              />
              <span className='ml-1'>Previous</span>
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1
                    ? 'bg-[#008001] text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1 border rounded bg-white hover:bg-gray-100 flex items-center ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : ''
              }`}
              onClick={() =>
                currentPage < totalPages && paginate(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
              <span className='mr-1'>Next</span>
              <BiChevronRight
                className={`${
                  currentPage === totalPages ? 'text-gray-400' : ''
                }`}
              />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ListingsGrid;
