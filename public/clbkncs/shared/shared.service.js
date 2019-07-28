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

    }
})();