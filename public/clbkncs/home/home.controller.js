
(function () {
    angular.module('CLBKNCS')
        .controller('HomeController', HomeController);
        HomeController.$inject = ['$scope', 'HomeService', 'PaginationFactory', 'SharedService',];

    function HomeController($scope, HomeService, PaginationFactory, SharedService) {
        // const { filterObject } = SharedService;
        $scope.listMembers = () => {
            HomeService.listMembers().then((response) => {
                $scope.members = response.Success ? (response.Data || []): [];
            })
        }
        $scope.listActivityClb = () => {
            HomeService.listActivityClb().then((response) => {
                $scope.activitiesClb = response.Success ? (response.Data || []): [];
            })
        }
        $scope.viewInfo = (id) =>{
            window.location.href = `/activity-clb/detail?id=${id}`;
        }
        Promise.all([$scope.listMembers(), $scope.listActivityClb()]).then(() => { });
    }
})();
