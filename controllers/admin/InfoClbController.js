const {
    responseError,
    responseSuccess,
} = require('./../../libs/shared');
const { TITLE_ADMIN } = require('../../configs/constants');
const {
    getDataJoinWhere,
} = require('../../libs/sqlStr');
const { executeSql } = require('../../configs/database');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            // const Info = getInfoUserSession(req);
            res.render('admin/infoClb/index', {
                layout: 'infoClb',
                title: TITLE_ADMIN,
                activity: 'InfoClb',
                // Info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
    getInfo: async (req, res) => {
        try {
            const select = `info_club.slogan, info_club.address, info_club.phone, 
            info_club.scales, info_club.user_id, info_club.avatar, info_club.logo,
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
