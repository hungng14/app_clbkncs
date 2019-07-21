/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable consistent-return */
const {
    responseError,
    responseSuccess,
    getDateYMDHMSCurrent,
    checkParamsValid,
    isEmpty,
} = require('./../../libs/shared');
const {
    insertInto, getDataWhere,
} = require('../../libs/sqlStr');
const { response404 } = require('../../libs/httpResponse');
const { executeSql } = require('../../configs/database');
const { TITLE_ADMIN } = require('../../configs/constants');

const {
    createValidator, updateValidator, idValidator,
} = require('../../validator/PostValidator');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            // const Info = getInfoUserSession(req);
            res.render('admin/post/index', {
                layout: 'post',
                title: TITLE_ADMIN,
                activity: 'Post',
                // Info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
    add: async (req, res) => { // eslint-disable-line
        try {
            // const Info = getInfoUserSession(req);
            res.render('admin/post/add', {
                layout: 'add_post',
                title: TITLE_ADMIN,
                activity: 'Post',
                // Info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
    edit: async (req, res) => { // eslint-disable-line
        try {
            const { id } = req.query;
            const { getInfo } = module.exports;
            let Info = await getInfo(id);
            // info = JSON.stringify(info);
            if (!isEmpty(Info)) {
                return res.render('admin/post/edit', {
                    layout: 'edit_post',
                    title: TITLE_ADMIN,
                    activity: 'Post',
                    id: Info.id,
                    content: Info.content,
                });
            }
            return response404(res);
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
    list: async (req, res) => {
        try {
            const select = 'id, title, content, category_post_id, created_date, status';
            const where = 'status != 4';
            const sql = getDataWhere('posts', select, where);
            await executeSql(sql, (data, err) => {
                if (err) { return res.json(responseError(4000, err));}
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
            const paramsCheckValid = {
                title: params.title,
                category_post_id: params.category_post_id,
            };
            if (!checkParamsValid(paramsCheckValid)) {
                return res.json(responseError(4004));
            }
            const daycurrent = getDateYMDHMSCurrent();
            const columns = 'title, content, category_post_id, published_date, created_date, created_by, status';
            const values = `N'${params.title || 'NULL'}',
                            N'${params.content || 'NULL'}',
                            ${params.category_post_id || 'NULL'},
                            N'${params.published_date || 'NULL'}', 
                            N'${daycurrent}',
                            ${params.created_by || 'NULL'}, 
                            2`;
            const strSql = insertInto('posts', columns, values);
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
            const select = 'id, title, category_post_id, published_date, content';
            const where = `id=${id}`;
            const sql = getDataWhere('posts', select, where);
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
