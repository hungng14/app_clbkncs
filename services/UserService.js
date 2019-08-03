/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-return-await */
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
    hashPassword: async (password) => {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
        return hashedPassword;
    },
    comparePassword: async (password, hashedPassword) => {
        const match = await new Promise((resolve, reject) => {
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (err) reject(false);
                resolve(result);
            });
        });
        return match;
    },
};
