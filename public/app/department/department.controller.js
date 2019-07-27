(function () {
    angular.module('CLBKNCS')
        .controller('DepartmentController', DepartmentController);
        DepartmentController.$inject = ['$scope', 'DepartmentService', 'PaginationFactory', 'logger', 'limitData', 'SharedService'];

    function DepartmentController($scope, DepartmentService, PaginationFactory, logger, limitData, SharedService) {
       
        $scope.list = () => {
            DepartmentService.list().then((response) => {
                if (response.Success) {
                    $scope.departments = response.Data || [];
                } else {
                    $scope.departments = [];
                }
            })
        }

        $scope.deleteDepartment = (id, name) => {
            function deleteDepartment() {
                DepartmentService.deleteDepartment({
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
            const msg = `Bạn có chắc chắn muốn xóa ban ngành ${name || ''}?`;
            SharedService.show_swal(deleteDepartment, msg);
        };
    
        $scope.info = (id) => {
            window.location.href = `/admin/department/edit?id=${id}`;
        }

        Promise.all([$scope.list()]).then(() => { });
    }
})();
