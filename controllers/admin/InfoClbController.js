/* eslint-disable prefer-destructuring */
const {
    responseError,
    responseSuccess,
    beforeUpload,
    uploadFiles,
    storage,
    fileFilterImage,
    isEmpty,
    sliceString,
    getDateYMDHMSCurrent,
    deleteFile,
    joinPath,
    getInfoUserDecoded,
} = require('./../../libs/shared');
const { TITLE_ADMIN } = require('../../configs/constants');
const {
    getDataJoinWhere, updateSet,
} = require('../../libs/sqlStr');
const { executeSql } = require('../../configs/database');

const uploadImage = uploadFiles(storage('info-club', 'images'), fileFilterImage, 'File');

const { updateValidator } = require('../../validator/InfoClbValidator');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            const info = getInfoUserDecoded(req.decoded);
            res.render('admin/infoClb/index', {
                layout: 'infoClb',
                title: TITLE_ADMIN,
                activity: 'InfoClb',
                info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
    getInfo: async (req, res) => {
        try {
            const select = `info_club.id, info_club.slogan, info_club.address, info_club.phone, 
            info_club.scales, info_club.user_id, info_club.avatar, info_club.logo, info_club.field_of_activity, 
            info_club.work_start_time, info_club.work_end_time, info_club.email, users.name`;
            const where = 'info_club.status !=4';
            const join = 'users ON  info_club.user_id = users.id';
            const sql = getDataJoinWhere('info_club', select, 'INNER', join, where);
            await executeSql(sql, (data, err) => {
                if (err) { return res.json(responseError(4001, err)); }
                return res.json(responseSuccess(2002, data.recordset[0]));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
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
                const logoOld = params.logoOld;
                if (!isEmpty(req.files)) {
                    req.files.map((file) => {
                        const stringPath = file.path.split('\\').join('/');
                        params[file.fieldname] = sliceString(stringPath, '/uploads');
                    });
                }
                const daycurrent = getDateYMDHMSCurrent();
                let values = `slogan = N'${params.slogan || 'NULL'}',
                            address = N'${params.address || 'NULL'}', 
                            email = N'${params.email || 'NULL'}', 
                            phone = N'${params.phone || 'NULL'}', 
                            scales = N'${params.scales || 'NULL'}', 
                            user_id = ${params.user_id || 'NULL'}, 
                            work_start_time = N'${params.work_start_time || 'NULL'}', 
                            work_end_time = N'${params.work_end_time || 'NULL'}', 
                            field_of_activity = N'${params.field_of_activity || 'NULL'}', 
                            updated_date = N'${daycurrent}', 
                            updated_by = ${params.updated_by || 'NULL'}`;
                if (!isEmpty(params.avatar)) {
                    values += `,avatar = N'${params.avatar || 'NULL'}'`;
                }
                if (!isEmpty(params.logo)) {
                    values += `,logo = N'${params.logo || 'NULL'}'`;
                }
                const where = `id = ${params.id}`;
                const strSql = updateSet('info_club', values, where);
                await executeSql(strSql, (data, err) => {
                    if (err) {
                        if (!isEmpty(req.files)) {
                            req.files.map((file) => {
                                deleteFile(file.path);
                            });
                        }
                        return res.json(responseError(4002, err));
                    }
                    if (!isEmpty(params.avatar)) {
                        const filePath = joinPath(`../public${avatarOld}`);
                        deleteFile(filePath);
                    }
                    if (!isEmpty(params.logo)) {
                        const filePath = joinPath(`../public${logoOld}`);
                        deleteFile(filePath);
                    }
                    return res.json(responseSuccess(2004));
                });
            }, uploadImage);
        } catch (err) {
            if (!isEmpty(req.files)) {
                req.files.map((file) => {
                    deleteFile(file.path);
                });
            }
            return res.status(500).json(responseError(1001, err));
        }
    },
    getInfoView: async (req, res) => {
        try {
            const select = `info_club, info_club.slogan, info_club.address, info_club.phone, 
            info_club.scales, info_club.avatar, info_club.logo, info_club.field_of_activity, 
            info_club.work_start_time, info_club.work_end_time, info_club.email, users.name`;
            const where = 'info_club.status !=4';
            const join = 'users ON  info_club.user_id = users.id';
            const sql = getDataJoinWhere('info_club', select, 'INNER', join, where);
            await executeSql(sql, (data, err) => {
                if (err) { return res.json(responseError(4001, err)); }
                return res.json(responseSuccess(2002, data.recordset[0]));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
};
