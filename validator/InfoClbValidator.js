/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const idValidator = {
    id: {
        notEmpty: true,
        isNumeric: true,
    },
};

const slogan = {
    slogan: {
        notEmpty: true,
    },
};

const user_id = {
    user_id: {
        notEmpty: true,
    },
};

const address = {
    address: {
        notEmpty: true,
    },
};

const phone = {
    phone: {
        notEmpty: true,
    },
};

const email = {
    email: {
        notEmpty: true,
    },
};


const updateValidator = Object.assign({}, idValidator, slogan, user_id, address, phone, email);

module.exports = {
    updateValidator,
};
