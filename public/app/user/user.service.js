(function () {
    angular.module('CLBKNCS')
        .service('UserService', UserService);
    
    UserService.$inject = ['HttpService'];

    function UserService( HttpService) {
        
        this.list = (data) => {
            return HttpService.sendData('GET', '/admin/user/list', data, 'Lỗi xảy khi hiển thị danh sách thành viên');
        };
        
        this.getInfo = (data) => {
            return HttpService.sendData('GET', '/admin/user/getInfo', data, 'Lỗi xảy khi hiển thị thông tin thành viên');
        };

        this.update = (data) => {
            return HttpService.sendData('POST', '/admin/user/update', data, 'Lỗi xảy khi cập nhật thành viên');
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

        this.listRole = (data) => {
            return HttpService.sendData('GET', '/admin/role/list', data, 'Lỗi xảy khi hiển thị danh sách quyền');
        };
    }
})();

