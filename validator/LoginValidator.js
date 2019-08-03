
const username = {
    username: {
        notEmpty: true,
    },
};

const password = {
    password: {
        notEmpty: true,
    },
};


const loginValidator = Object.assign({}, username, password);

module.exports = {
    loginValidator,
};
