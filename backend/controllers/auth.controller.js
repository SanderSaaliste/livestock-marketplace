const httpStatus = require('http-status-codes').StatusCodes;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const { User, generateAccessToken } = require('../models/user.model');
const Auth = require('../models/auth.model');
const { RefreshToken } = require('../models/refreshToken.model');
const responseToken = require('../helpers/responseToken');
const { sendVerifyEmail } = require('../helpers/email');

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

    if (!user.isEmailVerified) {
      console.warn('Access denied. Email not verified');

      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: 'Access denied. Email not verified' });
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
    const { firstName, lastName, email, provider } = req.body;

    if (!email || !provider) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: 'Email and provider are required fields.',
      });
    }

    let existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username: email }],
        password: null,
      },
    });

    if (!existingUser) {
      if (!firstName || !lastName) {
        return res.status(httpStatus.BAD_REQUEST).json({
          error:
            'First name and last name are required for new user registration.',
        });
      }

      const newUser = await User.create({
        firstName,
        lastName,
        username: email,
        email,
        isEmailVerified: true,
        isSignUpFromGoogle: provider === 'google',
        isSignUpFromFacebook: provider === 'facebook',
      });

      responseToken.setAccessToken(newUser, res);
      await responseToken.setRefreshToken(newUser, res);

      return res.status(httpStatus.CREATED).json({
        message: 'User registered successfully!',
        user: newUser.toSafeObject(),
      });
    }

    responseToken.setAccessToken(existingUser, res);
    await responseToken.setRefreshToken(existingUser, res);

    res.status(httpStatus.OK).json({
      message: 'User logged in successfully!',
      user: existingUser.toSafeObject(),
    });
  },

  resendVerificationEmail: async (req, res) => {
    const { email } = req.body;

    if (!email) {
      console.warn('Email is required to resend verification email.');

      return res.status(httpStatus.BAD_REQUEST).json({
        error: 'Email is required to resend verification email.',
      });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      console.warn('User not found');

      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: 'User not found.' });
    }

    if (user.isEmailVerified) {
      console.warn('Email is already verified');

      return res.status(httpStatus.OK).json({
        message: 'Email is already verified.',
      });
    }

    sendVerifyEmail(user.email, generateAccessToken(user));

    res.status(httpStatus.OK).json({
      message: 'Verification email sent successfully.',
    });
  },

  verifyEmail: async (req, res) => {
    const { token } = req.body;

    if (!token) {
      console.warn('Verification token is required');

      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: 'Verification token is required.' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      console.warn('Token verification failed:', err);

      return res.status(httpStatus.BAD_REQUEST).json({
        error: 'Invalid or expired token.',
      });
    }

    const user = await User.findByPk(decoded.id);

    if (!user) {
      console.warn('User not found');

      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: 'User not found.' });
    }

    if (user.isEmailVerified) {
      console.warn('Email is already verified');

      return res.status(httpStatus.OK).json({
        message: 'Email is already verified.',
      });
    }

    user.isEmailVerified = true;
    await user.save();

    return res.status(httpStatus.OK).json({
      message: 'Email verified successfully!',
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
