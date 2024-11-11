const { DataTypes, Model } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const { sequelize } = require('../startup/db');

class User extends Model {
  toSafeObject() {
    const {
      id,
      firstName,
      lastName,
      username,
      email,
      address,
      isEmailVerified,
      isSignUpFromGoogle,
      isSignUpFromFacebook,
      isActive,
      createdTimestamp,
      modifiedTimestamp,
    } = this;
    return {
      id,
      firstName,
      lastName,
      username,
      email,
      address,
      isEmailVerified,
      isSignUpFromGoogle,
      isSignUpFromFacebook,
      isActive,
      createdTimestamp,
      modifiedTimestamp,
    };
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isSignUpFromGoogle: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isSignUpFromFacebook: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    modifiedTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  }
);

User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

function generateAccessToken(user) {
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });
}

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().max(100).required(),
    lastName: Joi.string().max(100).required(),
    username: Joi.string().max(100).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().optional().allow(null, ''),
    address: Joi.string().optional().allow(null, ''),
  });

  return schema.validate(user);
}

module.exports = {
  User,
  generateAccessToken,
  generateRefreshToken,
  validateUser,
};
