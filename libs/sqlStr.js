module.exports = {
    insertInto: (table = '', columns = '', values = '') => `INSERT INTO ${table} (${columns}) VALUES (${values})`,
    getData: (table = '', select = '') => `SELECT ${select} FROM ${table}`,
    getDataWhere: (table = '', select = '', where = '') => `SELECT ${select} FROM ${table} WHERE ${where}`,
    getDataJoin: (table = '', select = '', position = '', join = '') => `SELECT ${select} FROM ${table} ${position} JOIN ${join}`,
    getDataJoinWhere: (table = '', select = '', position = '', join = '', where = '') => `SELECT ${select} FROM ${table} ${position} JOIN ${join} WHERE ${where}`,
    updateSet: (table = '', values = '', where = '') => `UPDATE ${table} SET ${values} WHERE ${where}`,
    removeRecord: (table = '', where = '') => `DELETE FROM ${table} WHERE ${where}`,
};
