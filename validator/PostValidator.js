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

const category_post_id = {
    category_post_id: {
        notEmpty: true,
    },
};


const createValidator = Object.assign({}, title, content, category_post_id);
const updateValidator = Object.assign({}, idValidator, title, content, category_post_id);

module.exports = {
    idValidator,
    createValidator,
    updateValidator,
};
