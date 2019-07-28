(function () {
    angular.module('CLBKNCS')
        .controller('NewsDetailPostController', NewsDetailPostController);
        NewsDetailPostController.$inject = ['$scope'];

    function NewsDetailPostController($scope) {
        $scope.infoPost = {}
       
        $scope.getInfo = async () => {
            $scope.infoPost = $scope.infoPost || {};
            console.log($scope.infoPost)
            angular.element('#page-content').removeAttr('data-ng-init');
            // if (!isEmpty($scope.formUpdatePost.avatar)) {
            //     $scope.formUpdatePost.avatarOld = $scope.formUpdatePost.avatar;
            //     let urlAvatar = $scope.formUpdatePost.avatar;
            //     delete $scope.formUpdatePost.avatar;
            //     angular.element('.avatar-profile').find('img').attr('src', (urlAvatar || '/images/avatar.jpg'))
            // }
        }

        Promise.all([]).then(() => { });
    }
})();
