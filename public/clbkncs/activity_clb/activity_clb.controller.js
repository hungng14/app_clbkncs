
(function () {
    angular.module('CLBKNCS')
        .controller('ActivityClbController', ActivityClbController);
        ActivityClbController.$inject = ['$scope', 'ActivityClbService', 'PaginationFactory', 'limitData'];

    function ActivityClbController($scope, ActivityClbService, PaginationFactory, limitData) {
        $scope.limitData = limitData();
        $scope.paginate = {};
        $scope.paginate.page = 1;
        $scope.paginate.limit = $scope.limitData[0];
        $scope.count = 1;
        $scope.listTitle = () => {
            ActivityClbService.listTitle($scope.paginate).then((response) => {
                if (response.Success) {
                    $scope.listactivity = response.Data.docs;
                    $scope.count = response.Data.page == 1 ? 1 : response.Data.limit * (response.Data.page - 1) + 1;
                    $scope.pagination = PaginationFactory.paginations($scope.paginate.page, response.Data);
                } else {
                    $scope.posts = [];
                }
            })
        }
        Promise.all([$scope.listTitle()]).then(() => { });
    }
})();
