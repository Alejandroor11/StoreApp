const { mergeTypeDefs } = require('@graphql-tools/merge');
const userType = require('./user');
const productType = require('./product');
const categoryType = require('./category');
const orderType = require('./order');
const oDetailType = require('./order_detail');

const types = [
    userType,
    productType,
    categoryType,
    orderType,
    oDetailType
];

module.exports = mergeTypeDefs(types);