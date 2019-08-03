/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable camelcase */
const handlebars = require('handlebars');
const hbs_helpers = require('handlebars-helpers')({
    handlebars,
});

hbs_helpers.active = function (type, str1 = 'Dashboard', str2 = 'Dashboard') {
    if (str1.toLowerCase() === str2.toLowerCase()) {
        if (type === 'class') return 'active ';
    }
    if (type === 'span') return "<span class='selected'></span>";
};

module.exports = hbs_helpers;
