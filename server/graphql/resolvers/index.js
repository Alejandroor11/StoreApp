const { mergeResolvers } = require('@graphql-tools/merge');
const userResolver = require('./user');
const productResolver = require('./product');
const orderResolver = require('./order');
const categoryResolver = require('./category');
const oDetailsResolver = require('./order_detail');

const Resolvers = [
    userResolver,
    productResolver,
    orderResolver,
    categoryResolver,
    oDetailsResolver
];

module.exports = mergeResolvers(Resolvers);