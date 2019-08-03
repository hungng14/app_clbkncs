/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const idValidator = {
    id: {
        notEmpty: true,
        isNumeric: true,
    },
};

const category_name = {
    category_name: {
        notEmpty: true,
    },
};


const createValidator = Object.assign({}, category_name);
const updateValidator = Object.assign({}, idValidator, category_name);

module.exports = {
    idValidator,
    createValidator,
    updateValidator,
};
