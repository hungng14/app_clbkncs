
(function () {
    angular.module('CLBKNCS')
        .controller('HomeController', HomeController);
        HomeController.$inject = ['$scope', 'HomeService', 'PaginationFactory', 'SharedService',];

    function HomeController($scope, HomeService, PaginationFactory, SharedService) {
        // const { filterObject } = SharedService;
        $scope.listMembers = () => {
            HomeService.listMembers().then((response) => {
                $scope.members = response.Success ? (response.Data || []): [];
                console.log(response);
            })
        }
        Promise.all([$scope.listMembers()]).then(() => { });
    }
})();
