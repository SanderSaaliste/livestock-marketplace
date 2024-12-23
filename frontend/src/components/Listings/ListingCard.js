import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidHeart, BiMap } from 'react-icons/bi';
import { MdPayment } from 'react-icons/md';
import { PiCowLight } from 'react-icons/pi';
import { GiWeight } from 'react-icons/gi';

import gcashImg from '../../assets/gcash icon appstore.webp';
import mayaImg from '../../assets/maya icon.webp';
import { apiHost } from '../../constants';

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`max-w-sm bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-2 flex flex-col h-full relative ${
        listing.formData.salesStatus === 'Sold' ||
        listing.formData.salesStatus === 'Inactive'
          ? 'opacity-50'
          : ''
      }`}
    >
      <div className='relative rounded-lg overflow-hidden'>
        {listing.formData.media && listing.formData.media.length > 0 && (
          <img
            src={`${apiHost}${listing.formData.media[0]}`}
            alt={listing.formData.title}
            className='w-full h-48 object-cover'
          />
        )}
        <span
          className={`absolute top-4 left-4 text-sm font-bold px-4 py-3 rounded-md shadow-md text-black ${
            listing.formData.salesStatus === 'For Sale'
              ? 'bg-[#DDECCB]'
              : listing.formData.salesStatus === 'Active'
              ? 'bg-[#DDECCB]'
              : listing.formData.salesStatus === 'Pending'
              ? 'bg-[#FFE06F]'
              : listing.formData.salesStatus === 'Sold'
              ? 'bg-[#F88F86] text-white'
              : listing.formData.salesStatus === 'Inactive'
              ? 'bg-[#F88F86] text-white'
              : ''
          }`}
        >
          {listing.formData.salesStatus}
        </span>
      </div>

      <div className='mt-4 flex-grow'>
        <h3 className='text-base font-bold mb-4'>{listing.formData.title}</h3>

        <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
          {listing.formData.paymentMethods && (
            <>
              <div className='flex items-center'>
                <MdPayment className='mr-2 text-gray-700' />
                <span>User accepts</span>
              </div>
              <div className='flex items-center space-x-1'>
                {listing.formData.paymentMethods &&
                  listing.formData.paymentMethods.includes('cash') && (
                    <img
                      src='https://img.icons8.com/color/27/get-cash.png'
                      alt='GCash'
                      className='h-5 w-5'
                    />
                  )}
                {listing.formData.paymentMethods &&
                  listing.formData.paymentMethods.includes('gcash') && (
                    <img src={gcashImg} alt='GCash' className='h-5 w-5' />
                  )}
                {listing.formData.paymentMethods &&
                  listing.formData.paymentMethods.includes('maya') && (
                    <img src={mayaImg} alt='Maya' className='h-5 w-5' />
                  )}
                {listing.formData.paymentMethods &&
                  listing.formData.paymentMethods.includes('creditCard') && (
                    <>
                      <img
                        src='https://img.icons8.com/color/48/visa.png'
                        alt='Visa'
                        className='h-5 w-5'
                      />
                      <img
                        src='https://img.icons8.com/color/48/mastercard.png'
                        alt='Mastercard'
                        className='h-5 w-5'
                      />
                    </>
                  )}
              </div>
            </>
          )}

          {listing.formData.location && (
            <div className='flex items-center'>
              <BiMap className='mr-2 text-lg text-gray-700' />
              <span>Location:</span>
              <span className='ml-1'>{listing.formData.location}</span>
            </div>
          )}

          {listing.formData.quantity && (
            <div className='flex items-center'>
              <PiCowLight className='mr-2 text-lg text-gray-700' />
              <span>Quantity:</span>
              <span className='ml-1'>{listing.formData.quantity}</span>
            </div>
          )}

          {listing.formData.avgHead && (
            <div className='flex items-center'>
              <GiWeight className='mr-2 text-lg text-gray-700' />
              <span>Avg head:</span>
              <span className='ml-2'>{listing.formData.paymentMethods}kg</span>
            </div>
          )}

          {listing.formData.total && (
            <div className='flex items-center'>
              <GiWeight className='mr-2 text-lg text-gray-700' />
              <span>Total:</span>
              <span className='ml-2'>{listing.formData.total}kg</span>
            </div>
          )}

          {listing.formData.totalPrice && (
            <div className='flex items-center'>
              <img
                src='https://img.icons8.com/color/96/peso-symbol.png'
                alt='Price'
                className='h-5 w-5'
              />
              <span className='text-gray-600 text-sm ml-1'>Price:</span>
              <span className='text-lg font-bold text-gray-800 ml-1'>
                {listing.formData.totalPrice.toLocaleString()}
              </span>
            </div>
          )}

          {listing.formData.perKg && (
            <div className='flex items-center'>
              <img
                src='https://img.icons8.com/color/96/peso-symbol.png'
                alt='Price'
                className='h-5 w-5'
              />
              <span className='text-gray-600 text-sm ml-1'>Per/kg:</span>
              <span className='text-lg font-bold text-gray-800 ml-1'>
                {listing.formData.perKg.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {listing.formData.description && (
          <div className='text-gray-600 text-sm mt-4'>
            <span className='font-bold text-gray-700 mr-1'>Description:</span>
            {listing.formData.description}
          </div>
        )}

        <div className='flex justify-end items-center mb-4 mt-4'>
          <button className='text-sm text-gray-600 font-bold flex items-center space-x-1'>
            <BiSolidHeart className='text-gray-300 text-lg' />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className='mt-auto space-y-3'>
        <button
          className={`w-full text-white font-semibold py-3 rounded-md transition duration-200 ease-in-out ${
            listing.formData.salesStatus === 'Sold'
              ? 'bg-[#42B572] cursor-not-allowed'
              : 'bg-[#42B572] hover:bg-[#36A463] hover:shadow-lg'
          }`}
          disabled={listing.formData.salesStatus === 'Sold'}
          onClick={() => navigate(`/listing/${listing.id}`)}
        >
          Offer
        </button>
        <button
          className={`w-full text-gray-600 font-medium py-3 rounded-md transition duration-200 ease-in-out ${
            listing.formData.salesStatus === 'Sold'
              ? 'bg-[#E1E1E1] cursor-not-allowed'
              : 'bg-[#E1E1E1] hover:bg-gray-300 hover:text-gray-800 hover:shadow-md'
          }`}
          disabled={listing.formData.salesStatus === 'Sold'}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ListingCard;
