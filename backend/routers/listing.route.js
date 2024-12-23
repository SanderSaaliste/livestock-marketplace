const express = require('express');
const multer = require('multer');

const authenticationMiddleware = require('../middlewares/authentication');
const listingController = require('../controllers/listing.controller');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'video/mp4',
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error('Only JPEG, JPG, PNG, WEBP images and MP4 videos are allowed')
      );
    }
    cb(null, true);
  },
});

router.post(
  '/',
  authenticationMiddleware,
  upload.array('media', 5),
  listingController.createListing
);
router.get('/:id', listingController.getListingById);
router.get('/', listingController.getAllListings);
router.patch(
  '/:id',
  authenticationMiddleware,
  upload.array('media', 5),
  listingController.updateListing
);
router.delete(
  '/:id',
  authenticationMiddleware,
  listingController.deleteListing
);

module.exports = router;
