'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      product.belongsToMany(models.category, { through: 'category', as: 'categories', foreignKey: 'id_category', otherKey: 'id_category', targetKey: 'id_category', sourceKey: 'id_category' });
    }
  };
  product.init({
    id_product: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category',
        key: 'id_category'
      }
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: false,
  });
  return product;
};
