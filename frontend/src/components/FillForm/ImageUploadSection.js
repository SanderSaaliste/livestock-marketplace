import React from 'react';
import toast from 'react-hot-toast';
import { FaImage, FaVideo } from 'react-icons/fa';

const ImageUploadSection = ({ onChange, formData }) => {
  const uploadedFiles = formData?.uploadedFiles || [];
  const videoError = formData?.videoError || '';

  const handleFileUpload = async (event, index) => {
    const file = event.target.files[0];

    if (!file) return;

    const updatedFiles = [...uploadedFiles];

    if (index === 4) {
      if (file.size > 50 * 1024 * 1024) {
        toast.error('Video size exceeds 50MB limit.');
        return;
      }

      const videoUrl = URL.createObjectURL(file);
      const video = document.createElement('video');
      video.src = videoUrl;

      video.onloadedmetadata = () => {
        if (video.duration > 20) {
          toast.error('Video duration exceeds 20 seconds limit.');
          URL.revokeObjectURL(videoUrl);
        } else {
          updatedFiles[index] = { type: 'video', url: videoUrl };
          onChange('uploadedFiles', updatedFiles);
        }
      };

      video.onerror = () => {
        toast.error('Failed to process video. Please try again.');
        URL.revokeObjectURL(videoUrl);
      };
    } else {
      const imageUrl = URL.createObjectURL(file);
      updatedFiles[index] = { type: 'image', url: imageUrl };
      onChange('uploadedFiles', updatedFiles);

      setTimeout(() => {
        URL.revokeObjectURL(imageUrl);
      }, 1000);
    }
  };

  return (
    <div className='mb-12'>
      <p className='text-sm font-bold text-gray-700 mb-2'>
        Please upload 5 files (last slot reserved for a video)
      </p>
      <div className='grid gap-4'>
        <div className='col-span-full bg-[#F5F5F5] border-dashed border-2 border-[#A4CB87] rounded-md p-8 flex flex-col items-center'>
          {uploadedFiles[0]?.type === 'image' ? (
            <img
              src={uploadedFiles[0].url}
              alt='Uploaded 1'
              className='h-40 w-40 object-cover rounded-md'
            />
          ) : (
            <>
              <FaImage className='text-8xl text-[#5EA91E] mb-4' />
              <p className='text-gray-700 font-bold mb-2'>Browse files</p>
              <input
                type='file'
                accept='image/*'
                className='hidden'
                id='file-upload-0'
                onChange={(event) => handleFileUpload(event, 0)}
              />
              <label
                htmlFor='file-upload-0'
                className='bg-[#5EA91E] text-white font-semibold py-2 px-8 rounded-full hover:bg-[#4E911B] transition cursor-pointer'
              >
                Upload
              </label>
            </>
          )}
        </div>

        <div className='grid grid-cols-2 gap-4'>
          {[...Array(4)].map((_, index) => (
            <div
              key={index + 1}
              className='bg-[#F5F5F5] border-dashed border-2 border-[#A4CB87] rounded-md p-6 flex flex-col items-center'
            >
              {uploadedFiles[index + 1]?.type === 'image' ? (
                <img
                  src={uploadedFiles[index + 1].url}
                  alt={`Uploaded ${index + 2}`}
                  className='h-40 w-40 object-cover rounded-md'
                />
              ) : index + 1 === 4 &&
                uploadedFiles[index + 1]?.type === 'video' ? (
                <video
                  src={uploadedFiles[index + 1].url}
                  controls
                  className='h-40 w-40 object-cover rounded-md'
                />
              ) : (
                <>
                  {index + 1 === 4 ? (
                    <FaVideo className='text-5xl text-[#5EA91E] mb-4' />
                  ) : (
                    <FaImage className='text-5xl text-[#5EA91E] mb-4' />
                  )}
                  <p className='text-gray-700 font-bold mb-2'>
                    {index + 1 === 4 ? 'Browse videos' : 'Browse images'}
                  </p>
                  <input
                    type='file'
                    accept={index + 1 === 4 ? 'video/*' : 'image/*'}
                    className='hidden'
                    id={`file-upload-${index + 1}`}
                    onChange={(event) => handleFileUpload(event, index + 1)}
                  />
                  <label
                    htmlFor={`file-upload-${index + 1}`}
                    className='bg-[#5EA91E] text-white font-semibold py-2 px-8 rounded-full hover:bg-[#4E911B] transition cursor-pointer'
                  >
                    Upload
                  </label>
                  {index + 1 === 4 && videoError && (
                    <p className='text-red-500 text-xs mt-2'>{videoError}</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSection;
