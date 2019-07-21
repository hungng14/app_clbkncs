const UploadFileController = require('../../controllers/admin/UploadFileController');
const LoginController = require('../../controllers/admin/LoginController');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {
    isFileImage
} = require('../../libs/shared');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dirUpload = path.join(__dirname, `../../public/images/posts/`);
        cb(null, dirUpload);
    },
    filename: (req, file, cb) => {
        const fileName = 'images_' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    },
});
const fileFilter = (req, file, cb) => {
    console.log(req.file)
    console.log(req.files)
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
        return cb(new Error('errror'));
    }
    return cb(null, true);
};
const upload = multer({
    storage,
});


module.exports = (route) => {
    route.route('/login').get(LoginController.index);
    route.route('/login').post(LoginController.login);
    route.route('/logout').get(LoginController.logout);
    route.route('/getSession').get(LoginController.getSession);
    route.route('/createJSWToken').get(LoginController.createJSWToken);
    route.route('/getFiles').get(UploadFileController.getFiles);
    route.post('/uploadFile', upload.array('flFileUpload', 12), (req, res) => {
        res.redirect('back')
    });
    route.route('/deleteFile').post(UploadFileController.deleteFile);
};