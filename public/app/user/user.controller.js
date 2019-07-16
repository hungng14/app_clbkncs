(function () {
    angular.module('CLBKNCS')
        .controller('UserController', UserController);
        UserController.$inject = ['$scope', 'UserService', 'PaginationFactory', 'logger', 'limitData', 'SharedService'];

    function UserController($scope, UserService, PaginationFactory, logger, limitData, SharedService) {

        $scope.list = () => {
            UserService.list().then((response) => {
                console.log(response);
            })
        }
        $scope.list();
    }
})();
