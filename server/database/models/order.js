'use strict';
const moment = require('moment')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    static associate(models) {
      order.belongsToMany(models.user, { through: 'user', as: 'users', foreignKey: 'id_user', otherKey: 'id_user', targetKey: 'id_user', sourceKey: 'id_user' });
    }
  };
  order.init({
    id_order: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id_user'
      }
    },
    createdAt: {
      type: DataTypes.STRING,
      get: function () {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD, hh:mm:ss');
      }
    },
    updatedAt: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order',
    modelName: 'order',
    timestamps: true,
  });
  return order;
};
