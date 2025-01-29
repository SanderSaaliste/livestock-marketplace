import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidHeart } from 'react-icons/bi';
import { BsFacebook, BsInstagram, BsStarFill } from 'react-icons/bs';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';
import { FcMoneyTransfer } from 'react-icons/fc';

import gcashImg from '../../assets/gcash icon appstore.webp';
import mayaImg from '../../assets/maya icon.webp';
import { apiHost } from '../../constants';
import { formatQuantity } from '../../utils/text';

const ListingDetails = ({ listing, descriptionRef }) => {
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

      <div className='flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-5'>
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
                className='w-[416px] h-[459px] object-cover rounded-lg'
              />
            ) : (
              <img
                src={`${apiHost}${mainImage}`}
                alt='Main Product'
                className='w-[416px] h-[459px] object-cover rounded-lg'
              />
            )}
          </div>
        )}

        <div className='flex-grow'>
          <div className='flex items-center justify-between mb-2 ml-4'>
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

          <div
            className='flex justify-between items-start mb-2 ml-4'
            style={{ width: '642px', height: '87px', overflow: 'hidden' }}
          >
            <h1 className='text-3xl font-bold font-mochiy'>
              {(() => {
                const prefix =
                  listing.formData.jobType === 'Offering'
                    ? 'Offering: '
                    : listing.formData.jobType === 'Jobseeker'
                    ? 'Wanted: '
                    : '';

                const maxLength = 66;
                const availableSpace = maxLength - prefix.length;
                const trimmedTitle =
                  listing.formData.title.length > availableSpace
                    ? `${listing.formData.title.substring(
                        0,
                        availableSpace
                      )}...`
                    : listing.formData.title;

                return `${prefix}${trimmedTitle}`;
              })()}
            </h1>
          </div>

          <div className='flex items-center space-x-6 mb-4 ml-4'>
            {listing.selectedCategory === 'Livestock' &&
              listing.selectedSubcategory === 'Eggs' && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-12 w-12 mr-2'
                  />
                  <select
                    className='w-full md:[w-auto] rounded-md px-2 py-2 text-lg text-black font-bold'
                    defaultValue=''
                  >
                    <option value='' disabled>
                      Select size
                    </option>
                    {[
                      {
                        label: 'PW',
                        value: formatQuantity(listing.formData.pwPrice),
                      },
                      {
                        label: 'XS',
                        value: formatQuantity(listing.formData.xsPrice),
                      },
                      {
                        label: 'S',
                        value: formatQuantity(listing.formData.sPrice),
                      },
                      {
                        label: 'M',
                        value: formatQuantity(listing.formData.mPrice),
                      },
                      {
                        label: 'L',
                        value: formatQuantity(listing.formData.lPrice),
                      },
                      {
                        label: 'XL',
                        value: formatQuantity(listing.formData.xlPrice),
                      },
                      {
                        label: 'Jumbo',
                        value: formatQuantity(listing.formData.jumboPrice),
                      },
                      {
                        label: 'Dirty',
                        value: formatQuantity(listing.formData.dirtyPrice),
                      },
                    ].map(
                      (option) =>
                        option.value && (
                          <option key={option.label} value={option.value}>
                            {option.label}: {option.value}
                          </option>
                        )
                    )}
                  </select>
                </div>
              )}

            {listing.selectedCategory === 'Livestock' &&
              listing.selectedSubcategory !== 'Eggs' && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-12 w-12 mr-2'
                  />
                  <div>
                    <p className='text-lg font-bold text-gray-600'>
                      Price: {formatQuantity(listing.formData.avgPricePerHead)}
                    </p>
                    <p className='text-sm font-semibold text-gray-600'>
                      Per/kg: {formatQuantity(listing.formData.pricePerKg)}
                    </p>
                  </div>

                  <img
                    src='https://img.icons8.com/color/96/weight-kg.png'
                    alt='Price'
                    className='h-12 w-12 mr-2 ml-10'
                  />
                  <div>
                    <p className='text-lg font-bold text-gray-600'>
                      Avg head:{' '}
                      {formatQuantity(listing.formData.avgWeightPerHead)}kg
                    </p>
                    <p className='text-sm font-semibold text-gray-600'>
                      Total: {formatQuantity(listing.formData.totalWeight)}kg
                    </p>
                  </div>
                </div>
              )}

            {listing.selectedCategory === 'Vehicles' &&
              listing.selectedSubcategory === 'Motorcycles and ATVs' && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-12 w-12 mr-2'
                  />
                  <p className='text-lg font-bold text-gray-600'>
                    Price: {formatQuantity(listing.formData.totalPrice)}
                  </p>
                </div>
              )}

            {listing.selectedCategory === 'Vehicles' &&
              listing.selectedSubcategory !== 'Motorcycles and ATVs' && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-12 w-12 mr-2'
                  />
                  <p className='text-lg font-bold text-gray-600'>
                    Price: {formatQuantity(listing.formData.totalPrice)}
                  </p>
                </div>
              )}

            {listing.selectedCategory === 'Services / Jobs' && (
              <div className='flex items-center'>
                <img
                  src='https://img.icons8.com/color/96/peso-symbol.png'
                  alt='Price'
                  className='h-12 w-12 mr-2'
                />
                <p className='text-lg font-bold text-gray-600'>
                  Hourly:{' '}
                  {formatQuantity(
                    listing.formData.hourlyRate ||
                      listing.formData.preferredHourlyRate
                  )}
                </p>
              </div>
            )}

            {listing.selectedCategory === 'Real Estate' && (
              <div className='flex items-center'>
                <img
                  src='https://img.icons8.com/color/96/peso-symbol.png'
                  alt='Price'
                  className='h-12 w-12 mr-2'
                />
                <p className='text-lg font-bold text-gray-600'>
                  Price: {formatQuantity(listing.formData.totalPrice)}
                </p>
              </div>
            )}

            {listing.selectedCategory === 'Heavy Equipment' && (
              <div className='flex items-center'>
                <img
                  src='https://img.icons8.com/color/96/peso-symbol.png'
                  alt='Price'
                  className='h-12 w-12 mr-2'
                />
                <p className='text-lg font-bold text-gray-600'>
                  Price: {formatQuantity(listing.formData.totalPrice)}
                </p>
              </div>
            )}

            {listing.selectedCategory === 'Aquaculture' &&
              listing.selectedSubcategory === 'Boats (Bangka/Banca)' && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-12 w-12 mr-2'
                  />
                  <p className='text-lg font-bold text-gray-600'>
                    Price: {formatQuantity(listing.formData.totalPrice)}
                  </p>
                </div>
              )}

            {listing.selectedCategory === 'Aquaculture' &&
              listing.selectedSubcategory !== 'Boats (Bangka/Banca)' && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-12 w-12 mr-2'
                  />
                  <p className='text-lg font-bold text-gray-600'>
                    Price: {formatQuantity(listing.formData.totalPrice)}
                  </p>
                </div>
              )}

            {listing.selectedCategory === 'Tools' && (
              <div className='flex items-center'>
                <img
                  src='https://img.icons8.com/color/96/peso-symbol.png'
                  alt='Price'
                  className='h-12 w-12 mr-2'
                />
                <p className='text-lg font-bold text-gray-600'>
                  Price: {formatQuantity(listing.formData.totalPrice)}
                </p>
              </div>
            )}

            {listing.selectedCategory === 'Home & Garden' && (
              <div className='flex items-center'>
                <img
                  src='https://img.icons8.com/color/96/peso-symbol.png'
                  alt='Price'
                  className='h-12 w-12 mr-2'
                />
                <p className='text-lg font-bold text-gray-600'>
                  Price: {formatQuantity(listing.formData.totalPrice)}
                </p>
              </div>
            )}

            {listing.selectedCategory === 'Animal Feed' &&
              (listing.selectedSubcategory === 'Hay and Silage' ||
                listing.selectedSubcategory === 'Pellets' ||
                listing.selectedSubcategory === 'Grains') && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-12 w-12 mr-2'
                  />
                  <div>
                    <p className='text-lg font-bold text-gray-600'>
                      MOQ Price: {formatQuantity(listing.formData.productPrice)}
                    </p>
                    <p className='text-sm font-semibold text-gray-600'>
                      Per/kg: {formatQuantity(listing.formData.pricePerKg)}
                    </p>
                  </div>

                  <img
                    src='https://img.icons8.com/color/96/weight-kg.png'
                    alt='Price'
                    className='h-12 w-12 mr-2 ml-10'
                  />
                  <div>
                    <p className='text-lg font-bold text-gray-600'>
                      MOQ: {formatQuantity(listing.formData.productWeight)}kg
                    </p>
                  </div>
                </div>
              )}

            {listing.selectedCategory === 'Animal Feed' &&
              listing.selectedSubcategory !== 'Hay and Silage' &&
              listing.selectedSubcategory !== 'Pellets' &&
              listing.selectedSubcategory !== 'Grains' && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-12 w-12 mr-2'
                  />
                  <div>
                    <p className='text-lg font-bold text-gray-600'>
                      Per bag: {formatQuantity(listing.formData.pricePerBag)}
                    </p>
                  </div>

                  <img
                    src='https://img.icons8.com/color/96/weight-kg.png'
                    alt='Price'
                    className='h-12 w-12 mr-2 ml-10'
                  />
                  <div>
                    <p className='text-lg font-bold text-gray-600'>
                      Bag: {formatQuantity(listing.formData.feedBagWeight)}kg
                    </p>
                  </div>
                </div>
              )}

            {listing.selectedCategory === 'Fertilizers' && (
              <div className='flex items-center'>
                <img
                  src='https://img.icons8.com/color/96/peso-symbol.png'
                  alt='Price'
                  className='h-12 w-12 mr-2'
                />
                <div>
                  <p className='text-lg font-bold text-gray-600'>
                    MOQ Price: {formatQuantity(listing.formData.productPrice)}
                  </p>
                  <p className='text-sm font-semibold text-gray-600'>
                    Per/kg: {formatQuantity(listing.formData.pricePerKg)}
                  </p>
                </div>

                <img
                  src='https://img.icons8.com/color/96/weight-kg.png'
                  alt='Price'
                  className='h-12 w-12 mr-2 ml-10'
                />
                <div>
                  <p className='text-lg font-bold text-gray-600'>
                    MOQ: {formatQuantity(listing.formData.productWeight)}kg
                  </p>
                </div>
              </div>
            )}

            {listing.selectedCategory === 'Fruits, Vegetables & Growables' &&
              (listing.selectedSubcategory === 'Mango' ||
                listing.selectedSubcategory === 'Banana') && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-12 w-12 mr-2'
                  />
                  <div>
                    <p className='text-lg font-bold text-gray-600'>
                      MOQ Price: {formatQuantity(listing.formData.productPrice)}
                    </p>
                    <p className='text-sm font-semibold text-gray-600'>
                      Per/kg: {formatQuantity(listing.formData.pricePerKg)}
                    </p>
                  </div>

                  <img
                    src='https://img.icons8.com/color/96/weight-kg.png'
                    alt='Price'
                    className='h-12 w-12 mr-2 ml-10'
                  />
                  <div>
                    <p className='text-lg font-bold text-gray-600'>
                      MOQ: {formatQuantity(listing.formData.weight)}kg
                    </p>
                  </div>
                </div>
              )}

            {listing.selectedCategory === 'Fruits, Vegetables & Growables' &&
              listing.selectedSubcategory !== 'Mango' &&
              listing.selectedSubcategory !== 'Banana' && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-12 w-12 mr-2'
                  />
                  <div>
                    <p className='text-lg font-bold text-gray-600'>
                      MOQ Price: {formatQuantity(listing.formData.productPrice)}
                    </p>
                    <p className='text-sm font-semibold text-gray-600'>
                      Per/kg: {formatQuantity(listing.formData.pricePerKg)}
                    </p>
                  </div>

                  <img
                    src='https://img.icons8.com/color/96/weight-kg.png'
                    alt='Price'
                    className='h-12 w-12 mr-2 ml-10'
                  />
                  <div>
                    <p className='text-lg font-bold text-gray-600'>
                      MOQ: {formatQuantity(listing.formData.productWeight)}kg
                    </p>
                  </div>
                </div>
              )}

            {listing.selectedCategory === 'Seeds' && (
              <div className='flex items-center'>
                <img
                  src='https://img.icons8.com/color/96/peso-symbol.png'
                  alt='Price'
                  className='h-12 w-12 mr-2'
                />
                <div>
                  <p className='text-lg font-bold text-gray-600'>
                    MOQ Price: {formatQuantity(listing.formData.productPrice)}
                  </p>
                  <p className='text-sm font-semibold text-gray-600'>
                    Per/kg: {formatQuantity(listing.formData.pricePerKg)}
                  </p>
                </div>

                <img
                  src='https://img.icons8.com/color/96/weight-kg.png'
                  alt='Price'
                  className='h-12 w-12 mr-2 ml-10'
                />
                <div>
                  <p className='text-lg font-bold text-gray-600'>
                    MOQ: {formatQuantity(listing.formData.productWeight)}kg
                  </p>
                </div>
              </div>
            )}

            {listing.selectedCategory === 'Building Materials' && (
              <div className='flex items-center'>
                <img
                  src='https://img.icons8.com/color/96/peso-symbol.png'
                  alt='Price'
                  className='h-12 w-12 mr-2'
                />
                <p className='text-lg font-bold text-gray-600'>
                  Price: {formatQuantity(listing.formData.totalPrice)}
                </p>
              </div>
            )}

            {listing.selectedCategory === 'Others' && (
              <div className='flex items-center'>
                <img
                  src='https://img.icons8.com/color/96/peso-symbol.png'
                  alt='Price'
                  className='h-12 w-12 mr-2'
                />
                <p className='text-lg font-bold text-gray-600'>
                  Price: {formatQuantity(listing.formData.totalPrice)}
                </p>
              </div>
            )}
          </div>

          <div className='flex items-center space-x-4 mb-4 ml-4'>
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
            <div className='mb-4 ml-4 flex items-center'>
              <h4 className='font-bold text-gray-700 mr-2'>User Accepts:</h4>
              <div className='flex space-x-2'>
                {listing.formData.paymentMethods &&
                  listing.formData.paymentMethods.includes('cash') && (
                    <FcMoneyTransfer className='h-6 w-6' />
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
                    <img
                      src='https://img.icons8.com/color/48/visa.png'
                      alt='Visa'
                      className='h-6 w-6'
                    />
                  )}
              </div>
            </div>
          )}

          {listing.formData.description && (
            <div
              className='mb-4 ml-4'
              style={{ width: '642px', height: '96px', overflow: 'hidden' }}
            >
              <p className='text-gray-600'>
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description.length > 250 ? (
                  <>
                    {`${listing.formData.description.substring(0, 250)}... `}
                    <button
                      onClick={() =>
                        descriptionRef.current.scrollIntoView({
                          behavior: 'smooth',
                        })
                      }
                      className='text-blue-500 underline'
                    >
                      Read more
                    </button>
                  </>
                ) : (
                  listing.formData.description
                )}
              </p>
            </div>
          )}

          {listing.formData.jobDescription && (
            <div
              className='mb-4 ml-4'
              style={{ width: '642px', height: '96px', overflow: 'hidden' }}
            >
              <p className='text-gray-600'>
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.jobDescription.length > 250 ? (
                  <>
                    {`${listing.formData.jobDescription.substring(0, 250)}... `}
                    <button
                      onClick={() =>
                        descriptionRef.current.scrollIntoView({
                          behavior: 'smooth',
                        })
                      }
                      className='text-blue-500 underline'
                    >
                      Read more
                    </button>
                  </>
                ) : (
                  listing.formData.jobDescription
                )}
              </p>
            </div>
          )}

          {listing.formData.selfDescription && (
            <div
              className='mb-4 ml-4'
              style={{ width: '642px', height: '96px', overflow: 'hidden' }}
            >
              <p className='text-gray-600'>
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.selfDescription.length > 250 ? (
                  <>
                    {`${listing.formData.selfDescription.substring(
                      0,
                      250
                    )}... `}
                    <button
                      onClick={() =>
                        descriptionRef.current.scrollIntoView({
                          behavior: 'smooth',
                        })
                      }
                      className='text-blue-500 underline'
                    >
                      Read more
                    </button>
                  </>
                ) : (
                  listing.formData.selfDescription
                )}
              </p>
            </div>
          )}

          <div className='flex items-center justify-between ml-4'>
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
