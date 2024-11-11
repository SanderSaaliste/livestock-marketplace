const httpStatus = require('http-status-codes').StatusCodes;
const { Op } = require('sequelize');

const { User, validateUser } = require('../models/user.model');

const userController = {
  register: async (req, res) => {
    const { firstName, lastName, username, email, password, address } =
      req.body;

    const { error } = validateUser(req.body);

    if (error) {
      console.warn(`Invalid data format: ${error}`);

      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: `Invalid data format: ${error}` });
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      console.log('User already registered');

      return res
        .status(httpStatus.CONFLICT)
        .json({ error: 'User already registered' });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
      address,
    });

    res.status(httpStatus.CREATED).json({
      message: 'User registered successfully!',
      user: newUser.toSafeObject(),
    });
  },

  getMyUser: async (req, res) => {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      console.warn('User not found');

      return res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
    }

    if (!user.isActive) {
      console.warn('Access denied. User not active');

      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: 'Access denied. User not active' });
    }

    res.status(httpStatus.OK).json(user.toSafeObject());
  },
};

module.exports = userController;
