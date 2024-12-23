import React, { useState } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Dropdown from './Dropdown';
import LogoUploadSection from './LogoUploadSection';
import ProfilePictureUploadSection from './ProfilePictureUploadSection';

const JobListingForm = ({ onChange, formData }) => {
  const [dropdownState, setDropdownState] = useState({});

  const toggleDropdown = (dropdownType) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [dropdownType]: !prevState[dropdownType],
    }));
  };

  const selectOption = (dropdownType, text) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [`${dropdownType}Selected`]: text,
      [dropdownType]: false,
    }));
  };

  const handleInputChange = (field, value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  return (
    <div>
      <Dropdown
        label='Are you seeking a job or offering one?'
        options={['Jobseeker', 'Offering']}
        dropdownType='jobType'
        dropdownState={dropdownState}
        toggleDropdown={toggleDropdown}
        selectOption={(dropdownType, value) => {
          selectOption(dropdownType, value);
          handleInputChange(dropdownType, value);
        }}
        selectedOption={formData?.jobType || ''}
      />

      {formData?.jobType === 'Offering' && (
        <div>
          <Dropdown
            label='What is the position you are hiring for?'
            options={[
              'Mechanic',
              'Plumbing',
              'Farm hand',
              'Electrician',
              'Builder',
              'Veterinarian',
              'Other',
            ]}
            dropdownType='position'
            dropdownState={dropdownState}
            toggleDropdown={toggleDropdown}
            selectOption={(dropdownType, value) => {
              selectOption(dropdownType, value);
              handleInputChange(dropdownType, value);
            }}
            selectedOption={formData?.position || ''}
          />

          <LogoUploadSection
            onChange={(value) => {
              console.log(value);
              handleInputChange('companyLogo', value);
            }}
            value={formData?.companyLogo || ''}
          />

          <InputField
            label='Please choose title'
            placeholder='Example: Veterinarian (Management Trainee)'
            value={formData?.title || ''}
            onChange={(value) => handleInputChange('title', value)}
          />
          <InputField
            label='Location'
            placeholder="Enter the company's location"
            value={formData?.location || ''}
            onChange={(value) => handleInputChange('location', value)}
          />
          <InputField
            label='What is the hourly rate for this job title?'
            placeholder='Example: ₱75 - ₱100 per/h'
            value={formData?.hourlyRate || ''}
            onChange={(value) => handleInputChange('hourlyRate', value)}
          />
          <TextAreaField
            label='Describe the job tasks and the company.'
            placeholder='E.g.: Care, diagnostics, treatments, surgeries, emergencies.'
            value={formData?.jobDescription || ''}
            onChange={(value) => handleInputChange('jobDescription', value)}
          />
        </div>
      )}

      {formData?.jobType === 'Jobseeker' && (
        <div>
          <ProfilePictureUploadSection
            onChange={(value) => {
              console.log(value);
              handleInputChange('profilePicture', value);
            }}
            value={formData?.profilePicture || ''}
          />

          <InputField
            label='Please choose title'
            placeholder='Example: Experienced builder seeking employment'
            value={formData?.title || ''}
            onChange={(value) => handleInputChange('title', value)}
          />
          <InputField
            label='Location'
            placeholder='Enter your location'
            value={formData?.location || ''}
            onChange={(value) => handleInputChange('location', value)}
          />
          <Dropdown
            label='What is your profession?'
            options={[
              'Mechanic',
              'Plumbing',
              'Farm hand',
              'Electrician',
              'Builder',
              'Veterinarian',
              'Other',
            ]}
            dropdownType='profession'
            dropdownState={dropdownState}
            toggleDropdown={toggleDropdown}
            selectOption={(dropdownType, value) => {
              selectOption(dropdownType, value);
              handleInputChange(dropdownType, value);
            }}
            selectedOption={formData?.profession || ''}
          />
          <InputField
            label='What is your preferred hourly rate?'
            placeholder='Example: ₱75 - ₱100 per/h'
            value={formData?.preferredHourlyRate || ''}
            onChange={(value) =>
              handleInputChange('preferredHourlyRate', value)
            }
          />
          <TextAreaField
            label='Provide a brief description of yourself'
            placeholder='E.g., experience, education, etc.'
            value={formData?.selfDescription || ''}
            onChange={(value) => handleInputChange('selfDescription', value)}
          />
        </div>
      )}
    </div>
  );
};

export default JobListingForm;
