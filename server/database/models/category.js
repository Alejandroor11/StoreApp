'use strict';
const {
  Model
} = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  class category extends Model {
    static associate(models) {
    }
  };
  category.init({
    id_category: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'category',
    tableName: 'category',
    timestamps: false,
  });
  return category;
};
