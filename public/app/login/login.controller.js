(function () {
    angular.module('CLBKNCS')
        .controller('LoginController', LoginController);
        LoginController.$inject = ['$scope', 'PostService', 'logger'];

    function LoginController($scope, LoginService, logger) {
       
        $scope.login = () => {
            LoginService.list().then((response) => {
                if (response.Success) {
                    window.location.href = '/admin';
                } else {
                    logger.error('Tài khoản hoặc mật khẩu không chính xác');
                }
            })
        }
    }
})();
