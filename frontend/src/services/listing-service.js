import axios from './axios';

const createListing = async (data) => {
  try {
    const response = await axios.post('/listing', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { error: 'Failed to create listing' };
  }
};

const getListingById = async (id) => {
  try {
    const response = await axios.get(`/listing/${id}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { error: 'Failed to fetch listing' };
  }
};

const getAllListings = async (filters = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const response = await axios.get(`/listing${query ? `?${query}` : ''}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { error: 'Failed to fetch listings' };
  }
};

const updateListing = async (id, data) => {
  try {
    const response = await axios.patch(`/listing/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { error: 'Failed to update listing' };
  }
};

const deleteListing = async (id) => {
  try {
    const response = await axios.delete(`/listing/${id}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { error: 'Failed to delete listing' };
  }
};

const listingService = {
  createListing,
  getListingById,
  getAllListings,
  updateListing,
  deleteListing,
};

export default listingService;
