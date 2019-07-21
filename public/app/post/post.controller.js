(function () {
    angular.module('CLBKNCS')
        .controller('PostController', PostController);
        PostController.$inject = ['$scope', 'PostService', 'PaginationFactory', 'logger', 'limitData', 'SharedService'];

    function PostController($scope, PostService, PaginationFactory, logger, limitData, SharedService) {
       
        $scope.list = () => {
            PostService.list().then((response) => {
                if (response.Success) {
                    $scope.posts = response.Data || [];
                } else {
                    $scope.posts = [];
                }
            })
        }
    
        $scope.info = (id) => {
            window.location.href = `/admin/post/edit?id=${id}`;
        }

        Promise.all([$scope.list()]).then(() => { });
    }
})();
