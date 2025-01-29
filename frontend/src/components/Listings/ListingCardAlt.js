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
import { FcMoneyTransfer } from 'react-icons/fc';

import gcashImg from '../../assets/gcash icon appstore.webp';
import mayaImg from '../../assets/maya icon.webp';
import { apiHost } from '../../constants';
import { formatQuantity } from '../../utils/text';

const ListingCardAlt = ({ listing }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-2 flex relative ${
        listing.formData.salesStatus === 'Sold' ||
        listing.formData.salesStatus === 'Inactive'
          ? 'opacity-50'
          : ''
      }`}
    >
      <div className='relative rounded-lg overflow-hidden w-[223px] h-[192px] flex-shrink-0'>
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

      <div className='ml-4 flex-grow'>
        <h3 className='text-base font-bold mb-4'>
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
                ? `${listing.formData.title.substring(0, availableSpace)}...`
                : listing.formData.title;

            return `${prefix}${trimmedTitle}`;
          })()}
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
                          <FcMoneyTransfer className='h-5 w-5' />
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
                          <img
                            src='https://img.icons8.com/color/48/visa.png'
                            alt='Visa'
                            className='h-5 w-5'
                          />
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
                    <img
                      className='mr-2 w-[20px] h-[20px]'
                      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFAElEQVR4nO1dS4hcRRR9/jEi6sovGl25yE78YFyIG/+fQNSdrnSjENQICmoLYjTqLIZp6pzbMzA4iYI9oEs/IG6zcqExYjSCO4PJQozgzCIjd3gJmUdPd1X1vHk9vHPgwvCm6kz1OVVd9erdqVcUgiAIgiAIgiAIWwAhhFsAfADgMIB/yzhMcn+v17tZvBxLh2isrKycB+AtAEskV9aJ/0i+4WXFyyQdktDv9y8meXCIEWsCwAGvI15E6ZAEd5nkYqwZ58Rnw3qIeDNB8uUBI+Avki+Y2bUeAF4sr1XLvSReDtUhCSGEHQCWKyL/DGB7taxPZAB+qZRdNrNbq2X9Wtt4Qwg7inFB8ptKrz9hZjeuV94bCOBkpc7iAN7FFvJ+VYwDAHcM+AraFVFvV6XO6RDCbWd+7z/7tbbxklwxs9uLVHQ6nQvN7EEAhyqE38ZykPwuYfJvDS+AQ65tv9+/IJbgAf9uHNQQAPfGNiSEcF/sB2wp75EQwv3FiCXovurQPKcRv6Xe7JE8FvHhWssL4DSAdwbyAXhvRGM+jG3EOZwfRfS41vMCeHeNcCGERyKEezTDkMfFW0Tp4GVWRTOziwD8MapCzmaZb0KKt4jSAcDvvpjySfzpmIlsYWHhslRDvI54iygdPMzsSTfk05jC8/PzV2aMkKvEW0TpUI6SA0XMysIjhHBXqiFmdrd4iygdyvjVJ5xTkYXnUw0h+bF4i1gdfIScKiLNOPMd91qn0zl/lBFeBsDr4u0k6eCRZEgZPwLY6/tcMzMz101NTV3qAeB6M7uT5Kvl41zxIl2HHEMUrE8DGcLJ6mAyhM2bIEPYvPAyhM2LLUPYLkOOA3jOl74eJJ/3axvQqONt5s0yxJ8o+h+v3hDOzs5eDeCH3MZAvOmGAPiz2+1es95duv/Oy4i3m6VDjiEPjdo6MbOHxVtk6ZBkCIAvI/cVfdPya/EWSTrkGLIz1hAzu0e8RZIOqYYcTU2tXy+dSLzcEEP2pZgRmckiXmYaEjOZ50xq4mWeId1u96aMEbJdvEWUDsmGmNm2jBGyTbxFlA7JhszNzV2eYcgV4i2idEg2RFknrFWHnFXWwdSGROZ8iZd5hvg88mbMvYhnnZDsiLeTpEOyIR6eSWFmr/gw9JxVT5P0KA8T2OkZKSR/Ei+ydNAzdU5WyBA2b4IMYfPCyxA2L7YMYfMCyxC215AtkcXBLcarrBNMVpaMsk66k5Ulo6yTYrKyZJR1MkFZMjmGKOuE9emQaoiyTlirDsmGKOuEteqQZoiyQ1irDsmGKOuEteqQbIiyTlirDsmGKOuEteqQbIiyTlirDjmrLGWHsFYdkg1R1gnr1SHZEA9lnbBWHdyQf1IrKViXBn8X1TPKFWxMA99icUM+kQmclI644IY8NQENUXB1hOxePSbWz/qTKGy6Uxw7+yaeQaf4K7hpGpRvY3hszZrZ37omE9hIR/Tt+fVuYvbLFG7qyADw/tCDRc3sCc0p3AxDjp49730UyvPgd/u+Tfn4UTePHNsA1/CIn17t2rrGUWYIgiBsYfg28/T09CVNt2OrwzXckPfilsvhE2Ms7U4OWtaV72ZqPW8WAHwxxuric/FyqA45huwZY4TsES+H6pAM/x+I6ntgI81Y7vV6N4gXQ3XIAoC3Uw3xZ8/iZZQOWTCzZ0l+D2BpyKhYKss8I14m6SAIgiAIgiAIglA0gP8BY8wv8D44tNcAAAAASUVORK5CYII='
                      alt='dozen-eggs'
                    ></img>
                    <span>MOQ:</span>
                    <span className='ml-1'>
                      {(() => {
                        const quantity = listing.formData.minOrder;
                        const match = quantity.toString().match(/^(\d+)/);
                        const number = match ? parseInt(match[1], 10) : NaN;

                        if (!isNaN(number)) {
                          const formattedNumber = new Intl.NumberFormat(
                            'en-US'
                          ).format(number);
                          return `${formattedNumber} ${
                            number === 1 ? 'Tray' : 'Trays'
                          }`;
                        }

                        return quantity;
                      })()}
                    </span>
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
                          <FcMoneyTransfer className='h-5 w-5' />
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
                          <img
                            src='https://img.icons8.com/color/48/visa.png'
                            alt='Visa'
                            className='h-5 w-5'
                          />
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
                    <span className='ml-1'>
                      {formatQuantity(listing.formData.quantity)}
                    </span>
                  </div>
                )}

                {listing.formData.avgWeightPerHead && (
                  <div className='flex items-center'>
                    <GiWeight className='mr-2 text-lg text-gray-500' />
                    <span>Avg head:</span>
                    <span className='ml-1'>
                      {formatQuantity(listing.formData.avgWeightPerHead)}kg
                    </span>
                  </div>
                )}

                {listing.formData.totalWeight && (
                  <div className='flex items-center'>
                    <GiWeight className='mr-2 text-lg text-gray-500' />
                    <span>Total:</span>
                    <span className='ml-1'>
                      {formatQuantity(listing.formData.totalWeight)}kg
                    </span>
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
                      {formatQuantity(listing.formData.avgPricePerHead)}
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
                      {formatQuantity(listing.formData.pricePerKg)}
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
                          <FcMoneyTransfer className='h-5 w-5' />
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
                          <img
                            src='https://img.icons8.com/color/48/visa.png'
                            alt='Visa'
                            className='h-5 w-5'
                          />
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
                    <span>{formatQuantity(listing.formData.mileage)}km</span>
                  </div>
                )}

                {listing.formData.engineType && (
                  <div className='flex items-center'>
                    <PiEngineFill className='mr-2 text-lg text-gray-500' />
                    <span>{formatQuantity(listing.formData.engineType)}cc</span>
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
                      {formatQuantity(listing.formData.totalPrice)}
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
                          <FcMoneyTransfer className='h-5 w-5' />
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
                          <img
                            src='https://img.icons8.com/color/48/visa.png'
                            alt='Visa'
                            className='h-5 w-5'
                          />
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
                    <span>{formatQuantity(listing.formData.mileage)}km</span>
                  </div>
                )}

                {listing.formData.engineType && (
                  <div className='flex items-center'>
                    <PiEngineFill className='mr-2 text-lg text-gray-500' />
                    <span>{formatQuantity(listing.formData.engineType)}L</span>
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
                      {formatQuantity(listing.formData.totalPrice)}
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
                      {formatQuantity(listing.formData.hourlyRate)}
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
                      {formatQuantity(listing.formData.preferredHourlyRate)}
                    </span>
                  </div>
                )}
            </div>

            {listing.formData.jobType === 'Offering' &&
              listing.formData.jobDescription && (
                <div
                  className='text-gray-600 text-sm mt-4'
                  style={{ width: '429px', overflow: 'hidden' }}
                >
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
                        onClick={() =>
                          navigate(`/listing/${listing.id}#description`)
                        }
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
                <div
                  className='text-gray-600 text-sm mt-4'
                  style={{ width: '429px', overflow: 'hidden' }}
                >
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
                        onClick={() =>
                          navigate(`/listing/${listing.id}#description`)
                        }
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
                  <span className='ml-1'>
                    {formatQuantity(listing.formData.bedrooms)}
                  </span>
                </div>
              )}

              {listing.formData.interiorSize && (
                <div className='flex items-center'>
                  <GiFamilyHouse className='mr-2 text-lg text-gray-500' />
                  <span>Interior:</span>
                  <span className='ml-1'>
                    {formatQuantity(listing.formData.interiorSize)} m2
                  </span>
                </div>
              )}

              {listing.formData.landSize && (
                <div className='flex items-center'>
                  <HiOutlineArrowsExpand className='mr-2 text-lg text-gray-500' />
                  <span>Land:</span>
                  <span className='ml-1'>
                    {formatQuantity(listing.formData.landSize)} m2
                  </span>
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
                    {formatQuantity(listing.formData.totalPrice)}
                  </span>
                </div>
              )}

              {listing.formData.lotNumber && (
                <div className='flex items-center'>
                  <RxTransparencyGrid className='mr-2 text-lg text-gray-500' />
                  <span>Lot no:</span>
                  <span className='ml-1'>
                    {formatQuantity(listing.formData.lotNumber)}
                  </span>
                </div>
              )}
            </div>

            {listing.formData.description && (
              <div
                className='text-gray-600 text-sm mt-4'
                style={{ width: '429px', overflow: 'hidden' }}
              >
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description.length > 150 ? (
                  <>
                    {`${listing.formData.description.substring(0, 150)}... `}
                    <button
                      onClick={() =>
                        navigate(`/listing/${listing.id}#description`)
                      }
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
                        <FcMoneyTransfer className='h-5 w-5' />
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
                        <img
                          src='https://img.icons8.com/color/48/visa.png'
                          alt='Visa'
                          className='h-5 w-5'
                        />
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
                  <span className='ml-1'>
                    {formatQuantity(listing.formData.workingHours)}
                  </span>
                </div>
              )}

              {listing.formData.horsepower && (
                <div className='flex items-center'>
                  <BsFillLightningFill className='mr-2 text-lg text-gray-500' />
                  <span>HP {formatQuantity(listing.formData.horsepower)}</span>
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
                    {formatQuantity(listing.formData.totalPrice)}
                  </span>
                </div>
              )}

              {listing.formData.fuelConsumption && (
                <div className='flex items-center'>
                  <BsFillFuelPumpFill className='mr-2 text-lg text-gray-500' />
                  <span className='ml-1'>
                    ~{formatQuantity(listing.formData.fuelConsumption)} L/hr
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
                          <FcMoneyTransfer className='h-5 w-5' />
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
                          <img
                            src='https://img.icons8.com/color/48/visa.png'
                            alt='Visa'
                            className='h-5 w-5'
                          />
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
                    <span className='ml-1'>
                      {formatQuantity(listing.formData.boatLength)}ft
                    </span>
                  </div>
                )}

                {listing.formData.horsepower && (
                  <div className='flex items-center'>
                    <BsFillLightningFill className='mr-2 text-lg text-gray-500' />
                    <span>
                      HP {formatQuantity(listing.formData.horsepower)}
                    </span>
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
                      {formatQuantity(listing.formData.totalPrice)}
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
                          <FcMoneyTransfer className='h-5 w-5' />
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
                          <img
                            src='https://img.icons8.com/color/48/visa.png'
                            alt='Visa'
                            className='h-5 w-5'
                          />
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
                      {formatQuantity(listing.formData.totalPrice)}
                    </span>
                  </div>
                )}

                {listing.formData.location && (
                  <div className='flex items-center'>
                    <FaLocationDot className='mr-2 text-lg text-gray-500' />
                    <span>{listing.formData.location}</span>
                  </div>
                )}
              </div>

              {listing.formData.description && (
                <div
                  className='text-gray-600 text-sm mt-4'
                  style={{ width: '429px', overflow: 'hidden' }}
                >
                  <span className='font-bold text-gray-700 mr-1'>
                    Description:
                  </span>
                  {listing.formData.description.length > 150 ? (
                    <>
                      {`${listing.formData.description.substring(0, 150)}... `}
                      <button
                        onClick={() =>
                          navigate(`/listing/${listing.id}#description`)
                        }
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
                        <FcMoneyTransfer className='h-5 w-5' />
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
                        <img
                          src='https://img.icons8.com/color/48/visa.png'
                          alt='Visa'
                          className='h-5 w-5'
                        />
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
                    {formatQuantity(listing.formData.totalPrice)}
                  </span>
                </div>
              )}
            </div>

            {listing.formData.description && (
              <div
                className='text-gray-600 text-sm mt-4'
                style={{ width: '429px', overflow: 'hidden' }}
              >
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description.length > 150 ? (
                  <>
                    {`${listing.formData.description.substring(0, 150)}... `}
                    <button
                      onClick={() =>
                        navigate(`/listing/${listing.id}#description`)
                      }
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
                        <FcMoneyTransfer className='h-5 w-5' />
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
                        <img
                          src='https://img.icons8.com/color/48/visa.png'
                          alt='Visa'
                          className='h-5 w-5'
                        />
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
                    {formatQuantity(listing.formData.totalPrice)}
                  </span>
                </div>
              )}
            </div>

            {listing.formData.description && (
              <div
                className='text-gray-600 text-sm mt-4'
                style={{ width: '429px', overflow: 'hidden' }}
              >
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description.length > 150 ? (
                  <>
                    {`${listing.formData.description.substring(0, 150)}... `}
                    <button
                      onClick={() =>
                        navigate(`/listing/${listing.id}#description`)
                      }
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
                          <FcMoneyTransfer className='h-5 w-5' />
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
                          <img
                            src='https://img.icons8.com/color/48/visa.png'
                            alt='Visa'
                            className='h-5 w-5'
                          />
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
                      {formatQuantity(listing.formData.productWeight)}kg
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
                      {formatQuantity(listing.formData.productPrice)}
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
                      {formatQuantity(listing.formData.pricePerKg)}
                    </span>
                  </div>
                )}
              </div>

              {listing.formData.description && (
                <div
                  className='text-gray-600 text-sm mt-4'
                  style={{ width: '429px', overflow: 'hidden' }}
                >
                  <span className='font-bold text-gray-700 mr-1'>
                    Description:
                  </span>
                  {listing.formData.description.length > 150 ? (
                    <>
                      {`${listing.formData.description.substring(0, 150)}... `}
                      <button
                        onClick={() =>
                          navigate(`/listing/${listing.id}#description`)
                        }
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
                          <FcMoneyTransfer className='h-5 w-5' />
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
                          <img
                            src='https://img.icons8.com/color/48/visa.png'
                            alt='Visa'
                            className='h-5 w-5'
                          />
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
                      {formatQuantity(listing.formData.feedBagWeight)}kg
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
                      {formatQuantity(listing.formData.pricePerBag)}
                    </span>
                  </div>
                )}

                {listing.formData.animalFeedType && (
                  <div className='flex items-center'>
                    <img
                      className='mr-2 w-[20px] h-[20px]'
                      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAHp0lEQVR4nO1dZ4hdRRS+9oo1IPYuImLDhqI/7Ai2iKIoIiiCGKNiD8qTKGIh6vLezvedt+riqlFXxYIl9o5GIvbeGzEajRrUGLNeOewEl8fue/e9O20374MDIbs7M+d8d2bunDI3y7rooosuuuiiQwwMDKxB8mYAC0jmy6IA+BkAZsyYsVrwB4nkHbENwHSkHtT4IrISgCUJKJ4nIouCEtDT07MKgH8TUDxPQfRhzPN8uaAkkPw0tuJMRAC8k4UGgMHYijMduS0GAZcmoHieiJwbnABjzKEJKJ4nIvsHJ0BEJiWgeB5b9GVERNbOYoDkN7ENwPgEfBzF+JaAB2MbgPHlrpgEVBIwQB55BlwUk4AjYhuAkUVEDopGAICNYxuA8QmYFI2ALrrooosull2QrMbeBBlZAFwXk4DnYhuA8Ql4LBoBAH6MbQDGJ+DrKMbv6+vbILbyXJadcSQPjK08ExFjzN7BCRCRqbEVZyIC4LTgBHAY0ZVnGnJDDAKeSUDxPAUB8PB4D8Z8TvKfCIZbbPsu29ZHQY2vqXgkh1wYQUTO1DbVrWsNEsr4fy2N5ZI8q2Rbfw8ODq4QjABjzI6ODPHiyIQmkmcEImBIRI5b2q+OgeTLZdo0xmwVjAAAx7gwhDHmyMa2ReQSV7NrDFkE4NRR+j26pC6HhiTgIgeGmD84OLjyaO0bY/bTYLcH48/W2TtanzoWzXbutG0AU7JQ0GzgssYAcHuzPvr7+1cFIA1/s0TfOPQMIiJ7aERO9yMRWV3/DWBPAOeQfHTkLNLTKoDprdbpMhnfAHqyUADwbFkCRGRqkb5I9tpE4FtqtdrmRceoazLJAWucKwrqdV4JAh7JxlNirogcXTQVXpekTscKYN9KpbJ8kd81xhxbQqe3s1Ag+WdZAkzITasgABxeQqf5QQbZ19e3Xlnjs40ZEBIkJ5dYgv7Vfcv7IHt7e3dyQQCAC7LEQPLCkg/V1iEGeZgLAkg+miUGAI8nnyWtrldHBAwZY3bNEgHJ3cseAAGcON7yQT8yxqybRYbuay4OfkGW1cbDkQN5JkqdrYU9xJU+11gCbvQ+YD2JOiYgB/BmkA2sAbVabRuSbznU427vgwbwkmsCODz4X0lepi4F3zrU6/VNRORykr851uGJEHvAuz4I4P8+m6N86yAih3gKAM0OMQO+jZllJiKbkZym63ZDXtI8kk/qRlitVjfy6feJWq5EcqEn479UqVRWbHE5yE0Fo2aLSF6tFf3NdFGPrGM95nkxesOgF/sID0qTTViLIAC83kG7z/f09Kw1Vrv6M5JfOtTj18wnbOjOx9N/ZbN+Adxfou07W7R9lENd/sx8QqNGHoz/rS4vTQx0sIN+mroINDbtSJclmU/Yddj1DLjQ9zoN4NZQs8BrdoSeGh0//YvVDdDCOB82/M0jelbQd3lNDR/xs1m6j6jo+3hDX+8360MDNgB+cKFT0eBPR1B/t2MCnm73rUsNv/Rnvb29m472//ZVdWQ/vxfo52YXOmXjbA+4uFWfjXfSjUWA/rsJAQsK9HNK8nuAvqe7JMAUCEsCeK9ByceUBDX4SP+9Ljvq2wGwLYCn2o3XWnd0WQIWZz6h65tLAgBs0apPvZXQQT89gW5/8X93nEsC+vv712nVn831KXM/3VC9Xt+lVT+1Wm1NB0T/kfmGy7RBEVnJdwxCr/VsI+G4rE4LM9+wfhYnBNTr9S2LGgfAAx30cUdRkuv1+nYOZkDLzb40HN+Ue27RfvWAo9l0RfI39Z1eRE5v5yrJsinqVuZ2bNg2BjrXpRuiWq2u307/OhuMMSfY9/bZ1pmm8qpdqia38oKO8XZXOtsPwBeZb7j0HnJYZgVJaGqu0/WOdPnA+2AbXQOOZsIrIrJhFhjWuzvN1S3AAN7wPmgNoLsmgMPym0ap2l0+OoVmT3e4sTeTl70PvGwpT4Gn6CcNTWoKpOv7mHUjt8Uf4imw1NK3VRoenpq8iULqoZypLmt1GYvI9u14G9Uzqvfa2YqegQB3W9w3HhOz8jZJeUH9PS0MvyHJeyOMrxqCgOkxCeD/9b0DWuSnTjn10qrRjTEH2IqaPyKNbVoIAqbEJoCJymjVlz4IOD62okxUglT9iMhesRVlogJgZ+8EqAs5tqJMU4bUpZ2FAIDvE1A4T0kAfBbE+KHPAhwnosljwQhQNzLJX2II0v16U/jPmMSAMWbdFD8gVCTsOWFQrVbXT20maEV+tqxAhl0NeWIEmCDKq4dSl4FmufyuUalUltc+VWzsdlZsg48iXwUxhovgNSeoFE0yKAUAJ8VWlIlKkPsvNFgSW1EmKlp56Z2ASH72fJzITO8EAHgtAUXzFEUrN0MQ4OMyvXyCSNNCkOQSszjBJMi3BEh+EltRJipB8oJIXhVbUaYrZ3snQLONbcV6rMB3nqB8JyLnB/2uvGawAdhBDx/2Yw7XakmpVqfbZar0zYpMRDQ/SZcXkg9p6om9XvlkdcAl/SlDrSu2N9oqUfvotZB6rZeInKlKALjG5hndY13MT9r6Ls16nmPzUD8fKTZZa6xYwfej/L7WmM3RjD5t25a5DmoFPYCaLqn69OpVbHpvqKa2iMhu6lZI4TavLrrIJiT+Az7SnGYxTl0FAAAAAElFTkSuQmCC'
                      alt='pig-food'
                    ></img>
                    <span>{listing.formData.animalFeedType}</span>
                  </div>
                )}
              </div>

              {listing.formData.description && (
                <div
                  className='text-gray-600 text-sm mt-4'
                  style={{ width: '429px', overflow: 'hidden' }}
                >
                  <span className='font-bold text-gray-700 mr-1'>
                    Description:
                  </span>
                  {listing.formData.description.length > 150 ? (
                    <>
                      {`${listing.formData.description.substring(0, 150)}... `}
                      <button
                        onClick={() =>
                          navigate(`/listing/${listing.id}#description`)
                        }
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
                        <FcMoneyTransfer className='h-5 w-5' />
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
                        <img
                          src='https://img.icons8.com/color/48/visa.png'
                          alt='Visa'
                          className='h-5 w-5'
                        />
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
                    {formatQuantity(listing.formData.productWeight)}kg
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
                    {formatQuantity(listing.formData.productPrice)}
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
                    {formatQuantity(listing.formData.pricePerKg)}kg
                  </span>
                </div>
              )}
            </div>

            {listing.formData.description && (
              <div
                className='text-gray-600 text-sm mt-4'
                style={{ width: '429px', overflow: 'hidden' }}
              >
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description.length > 150 ? (
                  <>
                    {`${listing.formData.description.substring(0, 150)}... `}
                    <button
                      onClick={() =>
                        navigate(`/listing/${listing.id}#description`)
                      }
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
                          <FcMoneyTransfer className='h-5 w-5' />
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
                          <img
                            src='https://img.icons8.com/color/48/visa.png'
                            alt='Visa'
                            className='h-5 w-5'
                          />
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
                    <span className='ml-1'>
                      {formatQuantity(listing.formData.weight)}kg
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
                      {formatQuantity(listing.formData.pricePerKg)}
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
                      {formatQuantity(listing.formData.productPrice)}
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
                          <FcMoneyTransfer className='h-5 w-5' />
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
                          <img
                            src='https://img.icons8.com/color/48/visa.png'
                            alt='Visa'
                            className='h-5 w-5'
                          />
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
                      {formatQuantity(listing.formData.productWeight)}kg
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
                      {formatQuantity(listing.formData.productPrice)}
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
                      {formatQuantity(listing.formData.pricePerKg)}
                    </span>
                  </div>
                )}
              </div>

              {listing.formData.description && (
                <div
                  className='text-gray-600 text-sm mt-4'
                  style={{ width: '429px', overflow: 'hidden' }}
                >
                  <span className='font-bold text-gray-700 mr-1'>
                    Description:
                  </span>
                  {listing.formData.description.length > 150 ? (
                    <>
                      {`${listing.formData.description.substring(0, 150)}... `}
                      <button
                        onClick={() =>
                          navigate(`/listing/${listing.id}#description`)
                        }
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
                        <FcMoneyTransfer className='h-5 w-5' />
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
                        <img
                          src='https://img.icons8.com/color/48/visa.png'
                          alt='Visa'
                          className='h-5 w-5'
                        />
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
                    {formatQuantity(listing.formData.productWeight)}kg
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
                    {formatQuantity(listing.formData.productPrice)}
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
                    {formatQuantity(listing.formData.pricePerKg)}
                  </span>
                </div>
              )}
            </div>

            {listing.formData.description && (
              <div
                className='text-gray-600 text-sm mt-4'
                style={{ width: '429px', overflow: 'hidden' }}
              >
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description.length > 150 ? (
                  <>
                    {`${listing.formData.description.substring(0, 150)}... `}
                    <button
                      onClick={() =>
                        navigate(`/listing/${listing.id}#description`)
                      }
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
                        <FcMoneyTransfer className='h-5 w-5' />
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
                        <img
                          src='https://img.icons8.com/color/48/visa.png'
                          alt='Visa'
                          className='h-5 w-5'
                        />
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
                    {formatQuantity(listing.formData.totalPrice)}
                  </span>
                </div>
              )}
            </div>

            {listing.formData.description && (
              <div
                className='text-gray-600 text-sm mt-4'
                style={{ width: '429px', overflow: 'hidden' }}
              >
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description.length > 150 ? (
                  <>
                    {`${listing.formData.description.substring(0, 150)}... `}
                    <button
                      onClick={() =>
                        navigate(`/listing/${listing.id}#description`)
                      }
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
                        <FcMoneyTransfer className='h-5 w-5' />
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
                        <img
                          src='https://img.icons8.com/color/48/visa.png'
                          alt='Visa'
                          className='h-5 w-5'
                        />
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
                    {formatQuantity(listing.formData.totalPrice)}
                  </span>
                </div>
              )}
            </div>

            {listing.formData.description && (
              <div
                className='text-gray-600 text-sm mt-4'
                style={{ width: '429px', overflow: 'hidden' }}
              >
                <span className='font-bold text-gray-700 mr-1'>
                  Description:
                </span>
                {listing.formData.description.length > 150 ? (
                  <>
                    {`${listing.formData.description.substring(0, 150)}... `}
                    <button
                      onClick={() =>
                        navigate(`/listing/${listing.id}#description`)
                      }
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
      </div>

      <div className='flex flex-col justify-between items-end'>
        <div className='flex justify-center items-center'>
          <button className='text-sm text-gray-600 font-bold flex items-center space-x-1'>
            <BiSolidHeart className='text-gray-300 text-lg' />
            <span>Save</span>
          </button>
        </div>

        <div className='flex items-center justify-center space-x-3'>
          <button
            className={`w-full text-white font-semibold py-3 px-5 rounded-md transition duration-200 ease-in-out ${
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
            className={`w-full text-gray-600 font-medium py-3 px-5 rounded-md transition duration-200 ease-in-out ${
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
    </div>
  );
};

export default ListingCardAlt;
