const { Model, DataTypes } = require('sequelize');
const Joi = require('joi');

const { sequelize } = require('../startup/db');

class UserReview extends Model {}

UserReview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    reviewerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT',
    },
    reviewedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT',
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'UserReview',
    tableName: 'userReviews',
    timestamps: false,
  }
);

function validateUserReview(review) {
  const schema = Joi.object({
    reviewedId: Joi.number().integer().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().optional().allow(null, ''),
  });

  return schema.validate(review);
}

module.exports = { UserReview, validateUserReview };
