(function () {
    angular.module('CLBKNCS')
        .controller('DepartmentDetailController', DepartmentDetailController);
        DepartmentDetailController.$inject = ['$scope'];

    function DepartmentDetailController($scope) {
        $scope.infoDepartment = {};
       
        $scope.getInfo = async () => {
            $scope.infoDepartment = $scope.infoDepartment || {};
            angular.element('#page-content').removeAttr('data-ng-init');
        }
    }
})();
