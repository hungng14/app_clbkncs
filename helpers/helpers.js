const handlebars = require('handlebars');
const hbs_helpers = require('handlebars-helpers')({
    handlebars,
});

const ScreenForRoleDirector = ['Company', 'Agency', 'Place', 'Route', 'Shift'];
const ScreenForRoleManager = ['Company', 'Agency', 'Place', 'Route', 'Shift'];
const ScreenForRoleASM = ['Company', 'Agency', 'Place', 'Route'];
const ScreenForRoleLeader = ['Company', 'Agency', 'Place', 'Shift'];
const ScreenForRoleSale = ['Company', 'Place', 'Route'];
const ScreenForRoleStaff = ['Company', 'Place', 'Shift'];

// eslint-disable-next-line func-names
hbs_helpers.isAcceptedScreen = (role, screen = '', options) => {
    if (role === 'AdminSystem') {
        return options.fn(this);
    }
    if (role === 'Director' && ScreenForRoleDirector.includes(screen)) {
        return options.fn(this);
    }
    if (role === 'Manager' && ScreenForRoleManager.includes(screen)) {
        return options.fn(this);
    }
    if (role === 'ASM' && ScreenForRoleASM.includes(screen)) {
        return options.fn(this);
    }
    if (role === 'Leader' && ScreenForRoleLeader.includes(screen)) {
        return options.fn(this);
    }
    if (role === 'Sale' && ScreenForRoleSale.includes(screen)) {
        return options.fn(this);
    }
    if (role === 'Staff' && ScreenForRoleStaff.includes(screen)) {
        return options.fn(this);
    }
};

const FuncForRoleDirector = [
    'Agency', 'OrderAgency', 'InventoryAgency',
    'UpdateAgency', 'ExportAgency',
    'ListPlace', 'CreatePlace', 'UpdatePlace', 'ImportPlace', 'ExportPlace',
    'ActiveStatusPlace', 'ActiveStatusOrder', 'ActiveStatusOrderAgency',
    'ListPolicy', 'CreatePolicy', 'UpdatePolicy',
    'ListMember', 'ExportMember',
    // 'ImportMember', 'CreateMember',
    'UpdateMember',
    'CreateSchedule', 'UpdateSchedule', 'ImportSchedule', 'ExportSchedule',
    'ImportTarget', 'CreateTarget', 'UpdateTarget',
    'ImportPushProduct', 'CreatePushProduct', 'UpdatePushProduct',
    'CreateQuestion', 'UpdateQuestion',
    'ImportNotification', 'CreateNotification', 'UpdateNotification',
];
const FuncForRoleManager = [
    'Agency', 'OrderAgency', 'InventoryAgency',
    'CreateAgency', 'UpdateAgency', 'ImportAgency', 'ExportAgency',
    'ListPlace', 'CreatePlace', 'UpdatePlace', 'ImportPlace', 'ExportPlace',
    'ActiveStatusPlace', 'ActiveStatusOrder', 'ActiveStatusOrderAgency',
    'ListPolicy', 'CreatePolicy', 'UpdatePolicy',
    'ListMember', 'ExportMember',
    // 'ImportMember', 'CreateMember',
    'UpdateMember',
    'CreateSchedule', 'UpdateSchedule', 'ImportSchedule', 'ExportSchedule',
    'ImportTarget', 'CreateTarget', 'UpdateTarget',
    'ImportPushProduct', 'CreatePushProduct', 'UpdatePushProduct',
    'CreateQuestion', 'UpdateQuestion',
    'ImportNotification', 'CreateNotification', 'UpdateNotification',
];
const FuncForRoleASM = [
    'Agency', 'OrderAgency', 'InventoryAgency',
    'ExportAgency',
    'ListPlace', 'CreatePlace', 'UpdatePlace', 'ImportPlace', 'ExportPlace',
    'ActiveStatusPlace', 'ActiveStatusOrder',
    'ListPolicy', 'CreatePolicy', 'UpdatePolicy',
    'ListMember', 'ExportMember',
    // 'ImportMember', 'CreateMember',
    'UpdateMember',
    'CreateSchedule', 'UpdateSchedule', 'ImportSchedule', 'ExportSchedule',
    'ImportTarget', 'CreateTarget', 'UpdateTarget',
    'ImportPushProduct', 'CreatePushProduct', 'UpdatePushProduct',
    'ImportNotification', 'CreateNotification', 'UpdateNotification',
];
const FuncForRoleLeader = [
    'Agency', 'OrderAgency', 'InventoryAgency',
    'ExportAgency',
    'ListPlace', 'ExportPlace',
    'ListPolicy', 'CreatePolicy', 'UpdatePolicy',
    'ListMember', 'ExportMember',
    'ActiveStatusOrder',
    // 'ImportMember', 'CreateMember',
    'UpdateMember',
    'CreateSchedule', 'UpdateSchedule', 'ImportSchedule', 'ExportSchedule',
    'ImportTarget', 'CreateTarget', 'UpdateTarget',
    'ImportPushProduct', 'CreatePushProduct', 'UpdatePushProduct',
    'ImportNotification', 'CreateNotification', 'UpdateNotification',
];
const FuncForRoleSale = [
    'ListPlace', 'CreatePlace', 'UpdatePlace', 'ImportPlace', 'ExportPlace',
    'ListPolicy',
    'ListMember',
    'ExportSchedule',

];
const FuncForRoleStaff = [
    'ListPlace', 'ExportPlace',
    'ListPolicy',
    'ListMember',
    'ExportSchedule',
];

// eslint-disable-next-line func-names
hbs_helpers.isActiveFunction = (role, func = '', options) => {
    if (role === 'AdminSystem') {
        return options.fn(this);
    }
    if (role === 'Director' && FuncForRoleDirector.includes(func)) {
        return options.fn(this);
    }
    if (role === 'Manager' && FuncForRoleManager.includes(func)) {
        return options.fn(this);
    }
    if (role === 'ASM' && FuncForRoleASM.includes(func)) {
        return options.fn(this);
    }
    if (role === 'Leader' && FuncForRoleLeader.includes(func)) {
        return options.fn(this);
    }
    if (role === 'Sale' && FuncForRoleSale.includes(func)) {
        return options.fn(this);
    }
    if (role === 'Staff' && FuncForRoleStaff.includes(func)) {
        return options.fn(this);
    }
};

const MatchDetailForRoleDirector = [
    'ViewDetailAgency',
];
const MatchDetailForRoleManager = [
    'ViewDetailAgency',
];
const MatchDetailForRoleASM = [
    'ViewDetailAgency',
];
const MatchDetailForRoleLeader = [
    'ViewDetailAgency',
];
const MatchDetailForRoleSale = [];
const MatchDetailForRoleStaff = [];


hbs_helpers.isMatchDetail = function (role, func = '', value, options) {
    if (role == 'AdminSystem') {
        return options.fn(this)
    }
    if (role == 'Director' && MatchDetailForRoleDirector.includes(func)) {
        return options.fn(this)
    }
    if (role == 'Manager' && MatchDetailForRoleManager.includes(func)) {
        return options.fn(this)
    }
    if (role == 'ASM' && MatchDetailForRoleASM.includes(func)) {
        return options.fn(this)
    }
    if (role == 'Leader' && MatchDetailForRoleLeader.includes(func)) {
        return options.fn(this)
    }
    if (role == 'Sale' && MatchDetailForRoleSale.includes(func)) {
        return options.fn(this)
    }
    if (role == 'Staff' && MatchDetailForRoleStaff.includes(func)) {
        return options.fn(this)
    } 
        return `<span ng-bind="${value}"></span>`
    
};

hbs_helpers.active = function (type, str1 = 'Dashboard', str2 = 'Dashboard') {
    if (str1.toLowerCase() === str2.toLowerCase()) {
        if (type === 'class') return 'active open';
    }
    if (type === 'span') return "<span class='selected'></span>";
};

hbs_helpers.formatMoney = function (num = '') {
    if (typeof num === 'number') {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    return num;
};

const mangso = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

function dochangchuc(so, daydu) {
    let chuoi = '';
    const chuc = Math.floor(so / 10);
    const donvi = so % 10;
    if (chuc > 1) {
        chuoi = ` ${mangso[chuc]} mươi`;
        if (donvi == 1) {
            chuoi += ' mốt';
        }
    } else if (chuc == 1) {
        chuoi = ' mười';
        if (donvi == 1) {
            chuoi += ' một';
        }
    } else if (daydu && donvi > 0) {
        chuoi = ' lẻ';
    }
    if (donvi == 5 && chuc >= 1) {
        chuoi += ' lăm';
    } else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
        chuoi += ` ${mangso[donvi]}`;
    }
    return chuoi;
}

function docblock(so, daydu) {
    let chuoi = '';
    const tram = Math.floor(so / 100);
    so %= 100;
    if (daydu || tram > 0) {
        chuoi = ` ${mangso[tram]} trăm`;
        chuoi += dochangchuc(so, true);
    } else {
        chuoi = dochangchuc(so, false);
    }
    return chuoi;
}

function dochangtrieu(so, daydu) {
    let chuoi = '';
    const trieu = Math.floor(so / 1000000);
    so %= 1000000;
    if (trieu > 0) {
        chuoi = `${docblock(trieu, daydu)} triệu`;
        daydu = true;
    }
    const nghin = Math.floor(so / 1000);
    so %= 1000;
    if (nghin > 0) {
        chuoi += `${docblock(nghin, daydu)} nghìn`;
        daydu = true;
    }
    if (so > 0) {
        chuoi += docblock(so, daydu);
    }
    return chuoi;
}


hbs_helpers.convertNumberToString = function (so) {
    if (so === 0) return mangso[0];
    let chuoi = '';


    let hauto = '';
    do {
        const ty = so % 1000000000;
        so = Math.floor(so / 1000000000);
        if (so > 0) {
            chuoi = dochangtrieu(ty, true) + hauto + chuoi;
        } else {
            chuoi = dochangtrieu(ty, false) + hauto + chuoi;
        }
        hauto = ' tỷ';
    } while (so > 0);
    const str = chuoi.trim();

    return str.charAt(0).toUpperCase() + str.slice(1);
};

hbs_helpers.lt = (a, b) => a < b;
hbs_helpers.eq = (a, b) => a === b;
