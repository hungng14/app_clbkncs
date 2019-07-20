/* eslint-disable no-unused-vars */
const { isMobilePhone } = require('../libs/shared');

const idValidator = {
    id: {
        notEmpty: true,
        isNumeric: true,
    },
};

const name = {
    name: {
        notEmpty: true,
    },
};

const address = {
    address: {
        notEmpty: true,
    },
};

const position = {
    position: {
        notEmpty: true,
    },
};

const phone = {
    phone: {
        optional: true,
        custom: {
            options: value => isMobilePhone(value),
        },
    },
};

const username = {
    username: {
        notEmpty: true,
    },
};

const password = {
    password: {
        isLength: {
            errorMessage: 'Password should be at least 5 chars long',
            options: { min: 5 },
        },
    },
};

const repassword = {
    repassword: {
        notEmpty: true,
    },
};

const accountIdValidator = {
    account_id: {
        notEmpty: true,
        isNumeric: true,
    },
};

const createValidator = Object.assign({}, name, address, phone);
const updateValidator = Object.assign({}, idValidator, name, address, phone);
const createAccountValidator = Object.assign({}, username, password, repassword,
    position, name, address, phone);
const updateAccountValidator = Object.assign({}, accountIdValidator, position, name,
    address, phone);

module.exports = {
    idValidator,
    createValidator,
    createAccountValidator,
    updateValidator,
    updateAccountValidator,
    accountIdValidator,
};
