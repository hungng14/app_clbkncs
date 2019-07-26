/* eslint-disable quotes */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const empty = require('is-empty');
const moment = require('moment-timezone');
const rp = require('request-promise');
const { URL_API } = require('../configs/constants');
const { CODES_ERROR, CODES_SUCCESS } = require('../configs/messages');

moment()
    .tz('Asia/Ho_Chi_Minh')
    .format();
// const PromotionTypes = ['Amount', 'Percent'];
module.exports = {
    deleteFile: (filePath) => {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    },
    getInfoUserSession: (req) => {
        const { user } = req.session.passport;
        const Info = {
            Name: user.Info.FullName,
            RoleName: user.RoleName,
            Role: user.RoleCode,
            Language: user.Language,
        };
        return Info;
    },
    getHeaders: (req) => {
        const { Token } = req.session.passport.user;
        return {
            'x-access-token': Token,
        };
    },
    isNumberInteger: value => Number.isInteger(value),
    isNumber: value => (Number(value) == value ? true : false),
    isMobilePhone: (value) => {
        const self = module.exports;
        if (!self.isNumber(value) || !self.isNumberInteger(+value)) { return false; }
        if (String(value).length < 10 || String(value).length > 11) { return false; }
        const fistNumber = value.substr(0, 2);
        const notMobile = /00|10|20|30|40|50|60|70|80|90/i;
        const checkTwoFirstNumber = !notMobile.test(fistNumber);
        const regex = /(01|02|03|04|05|06|07|08|09[0|1|2|3|4|5|6|7|8|9])+([0-9]{7,8})/;
        const checkMobile = regex.test(value);
        return checkTwoFirstNumber && checkMobile;
    },
    isEmpty: value => empty(value),
    getDateYMDHMSCurrent: () => moment().format('YYYY-MM-DD HH:mm:ss'),
    getYMDCurrent: () => moment().format('YYYY-MM-DD'),
    getDMYCurrent: () => moment().format('DD-MM-YYYY'),
    getDateDMYHMSCurrent: () => moment().format('DD-MM-YYYY HH:mm:ss'),
    makeDir: (filePath) => {
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
    },
    responseError: (StatusCode, errors = {}) => {
        const response = {
            Success: false,
            StatusCode,
            Message: CODES_ERROR[StatusCode],
        };
        if (!empty(errors)) {
            response.Errors = errors;
        }
        return response;
    },
    responseSuccess: (statusCode, result = {}) => {
        const response = {
            Success: true,
            StatusCode: statusCode,
            Message: CODES_SUCCESS[statusCode],
        };
        if (!empty(result)) {
            response.Data = result;
        }
        return response;
    },
    checkResponseExpire: (req, res, result = {}) => {
        const { StatusCode } = result;
        if (StatusCode === 40013) {
            req.logout();
            res.redirect('/');
        }
        return result;
    },
    sendBodyToAPI: async (method, uri, headers, body, json = true) => {
        const options = {
            method,
            uri: `${URL_API}${uri}`,
            headers,
            body,
            json,
        };
        const result = await rp(options);
        return result;
    },
    sendQueryToAPI: async (method, uri, headers, qs, json = true) => {
        const options = {
            method,
            uri: `${URL_API}${uri}`,
            headers,
            qs,
            json,
        };
        const result = await rp(options);
        return result;
    },
    sendDataToClient: (req, res, result = {}) => {
        const { checkResponseExpire } = module.exports;
        checkResponseExpire(req, res, result);
        return res.json(result);
    },
    sendFormDataToAPI: async (method, uri, headers, formData, json = true) => {
        const options = {
            method,
            uri: `${URL_API}${uri}`,
            headers,
            formData,
            json,
        };
        const result = await rp(options);
        return result;
    },
    isFileImage: string => string.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/),
    fileFilterImage: (req, file, cb) => {
        const { isFileImage } = module.exports;
        if (!isFileImage(file.originalname)) {
            return cb({ StatusCode: 40016 });
        }
        return cb(null, true);
    },
    storage: (...foldersSaved) => {
        const { makeDir } = module.exports;
        return multer.diskStorage({
            destination: (req, file, cb) => {
                makeDir(path.join(__dirname, '../public/uploads/'));
                let dirUpload = '';
                let directoryForlder = '';
                foldersSaved.map((folder) => {
                    directoryForlder += `${folder}/`;
                    dirUpload = path.join(__dirname, `../public/uploads/${directoryForlder}`);
                    makeDir(dirUpload);
                });
                cb(null, dirUpload);
            },
            filename: (req, file, cb) => {
                const fileName = `${Date.now()}_${path.extname(file.originalname)}`;
                cb(null, fileName);
            },
        });
    },
    uploadFile: (storage, fileFilter, singleName) => multer({
        storage,
        fileFilter,
    }).single(singleName),
    uploadFiles: (storage, fileFilter) => multer({
        storage,
        fileFilter,
    }).any(),
    beforeUpload: (req, res, next, uploadFile) => {
        uploadFile(req, res, (err) => {
            const { isEmpty, deleteFile, responseError } = module.exports;
            if (!isEmpty(err)) {
                const { StatusCode } = err;
                return res.json(responseError(StatusCode || 40015));
            }
            if (req.file && req.file.size > 25411800) {
                deleteFile(req.file.path);
                return res.json(responseError(40000));
            }
            return next();
        });
    },
    sliceString: (string, strStart = '', strEnd = '') => {
        if (!strStart && !strEnd) {
            return '';
        }
        const start = string.search(strStart);
        const end = string.search(strEnd);
        if (strStart && strEnd && start > -1 && end > -1) {
            return string.slice(start, end);
        }
        if (strStart && start > -1) {
            return string.slice(start);
        }
        if (strEnd && end > -1) {
            return string.slice(0, end);
        }
        return '';
    },
    trimValue: value => String(value).trim(),
    filterStatus: (status) => {
        const { trimValue } = module.exports;
        if (trimValue(status).toLowerCase() === 'active') {
            return 'Hoạt động';
        }
        if (trimValue(status).toLowerCase() === 'waitingaccepted') {
            return 'Mới';
        }
        if (trimValue(status).toLowerCase() === 'inactive') {
            return 'Ngừng';
        }
        return '';
    },
    compareValue: (val1, val2) => {
        if (!val1 && !val2) return true;
        return val1 && val2 && val1.toString() == val2.toString() ? true : false;
    },
    checkCharacterComma: (string = '') => {
        if (String(string).search('"') > -1) { return true; }
        if (String(string).search("'") > -1) { return true; }
        if (String(string).search("`") > -1) { return true; }
        return false;
    },
    checkParamsValid: (params = {}) => {
        const { checkCharacterComma } = module.exports;
        for (const prop in params) {
            if (checkCharacterComma(params[prop])) {
                return false;
            }
        }
        return true;
    },
};
