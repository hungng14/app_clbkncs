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
    
        $scope.info = (id) => {
            window.location.href = `/admin/department/edit?id=${id}`;
        }

        Promise.all([$scope.list()]).then(() => { });
    }
})();
