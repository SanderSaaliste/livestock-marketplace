import React from 'react';
import toast from 'react-hot-toast';
import { FaImage, FaVideo } from 'react-icons/fa';

const ImageUploadSection = ({ onChange, formData }) => {
  const uploadedFiles = formData?.uploadedFiles || [];
  const videoError = formData?.videoError || '';

  const handleFileUpload = async (event, index) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error('No file selected. Please try again.');
      return;
    }

    const updatedFiles = [...uploadedFiles];

    if (index === 3) {
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
      if (!file.type.startsWith('image/')) {
        toast.error('Invalid file type. Please upload an image.');
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      updatedFiles[index] = { type: 'image', url: imageUrl };
      onChange('uploadedFiles', updatedFiles);
    }
  };

  return (
    <div className='mb-12'>
      <p className='text-sm font-bold text-gray-700 mb-2'>
        Please upload 4 files (last slot reserved for a video)
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
              <p className='text-gray-700 font-bold mb-2'>Browse images</p>
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
          {[1, 2].map((index) => (
            <div
              key={index}
              className='bg-[#F5F5F5] border-dashed border-2 border-[#A4CB87] rounded-md p-6 flex flex-col items-center'
            >
              {uploadedFiles[index]?.type === 'image' ? (
                <img
                  src={uploadedFiles[index].url}
                  alt={`Uploaded ${index + 1}`}
                  className='h-40 w-40 object-cover rounded-md'
                />
              ) : (
                <>
                  <FaImage className='text-5xl text-[#5EA91E] mb-4' />
                  <p className='text-gray-700 font-bold mb-2'>Browse images</p>
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    id={`file-upload-${index}`}
                    onChange={(event) => handleFileUpload(event, index)}
                  />
                  <label
                    htmlFor={`file-upload-${index}`}
                    className='bg-[#5EA91E] text-white font-semibold py-2 px-8 rounded-full hover:bg-[#4E911B] transition cursor-pointer'
                  >
                    Upload
                  </label>
                </>
              )}
            </div>
          ))}
        </div>

        <div className='col-span-full bg-[#F5F5F5] border-dashed border-2 border-[#A4CB87] rounded-md p-8 flex flex-col items-center'>
          {uploadedFiles[3]?.type === 'video' ? (
            <video
              src={uploadedFiles[3].url}
              controls
              className='h-60 w-full object-cover rounded-md'
            />
          ) : (
            <>
              <FaVideo className='text-8xl text-[#5EA91E] mb-4' />
              <p className='text-gray-700 font-bold mb-2'>Browse videos</p>
              <input
                type='file'
                accept='video/*'
                className='hidden'
                id='file-upload-3'
                onChange={(event) => handleFileUpload(event, 3)}
              />
              <label
                htmlFor='file-upload-3'
                className='bg-[#5EA91E] text-white font-semibold py-2 px-8 rounded-full hover:bg-[#4E911B] transition cursor-pointer'
              >
                Upload
              </label>
              {videoError && (
                <p className='text-red-500 text-xs mt-2'>{videoError}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSection;
