/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable consistent-return */
const {
    responseError,
    responseSuccess,
    getDateYMDHMSCurrent,
    checkParamsValid,
    isEmpty,
    uploadFiles, storage,
    fileFilterImage,
    sliceString,
    beforeUpload,
    deleteFile,
    joinPath,
    getInfoUserDecoded,
} = require('./../../libs/shared');

const uploadImage = uploadFiles(storage('posts', 'images'), fileFilterImage, 'File');

const {
    insertInto, getDataWhere, updateSet, getDataJoinWhere,
} = require('../../libs/sqlStr');
const { response404 } = require('../../libs/httpResponse');
const { executeSql } = require('../../configs/database');
const { TITLE_ADMIN, TYPE_POST } = require('../../configs/constants');

const {
    createValidator, updateValidator, idValidator,
} = require('../../validator/PostValidator');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            const info = getInfoUserDecoded(req.decoded);
            res.render('admin/adm_activity_clb/index', {
                layout: 'adm_activity_clb',
                title: TITLE_ADMIN,
                activity: 'ActivityClb',
                info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
    add: async (req, res) => { // eslint-disable-line
        try {
            const info = getInfoUserDecoded(req.decoded);
            res.render('admin/adm_activity_clb/add', {
                layout: 'adm_activity_clb_add',
                title: TITLE_ADMIN,
                activity: 'ActivityClb',
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
            const infoPost = await getInfo(id);
            const data = JSON.stringify(infoPost);
            if (!isEmpty(infoPost)) {
                return res.render('admin/adm_activity_clb/edit', {
                    layout: 'adm_activity_clb_edit',
                    title: TITLE_ADMIN,
                    activity: 'ActivityClb',
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
            const page = req.query.page ? +req.query.page : 1;
            const limit = req.query.limit ? +req.query.limit : 10;
            const skip = (page - 1) * limit;
            const sqlTotalRecords = getDataWhere('posts', 'COUNT(*) AS totalRecords', `posts.type = N'${TYPE_POST.ACTIVITY_CLB}' AND posts.status != 4`);
            const totalRecords = await new Promise((resolve) => {
                executeSql(sqlTotalRecords, (data, err) => {
                    if (err) { resolve(0); }
                    resolve(data.recordset[0].totalRecords);
                });
            });
            const select = `posts.id, posts.title, posts.category_post_id, posts.created_date, 
            posts.status, category_posts.category_name`;
            const where = `posts.type = N'${TYPE_POST.ACTIVITY_CLB}' AND posts.status != 4 
                            ORDER BY posts.created_date DESC
                            OFFSET ${skip} ROWS
                            FETCH NEXT ${limit} ROWS ONLY`;
            const join = 'category_posts ON  posts.category_post_id = category_posts.id';
            const sql = getDataJoinWhere('posts', select, 'INNER', join, where);
            await executeSql(sql, (data, err) => {
                if (err) { return res.json(responseError(4000, err)); }
                const response = {};
                console.log(data);
                response.docs = data.recordset;
                response.limit = limit;
                response.total = totalRecords;
                response.page = page;
                response.pages = Math.ceil(totalRecords / limit);
                return res.json(responseSuccess(2001, response));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
    create: async (req, res) => {
        try {
            beforeUpload(req, res, async () => {
                req.checkBody(createValidator);
                const errors = req.validationErrors();
                if (errors) {
                    if (!isEmpty(req.files)) {
                        req.files.map((file) => {
                            deleteFile(file.path);
                        });
                    }
                    return res.json(responseError(1002, errors));
                }
                const userDecoded = getInfoUserDecoded(req.decoded);
                const params = req.body;
                const paramsCheckValid = {
                    title: params.title,
                    category_post_id: params.category_post_id,
                };
                if (!checkParamsValid(paramsCheckValid)) {
                    if (!isEmpty(req.files)) {
                        req.files.map((file) => {
                            deleteFile(file.path);
                        });
                    }
                    return res.json(responseError(4004));
                }
                if (!isEmpty(req.files)) {
                    req.files.map((file) => {
                        const stringPath = file.path.split('\\').join('/');
                        params[file.fieldname] = sliceString(stringPath, '/uploads');
                    });
                }
                const daycurrent = getDateYMDHMSCurrent();
                let columns = 'title, content, category_post_id, published_date, created_date, created_by, status, type';
                let values = `N'${params.title || ''}',
                                N'${params.content || ''}',
                                ${params.category_post_id || ''},
                                N'${params.published_date || ''}', 
                                N'${daycurrent}',
                                ${userDecoded.id || '0'}, 
                                1,
                                N'${TYPE_POST.ACTIVITY_CLB}'`;
                if (!isEmpty(params.avatar)) {
                    columns += ',avatar';
                    values += `,N'${params.avatar || ''}'`;
                }
                const strSql = insertInto('posts', columns, values);
                await executeSql(strSql, async (_data, err) => {
                    if (err) {
                        if (!isEmpty(req.files)) {
                            req.files.map((file) => {
                                deleteFile(file.path);
                            });
                        }
                        return res.json(responseError(4002, err));
                    }
                    return res.json(responseSuccess(2003));
                });
            }, uploadImage);
        } catch (error) {
            if (!isEmpty(req.files)) {
                req.files.map((file) => {
                    deleteFile(file.path);
                });
            }
            return res.json(responseError(1003, error));
        }
    },
    getInfo: async (id) => {
        try {
            const select = 'id, title, avatar, category_post_id, published_date, content';
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
    update: async (req, res) => {
        try {
            beforeUpload(req, res, async () => {
                req.checkBody(updateValidator);
                const errors = req.validationErrors();
                if (errors) {
                    if (!isEmpty(req.files)) {
                        req.files.map((file) => {
                            deleteFile(file.path);
                        });
                    }
                    return res.json(responseError(1002, errors));
                }
                const userDecoded = getInfoUserDecoded(req.decoded);
                const params = req.body;
                const avatarOld = params.avatarOld;
                const paramsCheckValid = {
                    title: params.title,
                    category_post_id: params.category_post_id,
                };
                if (!checkParamsValid(paramsCheckValid)) {
                    if (!isEmpty(req.files)) {
                        req.files.map((file) => {
                            deleteFile(file.path);
                        });
                    }
                    return res.json(responseError(4004));
                }
                if (!isEmpty(req.files)) {
                    req.files.map((file) => {
                        const stringPath = file.path.split('\\').join('/');
                        params[file.fieldname] = sliceString(stringPath, '/uploads');
                    });
                }
                const daycurrent = getDateYMDHMSCurrent();
                let values = `title=N'${params.title || ''}',
                                content=N'${params.content || ''}',
                                category_post_id=${params.category_post_id || ''},
                                published_date=N'${params.published_date || ''}', 
                                updated_date=N'${daycurrent}',
                                updated_by=${userDecoded.id || '0'}, 
                                status=1`;
                if (!isEmpty(params.avatar)) {
                    values += `,avatar = N'${params.avatar || ''}'`;
                }
                const where = `id = ${params.id}`;
                const strSql = updateSet('posts', values, where);
                await executeSql(strSql, async (_data, err) => {
                    if (err) {
                        if (!isEmpty(req.files)) {
                            req.files.map((file) => {
                                deleteFile(file.path);
                            });
                        }
                        return res.json(responseError(4005, err));
                    }
                    if (!isEmpty(params.avatar)) {
                        const filePath = joinPath(`../public${avatarOld}`);
                        deleteFile(filePath);
                    }
                    return res.json(responseSuccess(2004));
                });
            }, uploadImage);
        } catch (error) {
            if (!isEmpty(req.files)) {
                req.files.map((file) => {
                    deleteFile(file.path);
                });
            }
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
            const strSql = updateSet('posts', values, where);
            await executeSql(strSql, (data, err) => {
                if (err) { return res.json(responseError(4002, err)); }
                return res.json(responseSuccess(2005));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
    listTitleView: async (req, res) => {
        try {
            const page = req.query.page ? +req.query.page : 1;
            const limit = req.query.limit ? +req.query.limit : 10;
            const skip = (page - 1) * limit;
            const sqlTotalRecords = getDataWhere('posts', 'COUNT(*) AS totalRecords', `posts.type = N'${TYPE_POST.ACTIVITY_CLB}' AND posts.status != 4`);
            const totalRecords = await new Promise((resolve) => {
                executeSql(sqlTotalRecords, (data, err) => {
                    if (err) { resolve(0); }
                    resolve(data.recordset[0].totalRecords);
                });
            });
            const select = `posts.id, posts.title, posts.category_post_id, posts.published_date, 
            posts.created_date, posts.avatar, category_posts.category_name`;
            const where = `posts.type = N'${TYPE_POST.ACTIVITY_CLB}' AND posts.status = 1 
                            ORDER BY posts.created_date DESC
                            OFFSET ${skip} ROWS
                            FETCH NEXT ${limit} ROWS ONLY`;
            const join = 'category_posts ON  posts.category_post_id = category_posts.id';
            const sql = getDataJoinWhere('posts', select, 'INNER', join, where);
            await executeSql(sql, (data, err) => {
                if (err) { return res.json(responseError(4000, err)); }
                const response = {};
                response.docs = data.recordset;
                response.limit = limit;
                response.total = totalRecords;
                response.page = page;
                response.pages = Math.ceil(totalRecords / limit);
                return res.json(responseSuccess(2001, response));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
};
