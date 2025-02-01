import React, { useEffect, useState, useRef } from 'react';
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
import ListingCardAlt from './ListingCardAlt';
import Loader from '../Loader';

const ListingsGrid = ({
  searchParams,
  setSearchLength,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  categoriesOpen,
  setCategoriesOpen,
  locationOpen,
  setLocationOpen,
  priceOpen,
  setPriceOpen,
  weightOpen,
  setWeightOpen,
  paymentOpen,
  setPaymentOpen,
  searchText,
  setSearchText,
  locationText,
  setLocationText,
  priceOptions,
  setPriceOptions,
  weightOptions,
  setWeightOptions,
  paymentOptions,
  setPaymentOptions,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minWeight,
  setMinWeight,
  maxWeight,
  setMaxWeight,
  sortOption,
  setSortOption,
}) => {
  const gridRef = useRef(null);

  const [layout, setLayout] = useState('list');
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listingsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [currentRange, setCurrentRange] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const maxPagesToShow = 6;

  const mergeSearchParams = (params1, params2) => {
    const merged = {};
    const keys = new Set([
      ...Object.keys(params1 || {}),
      ...Object.keys(params2 || {}),
    ]);

    keys.forEach((key) => {
      merged[key] = params1?.[key] ?? params2?.[key];
    });

    return merged;
  };

  const fetchListings = async (page = 1, sortBy = 'newest') => {
    setLoading(true);

    const finalSearchParams = mergeSearchParams(searchParams, searchQuery);

    try {
      const response = await listingService.getAllListings({
        ...finalSearchParams,
        page,
        numItems: listingsPerPage,
        sortBy,
      });

      if (response.error) {
        console.error('Error fetching listings:', response.error);
        toast.error(
          response.error || 'Failed to load listings. Please try again.'
        );

        return;
      }

      setListings(response.listings);
      setSearchLength(response.pagination.totalItems);
      setCurrentPage(response.pagination.currentPage);
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      console.error('Failed to fetch listings:', err);
      toast.error('Failed to load listings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(1, sortOption);
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, searchQuery, sortOption]);

  const paginate = (pageNumber) => {
    fetchListings(pageNumber, sortOption);
    scrollToTop();
  };

  const changeRange = (direction) => {
    if (
      direction === 'next' &&
      currentRange < Math.ceil(totalPages / maxPagesToShow)
    ) {
      setCurrentRange(currentRange + 1);
      setCurrentPage(currentRange * maxPagesToShow + 1);
      fetchListings(currentRange * maxPagesToShow + 1, sortOption);
      scrollToTop();
    } else if (direction === 'previous' && currentRange > 1) {
      setCurrentRange(currentRange - 1);
      setCurrentPage((currentRange - 1) * maxPagesToShow);
      fetchListings((currentRange - 1) * maxPagesToShow, sortOption);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const startPage = (currentRange - 1) * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
  const pagesToShow = Array.from(
    { length: endPage - startPage + 1 },
    (_, idx) => startPage + idx
  );

  const handleSearch = (newParams) => {
    setSearchQuery((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortOption(selectedSort);

    let newSearchParams;

    if (selectedSort === 'price-asc' || selectedSort === 'price-desc') {
      if (priceOptions.length === 0) {
        setPriceOptions([
          'mPrice',
          'avgPricePerHead',
          'totalPrice',
          'productPrice',
          'pricePerBag',
          'preferredHourlyRate',
          'hourlyRate',
        ]);

        newSearchParams = {
          priceOptions: [
            'mPrice',
            'avgPricePerHead',
            'totalPrice',
            'productPrice',
            'pricePerBag',
            'preferredHourlyRate',
            'hourlyRate',
          ],
        };
      } else {
        newSearchParams = {
          priceOptions: priceOptions,
        };
      }

      handleSearch(newSearchParams);
    }
  };

  return (
    <div className='py-8' ref={gridRef}>
      <div className='max-w-7xl mx-auto px-4'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className='flex justify-end items-center mb-6 px-4'>
              <div className='flex space-x-6'>
                <button
                  className={`flex items-center space-x-2 font-medium ${
                    layout === 'list'
                      ? 'text-green-600 font-bold'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setLayout('list')}
                >
                  <BiListUl />
                  <span>List</span>
                </button>
                <button
                  className={`flex items-center space-x-2 font-medium ${
                    layout === 'grid'
                      ? 'text-green-600 font-bold'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setLayout('grid')}
                >
                  <BiSolidGridAlt />
                  <span>Grid</span>
                </button>
                <div className='text-sm font-bold text-gray-600'>
                  <select
                    className='ml-2 rounded-md py-1 px-3 focus:outline-none bg-[#F0F6F2]'
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value=''>Sort by</option>
                    <option value='price-asc'>Price: Low to High</option>
                    <option value='price-desc'>Price: High to Low</option>
                    <option value='newest'>Newest Listings</option>
                    <option value='oldest'>Oldest Listings</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='flex flex-col lg:flex-row'>
              <div className='w-full lg:w-[30%] p-4 mb-6 lg:mb-0 lg:mr-6'>
                <div className='sticky top-4'>
                  <Filters
                    onSearch={handleSearch}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedSubCategory={selectedSubCategory}
                    setSelectedSubCategory={setSelectedSubCategory}
                    categoriesOpen={categoriesOpen}
                    setCategoriesOpen={setCategoriesOpen}
                    locationOpen={locationOpen}
                    setLocationOpen={setLocationOpen}
                    priceOpen={priceOpen}
                    setPriceOpen={setPriceOpen}
                    weightOpen={weightOpen}
                    setWeightOpen={setWeightOpen}
                    paymentOpen={paymentOpen}
                    setPaymentOpen={setPaymentOpen}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    locationText={locationText}
                    setLocationText={setLocationText}
                    priceOptions={priceOptions}
                    setPriceOptions={setPriceOptions}
                    weightOptions={weightOptions}
                    setWeightOptions={setWeightOptions}
                    paymentOptions={paymentOptions}
                    setPaymentOptions={setPaymentOptions}
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    minWeight={minWeight}
                    setMinWeight={setMinWeight}
                    maxWeight={maxWeight}
                    setMaxWeight={setMaxWeight}
                  />
                </div>
              </div>

              <div className='w-full lg:w-[70%]'>
                {listings.length > 0 ? (
                  <>
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
                            <ListingCardAlt listing={listing} />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className='flex items-center mt-8'>
                      <nav className='flex space-x-4'>
                        <button
                          className={`px-3 py-1 border rounded bg-white hover:bg-gray-100 flex items-center ${
                            currentRange === 1
                              ? 'cursor-not-allowed text-gray-400'
                              : ''
                          }`}
                          onClick={() => changeRange('previous')}
                          disabled={currentRange === 1}
                        >
                          <BiChevronLeft />
                          <span className='ml-1'>Previous</span>
                        </button>
                        {pagesToShow.map((page) => (
                          <button
                            key={page}
                            className={`px-3 py-1 border rounded ${
                              currentPage === page
                                ? 'bg-[#008001] text-white'
                                : 'bg-white text-black hover:bg-gray-100'
                            }`}
                            onClick={() => paginate(page)}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          className={`px-3 py-1 border rounded bg-white hover:bg-gray-100 flex items-center ${
                            currentRange ===
                            Math.ceil(totalPages / maxPagesToShow)
                              ? 'cursor-not-allowed text-gray-400'
                              : ''
                          }`}
                          onClick={() => changeRange('next')}
                          disabled={
                            currentRange ===
                            Math.ceil(totalPages / maxPagesToShow)
                          }
                        >
                          <span className='mr-1'>Next</span>
                          <BiChevronRight />
                        </button>
                      </nav>
                    </div>
                  </>
                ) : (
                  <div className='text-center py-8'>
                    <p className='text-gray-600 text-lg'>
                      No listings found. Try adjusting your filters or search
                      criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListingsGrid;
