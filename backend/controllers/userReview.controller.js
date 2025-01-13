const { StatusCodes } = require('http-status-codes');

const { User } = require('../models/user.model');
const {
  UserReview,
  validateUserReview,
} = require('../models/userReview.model');

const reviewsController = {
  createReview: async (req, res) => {
    const { reviewedId, rating, comment } = req.body;

    const { error } = validateUserReview(req.body);

    if (error) {
      console.warn(`Invalid data format: ${error}`);

      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: `Invalid data format: ${error}` });
    }

    const existingReview = await UserReview.findOne({
      where: { reviewerId: req.user.id, reviewedId },
    });

    if (existingReview) {
      console.warn('Review already exists for this user');

      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: 'Review already exists for this user' });
    }

    const newReview = await UserReview.create({
      reviewerId: req.user.id,
      reviewedId,
      rating,
      comment,
    });

    res.status(StatusCodes.CREATED).json({
      message: 'Review created successfully!',
      review: newReview,
    });
  },

  getReviewsByReviewedId: async (req, res) => {
    const { id } = req.params;

    const reviews = await UserReview.findAll({
      where: { reviewedId: id },
      include: [
        {
          model: User,
          as: 'reviewer',
        },
      ],
      order: [['createdTimestamp', 'DESC']],
    });

    if (!reviews || reviews.length === 0) {
      console.warn('No reviews found for this user');

      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'No reviews found for this user' });
    }

    res.status(StatusCodes.OK).json(reviews);
  },

  getAllReviews: async (req, res) => {
    const reviews = await UserReview.findAll({
      include: [
        { model: User, as: 'reviewer' },
        { model: User, as: 'reviewed' },
      ],
      order: [['createdTimestamp', 'DESC']],
    });

    res.status(StatusCodes.OK).json(reviews);
  },
};

module.exports = reviewsController;
