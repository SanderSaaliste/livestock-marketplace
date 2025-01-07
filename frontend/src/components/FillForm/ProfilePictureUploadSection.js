import React from 'react';
import { FaImage } from 'react-icons/fa';

const ProfilePictureUploadSection = ({ onChange, value }) => {
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const profilePictureUrl = URL.createObjectURL(file);
      if (onChange) {
        onChange({ type: 'image', url: profilePictureUrl });
      }
    }
  };

  return (
    <div className='mb-12'>
      <p className='text-sm font-bold text-gray-700 mb-2'>
        Upload your profile picture
      </p>
      <div className='grid gap-4'>
        <div className='col-span-full bg-[#F5F5F5] border-dashed border-2 border-[#A4CB87] rounded-md p-8 flex flex-col items-center'>
          {value ? (
            <img
              src={value.url}
              alt='Uploaded Profile'
              className='h-40 w-40 object-cover rounded-full'
            />
          ) : (
            <>
              <FaImage className='text-8xl text-[#5EA91E] mb-4' />
              <p className='text-gray-700 font-bold mb-2'>Browse files</p>
              <input
                type='file'
                accept='image/*'
                className='hidden'
                id='profile-picture-upload'
                onChange={handleProfilePictureUpload}
              />
              <label
                htmlFor='profile-picture-upload'
                className='bg-[#5EA91E] text-white font-semibold py-2 px-8 rounded-full hover:bg-[#4E911B] transition cursor-pointer'
              >
                Upload
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureUploadSection;
