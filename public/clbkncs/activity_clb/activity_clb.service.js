(function () {
    angular.module('CLBKNCS')
        .service('ActivityClbService', ActivityClbService);
    
        ActivityClbService.$inject = ['HttpService'];

    function ActivityClbService( HttpService) {
        this.listTitle = (data) => {
            return HttpService.sendData('GET', '/activity-clb/list-title', data, 'Lỗi xảy khi hiển thị danh sách bài viết hoạt động clb');
        };
    }
})();

