
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const UploadFileController = require('../../controllers/admin/UploadFileController');

const {
    isFileImage,
} = require('../../libs/shared');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dirUpload = path.join(__dirname, '../../public/images/posts/');
        cb(null, dirUpload);
    },
    filename: (req, file, cb) => {
        const fileName = `images_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    },
});
const fileFilter = (req, file, cb) => {
    if (!isFileImage(file.originalname)) {
        return cb(new Error('errror'));
    }
    return cb(null, true);
};
const upload = multer({
    storage,
    fileFilter,
});

module.exports = (route) => {
    route.route('/getFiles').get(UploadFileController.getFiles);
    route.post('/uploadFile', upload.array('flFileUpload', 12), (req, res) => {
        res.redirect('back');
    });
    route.route('/deleteFile').post(UploadFileController.deleteFile);
};
