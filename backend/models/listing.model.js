const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../startup/db');

class Listing extends Model {}

Listing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT',
    },
    selectedCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selectedSubcategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    formData: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isObject(value) {
          if (typeof value !== 'object' || Array.isArray(value)) {
            throw new Error('formData must be a JSON object');
          }
        },
      },
    },
    createdTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Listing',
    tableName: 'listings',
    timestamps: false,
  }
);

module.exports = { Listing };
