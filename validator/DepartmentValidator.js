/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const idValidator = {
    id: {
        notEmpty: true,
        isNumeric: true,
    },
};

const title = {
    title: {
        notEmpty: true,
    },
};

const content = {
    content: {
        notEmpty: true,
    },
};

const name = {
    name: {
        notEmpty: true,
    },
};


const createValidator = Object.assign({}, title, content, name);
const updateValidator = Object.assign({}, idValidator, title, content, name);

module.exports = {
    idValidator,
    createValidator,
    updateValidator,
};
