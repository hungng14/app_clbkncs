
(function () {
    angular.module('CLBKNCS')
        .controller('NewsController', NewsController);
        NewsController.$inject = ['$scope', 'NewsService'];

    function NewsController($scope, NewsService) {
        $scope.listTitle = () => {
            NewsService.listTitle().then((response) => {
                $scope.listnews = response.Success ? (response.Data || []): [];
            })
        }
        Promise.all([$scope.listTitle()]).then(() => { });
    }
})();
