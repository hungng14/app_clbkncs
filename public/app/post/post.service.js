(function () {
    angular.module('CLBKNCS')
        .service('PostService', PostService);
    
    PostService.$inject = ['HttpService'];

    function PostService( HttpService) {
        
        this.list = (data) => {
            return HttpService.sendData('GET', '/admin/post/list', data, 'Lỗi xảy khi hiển thị danh sách bài viết');
        };
        
        this.getInfo = (data) => {
            return HttpService.sendData('GET', '/admin/user/getInfo', data, 'Lỗi xảy khi hiển thị thông tin thành viên');
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

        this.deleteUser = (data) => {
            return HttpService.sendData('POST', '/admin/user/delete', data, 'Lỗi xảy khi xóa thành viên');
        };

        this.listAccount = (data) => {
            return HttpService.sendData('GET', '/admin/account/list', data, 'Lỗi xảy khi hiển thị danh sách tài khoản');
        };

        this.createAccount = (data) => {
            return HttpService.sendData('POST', '/admin/account/createAccount', data, 'Lỗi xảy khi thêm mới tài khoản');
        };

        this.getInfoAccount = (data) => {
            return HttpService.sendData('GET', '/admin/account/getInfoAccount', data, 'Lỗi xảy khi hiển thị thông tin tài khoản');
        };

        this.updateAccount = (data) => {
            return HttpService.sendData('POST', '/admin/account/updateAccount', data, 'Lỗi xảy khi cập nhật tài khoản');
        };

        this.deleteAccount= (data) => {
            return HttpService.sendData('POST', '/admin/account/deleteAccount', data, 'Lỗi xảy khi xóa tài khoản');
        };
       
    }
})();

