const { User } = require('./user.model');
const { RefreshToken } = require('./refreshToken.model');

User.hasMany(RefreshToken, { foreignKey: 'userId' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  RefreshToken,
};
