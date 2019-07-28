
(function () {
    angular.module('CLBKNCS')
        .controller('HomeController', HomeController);
        HomeController.$inject = ['$scope', 'HomeService', 'PaginationFactory', 'SharedService',];

    function HomeController($scope, HomeService, PaginationFactory, SharedService) {
        // const { filterObject } = SharedService;
        // $scope.infoClb = () => {
        //     HomeService.infoClb().then((response) => {
        //         const info = response.Success ? (response.Data || {}) : {};
        //         $scope.info = filterObject(info);
        //     })
        // }
        // Promise.all([$scope.infoClb()]).then(() => { });
    }
})();
