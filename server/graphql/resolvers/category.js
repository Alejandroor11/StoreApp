const { category } = require('../../database/models');
require('dotenv').config()

module.exports = {
    Query: {
        async getAllCategories(root, args, context) {
            return category.findAll();
        },
    },

};