import axios from './axios';

const createReview = async (data) => {
  try {
    const response = await axios.post('/review', data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getReviewsByReviewerId = async (reviewerId) => {
  try {
    const response = await axios.get(`/review/${reviewerId}`);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getAllReviews = async () => {
  try {
    const response = await axios.get('/review');

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const userReviewService = {
  createReview,
  getReviewsByReviewerId,
  getAllReviews,
};

export default userReviewService;
