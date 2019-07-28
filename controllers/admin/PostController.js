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
const { TITLE_ADMIN } = require('../../configs/constants');

const {
    createValidator, updateValidator, idValidator,
} = require('../../validator/PostValidator');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            const info = getInfoUserDecoded(req.decoded);
            res.render('admin/post/index', {
                layout: 'post',
                title: TITLE_ADMIN,
                activity: 'Post',
                info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
    add: async (req, res) => { // eslint-disable-line
        try {
            const info = getInfoUserDecoded(req.decoded);
            res.render('admin/post/add', {
                layout: 'add_post',
                title: TITLE_ADMIN,
                activity: 'Post',
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
                return res.render('admin/post/edit', {
                    layout: 'edit_post',
                    title: TITLE_ADMIN,
                    activity: 'Post',
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
            const select = `posts.id, posts.title, posts.category_post_id, posts.created_date, 
            posts.status, category_posts.category_name`;
            const where = 'posts.status != 4 ORDER BY posts.created_date  DESC';
            const join = 'category_posts ON  posts.category_post_id = category_posts.id';
            const sql = getDataJoinWhere('posts', select, 'INNER', join, where);
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
                let columns = 'title, content, category_post_id, published_date, created_date, created_by, status';
                let values = `N'${params.title || ''}',
                                N'${params.content || ''}',
                                ${params.category_post_id || ''},
                                N'${params.published_date || ''}', 
                                N'${daycurrent}',
                                ${params.created_by || '0'}, 
                                1`;
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
                                updated_by=${params.updated_by || '0'}, 
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
            const params = req.body;
            const daycurrent = getDateYMDHMSCurrent();
            const values = `status = 4, updated_date = N'${daycurrent}', updated_by = ${params.updated_by || 'NULL'}`;
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
            const select = `posts.id, posts.title, posts.category_post_id, posts.published_date, 
            posts.created_date, posts.avatar, category_posts.category_name`;
            const where = 'posts.status = 1 ORDER BY posts.created_date DESC';
            const join = 'category_posts ON  posts.category_post_id = category_posts.id';
            const sql = getDataJoinWhere('posts', select, 'INNER', join, where);
            await executeSql(sql, (data, err) => {
                if (err) { return res.json(responseError(4000, err)); }
                return res.json(responseSuccess(2001, data.recordset));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
};
