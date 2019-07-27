(function () {
    angular.module('CLBKNCS')
        .service('LoginService', LoginService);
    
    LoginService.$inject = ['HttpService'];

    function LoginService( HttpService) {
        this.login = (data) => {
            return HttpService.sendData('POST', '/admin/login', data, 'Lỗi xảy khi đăng nhập');
        };
    }
})();

