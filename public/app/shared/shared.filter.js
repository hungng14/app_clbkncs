(function () {
    'use strict';
    angular
        .module('app.core')
        .filter('formatDateToDMY', formatDateToDMY)
        .filter('filterStatusToText', filterStatusToText)
        .filter('filterStatusToClass', filterStatusToClass)
        .filter('filterStatusToLabelClass', filterStatusToLabelClass)
        .filter('filterGender', filterGender)
        .filter('filterPosition', filterPosition)


    function formatDateToDMY(){
        function inputDate(date) {
            let _isValidDayDMY = moment(date, 'DD-MM-YYYY', true).isValid();
            if(_isValidDayDMY){
                return date;
            }
            var newDate = '';
            let _isValidDayYMDHMS = moment(date, ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD H:m:s'], true).isValid();
            let _isValidDayYMD = moment(date, 'YYYY-MM-DD', true).isValid();
            if(_isValidDayYMDHMS){
                newDate = moment(date.toString(), ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD H:m:s']).format('DD-MM-YYYY HH:mm:ss');
            }else if(_isValidDayYMD){
                newDate = moment(date.toString(), 'YYYY-MM-DD').format('DD-MM-YYYY');
            }
            return newDate;
        }
        return inputDate;
    }
    
    function  filterStatusToText () {
        function filterStatus(status){
            if (status == 1) {
                return  'Hoạt động'
            }
            if (status == 2) {
                return 'Mới'
            }
            if (status == 3) {
                return 'Ngừng'
            }
            if (status == 4) {
                return 'Bị xóa'
            }
        }
        return filterStatus;
    };

    function  filterStatusToClass () {
        function filterStatus(status){
            if (status === 'Active') {
                return 'status-Active'
            } else if (status === 'WaitingAccepted') {
                return 'status-New'
            } else if(status === 'Inactive') {
                return 'status-Inactive'
            }else if(status === 'Deleted'){
                return 'status-Remove'
            }
        }
        return filterStatus;
    };

    function  filterStatusToLabelClass () {
        function filterStatus(status){
            if (status === 'Active') {
                return 'label-success'
            } else if (status === 'WaitingAccepted') {
                return 'label-warning'
            } else if (status === 'Inactive'){
                return  'label-default'
            } else if (status === 'Deleted'){
                return  'label-danger'
            }
        }
        return filterStatus;
    };

    function filterGender(){
        function inputGender(gender){
            if(gender == 'Male'){
                return 'Nam'
            }else if(gender == 'Female'){
                return 'Nữ'
            }
            return '';
        }
        return inputGender;
    }

    function  filterPosition () {
        function inputPosition(position = ''){
            return position.toLowerCase() === 'null' ? '' : position;
        }
        return inputPosition;
    };
})();
