(function () {
    'use strict';
    angular
        .module('app.core')
        .filter('diffTimeFilter', diffTimeFilter)
        .filter('recallTypeFilter', recallTypeFilter)
        .filter('formatDateToDMY', formatDateToDMY)
        .filter('filterStatusToText', filterStatusToText)
        .filter('filterStatusOrderToText', filterStatusOrderToText)
        .filter('filterStatusToClass', filterStatusToClass)
        .filter('filterStatusToLabelClass', filterStatusToLabelClass)
        .filter('filterDaysOfWeek', filterDaysOfWeek)
        .filter('getMonthInDate', getMonthInDate)
        .filter('getDayOfWeek', getDayOfWeek)
        .filter('filterSchedule', filterSchedule)
        .filter('filterResellerType', filterResellerType)
        .filter('filterGender', filterGender)
        .filter('filterProductType', filterProductType)
        .filter('filterPromotionType', filterPromotionType)
        .filter('filterDiscount', filterDiscount)
        .filter('filterRole', filterRole)
        .filter('filterStatusAcl', filterStatusAcl)
        .filter('filterStatusAclToClass', filterStatusAclToClass)

        diffTimeFilter.$inject = ['moment'];

    function diffTimeFilter(moment) {
        function diffTime(date) {
            const strFomat = [
                'YYYY-MM-DD HH:mm:ss'
            ];
            const validFromDate = moment(date.FromTime, strFomat, true).isValid();
            const validToDate = moment(date.ToTime, strFomat, true).isValid();
            if (validFromDate && validToDate) {
                const fromDate = moment(date.FromTime, strFomat, true).format('YYYY-MM-DD HH:mm').toString();
                const toDate = moment(date.ToTime, strFomat, true).format('YYYY-MM-DD HH:mm').toString();
                const parseFromDate = Date.parse(fromDate);
                const parseToDate = Date.parse(toDate);
                const momentFromDate = moment(parseFromDate);
                const momentToDate = moment(parseToDate);
                const getDuration = moment.duration(momentToDate.diff(momentFromDate));
                const duration = `${parseInt(getDuration.asDays())}d${parseInt(getDuration.asHours())}h${parseInt(getDuration.minutes())}m`;
                return duration;
            }
            return '';
        }
        return diffTime;
    }
   
    function recallTypeFilter() {
        function recallType(type) {
            if(type === 'Propose'){
                return 'Đề xuất lắp đặt'
            }
            if(type === 'Installed'){
                return 'Đã lắp đặt'
            }
            if(type === 'Alert'){
                return 'Báo hỏng'
            }
            if(type === 'Fixed'){
                return 'Đã sửa'
            }
            if(type === 'Revoked'){
                return 'Đã thu hồi'
            }
        }
        return recallType;
    }

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
            if (status === 'Active') {
                return  'Hoạt động'
            } else if (status === 'WaitingAccepted') {
                return 'Mới'
            } else if (status === 'Inactive'){
                return 'Ngừng'
            } else if (status === 'Deleted'){
                return 'Bị xóa'
            }
        }
        return filterStatus;
    };

    function  filterStatusOrderToText () {
        function filterStatus(status){
            if (status === 'Active') {
                return  'Xác nhận'
            } else if (status === 'WaitingAccepted') {
                return 'Mới'
            } else if(status === 'Inactive') {
                return 'Hủy'
            }else if(status === 'Deleted') {
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
    function filterDaysOfWeek() {
        function inputDaysOfWeek(DayOfWeek){
            let strDayOfWeek = '';
            switch(DayOfWeek){
                case 'Mon':
                strDayOfWeek = 'Thứ hai';
                break;
                case 'Tue':
                strDayOfWeek = 'Thứ ba';
                break;
                case 'Wed':
                strDayOfWeek = 'Thứ tư';
                break;
                case 'Thu':
                strDayOfWeek = 'Thứ năm';
                break;
                case 'Fri':
                strDayOfWeek = 'Thứ sáu';
                break;
                case 'Sat':
                strDayOfWeek = 'Thứ bảy';
                break;
                case 'Sun':
                strDayOfWeek = 'Chủ nhật';
                break;   
            }
            return strDayOfWeek;
        }
        return inputDaysOfWeek;
    }

    function getMonthInDate() {
        function inputDate(date){
            let month = moment(date).format('MM');
            return month;
        }
        return inputDate;
    }

    function getDayOfWeek(){
        function inputDate(date){
            const DaysOfWeek = [
                {
                    number: 0,
                    key: 'Sun',
                    value: 'CN'
                },
                {
                    number: 1,
                    key: 'Mon',
                    value: 'T2'
                }, {
                    number: 2,
                    key: 'Tue',
                    value: 'T3'
                }, {
                    number: 3,
                    key: 'Wed',
                    value: 'T4'
                }, {
                    number: 4,
                    key: 'Thu',
                    value: 'T5'
                }, {
                    number: 5,
                    key: 'Fri',
                    value: 'T6'
                }, {
                    number: 6,
                    key: 'Sat',
                    value: 'T7'
                }
            ];
            let momentdate = moment(date);
            let day = new Date(momentdate);
            let dayNumber = day.getDay();
            let _day = DaysOfWeek.filter((d) => {return d.number === dayNumber});
            return _day[0].value;
        }
        return inputDate;
    }

    function filterSchedule(){
        function inputSchedule(date, schedule){
            let date1 = formatToYMD(date);
            let schedules = schedule.schedules;
            for(let i = 0; i< schedules.length; i++){
                let info = schedules[i];
                let date2 = formatToYMD(info.Time);
                if(date1 == date2){
                    let shift = info.Shift && info.Shift.length ? info.Shift[0] : '';
                    return shift ? shift.Name + `(${shift.ShiftCode})` : ''
                }
            }
            return '';
        }
        return inputSchedule;
    }

    function filterResellerType(){
        function inputType(type){
            if(type == 'Reseller'){
                return 'Địa điểm'
            }else if(type == 'Agency'){
                return 'Nhà phân phối'
            }
            return '';
        }
        return inputType;
    }

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

    function filterProductType(){
        function inputType(type){
            if(type == 'Product'){
                return 'Thông dụng'
            }else if(type == 'Promotion'){
                return 'Khuyến mại'
            }
            else if(type == 'Demonstration'){
                return 'Trưng bày'
            }
            return '';
        }
        return inputType;
    }

    function filterPromotionType(){
        function inputType(type){
            if(type == 'Amount'){
                return 'Giảm giá tiền'
            }else if(type == 'Percent'){
                return 'Giảm giá %'
            }
            return '';
        }
        return inputType;
    }

    function filterDiscount(){
        function inputType(discount, typePromotion){
            discount = typePromotion == 'Amount' ? $filter('number')(`${discount}`) + ' VND' : typePromotion == 'Amount' ? `${discount} %` : '';
            return discount;
        }
        return inputType;
    }

    function filterRole ()  {
        function inputRole(role){
            if (role === 'Director') {
                return 'Giám đốc'
            } else if (role === 'Manager') {
                return 'Backoffice'
            } else if (role === 'ASM') {
                return 'ASM'
            } else if (role === 'Leader') {
                return 'Quản lý PG'
            } else if (role === 'Sale') {
                return 'Sale'
            } else if (role === 'Staff') {
                return 'PG'
            } 
            return ''
        }
        return inputRole;
    };

    function filterStatusAcl ()  {
        function inputStatus(role){
            if (role === 'Allow') {
                return 'Truy cập'
            }
            if (role === 'Deny') {
                return 'Chặn'
            } 
            return ''
        }
        return inputStatus;
    };

    function  filterStatusAclToClass () {
        function filterStatus(status){
            if (status === 'Allow') {
                return 'status-Active'
            }
            if (status === 'Deny') {
                return 'status-Inactive'
            } 
            return ''
        }
        return filterStatus;
    };

})();