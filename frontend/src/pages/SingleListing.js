import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RelatedListings from '../components/SingleListing/RelatedListings';
import ListingDetails from '../components/SingleListing/ListingDetails';
import TabNavbar from '../components/SingleListing/TabNavigator';
import Features from '../components/SingleListing/Features';
import Description from '../components/SingleListing/Description';
import Reviews from '../components/SingleListing/Reviews';
import listingService from '../services/listing-service';
import toast from 'react-hot-toast';
import userReviewService from '../services/userReview-service';

const SingleListing = () => {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListing = async () => {
    try {
      const response = await listingService.getListingById(id);
      setListing(response);
    } catch (err) {
      console.error('Failed to fetch listing:', err);
      toast.error('Failed to load listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewsByReviewerId = async () => {
    try {
      const response = await userReviewService.getReviewsByReviewerId(
        listing.userId
      );

      setReviews(response || []);
    } catch (err) {
      console.error('Failed to fetch listing reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListing();
  }, [id]);

  useEffect(() => {
    if (listing && listing.userId) fetchReviewsByReviewerId();
  }, [listing]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Loading...</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Listing not found.</p>
      </div>
    );
  }

  return (
    <div className='Home'>
      <Navbar />
      <ListingDetails listing={listing} />
      <TabNavbar />
      <Features listing={listing} />
      <Description listing={listing} />
      <Reviews listing={listing} reviews={reviews} />
      <RelatedListings />
      <Footer />
    </div>
  );
};

export default SingleListing;
