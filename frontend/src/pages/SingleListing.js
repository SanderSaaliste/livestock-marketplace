import React, { useEffect, useState, useRef } from 'react';
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

  const featuresRef = useRef(null);
  const descriptionRef = useRef(null);
  const reviewsRef = useRef(null);

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

      if (response.message || response.error) {
        console.error(response.message || response.error);
        return;
      }

      setReviews(response || []);
    } catch (err) {
      console.error('Failed to fetch listing reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (listing && listing.userId) fetchReviewsByReviewerId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listing]);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const scrollToRef = {
        features: featuresRef,
        description: descriptionRef,
        reviews: reviewsRef,
      }[hash];

      if (scrollToRef && scrollToRef.current) {
        scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [loading]);

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
      <ListingDetails listing={listing} descriptionRef={descriptionRef} />
      <TabNavbar
        onTabClick={(tab) => {
          if (tab === 'Features')
            featuresRef.current.scrollIntoView({ behavior: 'smooth' });
          if (tab === 'Descriptions')
            descriptionRef.current.scrollIntoView({ behavior: 'smooth' });
          if (tab === 'Reviews')
            reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      <div ref={featuresRef}>
        <Features listing={listing} />
      </div>
      <div ref={descriptionRef}>
        <Description listing={listing} />
      </div>
      <div ref={reviewsRef}>
        <Reviews listing={listing} reviews={reviews} />
      </div>
      <RelatedListings />
      <Footer />
    </div>
  );
};

export default SingleListing;
