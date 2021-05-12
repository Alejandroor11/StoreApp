const { createError } = require('apollo-errors');


const orderCreateError = createError('orderCreateError', { message: 'Error creating a new order'});
const userCreateError = createError('userCreateError', { message: 'Error creating a new user'});
const userLoginError = createError('userLoginError', { message: 'Error login with user'});
const orderUpdateError = createError('orderUpdateError', { message: 'Error updating a new order'});

module.exports = { orderCreateError, userCreateError, userLoginError, orderUpdateError};