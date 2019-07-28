(function () {
    angular.module('CLBKNCS')
        .service('NewsService', NewsService);
    
        NewsService.$inject = ['HttpService'];

    function NewsService( HttpService) {
        this.listTitle = (data) => {
            return HttpService.sendData('GET', '/news/list-title', data, 'Lỗi xảy khi hiển thị danh sách bài viết');
        };
    }
})();

