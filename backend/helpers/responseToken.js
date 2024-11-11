const jwt = require('jsonwebtoken');

const {
  generateRefreshToken,
  generateAccessToken,
} = require('../models/user.model');
const { RefreshToken } = require('../models/refreshToken.model');

const responseToken = {
  setAccessToken: (user, response) => {
    const accessToken = generateAccessToken(user);

    response.header('access-token', accessToken);
  },

  setRefreshToken: async (user, response) => {
    const refreshToken = generateRefreshToken(user);

    const decodedToken = jwt.decode(refreshToken);

    if (!decodedToken || !decodedToken.exp) {
      throw new Error('Invalid token generated');
    }

    const expirationDate = new Date(decodedToken.exp * 1000);

    await RefreshToken.upsert(
      {
        userId: user.id,
        token: refreshToken,
        expiresAt: expirationDate,
        isValid: true,
      },
      {
        where: { userId: user.id },
      }
    );

    response.header('refresh-token', refreshToken);
  },
};

module.exports = responseToken;
