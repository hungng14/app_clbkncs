(function () {
    angular.module('CLBKNCS')
        .service('PostService', PostService);
    
    PostService.$inject = ['HttpService'];

    function PostService( HttpService) {
        
        this.list = (data) => {
            return HttpService.sendData('GET', '/admin/post/list', data, 'Lỗi xảy khi hiển thị danh sách bài viết');
        };
        
        this.create = (data) => {
            return HttpService.sendData('POST', '/admin/post/create', data, 'Lỗi xảy khi thêm mới bài viết');
        };

        this.createCategory = (data) => {
            return HttpService.sendData('POST', '/admin/category-post/create', data, 'Lỗi xảy khi thêm mới danh mục');
        };

        this.listCategoryPost = (data) => {
            return HttpService.sendData('GET', '/admin/category-post/listActive', data, 'Lỗi xảy khi hiển thị danh sách danh mục');
        };

        this.update = (data) => {
            return HttpService.sendData('POST', '/admin/post/update', data, 'Lỗi xảy khi cập nhật bài viết');
        };

    }
})();

