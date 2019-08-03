(function () {
    'use strict';
    angular
        .module('app.core')
        .filter('formatDateToDMY', formatDateToDMY)
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

    function  filterPosition () {
        function inputPosition(position = ''){
            return position.toLowerCase() === 'null' ? '' : position;
        }
        return inputPosition;
    };
})();
