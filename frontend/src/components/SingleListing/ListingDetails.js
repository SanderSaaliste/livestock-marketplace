import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidHeart } from 'react-icons/bi';
import { GiWeight } from 'react-icons/gi';
import { BsFacebook, BsInstagram, BsStarFill } from 'react-icons/bs';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';

import gcashImg from '../../assets/gcash icon appstore.webp';
import mayaImg from '../../assets/maya icon.webp';
import { apiHost } from '../../constants';

const ListingDetails = ({ listing }) => {
  const [mainImage, setMainImage] = useState(
    listing.formData.media && listing.formData.media[0]
  );

  const isVideo = (url) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='text-sm text-gray-500 mb-6'>
        <Link to='/' className='hover:underline text-gray-500'>
          Home
        </Link>{' '}
        /{' '}
        <Link to='/listings' className='hover:underline text-gray-500'>
          Listings
        </Link>{' '}
        / <span>Search Results / </span>
        <span className='font-bold text-black'>{listing.formData.title}</span>
      </div>

      <div className='flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8'>
        {listing.formData.media && listing.formData.media.length > 1 && (
          <div className='flex flex-col space-y-3'>
            {listing.formData.media.map((mediaUrl, index) =>
              isVideo(mediaUrl) ? (
                <video
                  key={index}
                  src={`${apiHost}${mediaUrl}`}
                  className='w-[108px] h-[106px] object-cover rounded-lg cursor-pointer'
                  onMouseEnter={() => setMainImage(mediaUrl)}
                />
              ) : (
                <img
                  key={index}
                  src={`${apiHost}${mediaUrl}`}
                  alt={`Thumbnail ${index + 1}`}
                  className='w-[108px] h-[106px] object-cover rounded-lg cursor-pointer'
                  onMouseEnter={() => setMainImage(mediaUrl)}
                />
              )
            )}
          </div>
        )}

        {mainImage && (
          <div className='w-full lg:w-1/3'>
            {isVideo(mainImage) ? (
              <video
                src={`${apiHost}${mainImage}`}
                controls
                className='w-[450px] h-[456px] object-cover rounded-lg'
              />
            ) : (
              <img
                src={`${apiHost}${mainImage}`}
                alt='Main Product'
                className='w-[450px] h-[456px] object-cover rounded-lg'
              />
            )}
          </div>
        )}

        <div className='flex-grow'>
          <div className='flex items-center justify-between mb-4'>
            {listing.formData.location && (
              <div className='flex items-center'>
                <img
                  width='20'
                  height='20'
                  src='https://img.icons8.com/color/96/marker--v1.png'
                  alt='Location icon'
                  className='mr-2'
                />
                <span className='font-bold'>{listing.formData.location}</span>
              </div>
            )}
            <button className='text-sm text-gray-600 font-bold flex items-center space-x-1'>
              <BiSolidHeart className='text-gray-300 text-lg' />
              <span>Save</span>
            </button>
          </div>
          <div className='flex justify-between items-start mb-4'>
            <h1 className='text-3xl font-bold font-mochiy'>
              {listing.formData.title}
            </h1>
          </div>

          <div className='flex items-center space-x-6 mb-6'>
            {listing.formData.perBag && (
              <div className='flex items-center text-black text-lg'>
                <img
                  src='https://img.icons8.com/color/96/peso-symbol.png'
                  alt='Peso'
                  className='h-10 w-10 mr-1'
                />
                <span className='font-bold'>
                  Per bag: {listing.formData.perBag}
                </span>
              </div>
            )}

            {listing.formData.bag && (
              <div className='flex items-center text-black text-lg'>
                <GiWeight className='mr-1 text-4xl text-[#9FA8DA]' />
                <span className='font-bold'>Bag: {listing.formData.bag}</span>
              </div>
            )}
          </div>

          <div className='flex items-center space-x-4 mb-6'>
            <FaUserCircle className='w-12 h-12 text-gray-400 rounded-full' />
            <div>
              <h3 className='font-bold'>{`${listing.User.firstName} ${listing.User.lastName}`}</h3>
              <div className='flex items-center text-sm text-black'>
                <BsStarFill className='mr-1 text-lg text-[#FDC611]' />
                <span className='font-bold'>5.0</span>
              </div>
            </div>
          </div>

          {listing.formData.paymentMethods && (
            <div className='mb-6 flex items-center'>
              <h4 className='font-bold text-gray-700 mr-2'>User Accepts:</h4>
              <div className='flex space-x-2'>
                {listing.formData.paymentMethods &&
                  listing.formData.paymentMethods.includes('cash') && (
                    <img
                      src='https://img.icons8.com/color/27/get-cash.png'
                      alt='Cash'
                      className='h-6 w-6'
                    />
                  )}
                {listing.formData.paymentMethods &&
                  listing.formData.paymentMethods.includes('gcash') && (
                    <img src={gcashImg} alt='GCash' className='h-6 w-6' />
                  )}
                {listing.formData.paymentMethods &&
                  listing.formData.paymentMethods.includes('maya') && (
                    <img src={mayaImg} alt='Maya' className='h-6 w-6' />
                  )}
                {listing.formData.paymentMethods &&
                  listing.formData.paymentMethods.includes('creditCard') && (
                    <>
                      <img
                        src='https://img.icons8.com/color/48/visa.png'
                        alt='Visa'
                        className='h-6 w-6'
                      />
                      <img
                        src='https://img.icons8.com/color/48/mastercard.png'
                        alt='Mastercard'
                        className='h-6 w-6'
                      />
                    </>
                  )}
              </div>
            </div>
          )}

          {listing.formData.description && (
            <div className='mb-6'>
              <p className='text-gray-600'>
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description}
              </p>
            </div>
          )}

          <div className='flex items-center justify-between'>
            <button className='bg-[#5EA91E] text-white py-2 px-6 rounded-full font-semibold hover:bg-[#639E3B] transition'>
              Make an Offer
            </button>
            <div className='flex items-center gap-2'>
              <BsFacebook className='text-4xl text-gray-600 hover:text-gray-800 cursor-pointer' />
              <FaSquareXTwitter className='text-4xl text-gray-600 hover:text-gray-800 cursor-pointer' />
              <BsInstagram className='text-4xl text-gray-600 hover:text-gray-800 cursor-pointer' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
