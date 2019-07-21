(function () {
    angular.module('CLBKNCS')
        .service('SharedService', SharedService);

    SharedService.$inject = ['moment', '$timeout'];

    function SharedService(moment, $timeout) {
        this.formatToYMD = (date) => {
            let dateFormat = ['YYYY-M-D', 'YYYY-MM-DD', 'DD-MM-YYYY', 'D-M-YYYY'];
            let newDate = moment(date, dateFormat).format('YYYY-MM-DD');
            return newDate;
        }
        this.getDaysInMonth = (year, month) => {
            year = year ? year : new Date().getFullYear();
            month = month ? month : new Date().getMonth() + 1;
            let daysInMonth = new Date(year, month, 0).getDate();
            let arrDaysInMonth = [];
            for (let i = 1; i <= daysInMonth; i++) {
                let date = {
                    day: i,
                    month: month,
                    year: year,
                    fullDate: year + '-' + month + '-' + i
                }
                arrDaysInMonth = [...arrDaysInMonth, date];
            }
            return arrDaysInMonth;
        }

        this.convertMonth = (month) =>{
            return month.toString().length === 1 ? '0' + month : month
        }

        this.changeCss = () =>{
            angular.element('.form-group').removeClass('has-error');
            angular
                .element('.form-group')
                .find('.has-error')
                .removeClass('has-error');
            angular.element('.form-group').removeClass('has-success');
            angular
                .element('.form-group')
                .find('.has-success')
                .removeClass('has-success');
            angular.element('.error-block').css('display', 'none');
            angular.element('.bootstrap-select button.btn').removeClass('has-error').removeClass('has-success');
        }

        this.refreshSelectPicker = ()=>{
            $timeout(() => {
                angular.element('.bs-select').selectpicker('refresh');
            }, 1);
        }

        function escapeRegExp (string){
            return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }

        this.paginate = (arrays, query = {})=>{
            let limit = query.Limit ? +query.Limit : 100;
            let page = query.Page ? +query.Page : 1;
            let SearchName = query.SearchName ? query.SearchName : '';
            if(SearchName){
                SearchName = escapeRegExp(SearchName);
                let regex = new RegExp(SearchName, 'i')
                arrays = arrays.filter(item => {
                    if(item.Info && item.Info.Name){
                        return regex.test(item.Info.Name)
                    }
                    else if(item.Name){
                        return regex.test(item.Name)
                    }
                    return item
                });
            }
			let response = {};
			let pagination = {};
			pagination.total = arrays.length;
			pagination.limit = limit;
			pagination.pages = Math.ceil(pagination.total / pagination.limit);
			pagination.page = page;
			pagination.skip = (page - 1) * limit + 1;
			let start = pagination.skip - 1;
			let end = limit * page;
			response.Pagination = pagination;
			response.Data = arrays.slice(start, end)
			return response;
        }
        
        this.duplicateArrayIds = (array, obj) => {
            if (obj && Object.keys(obj).length && obj.hasOwnProperty('_id')) {
                if (obj.Selected) {
                    array = [...array, obj._id];
                    const set = new Set(array);
                    const value = set.values();
                    return Array.from(value);
                } else {
                    let idx = array.indexOf(obj._id);
                    array.splice(idx, 1)
                    return array
                }
            } else {
                const set = new Set(array);
                const value = set.values();
                return Array.from(value);
            }
        }

        this.deleteItem = (callback, message = '') => {
            swal({
                title: 'Cảnh báo?',
                text: message,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#27a4b0',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!',
            })
            .then((willDelete) => {
                if (willDelete) {
                    callback();
                }
            })
            .catch(swal.noop);
        }

        this.isEmpty = (val) => {
            var has = Object.prototype.hasOwnProperty;
            var toString = Object.prototype.toString;
            // Null and Undefined...
            if (val == null) return true
            
            // Booleans...
            if ('boolean' == typeof val) return false
            
            // Numbers...
            if ('number' == typeof val) return val === 0
            
            // Strings...
            if ('string' == typeof val) return val.length === 0
            
            // Functions...
            if ('function' == typeof val) return val.length === 0
            
            // Arrays...
            if (Array.isArray(val)) return val.length === 0
            
            // Errors...
            if (val instanceof Error) return val.message === ''
            
            // Objects...
            if (val.toString == toString) {
                switch (val.toString()) {
            
                // Maps, Sets, Files and Errors...
                case '[object File]':
                case '[object Map]':
                case '[object Set]': {
                    return val.size === 0
                }
            
                // Plain objects...
                case '[object Object]': {
                    for (var key in val) {
                    if (has.call(val, key)) return false
                    }
            
                    return true
                }
                }
            }
            
            // Anything else...
            return false
        }

        this.show_swal = (callback, message = '', cbError = new Function()) => {
            swal({
                    title: 'Cảnh báo?',
                    text: message,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#27a4b0',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes!',
                })
                .then((willDelete) => {
                    if (willDelete) {
                        callback();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    cbError();
                    return swal.noop;
                });
        }

        this.filterObject = (obj = {}) => {
            const newObj = {};
            for (const prop in obj) {
                if (obj[prop] !== 'NULL') {
                    newObj[prop] = obj[prop];
                }
            }
            return newObj;
        };
    }
})();