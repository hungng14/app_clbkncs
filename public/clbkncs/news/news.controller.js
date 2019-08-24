
(function () {
    angular.module('CLBKNCS')
        .controller('NewsController', NewsController);
        NewsController.$inject = ['$scope', 'NewsService', 'PaginationFactory', 'limitData'];

    function NewsController($scope, NewsService, PaginationFactory, limitData) {
        $scope.limitData = limitData();
        $scope.paginate = {};
        $scope.paginate.page = 1;
        $scope.paginate.limit = $scope.limitData[0];
        $scope.count = 1;
        $scope.listTitle = () => {
            NewsService.listTitle().then((response) => {
                if (response.Success) {
                    $scope.listnews = response.Data.docs;
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
