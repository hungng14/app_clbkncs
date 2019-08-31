const {
    responseError,
    responseSuccess,
    isEmpty,
} = require('./../../libs/shared');
const { TITLE_USERS, TYPE_POST } = require('../../configs/constants');
const {
    getDataWhere, getDataJoinWhere,
} = require('../../libs/sqlStr');
const { response404 } = require('../../libs/httpResponse');
const { executeSql } = require('../../configs/database');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            res.render('users/activity_clb/index', {
                layout: 'activity_clb',
                title: TITLE_USERS,
                activity: 'ActivityClb',
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
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
                console.log(err)
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
            console.log(error)
            return res.json(responseError(1003, error));
        }
    },
    listTitleViewHome: async (req, res) => {
        try {
            const select = `TOP 3 posts.id, posts.title, posts.avatar, 
            category_posts.category_name`;
            const where = `posts.type = N'${TYPE_POST.ACTIVITY_CLB}' AND posts.status = 1 
                            ORDER BY posts.created_date DESC`;
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
    viewInfo: async (req, res) => { // eslint-disable-line
        try {
            const { id } = req.query;
            const { getInfo } = module.exports;
            const infoPost = await getInfo(id);
            const data = JSON.stringify(infoPost);
            if (!isEmpty(infoPost)) {
                return res.render('users/activity_clb/info', {
                    layout: 'info_activity_clb',
                    title: TITLE_USERS,
                    activity: 'News',
                    data,
                });
            }
            return response404(res);
        } catch (err) {
            console.log(err)
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
