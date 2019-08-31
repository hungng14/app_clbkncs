const {
    responseError, isEmpty, responseSuccess
} = require('./../../libs/shared');
const { TITLE_USERS } = require('../../configs/constants');
const {
    getDataWhere,
} = require('../../libs/sqlStr');
const { response404 } = require('../../libs/httpResponse');
const { executeSql } = require('../../configs/database');

module.exports = {
    listView: async (req, res) => {
        try {
            const select = 'id, title, name';
            const where = 'status != 4 ORDER BY created_date DESC';
            const sql = getDataWhere('department', select, where);
            await executeSql(sql, (data, err) => {
                console.log(err)
                if (err) { return res.json(responseError(4000, err)); }
                return res.json(responseSuccess(2001, data.recordset));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
    viewInfo: async (req, res) => { // eslint-disable-line
        try {
            const { id } = req.query;
            const { getInfo } = module.exports;
            const infoDepartment = await getInfo(id);
            const data = JSON.stringify(infoDepartment);
            if (!isEmpty(infoDepartment)) {
                return res.render('users/department/info', {
                    layout: 'info_department',
                    title: TITLE_USERS,
                    activity: 'Department',
                    data,
                });
            }
            return response404(res);
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
    getInfo: async (id) => {
        try {
            const select = 'id, title, name, content';
            const where = `id=${id}`;
            const sql = getDataWhere('department', select, where);
            const info = await new Promise((resolve, reject) => {
                executeSql(sql, (data, err) => {
                    if (err) { reject({}); }
                    resolve(data.recordset[0]);
                });
            });
            return info;
        } catch (error) {
            return {};
        }
    },
};
