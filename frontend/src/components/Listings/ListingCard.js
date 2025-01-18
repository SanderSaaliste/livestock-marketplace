import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidHeart } from 'react-icons/bi';
import { PiCowLight, PiEngineFill } from 'react-icons/pi';
import {
  GiWeight,
  GiFruitBowl,
  GiCardboardBoxClosed,
  GiSailboat,
  GiFamilyHouse,
  GiGearStickPattern,
} from 'react-icons/gi';
import {
  FaCreditCard,
  FaLocationDot,
  FaCalendarCheck,
  FaClock,
} from 'react-icons/fa6';
import { BsFillLightningFill, BsFillFuelPumpFill } from 'react-icons/bs';
import { IoBed, IoSpeedometer } from 'react-icons/io5';
import { HiOutlineArrowsExpand } from 'react-icons/hi';
import { RxTransparencyGrid } from 'react-icons/rx';
import { GrUserWorker } from 'react-icons/gr';
import { TbEggs } from 'react-icons/tb';

import gcashImg from '../../assets/gcash icon appstore.webp';
import mayaImg from '../../assets/maya icon.webp';
import { apiHost } from '../../constants';

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`sm:min-w-[350px] md:min-w-[375px] lg:min-w-[400px] max-w-sm bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-2 flex flex-col h-full relative ${
        listing.formData.salesStatus === 'Sold' ||
        listing.formData.salesStatus === 'Inactive'
          ? 'opacity-50'
          : ''
      }`}
    >
      <div className='relative rounded-lg overflow-hidden h-48'>
        {listing.formData.media && listing.formData.media.length > 0 && (
          <img
            src={`${apiHost}${listing.formData.media[0]}`}
            alt={listing.formData.title}
            className='w-full h-full object-cover'
          />
        )}
        <span
          className={`absolute top-3 left-3 text-sm font-bold px-3 py-2 rounded-md shadow-md text-black ${
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
              : 'bg-[#DDECCB]'
          }`}
        >
          {listing.formData.salesStatus || 'For Sale'}
        </span>
      </div>

      <div className='mt-4 flex-grow'>
        <h3 className='text-base font-bold mb-4'>
          {listing.formData.jobType === 'Offering' && 'Offering: '}
          {listing.formData.jobType === 'Jobseeker' && 'Wanted: '}
          {listing.formData.title.length > 70
            ? `${listing.formData.title.substring(0, 70)}...`
            : listing.formData.title}
        </h3>

        {listing.selectedCategory === 'Livestock' &&
          listing.selectedSubcategory === 'Eggs' && (
            <>
              <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
                {listing.formData.paymentMethods && (
                  <>
                    <div className='flex items-center'>
                      <FaCreditCard className='mr-2 text-gray-500' />
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
                        listing.formData.paymentMethods.includes(
                          'creditCard'
                        ) && (
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
                    <FaLocationDot className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.location}</span>
                  </div>
                )}

                {listing.formData.minOrder && (
                  <div className='flex items-center'>
                    <TbEggs className='mr-2 text-lg text-gray-500' />
                    <span>MOQ:</span>
                    <span className='ml-1'>{listing.formData.minOrder}</span>
                  </div>
                )}

                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-5 w-5'
                  />
                  <select
                    className='w-full md:[w-auto] rounded-md px-2 py-2 text-black font-bold'
                    defaultValue=''
                  >
                    <option value='' disabled>
                      Select size
                    </option>
                    {[
                      { label: 'PW', value: listing.formData.pwPrice },
                      { label: 'XS', value: listing.formData.xsPrice },
                      { label: 'S', value: listing.formData.sPrice },
                      { label: 'M', value: listing.formData.mPrice },
                      { label: 'L', value: listing.formData.lPrice },
                      { label: 'XL', value: listing.formData.xlPrice },
                      { label: 'Jumbo', value: listing.formData.jumboPrice },
                      { label: 'Dirty', value: listing.formData.dirtyPrice },
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
              </div>
            </>
          )}

        {listing.selectedCategory === 'Livestock' &&
          listing.selectedSubcategory !== 'Eggs' && (
            <>
              <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
                {listing.formData.paymentMethods && (
                  <>
                    <div className='flex items-center'>
                      <FaCreditCard className='mr-2 text-gray-500' />
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
                        listing.formData.paymentMethods.includes(
                          'creditCard'
                        ) && (
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
                    <FaLocationDot className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.location}</span>
                  </div>
                )}

                {listing.formData.quantity && (
                  <div className='flex items-center'>
                    <PiCowLight className='mr-2 text-lg text-gray-500' />
                    <span>Quantity:</span>
                    <span className='ml-1'>{listing.formData.quantity}</span>
                  </div>
                )}

                {listing.formData.avgWeightPerHead && (
                  <div className='flex items-center'>
                    <GiWeight className='mr-2 text-lg text-gray-500' />
                    <span>Avg head:</span>
                    <span className='ml-1'>
                      {listing.formData.avgWeightPerHead}
                    </span>
                  </div>
                )}

                {listing.formData.totalWeight && (
                  <div className='flex items-center'>
                    <GiWeight className='mr-2 text-lg text-gray-500' />
                    <span>Total:</span>
                    <span className='ml-1'>{listing.formData.totalWeight}</span>
                  </div>
                )}

                {listing.formData.avgPricePerHead && (
                  <div className='flex items-center'>
                    <img
                      src='https://img.icons8.com/color/96/peso-symbol.png'
                      alt='Price'
                      className='h-5 w-5 mr-2'
                    />
                    <span>Head:</span>
                    <span className='font-bold text-black ml-1'>
                      {listing.formData.avgPricePerHead}
                    </span>
                  </div>
                )}

                {listing.formData.pricePerKg && (
                  <div className='flex items-center'>
                    <img
                      src='https://img.icons8.com/color/96/peso-symbol.png'
                      alt='Price'
                      className='h-5 w-5 mr-2'
                    />
                    <span>Per/kg:</span>
                    <span className='font-bold text-black ml-1'>
                      {listing.formData.pricePerKg}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

        {listing.selectedCategory === 'Vehicles' &&
          listing.selectedSubcategory === 'Motorcycles and ATVs' && (
            <>
              <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
                {listing.formData.paymentMethods && (
                  <>
                    <div className='flex items-center'>
                      <FaCreditCard className='mr-2 text-gray-500' />
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
                        listing.formData.paymentMethods.includes(
                          'creditCard'
                        ) && (
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
                    <FaLocationDot className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.location}</span>
                  </div>
                )}

                {listing.formData.year && (
                  <div className='flex items-center'>
                    <FaCalendarCheck className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.year}</span>
                  </div>
                )}

                {listing.formData.mileage && (
                  <div className='flex items-center'>
                    <IoSpeedometer className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.mileage}</span>
                  </div>
                )}

                {listing.formData.engineType && (
                  <div className='flex items-center'>
                    <PiEngineFill className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.engineType}</span>
                  </div>
                )}

                {listing.formData.totalPrice && (
                  <div className='flex items-center'>
                    <img
                      src='https://img.icons8.com/color/96/peso-symbol.png'
                      alt='Price'
                      className='h-5 w-5 mr-2'
                    />
                    <span>Price:</span>
                    <span className='font-bold text-black ml-1'>
                      {listing.formData.totalPrice}
                    </span>
                  </div>
                )}

                {listing.formData.transmission && (
                  <div className='flex items-center'>
                    <GiGearStickPattern className='mr-2 text-lg text-gray-500' />
                    <span className='ml-1'>
                      {listing.formData.transmission}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

        {listing.selectedCategory === 'Vehicles' &&
          listing.selectedSubcategory !== 'Motorcycles and ATVs' && (
            <>
              <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
                {listing.formData.paymentMethods && (
                  <>
                    <div className='flex items-center'>
                      <FaCreditCard className='mr-2 text-gray-500' />
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
                        listing.formData.paymentMethods.includes(
                          'creditCard'
                        ) && (
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
                    <FaLocationDot className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.location}</span>
                  </div>
                )}

                {listing.formData.year && (
                  <div className='flex items-center'>
                    <FaCalendarCheck className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.year}</span>
                  </div>
                )}

                {listing.formData.mileage && (
                  <div className='flex items-center'>
                    <IoSpeedometer className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.mileage}</span>
                  </div>
                )}

                {listing.formData.engineType && (
                  <div className='flex items-center'>
                    <PiEngineFill className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.engineType}</span>
                  </div>
                )}

                {listing.formData.totalPrice && (
                  <div className='flex items-center'>
                    <img
                      src='https://img.icons8.com/color/96/peso-symbol.png'
                      alt='Price'
                      className='h-5 w-5 mr-2'
                    />
                    <span>Price:</span>
                    <span className='font-bold text-black ml-1'>
                      {listing.formData.totalPrice}
                    </span>
                  </div>
                )}

                {listing.formData.transmission && (
                  <div className='flex items-center'>
                    <GiGearStickPattern className='mr-2 text-lg text-gray-500' />
                    <span className='ml-1'>
                      {listing.formData.transmission}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

        {listing.selectedCategory === 'Services / Jobs' && (
          <>
            <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
              {listing.formData.jobType === 'Offering' &&
                listing.formData.position && (
                  <div className='flex items-center'>
                    <GrUserWorker className='mr-2 text-lg text-gray-500' />
                    <span>Position:</span>
                    <span className='ml-1'>{listing.formData.position}</span>
                  </div>
                )}

              {listing.formData.jobType === 'Jobseeker' &&
                listing.formData.profession && (
                  <div className='flex items-center'>
                    <GrUserWorker className='mr-2 text-lg text-gray-500' />
                    <span>Profession:</span>
                    <span className='ml-1'>{listing.formData.profession}</span>
                  </div>
                )}

              {listing.formData.location && (
                <div className='flex items-center'>
                  <FaLocationDot className='mr-2 text-lg text-gray-500' />
                  <span>{listing.formData.location}</span>
                </div>
              )}

              {listing.formData.jobType === 'Offering' &&
                listing.formData.hourlyRate && (
                  <div className='flex items-center'>
                    <img
                      src='https://img.icons8.com/color/96/peso-symbol.png'
                      alt='Price'
                      className='h-5 w-5 mr-2'
                    />
                    <span>Hourly:</span>
                    <span className='font-bold text-black ml-1'>
                      {listing.formData.hourlyRate}
                    </span>
                  </div>
                )}

              {listing.formData.jobType === 'Jobseeker' &&
                listing.formData.preferredHourlyRate && (
                  <div className='flex items-center'>
                    <img
                      src='https://img.icons8.com/color/96/peso-symbol.png'
                      alt='Price'
                      className='h-5 w-5 mr-2'
                    />
                    <span>Hourly:</span>
                    <span className='font-bold text-black ml-1'>
                      {listing.formData.preferredHourlyRate}
                    </span>
                  </div>
                )}
            </div>

            {listing.formData.jobType === 'Offering' &&
              listing.formData.jobDescription && (
                <div className='text-gray-600 text-sm mt-4'>
                  <span className='font-bold text-gray-700 mr-1'>
                    Description:
                  </span>
                  {listing.formData.jobDescription.length > 150 ? (
                    <>
                      {`${listing.formData.jobDescription.substring(
                        0,
                        150
                      )}... `}
                      <button
                        onClick={() => navigate(`listing/${listing.id}`)}
                        className='text-blue-500 underline'
                      >
                        Read more
                      </button>
                    </>
                  ) : (
                    listing.formData.jobDescription
                  )}
                </div>
              )}

            {listing.formData.jobType === 'Jobseeker' &&
              listing.formData.selfDescription && (
                <div className='text-gray-600 text-sm mt-4'>
                  <span className='font-bold text-gray-700 mr-1'>
                    Description:
                  </span>
                  {listing.formData.selfDescription.length > 150 ? (
                    <>
                      {`${listing.formData.selfDescription.substring(
                        0,
                        150
                      )}... `}
                      <button
                        onClick={() => navigate(`listing/${listing.id}`)}
                        className='text-blue-500 underline'
                      >
                        Read more
                      </button>
                    </>
                  ) : (
                    listing.formData.selfDescription
                  )}
                </div>
              )}
          </>
        )}

        {listing.selectedCategory === 'Real Estate' && (
          <>
            <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
              {listing.formData.location && (
                <div className='flex items-center'>
                  <FaLocationDot className='mr-2 text-lg text-gray-500' />
                  <span>{listing.formData.location}</span>
                </div>
              )}

              {listing.formData.bedrooms && (
                <div className='flex items-center'>
                  <IoBed className='mr-2 text-lg text-gray-500' />
                  <span>Bedroom:</span>
                  <span className='ml-1'>{listing.formData.bedrooms}</span>
                </div>
              )}

              {listing.formData.interiorSize && (
                <div className='flex items-center'>
                  <GiFamilyHouse className='mr-2 text-lg text-gray-500' />
                  <span>Interior:</span>
                  <span className='ml-1'>{listing.formData.interiorSize}</span>
                </div>
              )}

              {listing.formData.landSize && (
                <div className='flex items-center'>
                  <HiOutlineArrowsExpand className='mr-2 text-lg text-gray-500' />
                  <span>Land:</span>
                  <span className='ml-1'>{listing.formData.landSize}</span>
                </div>
              )}

              {listing.formData.totalPrice && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-5 w-5 mr-2'
                  />
                  <span>Price:</span>
                  <span className='font-bold text-black ml-1'>
                    {listing.formData.totalPrice}
                  </span>
                </div>
              )}

              {listing.formData.lotNumber && (
                <div className='flex items-center'>
                  <RxTransparencyGrid className='mr-2 text-lg text-gray-500' />
                  <span>Lot no:</span>
                  <span className='ml-1'>{listing.formData.lotNumber}</span>
                </div>
              )}
            </div>

            {listing.formData.description && (
              <div className='text-gray-600 text-sm mt-4'>
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description.length > 150 ? (
                  <>
                    {`${listing.formData.description.substring(0, 150)}... `}
                    <button
                      onClick={() => navigate(`listing/${listing.id}`)}
                      className='text-blue-500 underline'
                    >
                      Read more
                    </button>
                  </>
                ) : (
                  listing.formData.description
                )}
              </div>
            )}
          </>
        )}

        {listing.selectedCategory === 'Heavy Equipment' && (
          <>
            <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
              {listing.formData.paymentMethods && (
                <>
                  <div className='flex items-center'>
                    <FaCreditCard className='mr-2 text-gray-500' />
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
                      listing.formData.paymentMethods.includes(
                        'creditCard'
                      ) && (
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
                  <FaLocationDot className='mr-2 text-lg text-gray-500' />
                  <span>{listing.formData.location}</span>
                </div>
              )}

              {listing.formData.manufacturingYear && (
                <div className='flex items-center'>
                  <FaCalendarCheck className='mr-2 text-lg text-gray-500' />
                  <span>{listing.formData.manufacturingYear}</span>
                </div>
              )}

              {listing.formData.workingHours && (
                <div className='flex items-center'>
                  <FaClock className='mr-2 text-lg text-gray-500' />
                  <span>Hours:</span>
                  <span className='ml-1'>{listing.formData.workingHours}</span>
                </div>
              )}

              {listing.formData.horsepower && (
                <div className='flex items-center'>
                  <BsFillLightningFill className='mr-2 text-lg text-gray-500' />
                  <span>{listing.formData.horsepower}</span>
                </div>
              )}

              {listing.formData.totalPrice && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-5 w-5 mr-2'
                  />
                  <span>Price:</span>
                  <span className='font-bold text-black ml-1'>
                    {listing.formData.totalPrice}
                  </span>
                </div>
              )}

              {listing.formData.fuelConsumption && (
                <div className='flex items-center'>
                  <BsFillFuelPumpFill className='mr-2 text-lg text-gray-500' />
                  <span className='ml-1'>
                    {listing.formData.fuelConsumption}
                  </span>
                </div>
              )}
            </div>
          </>
        )}

        {listing.selectedCategory === 'Aquaculture' &&
          listing.selectedSubcategory === 'Boats (Bangka/Banca)' && (
            <>
              <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
                {listing.formData.paymentMethods && (
                  <>
                    <div className='flex items-center'>
                      <FaCreditCard className='mr-2 text-gray-500' />
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
                        listing.formData.paymentMethods.includes(
                          'creditCard'
                        ) && (
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
                    <FaLocationDot className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.location}</span>
                  </div>
                )}

                {listing.formData.manufacturingYear && (
                  <div className='flex items-center'>
                    <FaCalendarCheck className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.manufacturingYear}</span>
                  </div>
                )}

                {listing.formData.boatLength && (
                  <div className='flex items-center'>
                    <GiSailboat className='mr-2 text-lg text-gray-500' />
                    <span>Length:</span>
                    <span className='ml-1'>{listing.formData.boatLength}</span>
                  </div>
                )}

                {listing.formData.horsepower && (
                  <div className='flex items-center'>
                    <BsFillLightningFill className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.horsepower}</span>
                  </div>
                )}

                {listing.formData.totalPrice && (
                  <div className='flex items-center'>
                    <img
                      src='https://img.icons8.com/color/96/peso-symbol.png'
                      alt='Price'
                      className='h-5 w-5 mr-2'
                    />
                    <span>Price:</span>
                    <span className='font-bold text-black ml-1'>
                      {listing.formData.totalPrice}
                    </span>
                  </div>
                )}

                {listing.formData.boatFuel && (
                  <div className='flex items-center'>
                    <BsFillFuelPumpFill className='mr-2 text-lg text-gray-500' />
                    <span className='ml-1'>{listing.formData.boatFuel}</span>
                  </div>
                )}
              </div>
            </>
          )}

        {listing.selectedCategory === 'Aquaculture' &&
          listing.selectedSubcategory !== 'Boats (Bangka/Banca)' && (
            <>
              <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
                {listing.formData.paymentMethods && (
                  <>
                    <div className='flex items-center'>
                      <FaCreditCard className='mr-2 text-gray-500' />
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
                        listing.formData.paymentMethods.includes(
                          'creditCard'
                        ) && (
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

                {listing.formData.totalPrice && (
                  <div className='flex items-center'>
                    <img
                      src='https://img.icons8.com/color/96/peso-symbol.png'
                      alt='Price'
                      className='h-5 w-5 mr-2'
                    />
                    <span>Price:</span>
                    <span className='font-bold text-black ml-1'>
                      {listing.formData.totalPrice}
                    </span>
                  </div>
                )}
              </div>

              {listing.formData.description && (
                <div className='text-gray-600 text-sm mt-4'>
                  <span className='font-bold text-gray-700 mr-1'>
                    Description:
                  </span>
                  {listing.formData.description.length > 150 ? (
                    <>
                      {`${listing.formData.description.substring(0, 150)}... `}
                      <button
                        onClick={() => navigate(`listing/${listing.id}`)}
                        className='text-blue-500 underline'
                      >
                        Read more
                      </button>
                    </>
                  ) : (
                    listing.formData.description
                  )}
                </div>
              )}
            </>
          )}

        {listing.selectedCategory === 'Tools' && (
          <>
            <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
              {listing.formData.paymentMethods && (
                <>
                  <div className='flex items-center'>
                    <FaCreditCard className='mr-2 text-gray-500' />
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
                      listing.formData.paymentMethods.includes(
                        'creditCard'
                      ) && (
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

              {listing.formData.totalPrice && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-5 w-5 mr-2'
                  />
                  <span>Price:</span>
                  <span className='font-bold text-black ml-1'>
                    {listing.formData.totalPrice}
                  </span>
                </div>
              )}
            </div>

            {listing.formData.description && (
              <div className='text-gray-600 text-sm mt-4'>
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description.length > 150 ? (
                  <>
                    {`${listing.formData.description.substring(0, 150)}... `}
                    <button
                      onClick={() => navigate(`listing/${listing.id}`)}
                      className='text-blue-500 underline'
                    >
                      Read more
                    </button>
                  </>
                ) : (
                  listing.formData.description
                )}
              </div>
            )}
          </>
        )}

        {listing.selectedCategory === 'Home & Garden' && (
          <>
            <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
              {listing.formData.paymentMethods && (
                <>
                  <div className='flex items-center'>
                    <FaCreditCard className='mr-2 text-gray-500' />
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
                      listing.formData.paymentMethods.includes(
                        'creditCard'
                      ) && (
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

              {listing.formData.totalPrice && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-5 w-5 mr-2'
                  />
                  <span>Price:</span>
                  <span className='font-bold text-black ml-1'>
                    {listing.formData.totalPrice}
                  </span>
                </div>
              )}
            </div>

            {listing.formData.description && (
              <div className='text-gray-600 text-sm mt-4'>
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description.length > 150 ? (
                  <>
                    {`${listing.formData.description.substring(0, 150)}... `}
                    <button
                      onClick={() => navigate(`listing/${listing.id}`)}
                      className='text-blue-500 underline'
                    >
                      Read more
                    </button>
                  </>
                ) : (
                  listing.formData.description
                )}
              </div>
            )}
          </>
        )}

        {listing.selectedCategory === 'Animal Feed' &&
          (listing.selectedSubcategory === 'Hay and Silage' ||
            listing.selectedSubcategory === 'Pellets' ||
            listing.selectedSubcategory === 'Grains') && (
            <>
              <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
                {listing.formData.paymentMethods && (
                  <>
                    <div className='flex items-center'>
                      <FaCreditCard className='mr-2 text-gray-500' />
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
                        listing.formData.paymentMethods.includes(
                          'creditCard'
                        ) && (
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
                    <FaLocationDot className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.location}</span>
                  </div>
                )}

                {listing.formData.productWeight && (
                  <div className='flex items-center'>
                    <GiCardboardBoxClosed className='mr-2 text-lg text-gray-500' />
                    <span>MOQ Weight:</span>
                    <span className='ml-1'>
                      {listing.formData.productWeight}
                    </span>
                  </div>
                )}

                {listing.formData.productPrice && (
                  <div className='flex items-center'>
                    <img
                      src='https://img.icons8.com/color/96/peso-symbol.png'
                      alt='Price'
                      className='h-5 w-5 mr-2'
                    />
                    <span>MOQ Price:</span>
                    <span className='font-bold text-black ml-1'>
                      {listing.formData.productPrice}
                    </span>
                  </div>
                )}

                {listing.formData.pricePerKg && (
                  <div className='flex items-center'>
                    <img
                      src='https://img.icons8.com/color/96/peso-symbol.png'
                      alt='Price'
                      className='h-5 w-5 mr-2'
                    />
                    <span>Per kg:</span>
                    <span className='font-bold text-black ml-1'>
                      {listing.formData.pricePerKg}
                    </span>
                  </div>
                )}
              </div>

              {listing.formData.description && (
                <div className='text-gray-600 text-sm mt-4'>
                  <span className='font-bold text-gray-700 mr-1'>
                    Description:
                  </span>
                  {listing.formData.description.length > 150 ? (
                    <>
                      {`${listing.formData.description.substring(0, 150)}... `}
                      <button
                        onClick={() => navigate(`listing/${listing.id}`)}
                        className='text-blue-500 underline'
                      >
                        Read more
                      </button>
                    </>
                  ) : (
                    listing.formData.description
                  )}
                </div>
              )}
            </>
          )}

        {listing.selectedCategory === 'Animal Feed' &&
          listing.selectedSubcategory !== 'Hay and Silage' &&
          listing.selectedSubcategory !== 'Pellets' &&
          listing.selectedSubcategory !== 'Grains' && (
            <>
              <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
                {listing.formData.paymentMethods && (
                  <>
                    <div className='flex items-center'>
                      <FaCreditCard className='mr-2 text-gray-500' />
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
                        listing.formData.paymentMethods.includes(
                          'creditCard'
                        ) && (
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
                    <FaLocationDot className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.location}</span>
                  </div>
                )}

                {listing.formData.feedBagWeight && (
                  <div className='flex items-center'>
                    <GiWeight className='mr-2 text-lg text-gray-500' />
                    <span>Bag:</span>
                    <span className='ml-1'>
                      {listing.formData.feedBagWeight}
                    </span>
                  </div>
                )}

                {listing.formData.pricePerBag && (
                  <div className='flex items-center'>
                    <img
                      src='https://img.icons8.com/color/96/peso-symbol.png'
                      alt='Price'
                      className='h-5 w-5 mr-2'
                    />
                    <span>Per bag:</span>
                    <span className='font-bold text-black ml-1'>
                      {listing.formData.pricePerBag}
                    </span>
                  </div>
                )}

                {listing.formData.animalFeedType && (
                  <div className='flex items-center'>
                    <PiCowLight className='mr-2 text-lg text-gray-700' />
                    <span>{listing.formData.animalFeedType}</span>
                  </div>
                )}
              </div>

              {listing.formData.description && (
                <div className='text-gray-600 text-sm mt-4'>
                  <span className='font-bold text-gray-700 mr-1'>
                    Description:
                  </span>
                  {listing.formData.description.length > 150 ? (
                    <>
                      {`${listing.formData.description.substring(0, 150)}... `}
                      <button
                        onClick={() => navigate(`listing/${listing.id}`)}
                        className='text-blue-500 underline'
                      >
                        Read more
                      </button>
                    </>
                  ) : (
                    listing.formData.description
                  )}
                </div>
              )}
            </>
          )}

        {listing.selectedCategory === 'Fertilizers' && (
          <>
            <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
              {listing.formData.paymentMethods && (
                <>
                  <div className='flex items-center'>
                    <FaCreditCard className='mr-2 text-gray-500' />
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
                      listing.formData.paymentMethods.includes(
                        'creditCard'
                      ) && (
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
                  <FaLocationDot className='mr-2 text-lg text-gray-500' />
                  <span>{listing.formData.location}</span>
                </div>
              )}

              {listing.formData.productWeight && (
                <div className='flex items-center'>
                  <GiCardboardBoxClosed className='mr-2 text-lg text-gray-500' />
                  <span>MOQ Weight:</span>
                  <span className='ml-1'>{listing.formData.productWeight}</span>
                </div>
              )}

              {listing.formData.productPrice && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-5 w-5 mr-2'
                  />
                  <span>MOQ Price:</span>
                  <span className='font-bold text-black ml-1'>
                    {listing.formData.productPrice}
                  </span>
                </div>
              )}

              {listing.formData.pricePerKg && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-5 w-5 mr-2'
                  />
                  <span>Per kg:</span>
                  <span className='font-bold text-black ml-1'>
                    {listing.formData.pricePerKg}
                  </span>
                </div>
              )}
            </div>

            {listing.formData.description && (
              <div className='text-gray-600 text-sm mt-4'>
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description.length > 150 ? (
                  <>
                    {`${listing.formData.description.substring(0, 150)}... `}
                    <button
                      onClick={() => navigate(`listing/${listing.id}`)}
                      className='text-blue-500 underline'
                    >
                      Read more
                    </button>
                  </>
                ) : (
                  listing.formData.description
                )}
              </div>
            )}
          </>
        )}

        {listing.selectedCategory === 'Fruits, Vegetables & Growables' &&
          (listing.selectedSubcategory === 'Mango' ||
            listing.selectedSubcategory === 'Banana') && (
            <>
              <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
                {listing.formData.paymentMethods && (
                  <>
                    <div className='flex items-center'>
                      <FaCreditCard className='mr-2 text-gray-500' />
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
                        listing.formData.paymentMethods.includes(
                          'creditCard'
                        ) && (
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
                    <FaLocationDot className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.location}</span>
                  </div>
                )}

                {listing.formData.weight && (
                  <div className='flex items-center'>
                    <GiCardboardBoxClosed className='mr-2 text-lg text-gray-500' />
                    <span>MOQ Weight:</span>
                    <span className='ml-1'>{listing.formData.weight}</span>
                  </div>
                )}

                {listing.formData.pricePerKg && (
                  <div className='flex items-center'>
                    <img
                      src='https://img.icons8.com/color/96/peso-symbol.png'
                      alt='Price'
                      className='h-5 w-5 mr-2'
                    />
                    <span>Per kg:</span>
                    <span className='font-bold text-black ml-1'>
                      {listing.formData.pricePerKg}
                    </span>
                  </div>
                )}

                {listing.formData.qualityLevel && (
                  <div className='flex items-center'>
                    <GiFruitBowl className='mr-2 text-lg text-gray-500' />
                    <span>Quality:</span>
                    <span className='ml-1'>
                      {listing.formData.qualityLevel}
                    </span>
                  </div>
                )}

                {listing.formData.productPrice && (
                  <div className='flex items-center'>
                    <img
                      src='https://img.icons8.com/color/96/peso-symbol.png'
                      alt='Price'
                      className='h-5 w-5 mr-2'
                    />
                    <span>MOQ Price:</span>
                    <span className='font-bold text-black ml-1'>
                      {listing.formData.productPrice}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

        {listing.selectedCategory === 'Fruits, Vegetables & Growables' &&
          listing.selectedSubcategory !== 'Mango' &&
          listing.selectedSubcategory !== 'Banana' && (
            <>
              <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
                {listing.formData.paymentMethods && (
                  <>
                    <div className='flex items-center'>
                      <FaCreditCard className='mr-2 text-gray-500' />
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
                        listing.formData.paymentMethods.includes(
                          'creditCard'
                        ) && (
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
                    <FaLocationDot className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.location}</span>
                  </div>
                )}

                {listing.formData.weight && (
                  <div className='flex items-center'>
                    <GiCardboardBoxClosed className='mr-2 text-lg text-gray-500' />
                    <span>MOQ Weight:</span>
                    <span className='ml-1'>{listing.formData.weight}</span>
                  </div>
                )}

                {listing.formData.pricePerKg && (
                  <div className='flex items-center'>
                    <img
                      src='https://img.icons8.com/color/96/peso-symbol.png'
                      alt='Price'
                      className='h-5 w-5 mr-2'
                    />
                    <span>Per kg:</span>
                    <span className='font-bold text-black ml-1'>
                      {listing.formData.pricePerKg}
                    </span>
                  </div>
                )}

                {listing.formData.qualityLevel && (
                  <div className='flex items-center'>
                    <GiFruitBowl className='mr-2 text-lg text-gray-500' />
                    <span>Quality:</span>
                    <span className='ml-1'>
                      {listing.formData.qualityLevel}
                    </span>
                  </div>
                )}

                {listing.formData.productPrice && (
                  <div className='flex items-center'>
                    <img
                      src='https://img.icons8.com/color/96/peso-symbol.png'
                      alt='Price'
                      className='h-5 w-5 mr-2'
                    />
                    <span>MOQ Price:</span>
                    <span className='font-bold text-black ml-1'>
                      {listing.formData.productPrice}
                    </span>
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
                    <span className='ml-2'>
                      {listing.formData.paymentMethods}kg
                    </span>
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
                  <span className='font-bold text-gray-700 mr-1'>
                    Description:
                  </span>
                  {listing.formData.description.length > 150 ? (
                    <>
                      {`${listing.formData.description.substring(0, 150)}... `}
                      <button
                        onClick={() => navigate(`listing/${listing.id}`)}
                        className='text-blue-500 underline'
                      >
                        Read more
                      </button>
                    </>
                  ) : (
                    listing.formData.description
                  )}
                </div>
              )}
            </>
          )}

        {listing.selectedCategory === 'Seeds' && (
          <>
            <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
              {listing.formData.paymentMethods && (
                <>
                  <div className='flex items-center'>
                    <FaCreditCard className='mr-2 text-gray-500' />
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
                      listing.formData.paymentMethods.includes(
                        'creditCard'
                      ) && (
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
                  <FaLocationDot className='mr-2 text-lg text-gray-500' />
                  <span>{listing.formData.location}</span>
                </div>
              )}

              {listing.formData.productWeight && (
                <div className='flex items-center'>
                  <GiCardboardBoxClosed className='mr-2 text-lg text-gray-500' />
                  <span>MOQ Weight:</span>
                  <span className='ml-1'>{listing.formData.productWeight}</span>
                </div>
              )}

              {listing.formData.productPrice && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-5 w-5 mr-2'
                  />
                  <span>MOQ Price:</span>
                  <span className='font-bold text-black ml-1'>
                    {listing.formData.productPrice}
                  </span>
                </div>
              )}

              {listing.formData.pricePerKg && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-5 w-5 mr-2'
                  />
                  <span>Per kg:</span>
                  <span className='font-bold text-black ml-1'>
                    {listing.formData.pricePerKg}
                  </span>
                </div>
              )}
            </div>

            {listing.formData.description && (
              <div className='text-gray-600 text-sm mt-4'>
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description.length > 150 ? (
                  <>
                    {`${listing.formData.description.substring(0, 150)}... `}
                    <button
                      onClick={() => navigate(`listing/${listing.id}`)}
                      className='text-blue-500 underline'
                    >
                      Read more
                    </button>
                  </>
                ) : (
                  listing.formData.description
                )}
              </div>
            )}
          </>
        )}

        {listing.selectedCategory === 'Building Materials' && (
          <>
            <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
              {listing.formData.paymentMethods && (
                <>
                  <div className='flex items-center'>
                    <FaCreditCard className='mr-2 text-gray-500' />
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
                      listing.formData.paymentMethods.includes(
                        'creditCard'
                      ) && (
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

              {listing.formData.totalPrice && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-5 w-5 mr-2'
                  />
                  <span>Price:</span>
                  <span className='font-bold text-black ml-1'>
                    {listing.formData.totalPrice}
                  </span>
                </div>
              )}
            </div>

            {listing.formData.description && (
              <div className='text-gray-600 text-sm mt-4'>
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description.length > 150 ? (
                  <>
                    {`${listing.formData.description.substring(0, 150)}... `}
                    <button
                      onClick={() => navigate(`listing/${listing.id}`)}
                      className='text-blue-500 underline'
                    >
                      Read more
                    </button>
                  </>
                ) : (
                  listing.formData.description
                )}
              </div>
            )}
          </>
        )}

        {listing.selectedCategory === 'Other' && (
          <>
            <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2'>
              {listing.formData.paymentMethods && (
                <>
                  <div className='flex items-center'>
                    <FaCreditCard className='mr-2 text-gray-500' />
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
                      listing.formData.paymentMethods.includes(
                        'creditCard'
                      ) && (
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

              {listing.formData.totalPrice && (
                <div className='flex items-center'>
                  <img
                    src='https://img.icons8.com/color/96/peso-symbol.png'
                    alt='Price'
                    className='h-5 w-5 mr-2'
                  />
                  <span>Price:</span>
                  <span className='font-bold text-black ml-1'>
                    {listing.formData.totalPrice}
                  </span>
                </div>
              )}
            </div>

            {listing.formData.description && (
              <div className='text-gray-600 text-sm mt-4'>
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description.length > 150 ? (
                  <>
                    {`${listing.formData.description.substring(0, 150)}... `}
                    <button
                      onClick={() => navigate(`listing/${listing.id}`)}
                      className='text-blue-500 underline'
                    >
                      Read more
                    </button>
                  </>
                ) : (
                  listing.formData.description
                )}
              </div>
            )}
          </>
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
          onClick={() => navigate(`/listing/${listing.id}`)}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ListingCard;
