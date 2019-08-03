/* eslint-disable no-return-await */
const sqlDb = require('mssql');
const { DB_CONFIG } = require('./settings');

module.exports.executeSql = async (querySql, cb) => {
    const conn = new sqlDb.ConnectionPool(DB_CONFIG);
    await conn.connect().then(async () => {
        const req = new sqlDb.Request(conn);
        await req.query(querySql).then(async (recordset) => {
            await cb(recordset);
        }).catch((err) => {
            cb(null, err);
        });
    }).catch((err) => {
        cb(null, err);
    });
};
