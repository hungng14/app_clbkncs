const {
    responseError, isEmpty,
} = require('./../../libs/shared');
const { TITLE_USERS } = require('../../configs/constants');
const {
    getDataJoinWhere,
} = require('../../libs/sqlStr');
const { response404 } = require('../../libs/httpResponse');
const { executeSql } = require('../../configs/database');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            const { id } = req.query;
            const { getInfo } = module.exports;
            const infoPost = await getInfo(id);
            const data = JSON.stringify(infoPost);
            if (!isEmpty(infoPost)) {
                return res.render('users/news/info', {
                    layout: 'info_news',
                    title: TITLE_USERS,
                    activity: 'News',
                    data,
                });
            }
            return response404(res);
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
    getInfo: async (id) => {
        try {
            const select = `posts.id, posts.title, posts.content, posts.category_post_id, posts.published_date, 
            posts.created_date, posts.avatar, category_posts.category_name`;
            const where = `posts.id=${id} AND posts.status = 1 ORDER BY posts.created_date DESC`;
            const join = 'category_posts ON  posts.category_post_id = category_posts.id';
            const sql = getDataJoinWhere('posts', select, 'INNER', join, where);
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
