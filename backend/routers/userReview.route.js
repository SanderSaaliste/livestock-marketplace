const express = require('express');
const authenticationMiddleware = require('../middlewares/authentication');

const router = express.Router();
const userReviewController = require('../controllers/userReview.controller');

router.post('/', authenticationMiddleware, userReviewController.createReview);
router.get('/:id', userReviewController.getReviewsByReviewedId);
router.get('/', authenticationMiddleware, userReviewController.getAllReviews);

module.exports = router;
