import React, { useState } from 'react';
import { MdPhone } from 'react-icons/md';

import { apiHost } from '../../constants';

const Description = ({ listing }) => {
  const [showNumber, setShowNumber] = useState(false);

  return (
    <div className='max-w-7xl mx-auto px-4 pt-12 pb-24 border-b border-black'>
      <h1 className='text-3xl font-bold mb-12 font-mochiy'>Description</h1>
      <div className='flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8'>
        <div className='w-full lg:w-1/3'>
          {listing.formData.media && listing.formData.media.length > 0 && (
            <img
              src={`${apiHost}${listing.formData.media[0]}`}
              alt={listing.formData.title}
              className='w-96 h-96 object-cover rounded-lg shadow-md'
            />
          )}
        </div>

        <div className='w-full lg:w-2/3 flex flex-col justify-between'>
          <div>
            <h2 className='text-2xl font-bold mb-6 font-mochiy'>
              {(() => {
                const prefix =
                  listing.formData.jobType === 'Offering'
                    ? 'Offering: '
                    : listing.formData.jobType === 'Jobseeker'
                    ? 'Wanted: '
                    : '';

                const maxLength = 85;
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
            </h2>

            {listing.formData.description && (
              <p className='text-gray-700 mb-4 text-md'>
                {listing.formData.description.length > 1000
                  ? `${listing.formData.description.substring(0, 1000)}... `
                  : listing.formData.description}
              </p>
            )}

            {listing.formData.jobDescription && (
              <p className='text-gray-700 mb-4 text-md'>
                {listing.formData.jobDescription.length > 1000
                  ? `${listing.formData.jobDescription.substring(0, 1000)}... `
                  : listing.formData.jobDescription}
              </p>
            )}

            {listing.formData.selfDescription && (
              <p className='text-gray-700 mb-4 text-md'>
                {listing.formData.selfDescription.length > 1000
                  ? `${listing.formData.selfDescription.substring(0, 1000)}... `
                  : listing.formData.selfDescription}
              </p>
            )}
          </div>

          {listing && listing.formData.phoneNumber && (
            <div className='flex space-x-4 items-center'>
              {!showNumber && (
                <button
                  onClick={() => setShowNumber(true)}
                  className='flex items-center bg-[#5EA91E] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#639E3B] transition'
                >
                  <MdPhone className='text-xl' />
                </button>
              )}

              {showNumber && (
                <span className='text-md font-bold text-gray-800'>
                  {listing.formData.phoneNumber}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Description;
