
(function () {
    angular.module('CLBKNCS')
        .controller('MembersController', MembersController);
        MembersController.$inject = ['$scope', 'MembersService', 'PaginationFactory', 'SharedService',];

    function MembersController($scope, MembersService, PaginationFactory, SharedService) {
        // const { filterObject } = SharedService;
        $scope.listMembers = () => {
            MembersService.listMembers().then((response) => {
                $scope.members = response.Success ? (response.Data || []): [];
            })
        }
        Promise.all([$scope.listMembers()]).then(() => { });
    }
})();
