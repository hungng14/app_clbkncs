(function () {
    angular.module('CLBKNCS')
        .controller('ActivityClbController', ActivityClbController);
        ActivityClbController.$inject = ['$scope', 'ActivityClbService', 'PaginationFactory', 'logger', 'limitData', 'SharedService'];

    function ActivityClbController($scope, ActivityClbService, PaginationFactory, logger, limitData, SharedService) {
       
        $scope.limitData = limitData();
        $scope.paginate = {};
        $scope.paginate.page = 1;
        $scope.paginate.limit = $scope.limitData[0];
        $scope.count = 1;
        $scope.list = () => {
            ActivityClbService.list($scope.paginate).then((response) => {
                if (response.Success) {
                    $scope.posts = response.Data.docs;
                    $scope.count = response.Data.page == 1 ? 1 : response.Data.limit * (response.Data.page - 1) + 1;
                    $scope.pagination = PaginationFactory.paginations($scope.paginate.page, response.Data);
                } else {
                    $scope.posts = [];
                }
            })
        }
        $scope.setPage = (page) => {
            if (page && page !== $scope.paginate.page) {
                $scope.paginate.page = +page;
                $scope.list();
            }
        };

        $scope.nextPage = () => {
            if ($scope.pagination.numberPage > $scope.paginate.page) {
                $scope.paginate.page += 1;
                $scope.list();
            }
        };

        $scope.prevPage = () => {
            if ($scope.paginate.page > 1) {
                $scope.paginate.page -= 1;
                $scope.list();
            }
        };

        $scope.deletePost = (id) => {
            function deletePost() {
                ActivityClbService.delete({
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
