const { User } = require('./user.model');
const { RefreshToken } = require('./refreshToken.model');
const { Listing } = require('./listing.model');
const { UserReview } = require('./userReview.model');

User.hasMany(RefreshToken, { foreignKey: 'userId' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Listing, { foreignKey: 'userId' });
Listing.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(UserReview, { foreignKey: 'reviewerId', as: 'reviewer' });
UserReview.belongsTo(User, { foreignKey: 'reviewerId', as: 'reviewer' });

User.hasMany(UserReview, { foreignKey: 'reviewedId', as: 'reviewed' });
UserReview.belongsTo(User, { foreignKey: 'reviewedId', as: 'reviewed' });

module.exports = {
  User,
  RefreshToken,
  Listing,
  UserReview,
};
