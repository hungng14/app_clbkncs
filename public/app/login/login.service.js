(function () {
    angular.module('CLBKNCS')
        .service('LoginService', LoginService);
    
    LoginService.$inject = ['HttpService'];

    function LoginService( HttpService) {
        this.login = (data) => {
            return HttpService.sendData('POST', '/login', data, 'Lỗi xảy ra khi đăng nhập');
        };
    }
})();

