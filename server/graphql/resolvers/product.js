const { product } = require('../../database/models');
require('dotenv').config()

module.exports = {
    Query: {
        async getAllProducts(root, args, context) {
            return product.findAll({ include: ['categories'] });
        },
        async getSingleProduct(_, { Id_rol }, context) {
            return product.findByPk(Id_rol, { include: ['categories'] });
        },
    },

};