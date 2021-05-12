const models = require('../../database/models');
require('dotenv').config()
const { orderCreateError } = require('../../database/errors/error');

module.exports = {
    Mutation: {
        async createOrder(
            _,
            {
                order
            },
        ) {
            //Inserting on order
            const resultOrder = await models.order.create({
                total: order.total,
                id_user: order.id_user,
            });
            //Inserting on order_detail
            if (resultOrder != null) {
                for (let i = 0; i < order.id_product.length; i++) {
                    await models.order_detail.create({
                        price: order.price[i],
                        quantity: order.quantity[i],
                        subtotal: order.subtotal[i],
                        id_order: resultOrder.id_order,
                        id_product: order.id_product[i]
                    })
                }
                for (let i = 0; i < order.id_product.length; i++) {
                    var ids = order.id_product[i];
                    const products = await models.product.findOne({ where: { id_product: ids } })
                    var result = parseFloat(products.quantity) - parseFloat(order.quantity[i]);
                    await models.product.update({
                        quantity: result
                    }, { where: { id_product: ids } })
                }
            } else {
                throw new orderCreateError;
            }
            return resultOrder;
        },
    },
    Query: {
        async getAllOrders(root, args, context) {
            return models.order.findAll({ include: ['users'] });
        },
        async getSingleOrder(_, { id_order }, context) {
            return models.order.findByPk(id_order, { include: ['users'] });
        },
    },

};