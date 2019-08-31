/* eslint-disable prefer-promise-reject-errors */
const {
    responseError,
    responseSuccess,
    getDateYMDHMSCurrent,
    checkParamsValid,
    isEmpty,
    getInfoUserDecoded,
} = require('./../../libs/shared');
const {
    insertInto, getDataWhere, updateSet,
} = require('../../libs/sqlStr');
const { response404 } = require('../../libs/httpResponse');
const { executeSql } = require('../../configs/database');
const { TITLE_ADMIN } = require('../../configs/constants');

const {
    createValidator, updateValidator, idValidator,
} = require('../../validator/DepartmentValidator');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            const info = getInfoUserDecoded(req.decoded);
            res.render('admin/department/index', {
                layout: 'department',
                title: TITLE_ADMIN,
                activity: 'Department',
                info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
    add: async (req, res) => { // eslint-disable-line
        try {
            const info = getInfoUserDecoded(req.decoded);
            res.render('admin/department/add', {
                layout: 'add_department',
                title: TITLE_ADMIN,
                activity: 'Department',
                info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
    edit: async (req, res) => { // eslint-disable-line
        try {
            const info = getInfoUserDecoded(req.decoded);
            const { id } = req.query;
            const { getInfo } = module.exports;
            const infoDepartment = await getInfo(id);
            const data = JSON.stringify(infoDepartment);
            if (!isEmpty(infoDepartment)) {
                return res.render('admin/department/edit', {
                    layout: 'edit_department',
                    title: TITLE_ADMIN,
                    activity: 'Department',
                    data,
                    info,
                });
            }
            return response404(res);
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
    list: async (req, res) => {
        try {
            const select = 'id, title, name, status, created_date';
            const where = 'status != 4 ORDER BY created_date DESC';
            const sql = getDataWhere('department', select, where);
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
            const userDecoded = getInfoUserDecoded(req.decoded);
            const params = req.body;
            const paramsCheckValid = {
                title: params.title,
                name: params.name,
            };
            if (!checkParamsValid(paramsCheckValid)) {
                return res.json(responseError(4004));
            }
            const daycurrent = getDateYMDHMSCurrent();
            const columns = 'title, content, name, created_date, created_by, status';
            const values = `N'${params.title || ''}',
                            N'${params.content || ''}',
                            N'${params.name || ''}', 
                            N'${daycurrent}',
                            ${userDecoded.id || '0'}, 
                            1`;
            const strSql = insertInto('department', columns, values);
            await executeSql(strSql, async (_data, err) => {
                if (err) {
                    return res.json(responseError(4002, err));
                }
                return res.json(responseSuccess(2003));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
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
    update: async (req, res) => {
        try {
            req.checkBody(updateValidator);
            const errors = req.validationErrors();
            if (errors) {
                return res.json(responseError(1002, errors));
            }
            const userDecoded = getInfoUserDecoded(req.decoded);
            const params = req.body;
            const paramsCheckValid = {
                title: params.title,
                name: params.name,
            };
            if (!checkParamsValid(paramsCheckValid)) {
                return res.json(responseError(4004));
            }
            const daycurrent = getDateYMDHMSCurrent();
            const values = `title=N'${params.title || ''}',
                            content=N'${params.content || ''}',
                            name=N'${params.name || ''}',
                            updated_date=N'${daycurrent}',
                            updated_by=${userDecoded.id || '0'}, 
                            status=1`;
            const where = `id = ${params.id}`;
            const strSql = updateSet('department', values, where);
            await executeSql(strSql, async (_data, err) => {
                if (err) {
                    return res.json(responseError(4005, err));
                }
                return res.json(responseSuccess(2004));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
    delete: async (req, res) => {
        try {
            req.checkBody(idValidator);
            const errors = req.validationErrors();
            if (errors) {
                return res.json(responseError(1002, errors));
            }
            const userDecoded = getInfoUserDecoded(req.decoded);
            const params = req.body;
            const daycurrent = getDateYMDHMSCurrent();
            const values = `status = 4, updated_date = N'${daycurrent}', updated_by = ${userDecoded.id || '0'}`;
            const where = `id = ${params.id}`;
            const strSql = updateSet('department', values, where);
            await executeSql(strSql, (data, err) => {
                if (err) { return res.json(responseError(4002, err)); }
                return res.json(responseSuccess(2005));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
};
