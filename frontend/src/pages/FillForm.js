import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidCheckCircle } from 'react-icons/bi';

import Dropdown from '../components/FillForm/Dropdown';
import PaymentOptions from '../components/FillForm/PaymentOptions';
import ImageUploadSection from '../components/FillForm/ImageUploadSection';
import Header from '../components/FillForm/Header';
import Footer from '../components/FillForm/Footer';
import EggsForm from '../components/FillForm/EggsForm';
import CustomDropdown from '../components/FillForm/CustomDropdown';
import { categories } from '../constants';
import AnimalFeedForm from '../components/FillForm/AnimalFeedForm';
import BananasForm from '../components/FillForm/BananasForm';
import BasicListingForm from '../components/FillForm/BasicListingForm';
import BoatsForm from '../components/FillForm/BoatsForm';
import AutomobilesForm from '../components/FillForm/AutomobilesForm';
import HeavyEquipmentForm from '../components/FillForm/HeavyEquipmentForm';
import LivestockForm from '../components/FillForm/LivestockForm';
import MangoesForm from '../components/FillForm/MangoesForm';
import MotoForm from '../components/FillForm/MotoForm';
import StandardWeightListingForm from '../components/FillForm/StandardWeightListingForm';
import RealEstateForm from '../components/FillForm/RealEstateForm';
import JobListingForm from '../components/FillForm/JobListingForm';
import toast from 'react-hot-toast';
import listingService from '../services/listing-service';
import InputField from '../components/FillForm/InputField';

const FillForm = () => {
  const navigate = useNavigate();

  const [dropdownState, setDropdownState] = useState({});
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [formData, setFormData] = useState({});

  const toggleDropdown = (dropdownType, forceClose = false) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [dropdownType]: forceClose ? false : !prevState[dropdownType],
    }));
  };

  const selectOption = (dropdownType, text) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [`${dropdownType}Selected`]: text,
      [dropdownType]: false,
    }));

    if (dropdownType === 'category') {
      setSelectedSubcategory(text);

      setFormData({
        category: text,
      });
    }

    setFormData((prevData) => ({
      ...prevData,
      [dropdownType]: text,
    }));

    if (dropdownType !== 'category') toggleDropdown(dropdownType, false);
  };

  const togglePaymentOption = (paymentMethod) => {
    setSelectedPayments((prevState) => {
      const updatedPayments = prevState.includes(paymentMethod)
        ? prevState.filter((method) => method !== paymentMethod)
        : [...prevState, paymentMethod];

      setFormData((prevData) => ({
        ...prevData,
        paymentMethods: updatedPayments,
      }));

      return updatedPayments;
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageUploadChange = (uploadedFiles) => {
    setFormData((prevData) => ({
      ...prevData,
      uploadedFiles,
    }));
  };

  const validateForm = () => {
    if (!selectedCategory) {
      return 'Please select a category.';
    }
    const images =
      formData?.uploadedFiles ||
      formData?.companyLogo ||
      formData?.profilePicture ||
      [];
    if (images.length === 0) {
      return 'At least one image must be uploaded.';
    }
    if (!formData.title || formData.title.trim() === '') {
      return 'The title field is mandatory.';
    }
    if (!formData.price || formData.price.trim() === '') {
      const hasPriceField = Object.keys(formData).some(
        (key) =>
          key.toLowerCase().includes('price') ||
          key.toLowerCase().includes('rate')
      );
      if (!hasPriceField) {
        return 'At least one price field must be filled.';
      }
    }
    return '';
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const sanitizeValue = (value) => {
      if (typeof value === 'string') {
        if (/^\d{1,3}(,\d{3})*(\.\d+)?\s*(PHP|kg)?$/.test(value)) {
          return value
            .replace(/,/g, '')
            .replace(/\s*(PHP|kg)$/, '')
            .trim();
        }
      }
      return value;
    };

    const listingData = {
      selectedCategory,
      selectedSubcategory,
      formData: {
        ...formData,
      },
      salesStatus:
        selectedCategory === 'Services / Jobs' ? 'Active' : 'For Sale',
    };

    Object.entries(listingData.formData).forEach(([key, value]) => {
      if (typeof value === 'string') {
        listingData.formData[key] = sanitizeValue(value);
      }
    });

    const formDataToSend = new FormData();

    formDataToSend.append('selectedCategory', listingData.selectedCategory);
    formDataToSend.append(
      'selectedSubcategory',
      listingData.selectedSubcategory
    );
    formDataToSend.append('formData', JSON.stringify(listingData.formData));

    const validUploadedFiles =
      formData.uploadedFiles?.filter((file) => file && file.url) || [];

    for (const [index, file] of validUploadedFiles.entries()) {
      try {
        const response = await fetch(file.url);
        const blob = await response.blob();
        const fileType = file.type === 'image' ? 'image' : 'video';
        formDataToSend.append(
          'media',
          blob,
          `${fileType}-${index}.${blob.type.split('/')[1]}`
        );
      } catch (error) {
        console.error('Error fetching blob for file:', error);
        return;
      }
    }

    if (formData.companyLogo) {
      try {
        const logoResponse = await fetch(formData.companyLogo.url);
        const logoBlob = await logoResponse.blob();
        formDataToSend.append(
          'media',
          logoBlob,
          `companyLogo.${logoBlob.type.split('/')[1]}`
        );
      } catch (error) {
        console.error('Error fetching blob for company logo:', error);
      }
    }

    if (formData.profilePicture) {
      try {
        const profilePicResponse = await fetch(formData.profilePicture.url);
        const profilePicBlob = await profilePicResponse.blob();
        formDataToSend.append(
          'media',
          profilePicBlob,
          `profilePicture.${profilePicBlob.type.split('/')[1]}`
        );
      } catch (error) {
        console.error('Error fetching blob for profile picture:', error);
      }
    }

    try {
      const response = await listingService.createListing(formDataToSend);

      navigate(`/listingConfirmation/${response.listing.id}`);
      console.log('Listing created successfully!', response);
    } catch (err) {
      console.error('Failed to create listing:', err);
      toast.error('Failed to create listing. Please try again.');
    }
  };

  const renderForm = () => {
    if (!selectedCategory || !selectedSubcategory) {
      return (
        <p className='text-gray-500 text-center'>
          Please select both a category and subcategory to proceed.
        </p>
      );
    }

    switch (selectedCategory) {
      case 'Livestock':
        switch (selectedSubcategory) {
          case 'Eggs':
            return (
              <EggsForm onChange={handleInputChange} formData={formData} />
            );
          case 'Cattle':
          case 'Pigs':
          case 'Piglets':
          case 'Poultry':
          case 'Goats':
          case 'Carabaos':
          case 'Sheep':
          case 'Horses':
          case 'Other':
            return (
              <LivestockForm onChange={handleInputChange} formData={formData} />
            );
          default:
            break;
        }
        break;

      case 'Vehicles':
        switch (selectedSubcategory) {
          case 'Cars':
          case 'Trucks':
          case 'Other':
            return (
              <AutomobilesForm
                onChange={handleInputChange}
                formData={formData}
              />
            );
          case 'Motorcycles and ATVs':
            return (
              <MotoForm onChange={handleInputChange} formData={formData} />
            );
          default:
            break;
        }
        break;

      case 'Services / Jobs':
        switch (selectedSubcategory) {
          case 'Mechanic':
          case 'Plumber':
          case 'Farm Hand':
          case 'Electrician':
          case 'Builder':
          case 'Veterinarian':
            return (
              <JobListingForm
                onChange={handleInputChange}
                formData={formData}
              />
            );
          default:
            break;
        }
        break;

      case 'Real Estate':
        switch (selectedSubcategory) {
          case 'Land Plots':
          case 'Ranches':
          case 'Vineyards':
          case 'Farmland':
          case 'Other':
            return (
              <RealEstateForm
                onChange={handleInputChange}
                formData={formData}
              />
            );
          default:
            break;
        }
        break;

      case 'Heavy Equipment':
        switch (selectedSubcategory) {
          case 'Tractors':
          case 'Harvesters':
          case 'Plows':
          case 'Seeders/Planters':
          case 'Other':
            return (
              <HeavyEquipmentForm
                onChange={handleInputChange}
                formData={formData}
              />
            );
          default:
            break;
        }
        break;

      case 'Aquaculture':
        switch (selectedSubcategory) {
          case 'Fish':
          case 'Dried Fish':
          case 'Nets (Pukot/Net)':
          case 'Lines (Lambat)':
          case 'Aggregating Devices (Payao)':
          case 'Traps (Bubo/Trap)':
          case 'Spears and Harpoons (Pana/Hasa)':
          case 'Other':
            return (
              <BasicListingForm
                onChange={handleInputChange}
                formData={formData}
              />
            );
          case 'Boats (Bangka/Banca)':
            return (
              <BoatsForm onChange={handleInputChange} formData={formData} />
            );
          default:
            break;
        }
        break;

      case 'Tools':
        switch (selectedSubcategory) {
          case 'Hand Tools':
          case 'Power Tools':
          case 'Other':
            return (
              <BasicListingForm
                onChange={handleInputChange}
                formData={formData}
              />
            );
          default:
            break;
        }
        break;

      case 'Home & Garden':
        switch (selectedSubcategory) {
          case 'Plants':
          case 'Furniture':
          case 'Gardening Tools':
          case 'Cleaning Supplies':
          case 'Other':
            return (
              <BasicListingForm
                onChange={handleInputChange}
                formData={formData}
              />
            );
          default:
            break;
        }
        break;

      case 'Animal Feed':
        switch (selectedSubcategory) {
          case 'Hay and Silage':
          case 'Pellets':
          case 'Grains':
            return (
              <StandardWeightListingForm
                onChange={handleInputChange}
                formData={formData}
              />
            );
          case 'Pig Feed':
          case 'Chicken Feed':
          case 'Cattle Feed':
          case 'Poultry Feed':
          case 'Horse Feed':
          case 'Aquafeeds':
          case 'Other':
            return (
              <AnimalFeedForm
                onChange={handleInputChange}
                formData={formData}
              />
            );
          default:
            break;
        }
        break;

      case 'Fertilizers':
        switch (selectedSubcategory) {
          case 'Organic Fertilisers':
          case 'Chemical Fertilisers':
            return (
              <StandardWeightListingForm
                onChange={handleInputChange}
                formData={formData}
              />
            );
          default:
            break;
        }
        break;

      case 'Fruits, Vegetables & Growables':
        switch (selectedSubcategory) {
          case 'Mango':
            return (
              <MangoesForm onChange={handleInputChange} formData={formData} />
            );
          case 'Banana':
            return (
              <BananasForm onChange={handleInputChange} formData={formData} />
            );
          case 'Rice':
          case 'Pineapple':
          case 'Corn':
          case 'Sugarcane':
          case 'Coffee':
          case 'Cacao':
          case 'Papaya':
          case 'Cocoanut':
          case 'Eggplant':
          case 'Tomato':
          case 'Squash':
          case 'Bitter Melon':
          case 'String Beans':
          case 'Other':
            return (
              <StandardWeightListingForm
                onChange={handleInputChange}
                formData={formData}
              />
            );
          default:
            break;
        }
        break;

      case 'Seeds':
        switch (selectedSubcategory) {
          case 'Rice Seeds':
          case 'Corn Seeds':
          case 'Mung Bean Seeds (Munggo)':
          case 'Coconut Seeds (Niyog)':
          case 'Peanut Seeds':
          case 'Okra Seeds':
          case 'Ampalaya (Bitter Melon) Seeds':
          case 'Tomato Seeds (Kamatis)':
          case 'Other':
            return (
              <StandardWeightListingForm
                onChange={handleInputChange}
                formData={formData}
              />
            );
          default:
            break;
        }
        break;

      case 'Building Materials':
        switch (selectedSubcategory) {
          case 'Steel':
          case 'Wood':
          case 'Bamboo':
          case 'Glass':
          case 'Roofing Materials':
          case 'Sand & Gravel':
          case 'Bricks':
          case 'Cement':
          case 'Other':
            return (
              <BasicListingForm
                onChange={handleInputChange}
                formData={formData}
              />
            );
          default:
            break;
        }
        break;

      case 'Other':
        return (
          <BasicListingForm onChange={handleInputChange} formData={formData} />
        );

      default:
        return (
          <p className='text-gray-500 text-center'>
            Please select a valid category and subcategory to proceed.
          </p>
        );
    }
  };

  return (
    <div className='min-h-screen bg-white font-inter'>
      <Header />

      <main className='container mx-auto py-8 px-6 max-w-xl'>
        <section className='flex justify-center space-x-2 mb-6'>
          <span className='h-1 w-14 bg-[#5EA91E] rounded-full'></span>
          <span className='h-1 w-14 bg-gray-300 rounded-full'></span>
        </section>

        <section className='bg-white rounded-3xl p-6 text-center mb-8 border border-gray-300'>
          <div className='flex items-center justify-center gap-x-3 mb-4'>
            <BiSolidCheckCircle className='text-4xl' />
            <h3 className='text-lg font-bold'>Your listing has been created</h3>
          </div>
          <p className='text-gray-600 text-sm font-semibold'>
            Please fill in the information below to complete your profile and
            attract more potential buyers.
          </p>
        </section>

        <CustomDropdown
          label='What are you selling?'
          options={categories}
          dropdownType='category'
          dropdownState={dropdownState}
          toggleDropdown={toggleDropdown}
          selectOption={selectOption}
          setSelectedCategory={setSelectedCategory}
        />

        <InputField
          label='Phone Number'
          placeholder='Enter your phone number'
          value={formData?.phoneNumber || ''}
          onChange={(value) => handleInputChange('phoneNumber', value)}
        />

        {selectedCategory === 'Services / Jobs' ? (
          <>
            {/* <Dropdown
            label="Edit your listing's sales status"
            options={['Inactive', 'Active']}
            dropdownType='salesStatus'
            dropdownState={dropdownState}
            toggleDropdown={toggleDropdown}
            selectOption={selectOption}
          /> */}
          </>
        ) : (
          <>
            <Dropdown
              label='Please select the name of your harvesting season. (Optional)'
              options={['First Harvest', 'Second Harvest']}
              dropdownType='harvest'
              dropdownState={dropdownState}
              toggleDropdown={toggleDropdown}
              selectOption={selectOption}
            />

            {/* <Dropdown
              label="Edit your listing's sales status"
              options={['For Sale', 'Pending', 'Sold']}
              dropdownType='salesStatus'
              dropdownState={dropdownState}
              toggleDropdown={toggleDropdown}
              selectOption={selectOption}
            /> */}

            {selectedCategory !== 'Real Estate' && (
              <PaymentOptions
                selectedPayments={selectedPayments}
                togglePaymentOption={togglePaymentOption}
              />
            )}

            <ImageUploadSection
              onChange={(label, value) => handleImageUploadChange(value)}
              formData={formData}
            />
          </>
        )}

        {renderForm()}

        <div className='flex justify-center mt-8'>
          <button
            className='bg-[#5EA91E] text-white py-3 px-10 rounded-full hover:bg-[#4e921a] transition'
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FillForm;
