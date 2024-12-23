const { User } = require('./user.model');
const { RefreshToken } = require('./refreshToken.model');
const { Listing } = require('./listing.model');

User.hasMany(RefreshToken, { foreignKey: 'userId' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Listing, { foreignKey: 'userId' });
Listing.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  RefreshToken,
  Listing,
};
