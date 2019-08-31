(function () {
    angular.module('CLBKNCS')
        .controller('ActivityClbDetailPostController', ActivityClbDetailPostController);
        ActivityClbDetailPostController.$inject = ['$scope'];

    function ActivityClbDetailPostController($scope) {
        $scope.infoPost = {}
       
        $scope.getInfo = async () => {
            $scope.infoPost = $scope.infoPost || {};
            angular.element('#page-content').removeAttr('data-ng-init');
            // if (!isEmpty($scope.formUpdatePost.avatar)) {
            //     $scope.formUpdatePost.avatarOld = $scope.formUpdatePost.avatar;
            //     let urlAvatar = $scope.formUpdatePost.avatar;
            //     delete $scope.formUpdatePost.avatar;
            //     angular.element('.avatar-profile').find('img').attr('src', (urlAvatar || '/images/avatar.jpg'))
            // }
        }
    }
})();
