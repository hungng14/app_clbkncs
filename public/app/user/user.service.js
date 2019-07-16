(function () {
    angular.module('CLBKNCS')
        .service('UserService', UserService);
    
    UserService.$inject = ['HttpService'];

    function UserService( HttpService) {
        
        this.list = (data) => {
            return HttpService.sendData('GET', '/admin/user/list', data, 'Lỗi xảy khi hiển thị danh sách thành viên');
        };
    }
})();

