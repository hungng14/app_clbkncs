
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
            NewsService.listTitle($scope.paginate).then((response) => {
                if (response.Success) {
                    $scope.listnews = response.Data.docs;
                    $scope.count = response.Data.page == 1 ? 1 : response.Data.limit * (response.Data.page - 1) + 1;
                    $scope.pagination = PaginationFactory.paginations($scope.paginate.page, response.Data);
                } else {
                    $scope.listnews = [];
                }
            })
        }
        Promise.all([$scope.listTitle()]).then(() => { });
        $scope.setPage = (page) => {
            if (page && page !== $scope.paginate.page) {
                $scope.paginate.page = +page;
                $scope.listTitle();
            }
        };

        $scope.nextPage = () => {
            if ($scope.pagination.numberPage > $scope.paginate.page) {
                $scope.paginate.page += 1;
                $scope.listTitle();
            }
        };

        $scope.prevPage = () => {
            if ($scope.paginate.page > 1) {
                $scope.paginate.page -= 1;
                $scope.listTitle();
            }
        };
    }
})();
