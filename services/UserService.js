/* eslint-disable no-return-await */
const { executeSql } = require('../configs/database');

module.exports = {
    list: async (query) => {
        await executeSql('SELECT * FROM users', (data, err) => {
            if (err) { return err; }
            return Promise.resolve(data);
        });
    },
};
