/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable consistent-return */
const {
    responseError,
    responseSuccess,
    getDateYMDHMSCurrent,
    compareValue,
    isEmpty,
    checkParamsValid,
} = require('./../../libs/shared');
const {
    insertInto, getDataWhere, getDataJoin, updateSet, getDataJoinWhere, removeRecord,
} = require('../../libs/sqlStr');
const { TITLE_ADMIN } = require('../../configs/constants');

const UserService = require('../../services/UserService');
const { executeSql } = require('../../configs/database');

const {
    idValidator, createValidator, createAccountValidator,
    updateValidator, updateAccountValidator, accountIdValidator,
} = require('../../validator/UserValidator');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            // const Info = getInfoUserSession(req);
            res.render('admin/user/index', {
                layout: 'user',
                title: TITLE_ADMIN,
                activity: 'User',
                // Info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
    list: async (req, res) => {
        try {
            const select = 'id, name, address, avatar, position, created_date, phone, status';
            const where = 'account_id IS NULL AND status != 4 ORDER BY users.created_date  DESC';
            const sql = getDataWhere('users', select, where);
            await executeSql(sql, (data, err) => {
                if (err) { return res.json(responseError(4000, err)); }
                return res.json(responseSuccess(2001, data.recordset));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
    getInfo: async (req, res) => {
        try {
            req.checkQuery(idValidator);
            const errors = req.validationErrors();
            if (errors) {
                return res.json(responseError(1002, errors));
            }
            const select = 'id, name, address, position, phone, birthday, status';
            const where = `id=${req.query.id}`;
            const sql = getDataWhere('users', select, where);
            await executeSql(sql, (data, err) => {
                if (err) { return res.json(responseError(4001, err)); }
                return res.json(responseSuccess(2002, data.recordset[0]));
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
            const columns = 'name, address, avatar, position, phone, birthday, created_date, created_by, status';
            const values = `N'${params.name || 'NULL'}',
                            N'${params.address || 'NULL'}',
                            N'${params.avatar || 'NULL'}',
                            N'${params.position || 'NULL'}', 
                            N'${params.phone || 'NULL'}', 
                            N'${params.birthday || 'NULL'}',
                            N'${daycurrent}',
                            ${params.created_by || 'NULL'}, 
                            1`;
            const strSql = insertInto('users', columns, values);
            await executeSql(strSql, (data, err) => {
                if (err) { return res.json(responseError(4002, err)); }
                return res.json(responseSuccess(2003));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
    update: async (req, res) => {
        try {
            req.checkBody(updateValidator);
            const errors = req.validationErrors();
            if (errors) {
                return res.json(responseError(1002, errors));
            }
            const params = req.body;
            if (!checkParamsValid(params)) {
                return res.json(responseError(4004));
            }
            const daycurrent = getDateYMDHMSCurrent();
            const values = `name = N'${params.name || 'NULL'}',address = N'${params.address || 'NULL'}', position = N'${params.position || 'NULL'}', 
            phone = N'${params.phone || 'NULL'}', birthday = N'${params.birthday || 'NULL'}',updated_date = N'${daycurrent}', updated_by = ${params.updated_by || 'NULL'}`;
            const where = `id = ${params.id}`;
            const strSql = updateSet('users', values, where);
            await executeSql(strSql, (data, err) => {
                if (err) { return res.json(responseError(4002, err)); }
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
            const params = req.body;
            const daycurrent = getDateYMDHMSCurrent();
            const values = `status = 4, updated_date = N'${daycurrent}', updated_by = ${params.updated_by || 'NULL'}`;
            const where = `id = ${params.id}`;
            const strSql = updateSet('users', values, where);
            await executeSql(strSql, (data, err) => {
                if (err) { return res.json(responseError(4002, err)); }
                return res.json(responseSuccess(2005));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
    checkUserNameExist: async (username) => {
        const exist = new Promise(async (resolve, reject) => {
            await executeSql(getDataWhere('account', 'id', `username=N'${username}'`), (data, err) => {
                if (err) { return reject(false); }
                if (!isEmpty(data.recordset)) {
                    return resolve(true);
                }
                return resolve(false);
            });
        });
        return exist;
    },
    removeAccount: async (account_id) => {
        try {
            const where = `id = ${account_id}`;
            const strSql = removeRecord('account', where);
            await executeSql(strSql, (data, _err) => {});
        } catch (error) {
            console.log(error);
        }
    },
    createAccount: async (req, res) => {
        try {
            req.checkBody(createAccountValidator);
            const errors = req.validationErrors();
            if (errors) {
                return res.json(responseError(1002, errors));
            }
            const params = req.body;
            if (!compareValue(params.password, params.repassword)) {
                const err = {
                    location: 'body',
                    msg: 'Repassword not is match',
                };
                return res.json(responseError(1002, err));
            }
            if (!checkParamsValid(params)) {
                return res.json(responseError(4004));
            }
            const { checkUserNameExist } = module.exports;
            const exitsusername = await checkUserNameExist(params.username);
            if (exitsusername) {
                return res.json(responseError(4003));
            }
            const password = await UserService.hashPassword(params.password);
            const daycurrent = getDateYMDHMSCurrent();
            const columns = 'username, pass_word, created_date, status, last_login';
            const values = `N'${params.username || 'NULL'}', 
                            N'${password || 'NULL'}', 
                            N'${daycurrent}', 
                            1, N'NULL'`;
            const strSqlAccount = insertInto('account', columns, values);
            await executeSql(strSqlAccount, async (data, err) => {
                if (err) { return res.json(responseError(4002, err)); }
                await executeSql(getDataWhere('account', 'id', `username= N'${params.username}'`), async (_data) => {
                    const account = !isEmpty(_data) ? (_data.recordset[0] || {}) : '';
                    const account_id = account.id;
                    const columns = 'account_id, name, address, avatar, position, phone, birthday, created_date, created_by, status';
                    const values = `${account_id || 'NULL'}, 
                                    N'${params.name || 'NULL'}',
                                    N'${params.address || 'NULL'}',
                                    N'${params.avatar || 'NULL'}',
                                    N'${params.position || 'NULL'}', 
                                    N'${params.phone || 'NULL'}', 
                                    N'${params.birthday || 'NULL'}',
                                    N'${daycurrent}',
                                    ${params.created_by || 'NULL'}, 
                                    1`;
                    const strSql = insertInto('users', columns, values);
                    await executeSql(strSql, async (_data, err) => {
                        if (err) {
                            const { removeAccount } = module.exports;
                            await removeAccount(account_id);
                            return res.json(responseError(4002, err));
                        }
                        return res.json(responseSuccess(2003));
                    });
                });
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
    listAccount: async (req, res) => {
        try {
            const select = `users.name, users.address, users.avatar, users.status, users.phone, 
            users.position, users.account_id, users.created_date, account.username`;
            const join = 'account ON  users.account_id = account.id';
            const where = 'users.status != 4  ORDER BY users.created_date  DESC';
            const sql = getDataJoinWhere('users', select, 'INNER', join, where);
            await executeSql(sql, (data, err) => {
                if (err) { return res.json(responseError(4000, err)); }
                return res.json(responseSuccess(2001, data.recordset));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
    getInfoAccount: async (req, res) => {
        try {
            req.checkQuery(idValidator);
            const errors = req.validationErrors();
            if (errors) {
                return res.json(responseError(1002, errors));
            }
            const select = `users.name, users.address, users.status, users.phone, 
            users.position, users.birthday, users.account_id, account.username`;
            const where = `account_id=${req.query.id}`;
            const join = 'account ON  users.account_id = account.id';
            const sql = getDataJoinWhere('users', select, 'INNER', join, where);
            await executeSql(sql, (data, err) => {
                if (err) { return res.json(responseError(4001, err)); }
                return res.json(responseSuccess(2002, data.recordset[0]));
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
    updateAccount: async (req, res) => {
        try {
            req.checkBody(updateAccountValidator);
            const errors = req.validationErrors();
            if (errors) {
                return res.json(responseError(1002, errors));
            }
            const params = req.body;
            if (!checkParamsValid(params)) {
                return res.json(responseError(4004));
            }
            const daycurrent = getDateYMDHMSCurrent();
            const values = `updated_date = N'${daycurrent}'`;
            const where = `id = ${params.account_id}`;
            const strSqlAccount = updateSet('account', values, where);
            await executeSql(strSqlAccount, async (data, err) => {
                if (err) { return res.json(responseError(4005, err)); }
                const daycurrent = getDateYMDHMSCurrent();
                const values = `name = N'${params.name || 'NULL'}',
                                address = N'${params.address || 'NULL'}', 
                                position = N'${params.position || 'NULL'}', 
                                phone = N'${params.phone || 'NULL'}', 
                                birthday = N'${params.birthday || 'NULL'}',
                                updated_date = N'${daycurrent}', 
                                updated_by = ${params.updated_by || 'NULL'}`;
                const where = `account_id = ${params.account_id}`;
                const strSql = updateSet('users', values, where);
                await executeSql(strSql, (data, err) => {
                    if (err) { return res.json(responseError(4005, err)); }
                    return res.json(responseSuccess(2004));
                });
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
    deleteAccount: async (req, res) => {
        try {
            req.checkBody(accountIdValidator);
            const errors = req.validationErrors();
            if (errors) {
                return res.json(responseError(1002, errors));
            }
            const params = req.body;
            const daycurrent = getDateYMDHMSCurrent();
            const values = `status = 4, updated_date = N'${daycurrent}'`;
            const where = `id = ${params.account_id}`;
            const strSql = updateSet('account', values, where);
            await executeSql(strSql, async (data, err) => {
                if (err) { return res.json(responseError(4002, err)); }
                const values = `status = 4, updated_date = N'${daycurrent}', updated_by = ${params.updated_by || 'NULL'}`;
                const where = `account_id = ${params.account_id}`;
                const strSql = updateSet('users', values, where);
                await executeSql(strSql, (data, err) => {
                    if (err) { return res.json(responseError(4002, err)); }
                    return res.json(responseSuccess(2005));
                });
                
            });
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
};
