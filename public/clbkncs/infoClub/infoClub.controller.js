
(function () {
    angular.module('CLBKNCS')
        .controller('InfoClubController', InfoClubController);
        InfoClubController.$inject = ['$scope', 'InfoClubService', 'SharedService',];

    function InfoClubController($scope, InfoClubService, SharedService) {
        const { filterObject } = SharedService;
        $scope.infoClb = () => {
            InfoClubService.infoClb().then((response) => {
                const info = response.Success ? (response.Data || {}) : {};
                $scope.info = filterObject(info);
                let urlLogo = $scope.info.logo;
                angular.element('.logo-pro').find('img').attr('src', (urlLogo || '/images/logo.jpg'));
                let urlFounderProfile = $scope.info.founder_profile;
                angular.element('.founder .w-info').find('img').attr('src', (urlFounderProfile || '/images/logo.jpg'))
            })
        }
        Promise.all([$scope.infoClb()]).then(() => { });
    }
})();
