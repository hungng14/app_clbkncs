(function(){
    'use strict';
    angular
        .module('app.core')
        .factory('PaginationFactory',PaginationFactory);

    function PaginationFactory() {
        var service = {
            paginations : paginations
        };
        return service;

        function paginations(currentPages,data) {
            let currentPage = currentPages;
            if(typeof (currentPage) === "undefined"){
                currentPage = 1;
            }
            let maxSize = 5;
            // Default page limits
            let totalPages = data.pages;
            let startPage = 1, endPage = totalPages ;
            let isMaxSized = angular.isDefined(maxSize) && maxSize < totalPages;
            // recompute if maxSize
            let  rotate = true;
            if (isMaxSized) {
                if (rotate === true) {
                    // Current page is displayed in the middle of the visible ones
                    startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
                    endPage = startPage + maxSize - 1;
                    // Adjust if limit is exceeded
                    if (endPage > totalPages) {
                        endPage = totalPages;
                        startPage = endPage - maxSize + 1;
                    }
                } else {
                    // Visible pages are paginated with maxSize
                    startPage = (Math.ceil(currentPage / maxSize) - 1) * maxSize + 1;
                    // Adjust last page if limit is exceeded
                    endPage = Math.min(startPage + maxSize - 1, totalPages);
                }
            }

            let pagesArr = [];
            while(startPage < endPage + 1) {
                pagesArr.push(startPage++);
            }
            let flagShow = false;
            if (data.total > data.limit) {
                flagShow = true;
            }
            let pagination = {
                total: data.total,
                pages: pagesArr,
                page: currentPage,
                endPage: endPage,
                numberPage: data.pages,
                skip: (currentPage-1)*data.limit + 1,
                toSkip: (currentPage-1)*data.limit + data.docs.length,
                length: data.docs.length,
                show: flagShow
            };
            return pagination;
        }


    }
})();