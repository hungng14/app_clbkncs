(function () {
    'use strict';
    angular
        .module('app.core', [
            'ngCookies',
            'app.logger'
        ])
        .constant('toastr', toastr)
})();