(function () {
    'use strict';
    angular
        .module('app.core', [
            'ngValidate',
            'ngCookies',
            'app.logger'
        ])
        .constant('toastr', toastr)
})();