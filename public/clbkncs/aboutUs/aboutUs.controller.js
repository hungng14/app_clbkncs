
(function () {
    angular.module('CLBKNCS')
        .controller('AboutUsController', AboutUsController);
        AboutUsController.$inject = ['$scope', 'AboutUsService'];

    function AboutUsController($scope, AboutUsService, ) {
        $scope.listDepartment = () => {
            AboutUsService.listDepartment().then((response) => {
                $scope.departments = response.Success ? (response.Data || []): [];
            })
        }
        Promise.all([$scope.listDepartment()]).then(() => { });
    }
})();
