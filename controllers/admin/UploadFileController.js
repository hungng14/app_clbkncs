/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const { isFileImage } = require('../../libs/shared');

module.exports = {
    getFiles: async (req, res) => {
        const images = fs.readdirSync('public/images/posts');
        const stored = [];
        for (const item of images) {
            if (isFileImage(item)) {
                stored.push(
                    {
                        image: `/images/posts/${item}`,
                        folder: '/',
                    },
                );
            }
        }
        res.send(stored);
    },
    deleteFile: async (req, res) => {
        const pathDeleted = `public${req.body.url_del}`;
        if (fs.existsSync(pathDeleted)) {
            fs.unlinkSync(pathDeleted);
        }
        res.redirect('back');
    },

};
