'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class order_detail extends Model {
        static associate(models) {
            order_detail.belongsToMany(models.order, { through: 'order', as: 'orders', foreignKey: 'id_order', otherKey: 'id_order', targetKey: 'id_order', sourceKey: 'id_order' });
            order_detail.belongsToMany(models.product, { through: 'product', as: 'products', foreignKey: 'id_product', otherKey: 'id_product', targetKey: 'id_product', sourceKey: 'id_product' });
        }
    };
    order_detail.init({
        id_order_detail: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        id_order: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'order',
                key: 'id_order'
            }
        },
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'product',
                key: 'id_product'
            }
        }
    }, {
        sequelize,
        tableName: 'order_detail',
        timestamps: false,
    });
    return order_detail;
};
