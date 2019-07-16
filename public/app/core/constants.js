(function () {
    'use strict';
    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('getUrlApi', getUrlApi)
        .constant('limitData', limitData)
        .constant('listMonths', listMonths)
        .constant('statusFilter', statusFilter)

    function getUrlApi(){
        return 'http://localhost:3100/';
    }

    function limitData(){
        return ['10','25','50','100']
    }

    function listMonths(){
        const months = [
            {'key': '01', 'value': 'Tháng 1'},
            {'key': '02', 'value': 'Tháng 2'},
            {'key': '03', 'value': 'Tháng 3'},
            {'key': '04', 'value': 'Tháng 4'},
            {'key': '05', 'value': 'Tháng 5'},
            {'key': '06', 'value': 'Tháng 6'},
            {'key': '07', 'value': 'Tháng 7'},
            {'key': '08', 'value': 'Tháng 8'},
            {'key': '09', 'value': 'Tháng 9'},
            {'key': '10', 'value': 'Tháng 10'},
            {'key': '11', 'value': 'Tháng 11'},
            {'key': '12', 'value': 'Tháng 12'},
        ];
        return months;
    }
    function statusFilter() {
        return {
            100: 'WaitingAccepted',
            200: 'Active',
            400: 'Inactive',
        };
    }
})();
