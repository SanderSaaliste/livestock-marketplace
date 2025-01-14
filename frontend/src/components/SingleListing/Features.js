import React from 'react';

import FeatureCard from './FeatureCard';

import locationIcon from '../../assets/eggs/location.svg';
import moqIcon from '../../assets/eggs/moq.svg';
import xsIcon from '../../assets/eggs/xs.svg';
import sIcon from '../../assets/eggs/s.svg';
import mIcon from '../../assets/eggs/m.svg';
import lIcon from '../../assets/eggs/l.svg';
import xlIcon from '../../assets/eggs/xl.svg';
import pwIcon from '../../assets/eggs/pw.svg';
import jumboIcon from '../../assets/eggs/jumbo.svg';
import dirtyIcon from '../../assets/eggs/dirty.svg';

import ageIcon from '../../assets/livestock/age.png';
import vitaminsIcon from '../../assets/livestock/vitamins.png';
import temperamentIcon from '../../assets/livestock/temperament.png';
import genderIcon from '../../assets/livestock/gender.png';
import vaccinationIcon from '../../assets/livestock/vaccination.png';
import quantityIcon from '../../assets/livestock/quantity.png';
import weightIcon from '../../assets/livestock/weight.png';
import healthIcon from '../../assets/livestock/health.png';
import dietIcon from '../../assets/livestock/diet.png';

import calendarIcon from '../../assets/moto/calendar.svg';
import engineIcon from '../../assets/moto/engine.svg';
import motoLocationIcon from '../../assets/moto/location.svg';
import pesoIcon from '../../assets/moto/peso.svg';
import speedIcon from '../../assets/moto/speed.svg';
import transmissionIcon from '../../assets/moto/transmission.svg';

import vehiclesCalendarIcon from '../../assets/vehicles/calendar.svg';
import vehiclesEngineIcon from '../../assets/vehicles/engine.svg';
import vehiclesLocationIcon from '../../assets/vehicles/location.svg';
import vehiclesPesoIcon from '../../assets/vehicles/peso.svg';
import vehiclesSpeedIcon from '../../assets/vehicles/speed.svg';
import vehiclesTransmissionIcon from '../../assets/vehicles/transmission.svg';

import companyIcon from '../../assets/services/company.svg';
import servicesLocationIcon from '../../assets/services/location.svg';
import professionIcon from '../../assets/services/profession.svg';
import servicesPesoIcon from '../../assets/services/peso.svg';

import bedroomIcon from '../../assets/realEstate/bedroom.svg';
import interiorIcon from '../../assets/realEstate/interior.svg';
import landIcon from '../../assets/realEstate/land.svg';
import realEstateLocationIcon from '../../assets/realEstate/location.svg';
import lotNoIcon from '../../assets/realEstate/lotNo.svg';
import realEstatePesoIcon from '../../assets/realEstate/peso.svg';

import heavyEquipmentCalendarIcon from '../../assets/heavyEquipment/calendar.svg';
import clockIcon from '../../assets/heavyEquipment/clock.svg';
import fuelIcon from '../../assets/heavyEquipment/fuel.svg';
import horsePowerIcon from '../../assets/heavyEquipment/horsePower.svg';
import heavyEquipmentLocationIcon from '../../assets/heavyEquipment/location.svg';
import heavyEquipmentPesoIcon from '../../assets/heavyEquipment/peso.svg';

import basicLocationIcon from '../../assets/basic/location.svg';
import basicPesoIcon from '../../assets/basic/peso.svg';

import boatIcon from '../../assets/boats/boat.svg';
import boatsCalendarIcon from '../../assets/boats/calendar.svg';
import boatsFuelIcon from '../../assets/boats/fuel.svg';
import boatsHorsePowerIcon from '../../assets/boats/horsePower.svg';
import boatsLocationIcon from '../../assets/boats/location.svg';
import boatsPesoIcon from '../../assets/boats/peso.svg';

import standardLocationIcon from '../../assets/standardWeight/location.svg';
import standardPesoIcon from '../../assets/standardWeight/peso.svg';
import standardWeightIcon from '../../assets/standardWeight/weight.svg';

import feedIcon from '../../assets/animalFeed/feed.svg';
import animalFeedLocationIcon from '../../assets/animalFeed/location.svg';
import animalFeedPesoIcon from '../../assets/animalFeed/peso.svg';
import animalFeedWeightIcon from '../../assets/animalFeed/weight.svg';

import mangoLocationIcon from '../../assets/mangoes/location.svg';
import mangoIcon from '../../assets/mangoes/mango.svg';
import mangoPesoIcon from '../../assets/mangoes/peso.svg';
import mangoWeightIcon from '../../assets/mangoes/weight.svg';

import bananaIcon from '../../assets/bananas/banana.svg';
import bananaLocationIcon from '../../assets/bananas/location.svg';
import bananaPesoIcon from '../../assets/bananas/peso.svg';
import bananaWeightIcon from '../../assets/bananas/weight.svg';

const Features = ({ listing }) => {
  const eggFeatures = [
    { image: locationIcon, key: 'location', text: listing.formData.location },
    { image: xsIcon, key: 'xsPrice', text: listing.formData.xsPrice },
    { image: sIcon, key: 'sPrice', text: listing.formData.sPrice },
    { image: moqIcon, key: 'minOrder', text: listing.formData.minOrder },
    { image: mIcon, key: 'mPrice', text: listing.formData.mPrice },
    { image: lIcon, key: 'lPrice', text: listing.formData.lPrice },
    { image: xlIcon, key: 'xlPrice', text: listing.formData.xlPrice },
    { image: jumboIcon, key: 'jumboPrice', text: listing.formData.jumboPrice },
    { image: pwIcon, key: 'pwPrice', text: listing.formData.pwPrice },
    { image: dirtyIcon, key: 'dirtyPrice', text: listing.formData.dirtyPrice },
  ];

  const livestockFeatures = [
    { image: ageIcon, key: 'age', text: `Age: ${listing.formData.age}` },
    {
      image: vitaminsIcon,
      key: 'vitamins',
      text: `Vitamins: ${listing.formData.vitamins}`,
    },
    {
      image: temperamentIcon,
      key: 'temperament',
      text: `Temperament: ${listing.formData.temperament}`,
    },
    {
      image: genderIcon,
      key: 'gender',
      text: `Gender: ${listing.formData.gender}`,
    },
    {
      image: vaccinationIcon,
      key: 'vaccination',
      text: `Vaccination: ${listing.formData.vaccinationDate}`,
    },
    {
      image: quantityIcon,
      key: 'quantity',
      text: `Quantity: ${listing.formData.quantity}`,
    },
    {
      image: weightIcon,
      key: 'weight',
      text: `Weight: ${listing.formData.avgWeightPerHead}`,
    },
    {
      image: healthIcon,
      key: 'healthHistory',
      text: `Health History: ${listing.formData.sicknessFrequency}`,
    },
    {
      image: dietIcon,
      key: 'dietAndFreedom',
      text: `Diet & Freedom: ${listing.formData.feedingBrand}`,
    },
  ];

  const motoFeatures = [
    {
      image: motoLocationIcon,
      key: 'location',
      text: listing.formData.location,
    },
    {
      image: speedIcon,
      key: 'mileage',
      text: listing.formData.mileage,
    },
    {
      image: transmissionIcon,
      key: 'transmission',
      text: listing.formData.transmission,
    },
    {
      image: calendarIcon,
      key: 'manufacturingYear',
      text: listing.formData.year,
    },
    {
      image: engineIcon,
      key: 'engineType',
      text: listing.formData.engineType,
    },
    {
      image: pesoIcon,
      key: 'price',
      text: listing.formData.totalPrice,
    },
  ];

  const vehiclesFeatures = [
    {
      image: vehiclesLocationIcon,
      key: 'location',
      text: listing.formData.location,
    },
    {
      image: vehiclesSpeedIcon,
      key: 'mileage',
      text: listing.formData.mileage,
    },
    {
      image: vehiclesTransmissionIcon,
      key: 'transmission',
      text: listing.formData.transmission,
    },
    {
      image: vehiclesCalendarIcon,
      key: 'manufacturingYear',
      text: listing.formData.year,
    },
    {
      image: vehiclesEngineIcon,
      key: 'engineType',
      text: listing.formData.engineType,
    },
    {
      image: vehiclesPesoIcon,
      key: 'price',
      text: listing.formData.totalPrice,
    },
  ];

  const servicesFeatures = [
    {
      image: servicesLocationIcon,
      key: 'location',
      text: listing.formData.location,
    },
    {
      image: servicesPesoIcon,
      key: 'hourlyRate',
      text:
        listing.formData.jobType === 'Offering'
          ? listing.formData.hourlyRate
          : listing.formData.preferredHourlyRate,
    },
    {
      image: companyIcon,
      key: 'position',
      text: listing.formData.position || '',
    },
    {
      image: professionIcon,
      key: 'profession',
      text: listing.formData.profession || '',
    },
  ];

  const realEstateFeatures = [
    {
      image: realEstateLocationIcon,
      key: 'location',
      text: listing.formData.location,
    },
    {
      image: interiorIcon,
      key: 'interior',
      text: listing.formData.interiorSize,
    },
    {
      image: landIcon,
      key: 'land',
      text: listing.formData.landSize,
    },
    {
      image: bedroomIcon,
      key: 'bedrooms',
      text: listing.formData.bedrooms,
    },
    {
      image: lotNoIcon,
      key: 'lotNo',
      text: listing.formData.lotNumber,
    },
    {
      image: realEstatePesoIcon,
      key: 'price',
      text: listing.formData.totalPrice,
    },
  ];

  const heavyEquipmentFeatures = [
    {
      image: heavyEquipmentLocationIcon,
      key: 'location',
      text: listing.formData.location,
    },
    {
      image: clockIcon,
      key: 'workingHours',
      text: listing.formData.workingHours,
    },
    {
      image: fuelIcon,
      key: 'fuelConsumption',
      text: listing.formData.fuelConsumption,
    },
    {
      image: heavyEquipmentCalendarIcon,
      key: 'manufacturingYear',
      text: listing.formData.manufacturingYear,
    },
    {
      image: horsePowerIcon,
      key: 'horsePower',
      text: listing.formData.horsepower,
    },
    {
      image: heavyEquipmentPesoIcon,
      key: 'Price',
      text: listing.formData.totalPrice,
    },
  ];

  const basicListingFeatures = [
    {
      image: basicLocationIcon,
      key: 'location',
      text: listing.formData.location,
    },
    {
      image: basicPesoIcon,
      key: 'Price',
      text: listing.formData.totalPrice,
    },
  ];

  const boatListingFeatures = [
    {
      image: boatsLocationIcon,
      key: 'location',
      text: listing.formData.location,
    },
    {
      image: boatIcon,
      key: 'length',
      text: listing.formData.boatLength,
    },
    {
      image: boatsFuelIcon,
      key: 'fuel',
      text: listing.formData.boatFuel,
    },
    {
      image: boatsCalendarIcon,
      key: 'manufacturingYear',
      text: listing.formData.manufacturingYear,
    },
    {
      image: boatsHorsePowerIcon,
      key: 'horsePower',
      text: listing.formData.horsepower,
    },
    {
      image: boatsPesoIcon,
      key: 'Price',
      text: listing.formData.totalPrice,
    },
  ];

  const standardWeightListingFeatures = [
    {
      image: standardLocationIcon,
      key: 'location',
      text: listing.formData.location,
    },
    {
      image: standardPesoIcon,
      key: 'moqPrice',
      text: listing.formData.productPrice,
    },
    {
      image: standardWeightIcon,
      key: 'moqWeight',
      text: listing.formData.productWeight,
    },
    {
      image: standardPesoIcon,
      key: 'perKg',
      text: listing.formData.pricePerKg,
    },
  ];

  const animalFeedListingFeatures = [
    {
      image: animalFeedLocationIcon,
      key: 'location',
      text: listing.formData.location,
    },
    {
      image: feedIcon,
      key: 'feedType',
      text: listing.formData.animalFeedType,
    },
    {
      image: animalFeedWeightIcon,
      key: 'bag',
      text: listing.formData.feedBagWeight,
    },
    {
      image: animalFeedPesoIcon,
      key: 'perBag',
      text: listing.formData.pricePerBag,
    },
  ];

  const mangoListingFeatures = [
    {
      image: mangoLocationIcon,
      key: 'location',
      text: listing.formData.location,
    },
    {
      image: mangoIcon,
      key: 'quality',
      text: listing.formData.qualityLevel,
    },
    {
      image: mangoPesoIcon,
      key: 'moqPrice',
      text: listing.formData.productPrice,
    },
    {
      image: mangoWeightIcon,
      key: 'moqWeight',
      text: listing.formData.weight,
    },
    {
      image: mangoPesoIcon,
      key: 'perBag',
      text: listing.formData.pricePerKg,
    },
  ];

  const bananaListingFeatures = [
    {
      image: bananaLocationIcon,
      key: 'location',
      text: listing.formData.location,
    },
    {
      image: bananaIcon,
      key: 'class',
      text: listing.formData.qualityLevel,
    },
    {
      image: bananaPesoIcon,
      key: 'moqPrice',
      text: listing.formData.productPrice,
    },
    {
      image: bananaWeightIcon,
      key: 'moqWeight',
      text: listing.formData.weight,
    },
    {
      image: bananaPesoIcon,
      key: 'perBag',
      text: listing.formData.pricePerKg,
    },
  ];

  return (
    <div className='max-w-7xl mx-auto px-4 pt-12 pb-24 border-b border-black'>
      <h1 className='text-3xl font-bold mb-12 font-mochiy'>Features</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-10 text-gray-700'>
        {listing.selectedCategory === 'Livestock' &&
          listing.selectedSubcategory === 'Eggs' &&
          eggFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#fcfcfc'
                  iconBgColor='#e4e4e4'
                  borderColor='#797979'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Livestock' &&
          listing.selectedSubcategory !== 'Eggs' &&
          livestockFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#fefcfb'
                  iconBgColor='#e4e4e4'
                  borderColor='#f3e6e3'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Vehicles' &&
          listing.selectedSubcategory === 'Motorcycles and ATVs' &&
          motoFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#fefcfb'
                  iconBgColor='#e4e4e4'
                  borderColor='#f3e6e3'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Vehicles' &&
          listing.selectedSubcategory !== 'Motorcycles and ATVs' &&
          vehiclesFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#f2fffa'
                  iconBgColor='#e4e4e4'
                  borderColor='#0eb869'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Services / Jobs' &&
          servicesFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#fefcfb'
                  iconBgColor='#e4e4e4'
                  borderColor='#f3e6e3'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Real Estate' &&
          realEstateFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#fefcfb'
                  iconBgColor='#e4e4e4'
                  borderColor='#f3e6e3'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Heavy Equipment' &&
          heavyEquipmentFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#fefcfb'
                  iconBgColor='#e4e4e4'
                  borderColor='#f3e6e3'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Aquaculture' &&
          listing.selectedSubcategory === 'Boats (Bangka/Banca)' &&
          boatListingFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#f1f4ff'
                  iconBgColor='#e4e4e4'
                  borderColor='#90a8fb'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Aquaculture' &&
          listing.selectedSubcategory !== 'Boats (Bangka/Banca)' &&
          basicListingFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#f2fffa'
                  iconBgColor='#e4e4e4'
                  borderColor='#0eb869'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Tools' &&
          basicListingFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#f2fffa'
                  iconBgColor='#e4e4e4'
                  borderColor='#0eb869'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Home & Garden' &&
          basicListingFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#f2fffa'
                  iconBgColor='#e4e4e4'
                  borderColor='#0eb869'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Animal Feed' &&
          (listing.selectedSubcategory === 'Hay and Silage' ||
            listing.selectedSubcategory === 'Pellets' ||
            listing.selectedSubcategory === 'Grains') &&
          standardWeightListingFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#fefcfb'
                  iconBgColor='#e4e4e4'
                  borderColor='#f3e6e3'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Animal Feed' &&
          listing.selectedSubcategory !== 'Hay and Silage' &&
          listing.selectedSubcategory !== 'Pellets' &&
          listing.selectedSubcategory !== 'Grains' &&
          animalFeedListingFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#f2fffa'
                  iconBgColor='#e4e4e4'
                  borderColor='#0eb869'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Fertilizers' &&
          standardWeightListingFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#fefcfb'
                  iconBgColor='#e4e4e4'
                  borderColor='#f3e6e3'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Fruits, Vegetables & Growables' &&
          listing.selectedSubcategory === 'Mango' &&
          mangoListingFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#fff9f1'
                  iconBgColor='#e4e4e4'
                  borderColor='#f8bf4c'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Fruits, Vegetables & Growables' &&
          listing.selectedSubcategory === 'Banana' &&
          bananaListingFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#fff8de'
                  iconBgColor='#e4e4e4'
                  borderColor='#fadd77'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Fruits, Vegetables & Growables' &&
          listing.selectedSubcategory !== 'Mango' &&
          listing.selectedSubcategory !== 'Banana' &&
          standardWeightListingFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#fefcfb'
                  iconBgColor='#e4e4e4'
                  borderColor='#f3e6e3'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Seeds' &&
          standardWeightListingFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#fefcfb'
                  iconBgColor='#e4e4e4'
                  borderColor='#f3e6e3'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Building Materials' &&
          basicListingFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#f2fffa'
                  iconBgColor='#e4e4e4'
                  borderColor='#0eb869'
                  text={feature.text}
                />
              )
          )}

        {listing.selectedCategory === 'Others' &&
          basicListingFeatures.map(
            (feature) =>
              feature.text && (
                <FeatureCard
                  key={feature.key}
                  image={feature.image}
                  bgColor='#f2fffa'
                  iconBgColor='#e4e4e4'
                  borderColor='#0eb869'
                  text={feature.text}
                />
              )
          )}
      </div>
    </div>
  );
};

export default Features;
