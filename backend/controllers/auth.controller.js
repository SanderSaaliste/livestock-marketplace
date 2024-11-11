const httpStatus = require('http-status-codes').StatusCodes;
const bcrypt = require('bcrypt');

const { User } = require('../models/user.model');
const Auth = require('../models/auth.model');
const { RefreshToken } = require('../models/refreshToken.model');
const responseToken = require('../helpers/responseToken');

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const { error } = Auth.validateAuth(req.body);

    if (error) {
      console.warn(`Invalid data format: ${error}`);

      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: `Invalid data format: ${error}` });
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      console.warn('Invalid email or password');

      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: 'Invalid email or password' });
    }

    if (!user.isActive) {
      console.warn('Access denied. User not active');

      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: 'Access denied. User not active' });
    }

    if (!user.password) {
      if (user.isSignUpFromGoogle) {
        console.warn('Access denied. User registered via Google');

        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ error: 'Access denied. User registered via Google' });
      }

      if (user.isSignUpFromFacebook) {
        console.warn('Access denied. User registered via Facebook');

        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ error: 'Access denied. User registered via Facebook' });
      }
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      console.warn('Invalid email or password');

      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: 'Invalid email or password' });
    }

    responseToken.setAccessToken(user, res);
    await responseToken.setRefreshToken(user, res);

    res.status(httpStatus.OK).json({
      message: 'Login Successful!',
      user: user.toSafeObject(),
    });
  },

  registerOrLoginUser: async (req, res) => {
    const { user } = req;
    const { firstName, lastName, email, provider } = req.body;

    let existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      const newUser = await User.create({
        firstName,
        lastName,
        username: email,
        email,
        isSignUpFromGoogle: provider === 'google',
        isSignUpFromFacebook: provider === 'facebook',
      });

      responseToken.setAccessToken(newUser, res);
      await responseToken.setRefreshToken(newUser, res);

      return res.status(201).json({
        message: 'User registered successfully!',
        user: newUser.toSafeObject(),
      });
    }

    responseToken.setAccessToken(existingUser, res);
    await responseToken.setRefreshToken(existingUser, res);

    res.status(200).json({
      message: 'User logged in successfully!',
      user: existingUser.toSafeObject(),
    });
  },

  logout: async (req, res) => {
    await RefreshToken.update(
      { isValid: false },
      { where: { userId: req.user.id } }
    );

    res.status(httpStatus.OK).json({
      message: 'Logged out successfully!',
    });
  },
};

module.exports = authController;
