(function () {
    angular.module('CLBKNCS')
        .service('ActivityClbService', ActivityClbService);
    
    ActivityClbService.$inject = ['HttpService'];

    function ActivityClbService( HttpService) {
        
        this.list = (data) => {
            return HttpService.sendData('GET', '/admin/activity-clb/list', data, 'Lỗi xảy khi hiển thị danh sách bài viết');
        };
        
        this.createCategory = (data) => {
            return HttpService.sendData('POST', '/admin/category-post/create', data, 'Lỗi xảy khi thêm mới danh mục');
        };

        this.listCategoryPost = (data) => {
            return HttpService.sendData('GET', '/admin/category-post/listActive', data, 'Lỗi xảy khi hiển thị danh sách danh mục');
        };

        this.delete = (data) => {
            return HttpService.sendData('POST', '/admin/activity-clb/delete', data, 'Lỗi xảy khi xóa bài viết');
        };

    }
})();

