(function () {
    angular.module('CLBKNCS')
        .controller('LoginController', LoginController);
        LoginController.$inject = ['$scope', 'LoginService', 'logger', 'ValidatorLogin'];

    function LoginController($scope, LoginService, logger, ValidatorLogin) {
        $scope.validator = ValidatorLogin.validationOptions();
        $scope.login = (form) => {
            if (form.validate()) {
                LoginService.login($scope.formLogin).then((response) => {
                    console.log(response)
                    if (response.Success) {
                        window.location.href = '/admin';
                    } else {
                        logger.error('Tài khoản hoặc mật khẩu không chính xác');
                    }
                })
            }
        }
    }
})();
