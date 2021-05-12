const models = require('../../database/models');

module.exports = {
    Query: {
        async getAllODetails(root, args, context) {
            return models.order_detail.findAll({ include: ['orders','products'] });
        },
        async getSingleODetail(_, { id_order_detail }, context) {
            return models.order_detail.findByPk(id_order_detail, { include: ['orders','products'] });
        },
    },

};