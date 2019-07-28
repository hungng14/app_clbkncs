/* eslint-disable consistent-return */
const {
    responseError,
    responseSuccess,
    getDateYMDHMSCurrent,
    checkParamsValid,
} = require('./../../libs/shared');
const {
    insertInto, getDataWhere,
} = require('../../libs/sqlStr');
const { executeSql } = require('../../configs/database');

const {
    createValidator,
} = require('../../validator/CategoryPostValidator');

module.exports = {
    listActive: async (req, res) => {
        try {
            const select = 'id, category_name';
            const where = 'status = 1';
            const sql = getDataWhere('category_posts', select, where);
            await executeSql(sql, (data, err) => {
                if (err) { return res.json(responseError(4000, err)); }
                return res.json(responseSuccess(2001, data.recordset));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
    create: async (req, res) => {
        try {
            req.checkBody(createValidator);
            const errors = req.validationErrors();
            if (errors) {
                return res.json(responseError(1002, errors));
            }
            const params = req.body;
            if (!checkParamsValid(params)) {
                return res.json(responseError(4004));
            }
            const daycurrent = getDateYMDHMSCurrent();
            const columns = 'category_name, created_date, created_by, status';
            const values = `N'${params.category_name || ''}',
                            N'${daycurrent}',
                            ${params.created_by || ''}, 
                            1`;
            const strSql = insertInto('category_posts', columns, values);
            await executeSql(strSql, (data, err) => {
                if (err) { return res.json(responseError(4002, err)); }
                return res.json(responseSuccess(2003));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
};
