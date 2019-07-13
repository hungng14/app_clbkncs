const sql = require('mssql');
const table = new sql.Table('users');
table.create = true;
