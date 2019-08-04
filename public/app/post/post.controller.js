(function () {
    angular.module('CLBKNCS')
        .controller('PostController', PostController);
        PostController.$inject = ['$scope', 'PostService', 'PaginationFactory', 'logger', 'limitData', 'SharedService'];

    function PostController($scope, PostService, PaginationFactory, logger, limitData, SharedService) {
       
        $scope.list = () => {
            PostService.list().then((response) => {
                console.log(response)
                if (response.Success) {
                    $scope.posts = response.Data || [];
                } else {
                    $scope.posts = [];
                }
            })
        }

        $scope.deletePost = (id) => {
            function deletePost() {
                PostService.delete({
                    id,
                }).then((response) => {
                    if (response.Success) {
                        swal('Đã xóa!', 'success');
                        $scope.list();
                    } else {
                        swal('Có lỗi xảy ra', 'Vui lòng thử lại.', 'error');
                    }
                });
            }
            const msg = `Bạn có chắc chắn muốn xóa bài viết này?`;
            SharedService.show_swal(deletePost, msg);
        };
    
        $scope.info = (id) => {
            window.location.href = `/admin/post/edit?id=${id}`;
        }

        Promise.all([$scope.list()]).then(() => { });
    }
})();
