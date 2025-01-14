const httpStatus = require('http-status-codes').StatusCodes;
const fs = require('fs');
const path = require('path');

const { Listing } = require('../models/listing.model');
const { User } = require('../models/user.model');

const listingMediaDir = path.join(__dirname, '..', 'listingMedia');
if (!fs.existsSync(listingMediaDir)) {
  fs.mkdirSync(listingMediaDir, { recursive: true });
}

const listingController = {
  createListing: async (req, res) => {
    const { selectedCategory, selectedSubcategory, formData } = req.body;
    const mediaFiles = req.files || [];

    try {
      if (!selectedCategory || !selectedSubcategory || !formData) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: 'All fields are required' });
      }

      const mediaUrls = [];
      mediaFiles.forEach((file) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = path.join(listingMediaDir, fileName);

        fs.writeFileSync(filePath, file.buffer);

        mediaUrls.push(`/listingMedia/${fileName}`);
      });

      const formDataWithMedia = {
        ...JSON.parse(formData),
        media: mediaUrls,
      };

      const newListing = await Listing.create({
        userId: req.user.id,
        selectedCategory,
        selectedSubcategory,
        formData: formDataWithMedia,
      });

      res.status(httpStatus.CREATED).json({
        message: 'Listing created successfully!',
        listing: newListing,
      });
    } catch (error) {
      console.error('Error creating listing:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to create listing',
      });
    }
  },

  getListingById: async (req, res) => {
    const { id } = req.params;

    try {
      const listing = await Listing.findByPk(id, {
        include: [
          {
            model: User,
          },
        ],
      });

      if (!listing) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ error: 'Listing not found' });
      }

      res.status(httpStatus.OK).json(listing);
    } catch (error) {
      console.error('Error fetching listing:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to fetch listing',
      });
    }
  },

  getAllListings: async (req, res) => {
    const { userId, category, subcategory, page = 1, numItems = 6 } = req.query;

    try {
      const whereClause = {};

      if (userId) whereClause.userId = userId;
      if (category) whereClause.selectedCategory = category;
      if (subcategory) whereClause.selectedSubcategory = subcategory;

      const limit = parseInt(numItems, 10);
      const offset = (parseInt(page, 10) - 1) * limit;

      const { rows: listings, count: totalItems } =
        await Listing.findAndCountAll({
          where: whereClause,
          order: [['createdTimestamp', 'DESC']],
          limit,
          offset,
        });

      const totalPages = Math.ceil(totalItems / limit);

      res.status(httpStatus.OK).json({
        listings,
        pagination: {
          totalItems,
          totalPages,
          currentPage: parseInt(page, 10),
          numItems: limit,
        },
      });
    } catch (error) {
      console.error('Error fetching listings:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to fetch listings',
      });
    }
  },

  updateListing: async (req, res) => {
    const { id } = req.params;
    const { selectedCategory, selectedSubcategory, formData } = req.body;

    try {
      const listing = await Listing.findByPk(id);

      if (!listing) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ error: 'Listing not found' });
      }

      listing.selectedCategory = selectedCategory || listing.selectedCategory;
      listing.selectedSubcategory =
        selectedSubcategory || listing.selectedSubcategory;
      listing.formData = formData || listing.formData;

      await listing.save();

      res.status(httpStatus.OK).json({
        message: 'Listing updated successfully!',
        listing,
      });
    } catch (error) {
      console.error('Error updating listing:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to update listing',
      });
    }
  },

  deleteListing: async (req, res) => {
    const { id } = req.params;

    try {
      const listing = await Listing.findByPk(id);

      if (!listing) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ error: 'Listing not found' });
      }

      await listing.destroy();

      res
        .status(httpStatus.OK)
        .json({ message: 'Listing deleted successfully!' });
    } catch (error) {
      console.error('Error deleting listing:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to delete listing',
      });
    }
  },
};

module.exports = listingController;
